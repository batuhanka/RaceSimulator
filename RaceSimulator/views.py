'''
Created on Mar 22, 2022

@author: batuhan.kandiran
'''
from django.shortcuts import render
from datetime import datetime, timedelta
import controller.controller as CONT
import requests
from django.http.response import HttpResponse
import json
from django.core import serializers
from bs4 import BeautifulSoup
import re

citycodemap = {1:'Adana', 2:'İzmir', 3:'İstanbul', 4:'Bursa', 5:'Ankara', 6:'Şanlıurfa', 7:'Elazığ', 8:'Diyarbakır', 9:'Kocaeli', 10:'Antalya'}
def get_city_code(val):
    for key, value in citycodemap.items():
        if val == value:
            return key
    return "key doesn't exist"

def login(request):
    return render(request, "login.html")

def registeruser(request):
    email       = request.GET.get("email")
    phone       = request.GET.get("phone")
    firstname   = request.GET.get("firstname")
    surname     = request.GET.get("surname")
    username    = request.GET.get("username")
    password    = request.GET.get("password")
    print(email, phone, firstname, surname, username, password)
    return render(request, "index.html")

def home(request):
    now                 = datetime.now()
    date_for_request    = now.strftime("%Y%m%d")
    races               = CONT.get_races(date_for_request)
    return render(request, "index.html", {'today': datetime.now().strftime("%d/%m/%Y"), 'races' : races})

def prgchange(request):
    mimetype            = "application/json"
    programdate         = request.GET.get("programdate")
    temp                = str(programdate).split()
    daterequest         = temp[0]+temp[1]+temp[2]+temp[3]
    prgdate             = datetime.strptime(daterequest, '%a%b%d%Y')
    date_for_request    = prgdate.strftime("%Y%m%d")
    races               = CONT.get_races(date_for_request)
    json_folder         = serializers.serialize('json', races)
    racelist            = json.loads(json_folder)
    json_object         = json.dumps({'races': racelist})
    return HttpResponse(json_object, mimetype)

def fixture(request):
    programdate         = request.GET.get("programdate")
    temp                = str(programdate).split()
    daterequest         = temp[0]+temp[1]+temp[2]+temp[3]
    prgdate             = datetime.strptime(daterequest, '%a%b%d%Y')
    date_for_request    = prgdate.strftime("%Y%m%d")
    now                 = datetime.now()
    cityname            = request.GET.get("cityname")
    url                 = '''https://ebayi.tjk.org/s/d/program/%s/full/%s.json''' %(date_for_request, cityname)
    program             = requests.get(url).json()
    weatherdetails      = program['hava']
    racedetails         = program['kosular']
    weather_info        = CONT.get_weather_info(weatherdetails)
    all_races           = CONT.get_all_races(racedetails)
    all_horses          = CONT.get_all_horses(racedetails)
    all_rules           = CONT.get_all_rules()
    try:
        resultsurl          = '''https://ebayi.tjk.org/s/d/sonuclar/%s/full/%s.json''' %(date_for_request, cityname)
        results             = requests.get(resultsurl).json()
        resultdetails       = results['kosular']
        for result in resultdetails:
            racecode    = result['KOD']
            is_race_completed(racecode, result['VIDEO'], result['FOTOFINISH'], all_races)
            horseorders = result['atlar']
            for horse in horseorders:
                for item in all_horses:
                    if(item.code == horse['KOD']):
                        if(horse['KOSMAZ'] == True or horse['SONUC'] == 0 or horse['SONUC'] == ''):
                            item.result = 1000
                        else:
                            item.result = horse['SONUC']
                            item.ganyan = horse['GANYAN']
                            item.degree = horse['DERECE']
                            item.diff   = horse['FARK']
    except:
        pass
    
    if date_for_request == now.strftime("%Y%m%d"):
        currenttime     = now.strftime("%H:%M")
        nextracetime    = (now + timedelta(minutes=30)).strftime("%H:%M")
    else:
        currenttime     = prgdate.strftime("%H:%M")
        nextracetime    = (prgdate + timedelta(minutes=30)).strftime("%H:%M")
    
    return render(request, "racedetails-mobile.html", {'currenttime': currenttime, 'nextracetime': nextracetime, 'weather': weather_info, 'cityname': cityname, 'racedetails' : all_races, 'allhorses' : all_horses, 'allrules': json.dumps(all_rules) })

def is_race_completed(racecode, videourl, photourl, allraces):
    for race in allraces:
        if race.key == racecode:
            race.completed = True
            race.racevideo = videourl
            race.racephoto = photourl

def degreepredict(request):
    horsecode       = request.GET.get("horsecode")
    courtcode       = request.GET.get("courtcode")
    horsename       = request.GET.get("horsename")
    curr_temperature= request.GET.get("temperature")
    curr_humidity   = request.GET.get("humidity")
    curr_grassrate  = request.GET.get("grassrate")
    curr_dirtstate  = request.GET.get("dirtstate")
    curr_distance   = request.GET.get("distance")
    curr_weight     = request.GET.get("weight")
    curr_handycap   = request.GET.get("handycap")
    curr_kgs        = request.GET.get("kgs")
    curr_last20     = request.GET.get("last20")
    curr_jockeycode = request.GET.get("jockeycode")
    curr_startno    = request.GET.get("startno")
    last_gallop     = CONT.get_gallop_info(horsename, curr_kgs)
    degree_predict  = CONT.get_degree_predict(horsecode, courtcode, curr_temperature, curr_humidity, curr_grassrate, curr_distance, curr_weight, curr_handycap, curr_kgs, curr_last20, curr_dirtstate, curr_jockeycode, curr_startno, last_gallop)
    context = {
        'degree_predict': degree_predict,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")

def horsehistory(request):
    horsecode       = request.GET.get("horsecode")
    courtcode       = request.GET.get("courtcode")
    historydata     = CONT.get_historical_data(horsecode, courtcode)
    context = {
        'historydata': historydata,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")

def rivalstats(request):
    horsecode       = request.GET.get("horsecode")
    racecode        = request.GET.get("racecode")
    cityname        = request.GET.get("cityname")
    dateinfo        = request.GET.get("dateinfo")
    rival_stats     = CONT.get_rival_stats(horsecode, racecode, cityname, dateinfo)
    return HttpResponse(json.dumps({'rival_stats': rival_stats}), "application/json")

def horsepower(request):
    horsecode           = request.GET.get("horsecode")
    courtcode           = request.GET.get("courtcode")
    distance            = request.GET.get("distance")
    horse_power_list    = CONT.get_horse_power(horsecode)
    avg_speed           = CONT.get_horse_avg_speed(horse_power_list, courtcode)
    if avg_speed != 0:
        avg_degree      = CONT.convert_to_degree(float(distance) / float(avg_speed))
    else:
        avg_degree = 0
    return HttpResponse(json.dumps({'avg_degree': avg_degree}), "application/json")


def horsespeed(request):
    horsecode           = request.GET.get("horsecode")
    courtcode           = request.GET.get("courtcode")
    distance            = request.GET.get("distance")
    horse_power_list    = CONT.get_horse_power(horsecode)
    prize_avg_speed     = CONT.get_horse_prize_avg_speed(horse_power_list, courtcode)
    if prize_avg_speed != 0:
        prize_avg_degree    = CONT.convert_to_degree(float(distance) / float(prize_avg_speed))
    else:
        prize_avg_degree = 0
    return HttpResponse(json.dumps({'prize_avg_degree': prize_avg_degree}), "application/json")


def gallop(request):
    horsename   = request.GET.get("horsename")
    kgs         = request.GET.get("kgs")
    gallop_avg  = CONT.get_gallop_info(horsename, kgs)
    return HttpResponse(json.dumps({'gallop_avg_degree': gallop_avg}), "application/json")

def last800(request):
    horsecode           = request.GET.get("horsecode")
    courtcode           = request.GET.get("courtcode")
    distance            = request.GET.get("distance")
    last_avg_speed      = CONT.get_last_800(horsecode, courtcode)
    if last_avg_speed != 0:
        last_avg_degree    = CONT.convert_to_degree(float(distance) / float(last_avg_speed))
    else:
        last_avg_degree = 0
    return HttpResponse(json.dumps({'last_avg_degree': last_avg_degree}), "application/json")

def statsinfo(request):
    horsecode   = request.GET.get("horsecode")
    racecode    = request.GET.get("racecode")
    cityname    = request.GET.get("cityname")
    dateinfo    = request.GET.get("dateinfo")
    rivalsinfo  = CONT.get_rival_info(horsecode, racecode, cityname, dateinfo)
    siblinginfo = CONT.get_sibling_info(horsecode)
    results     = CONT.get_stats_info(horsecode)
    context = {
        'rivalsinfo'    : rivalsinfo,
        'siblinginfo'   : siblinginfo,
        'stats'         : results,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")

def yearprize(request):
    horsecode       = request.GET.get("horsecode")
    yearprize       = 0
    nextrecord      = ""
    nextrecordtype  = ""
    try:
        url         = 'https://www.tjk.org/TR/YarisSever/Query/ConnectedPage/AtKosuBilgileri?&QueryParameter_Kosmaz=on&Sort=&OldQueryParameter_AtId='+horsecode
        response    = requests.get(url)
        source      = BeautifulSoup(response.content, "lxml")
        #prizes      = source.find("div", {"class": "grid_10 alpha omega kunye"}).find("table").find("tbody").find_all("tr")
        #yearprize   = prizes[4].find_all("td")[7].text.split(" t")[0]
        records     = source.find("table", {"id": "queryTable"}).find("tbody").find_all("tr")
        for record in records:
            racedatestr = record.find_all("td")[0].text.strip()
            oldprize    = record.find_all("td")[17].text.strip()
            racedate    = datetime.strptime(racedatestr,'%d.%m.%Y')
            if(oldprize and racedate > datetime(2022, 7, 1)):
                yearprize += float(oldprize)
        
        firstrow    = records[0]
        columns     = firstrow.find_all("td")
        recordstr   = columns[0].text.strip()
        detailstr   = columns[8].text.strip()
        recordtype  = columns[13].text.strip()
        recorddate  = datetime.strptime(recordstr, '%d.%m.%Y')
        today       = datetime.today()
        
        if( abs((today - recorddate).days) > 0 and detailstr == "Kayıt"):
            nextrecord      = str(abs((today - recorddate).days))+" gün sonra "
            nextrecordtype  = recordtype
           
    except:
        pass
    context = {
        'yearprize'     : str(yearprize.__format__(".3f")),
        'nextrecord'    : nextrecord,
        'nextrecordtype': nextrecordtype,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")


def horsetype(request):
    horsecode   = request.GET.get("horsecode")
    url         = 'https://www.tjk.org/TR/YarisSever/Query/Pedigri/Pedigri?Atkodu='+horsecode
    response    = requests.get(url)
    source      = BeautifulSoup(response.content, "lxml")
    parents     = source.find_all("td", {"rowspan": "4"})
    father      = parents[0].text.strip()
    mother      = parents[1].text.strip()
    fathertype  = "a"
    mothertype  = "a"
    try:
        idx         = re.search("[a-v]", father).start()
        idx2        = re.search("[a-v]", mother).start()
        fathertype  = father[idx]
        mothertype  = mother[idx2]
    except:
        pass
    context = {
        'fathertype': fathertype,
        'mothertype': mothertype,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")

def jockeyrate(request):
    jockeycode  = request.GET.get("jockeycode")
    year        = datetime.now().strftime("%Y")
    jockeyrate  = CONT.find_jockey_rate(jockeycode, year)
    return HttpResponse(json.dumps({'jockeyrate': jockeyrate}), "application/json")

def racerule(request):
    raceid      = request.GET.get("raceid")
    racedate    = request.GET.get("racedate")
    cityinfo    = request.GET.get("cityinfo")
    citycode    = request.GET.get("citycode")
    rule_detail = CONT.find_rule_detail(raceid, racedate, cityinfo, citycode)
    return HttpResponse(json.dumps({'rule': rule_detail}), "application/json")

def singlerace(request):
    
    date_for_request    = datetime.now().strftime("%Y%m%d")
    cityname            = request.GET.get("cityname")
    racecode            = request.GET.get("racecode")
    url                 = '''https://ebayi.tjk.org/s/d/program/%s/full/%s.json''' %(date_for_request, cityname)
    program             = requests.get(url).json()
    racedetails         = program['kosular']
    horses              = []

    for race in racedetails:
        if racecode == race['KOD']:
            horses = race['atlar']
    
    return HttpResponse(json.dumps({'raceinfo': horses}), "application/json")



