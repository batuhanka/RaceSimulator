'''
Created on Mar 22, 2022

@author: batuhan
'''
import requests
from RaceSimulator.models import RaceInfo, SingleRaceInfo, AgfInfo, HorseInfo, WeatherInfo, HorsePowerInfo
from bs4 import BeautifulSoup
import math
from datetime import datetime

def get_races(date):
    
    url     = 'https://ebayi.tjk.org/s/d/program/'+date+'/yarislar.json'
    races   = requests.get(url).json()
    result  = []
    for race in races:
        if int(race['KOD']) < 11:
            item            = RaceInfo()
            item.key        = race['KEY']
            item.raceid     = race['KOD']
            item.name       = race['AD']
            item.location   = race['YER']
            item.day        = race['GUN']
            result.append(item)
       
    return result


def get_race_details(date, racename):
    url     = 'https://ebayi.tjk.org/s/d/program/'+date+'/full/'+racename+'.json'
    races   = requests.get(url).json()
    result  =  []
    for race in races:
        item            = RaceInfo()
        item.key        = race['KEY']
        item.raceid     = race['KOD']
        item.name       = race['AD']
        item.location   = race['YER']
        item.day        = race['GUN']
        result.append(item)
    return result

def get_all_races(racedeatils):
    
    result = []
    for one in racedeatils:
        item            = SingleRaceInfo()
        item.no         = one['NO']
        item.key        = one['KOD']
        item.date       = one['TARIH']
        item.daterequest= convert_date_for_request(one['TARIH'])
        item.time       = one['SAAT']
        item.courtcode  = one['PIST']
        item.court      = one['PISTADI_TR']
        item.courtbg    = find_court_background(one['PIST'])
        item.distance   = one['MESAFE']
        item.racenumber = one['RACENO']
        item.group      = one['GRUP_TR']
        item.info       = one['CINSDETAY_TR']
        item.summary    = one['BILGI_TR']
        item.betinfo    = one['BAHISLER_TR']
        result.append(item)

    return result

def get_weather_info(weatherdeatils):
    
    weather_info            = WeatherInfo()
    weather_info.location   = weatherdeatils['HIPODROMADI']
    weather_info.cityname   = find_weather_location(weatherdeatils['HIPODROMYERI'])
    weather_info.status     = weatherdeatils['HAVA_TR']
    weather_info.temperature= weatherdeatils['SICAKLIK']
    weather_info.humidity   = weatherdeatils['NEM']
    weather_info.grassstatus= weatherdeatils['CIM_TR']
    weather_info.grassrate  = weatherdeatils['CIMPISTAGIRLIGI']
    weather_info.sandstatus = weatherdeatils['KUM_TR']
    weather_info.sandrate   = weatherdeatils['KUMPISTAGIRLIGI']
    return weather_info

def get_pedigree_info(horsename, fathername, mothername):
    
    pedigree_text = ""
    for i in range(30):
        if(i == 0 or i == 1):
            i = ""
        try:
            url             = 'https://www.pedigreequery.com/'+horsename+''+str(i)
            details         = requests.get(url)
            source          = BeautifulSoup(details.content,"lxml")
            pedigreetable   = source.find("table", {"class","pedigreetable"})
            rows            = pedigreetable.find_all("tr")
            father          = str(rows[0].td.text).split(" (")[0]
            mother          = str(rows[16].td.text).split(" (")[0]
    
            if(father == fathername and mother == mothername):
                pedigree_text   = source.center.center.text
                break
    
        except:
            pass
    
    return pedigree_text
    

def get_all_horses(racedeatils):
    
    result = []
    for one in racedeatils:
        racecode    = one['KOD']
        ## groupinfo   = one['GRUP_TR'].lower()
        ## horsetype   = groupinfo.split(" ")[-1] ## it returns as type ingilizler or araplar
        for horse in one['atlar']:
            item            = HorseInfo()
            item.racecode   = racecode
            item.code       = horse['KOD']
            item.key        = horse['KEY']
            item.name       = horse['AD']
            item.number     = horse['NO']
            item.startno    = horse['START']
            item.age        = horse['YAS']
            item.weight     = horse['KILO']
            item.weightex   = horse['FAZLAKILO']
            item.fathername = horse['BABA']
            item.mothername = horse['ANNE']
            item.jockey     = horse['JOKEYADI']
            item.owner      = horse['SAHIPADI']
            item.trainer    = horse['ANTRENORADI']
            item.fathercode = horse['BABAKODU']
            item.mothercode = horse['ANNEKODU']
            item.jockeycode = horse['JOKEYKODU']
            item.ownercode  = horse['SAHIPKODU']
            item.trainercode= horse['ANTRENORKODU']
            item.handycap   = horse['HANDIKAP']
            item.kgs        = horse['KGS']
            item.jerseyimg  = horse['FORMA'].replace("medya", "medya-cdn")
            item.disabled   = horse['KOSMAZ']
            
            #if(horsetype == "i̇ngilizler"):
            #    pedigree_text = get_pedigree_info(horse['AD'].replace(" ","+").lower(), horse['BABA'].split(" (")[0], horse['ANNE'].split(" (")[0])
            #if(pedigree_text != ""):
            #    dpvalue      = pedigree_text.split("DP = ")[1].split(" ")[0]
            #    divalue      = pedigree_text.split("DI = ")[1].split(" ")[0]
            #    cdvalue      = pedigree_text.split("CD = ")[1].split(" ")[0]
            
            try: 
                item.apprantice = horse['APRANTIFLG']
            except:
                pass
            item.stablemate = horse['EKURI']
            item.bestdegree = horse['ENIYIDERECE']
            item.ganyan     = horse['GANYAN']
            item.lastsix    = horse['SON6'].replace("K","").replace("C","")
            item.tool       = horse['TAKI']
            result.append(item)

    return result


def get_all_horses_single_race(horses, racecode):
    
    result = []
    for horse in horses:
            item            = HorseInfo()
            item.racecode   = racecode
            item.code       = horse['KOD']
            item.key        = horse['KEY']
            item.name       = horse['AD']
            item.number     = horse['NO']
            item.startno    = horse['START']
            item.age        = horse['YAS']
            item.weight     = horse['KILO']
            item.fathername = horse['BABA']
            item.mothername = horse['ANNE']
            item.jockey     = horse['JOKEYADI']
            item.owner      = horse['SAHIPADI']
            item.trainer    = horse['ANTRENORADI']
            item.fathercode = horse['BABAKODU']
            item.mothercode = horse['ANNEKODU']
            item.jockeycode = horse['JOKEYKODU']
            item.ownercode  = horse['SAHIPKODU']
            item.trainercode= horse['ANTRENORKODU']
            item.handycap   = horse['HANDIKAP']
            item.kgs        = horse['KGS']
            item.jerseyimg  = horse['FORMA'].replace("medya", "medya-cdn")
            item.disabled   = horse['KOSMAZ']
            item.stablemate = horse['EKURI']
            item.bestdegree = horse['ENIYIDERECE']
            item.ganyan     = horse['GANYAN']
            item.lastsix    = horse['SON6'].replace("K","").replace("C","")
            item.tool       = horse['TAKI']
            result.append(item)

    return result


def get_all_agf_rates(agfdeatils):
    
    result = []
    for agf in agfdeatils:
        for one in agf['kosular']:
            racenumber = one['NO']
            for horse in one['atlar']:
                item            = AgfInfo()
                item.racenumber = racenumber
                item.horsenumber= horse['NO']
                item.horsename  = horse['AD']
                item.agforder   = horse['AGFSIRANO']
                item.agfrate    = horse['AGFORAN']
                item.jockey     = horse['JOKEY']
                result.append(item)

    return result

def get_last_800(horsecode, courtcode):
    
    race_count      = 0
    increment       = 1
    speeds          = []

    #### first increment check for old horses
    ## horse_details_url   = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_Yil=-1&QueryParameter_SehirId=-1&QueryParameter_PistKodu=-1&QueryParameter_MesafeStart=-1&QueryParameter_MesafeEnd=-1&QueryParameter_Kosmaz=on&Sort=&QueryParameter_AtId='+horsecode
    horse_details_url   = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_AtId='+horsecode
    horsedetails    = requests.get(horse_details_url)
    source          = BeautifulSoup(horsedetails.content,"lxml")
    allraces        = source.find("table", {"id": "queryTable"})
    for item in allraces.find_all("tr"):
        columns = item.find_all("td")
        if(len(columns) == 21):
            pass
        else:
            race_count = item.text.strip().split("Toplam ")[1].split(" ")[0]

    if int(race_count) > 50:
        increment = int(race_count) / 50
    else:
        pass


    for index in range(math.ceil(increment)):

        ##details_url     = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_Yil=-1&QueryParameter_SehirId=-1&QueryParameter_PistKodu=-1&QueryParameter_MesafeStart=-1&QueryParameter_MesafeEnd=-1&QueryParameter_Kosmaz=on&Sort=&QueryParameter_AtId='+horsecode+'&PageNumber='+str(index)
        details_url     = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_AtId='+horsecode+'&PageNumber='+str(index)   
        horsedetails    = requests.get(details_url)
        source          = BeautifulSoup(horsedetails.content,"lxml")
        allraces        = source.find("table", {"id": "queryTable"})


        for item in allraces.find_all("tr"):
            columns = item.find_all("td")
            if(len(columns) == 21):
                court   = find_court(columns[3].text.strip().split(":")[0])
            try:
                old_race_url = columns[0].a['href']
                if(old_race_url != None and old_race_url != "#" and court == courtcode):
                    racecity    = find_weather_location(columns[1].text.strip())
                    
                    query_date  = old_race_url.split("Tarih=")[1].split("&")[0]
                    raceid      = old_race_url.split("#")[1]
                    temp        = query_date.split("/")
                    date_str    = temp[2]+""+temp[1]+""+temp[0]
                    
                     
                    result_url = 'https://ebayi.tjk.org/s/d/sonuclar/%s/full/%s.json' %(date_str, racecity)
                    races = requests.get(result_url).json()
                    for key, value in races.items():
                        if(key == "kosular"):
                            last_avg_speed  = 0
                            for item in value:
                                if (int(item['KOD']) == int(raceid)):
                                    last800 = item['SON800']
                                    if("-" in last800):
                                        first = last800.split("-")[0]
                                        other = last800.split("-")[1]
                                        first_seconds   = (float(first.split(".")[0]) * 60) + (float(first.split(".")[1])) + (float(first.split(".")[2]) / 100)
                                        other_seconds   = (float(other.split(".")[0]) * 60) + (float(other.split(".")[1])) + (float(other.split(".")[2]) / 100)
                                        total_seconds   = (first_seconds + other_seconds) / 2
                                        last_avg_speed  = 800 / total_seconds 
                                        speeds.append(last_avg_speed)
                                    else:
                                        total_seconds   = (float(last800.split(".")[0]) * 60) + (float(last800.split(".")[1])) + (float(last800.split(".")[2]) / 100)
                                        last_avg_speed  = 800 / total_seconds
                                        speeds.append(last_avg_speed)

            except:
                pass
            
            
    finalcount  = 0
    finaltotal  = 0
    for one in speeds:
        finalcount  = finalcount + 1
        finaltotal  = finaltotal + one         
    
    try:
        result = finaltotal / finalcount 
    except:
        result = 0
    
    return result
    
def get_horse_avg_speed(horse_power_list, courtcode):
    
    race_count          = 0
    total_speed         = 0
    for item in horse_power_list:
        
        if(item.court == courtcode and item.degree != "" and item.degree != "Koşmaz" and item.degree != "Drcsz" and item.jockey != "Kayıt Koşmaz"):
            race_count = race_count + 1
            raw_degree      = item.degree
            values          = raw_degree.split(".")
            total_seconds   = 0
            total_seconds   = total_seconds + float(values[0]) * 60
            total_seconds   = total_seconds + float(values[1])
            try: ## if there is no microseconds
                total_seconds   = total_seconds + float(values[2]) / 100
            except:
                pass
            speed           = float(float(item.distance) / float(total_seconds))
            total_speed      += speed
            
    
    if(race_count == 0):  ## no data for this court
        avg_speed = 0
    else:
        avg_speed = float(total_speed / race_count)

    return avg_speed

def get_horse_prize_avg_speed(horse_power_list, courtcode):
    
    race_count          = 0
    total_speed         = 0
    for item in horse_power_list:
        
        if(item.court == courtcode and item.degree != "" and item.degree != "Koşmaz" and item.degree != "Drcsz" and item.jockey != "Kayıt Koşmaz" and int(item.rank) < 6):
            race_count = race_count + 1
            #print(item.racedate+" "+item.racecity+" "+item.distance+" "+item.court+" "+item.degree)
            raw_degree      = item.degree
            values          = raw_degree.split(".")
            total_seconds   = 0
            total_seconds   = total_seconds + float(values[0]) * 60
            total_seconds   = total_seconds + float(values[1])
            try: ## if there is no microseconds
                total_seconds   = total_seconds + float(values[2]) / 100
            except:
                pass
            speed           = float(float(item.distance) / float(total_seconds))
            total_speed      += speed
            
    
    if(race_count == 0):  ## no data for this court
        prize_avg_speed = 0
    else:
        prize_avg_speed = float(total_speed / race_count)

    return prize_avg_speed

def get_stats_info(horsecode):
    
    url         = 'https://www.tjk.org/TR/YarisSever/Query/AtKosuIstatistik/AtKosuIstatistik?Atkodu='+horsecode
    details     = requests.get(url)
    source      = BeautifulSoup(details.content,"lxml")
    tables      = source.find_all("table")
    result      = []
    
    for table in tables:
        links = table.find_all("a")
        for link in links:
            finalstr = 'https://www.tjk.org' + link['href']
            link['href'] = finalstr 
        result.append(str(table))
    return result    

def get_rival_info(horsecode, racecode, cityname, dateinfo):
    
    url                 = '''https://ebayi.tjk.org/s/d/program/%s/full/%s.json''' %(dateinfo, cityname)
    program             = requests.get(url).json()
    rivals              = []

    for race in program['kosular']:
        if race['KOD'] == racecode:
            for horse in race['atlar']:
                if horse['KOD'] != horsecode:
                    rivals.append(horse['KOD'])
    
    
    
    race_count      = 0
    increment       = 1

    #### first increment check for old races
    old_races_url   = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?1=1&QueryParameter_AtId='+horsecode
    oldraces        = requests.get(old_races_url)
    source          = BeautifulSoup(oldraces.content,"lxml")
    allraces        = source.find("table", {"id": "queryTable"})
    for item in allraces.find_all("tr"):
        columns = item.find_all("td")
        if(len(columns) == 21):
            pass
        else:
            race_count = item.text.strip().split("Toplam ")[1].split(" ")[0]
    
    if int(race_count) > 50:
        increment = int(race_count) / 50
    else:
        pass
    
    
    occur = {}
    for index in range(math.ceil(increment)):
        details_url     = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?&QueryParameter_AtId='+horsecode+'&PageNumber='+str(index)
        horsedetails    = requests.get(details_url)
        source          = BeautifulSoup(horsedetails.content,"lxml")
        allraces        = source.find("table", {"id": "queryTable"})
        
    
        
        for item in allraces.find_all("tr"):
            columns = item.find_all("td")
            if(len(columns) == 21):
                race_url    = columns[0].a['href']
                query_date  = race_url.split("Tarih=")[1].split("&")[0]
                cityname    = columns[1].text.strip();
                raceid      = race_url.split("#")[1]
                day         = query_date.split("/")[0]
                month       = query_date.split("/")[1]
                year        = query_date.split("/")[2]
                daterequest = year+month+day
                raceorder   = columns[12].text.strip()
                now         = datetime.now()
                today       = now.strftime("%Y%m%d")
                
                if(int(year) > 2018 and daterequest != today):
                
                    url         = '''https://ebayi.tjk.org/s/d/sonuclar/%s/full/%s.json''' %(daterequest, find_weather_location(cityname))
                    program     = requests.get(url).json()
                    try:
                        for race in program['kosular']:
                            if race['NO'] == raceorder and race['KOD'] == raceid:
                                for item in race['atlar']:
                                    
                                    if item['KOD'] == horsecode:
                                        sourceorder = item['SONUC']
                                    
                                    for rival in rivals:
                                        if rival == item['KOD']:
                                            targetorder = item['SONUC']
                                            rivalname = item['AD']
                                            
                                            if rival not in occur.keys():
                                                info = []
                                                info.append(rivalname)
                                                info.append(0)
                                                info.append(0)
                                                occur[rival] = info
                                                
                                                if(int(sourceorder) < int(targetorder)):
                                                    occur[rival][1] = occur[rival][1] + 1
                                                else:
                                                    occur[rival][2] = occur[rival][2] + 1
                                                
                                            else:
                                                if(int(sourceorder) < int(targetorder)):
                                                    occur[rival][1] = occur[rival][1] + 1
                                                else:
                                                    occur[rival][2] = occur[rival][2] + 1
                                            
                    except:
                        pass
    return occur   




def get_horse_power(horsecode):
    race_count  = 0
    increment   = 1
    result      = []
    
    #### first increment check for old horses
    ## for all races 
    ##horse_details_url   = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_Yil=-1&QueryParameter_SehirId=-1&QueryParameter_PistKodu=-1&QueryParameter_MesafeStart=-1&QueryParameter_MesafeEnd=-1&QueryParameter_Kosmaz=on&Sort=&QueryParameter_AtId='+horsecode
    horse_details_url = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_AtId='+horsecode
    horsedetails    = requests.get(horse_details_url)
    source          = BeautifulSoup(horsedetails.content,"lxml")
    allraces        = source.find("table", {"id": "queryTable"})
    for item in allraces.find_all("tr"):
        columns = item.find_all("td")
        if(len(columns) == 21):
            pass
        else:
            race_count = item.text.strip().split("Toplam ")[1].split(" ")[0]
        
    if int(race_count) > 50:
        increment = int(race_count) / 50
    else:
        pass
    
    
    for index in range(math.ceil(increment)):
    
        ###details_url     = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_Yil=-1&QueryParameter_SehirId=-1&QueryParameter_PistKodu=-1&QueryParameter_MesafeStart=-1&QueryParameter_MesafeEnd=-1&QueryParameter_Kosmaz=on&Sort=&QueryParameter_AtId='+horsecode+'&PageNumber='+str(index)
        details_url     = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?QueryParameter_AtId='+horsecode+'&PageNumber='+str(index)   
        horsedetails    = requests.get(details_url)
        source          = BeautifulSoup(horsedetails.content,"lxml")
        allraces        = source.find("table", {"id": "queryTable"})
        
           
        for item in allraces.find_all("tr"):
            columns = item.find_all("td")
            info    = HorsePowerInfo()
            if(len(columns) == 21):
                info.horsecode  = horsecode
                info.racedate   = columns[0].text.strip()
                info.racecity   = columns[1].text.strip()
                info.distance   = columns[2].text.strip()
                info.court      = find_court(columns[3].text.strip().split(":")[0])
                info.courtrate  = columns[3].text.strip().split(":")[1]
                info.rank       = columns[4].text.strip()
                info.degree     = columns[5].text.strip()
                info.weight     = columns[6].text.strip()
                info.tools      = columns[7].text.strip()
                info.jockey     = columns[8].text.strip()
                info.startno    = columns[9].text.strip()
                info.ganyan     = columns[10].text.strip()
                info.group      = columns[11].text.strip()
                info.raceinfo   = columns[12].text.strip()
                info.racetype   = columns[13].text.strip()
                info.trainer    = columns[14].text.strip()
                info.owner      = columns[15].text.strip()
                info.handycap   = columns[16].text.strip()
                info.prize      = columns[17].text.strip()
                result.append(info)
            else:
                pass
    
    if len(result) == 1:
        print("ilk defa kosacaktır")
    
    return result

def find_court(value):
    
    result = ""
    if value == 'K':
        result = "kum"
    if value == 'Ç':
        result = "cim"
    if value == 'S':
        result = "sentetik"
    return result

def find_court_background(value):
    result = ""
    if value == 'kum':
        result = "secondary"
    if value == 'cim':
        result = "success"
    if value == 'sentetik':
        result = "warning"
    return result

def find_weather_location(value):
    
    choices = {"Ğ":"G", "Ü":"U", "Ş":"S", "İ":"I", "Ö":"O", "Ç":"C",  "ğ":"g", "ü":"u", "ş":"s", "ı":"i", "ö":"o", "ç":"c"}
    for i in range(len(value)):
        value = value.replace(value[i:i+1],choices.get(value[i],value[i]))
    
    return value.upper()

def convert_to_degree(seconds):
    seconds = seconds % (24 * 3600)
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
    return "%2d:%.2f" % (minutes, seconds)

def convert_date_for_request(datestr):
    day     = datestr.split("/")[0]
    month   = datestr.split("/")[1]
    year    = datestr.split("/")[2]
    return year+month+day