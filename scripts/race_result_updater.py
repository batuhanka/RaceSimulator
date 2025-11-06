import duckdb
from datetime import datetime, timedelta
import pandas as pd
import requests
import json
from typing import List, Any, Optional
import time

DB_NAME             = 'all_races.duckdb'
MASTER_TABLE_NAME   = 'master_table'
TODAY               = datetime.now().date()
START_DATE          = TODAY
END_DATE            = TODAY
DELAY_SECONDS       = 0.5


def sanitize_turkish(city_name: str) -> str:
    mapping = {
        'İ': 'I', 'I': 'I', 'Ş': 'S', 'Ğ': 'G', 'Ü': 'U', 'Ö': 'O', 'Ç': 'C',
        'ı': 'i', 'ş': 's', 'ğ': 'g', 'ü': 'u', 'ö': 'o', 'ç': 'c'
    }
    for k, v in mapping.items():
        city_name = city_name.replace(k, v)
    return city_name.upper()

def clean_and_cast_integer(value: Optional[Any], default_val: Optional[int] = None) -> Optional[int]:
    if value is None or str(value).strip() == '':
        return default_val
    
    value_str = str(value)
    
    try:
        return int(float(value_str.replace(',', '.')))
    except ValueError:
        return default_val

def clean_and_cast_numeric(value: Optional[Any], default_val: float = 0.0) -> float:
    if value is None or value == '':
        return default_val
    
    value_str = str(value)
    
    try:
        return float(value_str.replace(',', '.'))
    except ValueError:
        return default_val

def find_race_centers(date_str: str, con: duckdb.DuckDBPyConnection) -> List[str]:
    race_centers_url = f"https://ebayi.tjk.org/s/d/sonuclar/{date_str}/yarislar.json"
    
    try:
        con.execute("INSTALL httpfs; LOAD httpfs;")
        
        query = f"""
        SELECT
            YER AS Center_Name
        FROM
            read_json_auto('{race_centers_url}')
        WHERE
            TRY_CAST(KOD AS INTEGER) <= 10
        ORDER BY
            TRY_CAST(KOD AS INTEGER);
        """
        
        centers_df = con.execute(query).fetchdf()
        
        if centers_df.empty:
            return []
        
        url_friendly_names = [
            sanitize_turkish(name) 
            for name in centers_df['Center_Name'].tolist()
        ]
        
        return url_friendly_names
        
    except Exception as e:
        print(f"❌ Hata: {date_str} için yarış merkezleri çekilemedi. Hata: {e}")
        return []

def fetch_and_append_results(city_code: str, full_json_url: str, date_str: str, con: duckdb.DuckDBPyConnection):
    
    try:
        response    = requests.get(full_json_url, timeout=10)
        response.raise_for_status()
        data        = response.json()
        hava        = data.get('hava', [])
        kosular     = data.get('kosular', [])
        flat_records= []

        for kosu in kosular:
            atlar = kosu.get('atlar', [])
            
            race_base_data = {
                'City_Name'             : city_code,
                'Weather_State'         : hava.get('HAVA_TR'),
                'Weather_Temperature'   : clean_and_cast_integer(hava.get('SICAKLIK'), 0),
                'Weather_Humidty'       : clean_and_cast_integer(hava.get('NEM'), 0),
                'Weather_Grass_State'   : hava.get('CIM_TR'),
                'Weather_Grass_Weight'  : clean_and_cast_numeric(hava.get('CIMPISTAGIRLIGI', '0.0')),
                'Weather_Sand_State'    : hava.get('KUM_TR'),
                'Weather_Sand_Weight'   : clean_and_cast_numeric(hava.get('KUMPISTAGIRLIGI', '0.0')),
                'Race_Code'             : kosu.get('KOD'),
                'Race_Number'           : int(kosu.get('NO')) if kosu.get('NO') and str(kosu.get('NO')).isdigit() else None,
                'Race_Date'             : kosu.get('TARIH'),
                'Race_Time'             : kosu.get('SAAT'),
                'Race_Track_Type'       : kosu.get('PIST'),
                'Race_Distance'         : int(kosu.get('MESAFE')) if kosu.get('MESAFE') and str(kosu.get('MESAFE')).isdigit() else None,
                'Race_Group'            : kosu.get('GRUP_TR'),
                'Race_Group_Short'      : kosu.get('GRUPKISA'),
                'Race_Kind'             : kosu.get('CINSDETAY_TR'),
                'Race_Info'             : kosu.get('BILGI_TR'),
                'Race_Best_Degree'      : kosu.get('ENIYIDERECE'),
                'Race_Last800'          : kosu.get('SON800'),
                'Race_Photo_Finish'     : kosu.get('FOTOFINISH'),
                'Race_Video'            : kosu.get('VIDEO'),
            }
            
            for horse in atlar:
                horse_data = {
                    'Horse_Code'            : horse.get('KOD'),
                    'Horse_Saddle_No'       : horse.get('NO'),
                    'Horse_Finish_Rank'     : clean_and_cast_integer(horse.get('SONUC')),
                    'Horse_Start_No'        : clean_and_cast_integer(horse.get('START')),
                    'Horse_Name'            : horse.get('AD'),
                    'Horse_Age'             : horse.get('YAS'),
                    'Horse_Weight'          : clean_and_cast_numeric(horse.get('KILO', '0.0')),
                    'Horse_Extra_Weight'    : clean_and_cast_numeric(horse.get('FAZLAKILO', '0.0')),
                    'Horse_Weight_Loss'     : clean_and_cast_numeric(horse.get('APRANTIKILOINDIRIMI', '0.0')),
                    'Horse_Finish_Diff'     : horse.get('FARK'),
                    'Horse_Start_Late'      : horse.get('GECCIKIS_BOY'),
                    'Horse_Finish_Degree'   : horse.get('DERECE'),
                    'Horse_Odd'             : clean_and_cast_numeric(horse.get('GANYAN', '0.0')),
                    'Horse_Agf1_Order'      : clean_and_cast_integer(horse.get('AGFSIRA1'), 0),
                    'Horse_Agf1_Rate'       : clean_and_cast_numeric(horse.get('AGF1', '0.0')),
                    'Horse_Agf2_Order'      : clean_and_cast_integer(horse.get('AGFSIRA2'), 0),
                    'Horse_Agf2_Rate'       : clean_and_cast_numeric(horse.get('AGF2', '0.0')),
                    'Horse_Father'          : horse.get('BABA'),
                    'Horse_Father_Code'     : horse.get('BABAKODU'),
                    'Horse_Mother'          : horse.get('ANNE'),
                    'Horse_Mother_Code'     : horse.get('ANNEKODU'),
                    'Horse_Jockey_Name'     : horse.get('JOKEYADI'),
                    'Horse_Jockey_Name'     : sanitize_turkish(horse.get('JOKEYADI').upper()),
                    'Horse_Jockey_Code'     : horse.get('JOKEYKODU'),
                    'Horse_Owner_Name'      : sanitize_turkish(horse.get('SAHIPADI').upper()),
                    'Horse_Owner_Code'      : horse.get('SAHIPKODU'),
                    'Horse_Trainer_Name'    : sanitize_turkish(horse.get('ANTRENORADI').upper()),
                    'Horse_Trainer_Code'    : horse.get('ANTRENORKODU'),
                    'Horse_Handicap'        : clean_and_cast_numeric(horse.get('HANDIKAP','0.0')),
                    'Horse_Kgs'             : clean_and_cast_integer(horse.get('KGS'), 0),
                    'Horse_Jersey'          : horse.get('FORMA'),
                    'Horse_Valid'           : bool(horse.get('KOSMAZ')),
                    'Horse_Ekuri'           : horse.get('EKURI') if horse.get('EKURI') else '0',
                    'Horse_Equipment'       : horse.get('TAKI'),
                    'Horse_Grower'          : horse.get('YETISTIRICI'),
                    
                }
                
                record = {**race_base_data, **horse_data}
                flat_records.append(record)

        if not flat_records:
            print(f"   ↳ ⚠️ {date_str} - {city_code}: Koşu veya at verisi bulunamadı.")
            return

        flat_df     = pd.DataFrame(flat_records)
        table_check = con.execute(f"SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '{MASTER_TABLE_NAME}'").fetchone()[0]

        if table_check == 0:
            con.execute(f"CREATE TABLE {MASTER_TABLE_NAME} AS SELECT * FROM flat_df")
            action = "oluşturuldu"
        else:
            con.execute(f"INSERT INTO {MASTER_TABLE_NAME} SELECT * FROM flat_df")
            action = "eklendi"
            
        print(f"   ↳ ✅ {date_str} - {city_code}: {len(flat_df)} satır veritabanına {action}.")

    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            pass 
        else:
            print(f"   ↳ ❌ HTTP Hatası: {date_str} - {city_code}. Hata: {e}")
    except json.JSONDecodeError:
        print(f"   ↳ ❌ JSON Hatası: {date_str} - {city_code} verisi geçersiz JSON formatında.")
    except Exception as e:
        print(f"   ↳ ❌ Beklenmeyen Hata: {date_str} - {city_code} için hata oluştu. Hata: {e}")

if __name__ == '__main__':
    
    
    print(f"Veri Çekim Aralığı: {START_DATE} ile {END_DATE} arası.")
    con = duckdb.connect(database=DB_NAME)
    print(f"\n🔗 DuckDB Bağlantısı '{DB_NAME}' veritabanına kuruldu.")
    
    current_date = START_DATE
    while current_date <= END_DATE:
        date_str = current_date.strftime('%Y%m%d')
        print(f"\n--- {date_str} Tarihi İşleniyor ---")
    
        FULL_RESULT_URL_TEMPLATE = f"https://ebayi.tjk.org/s/d/sonuclar/{date_str}/full/"
        races_list = find_race_centers(date_str, con)
    
        if races_list:
            print(f"   ↳ Tespit Edilen Merkezler: {races_list}")
            for center in races_list:
                full_url = f"{FULL_RESULT_URL_TEMPLATE}{center}.json"
                fetch_and_append_results(center, full_url, date_str, con)
        else:
            print(f"   ↳ {date_str}: Yarış merkezi bulunamadı (Tatil veya veri yok).")
    
        time.sleep(DELAY_SECONDS) 
        current_date += timedelta(days=1)
    
    try:
        total_rows = con.execute(f"SELECT COUNT(*) FROM {MASTER_TABLE_NAME}").fetchone()[0]
        print(f"\n🏆 TOPLAMA BAŞARILI: '{MASTER_TABLE_NAME}' tablosunda toplam {total_rows} satır veri bulunmaktadır.")
    except Exception as e:
        print(f"\n⚠️ Veritabanında '{MASTER_TABLE_NAME}' tablosu bulunamadı veya bir hata oluştu: {e}")
    
    finally:
        con.close()
        print("\n👋 DuckDB Bağlantısı kapatıldı. Kod çalışması tamamlandı.")
    
    

