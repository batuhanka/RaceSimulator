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


citycodemap = {1:'Adana', 2:'İzmir', 3:'İstanbul', 4:'Bursa', 5:'Ankara', 6:'Şanlıurfa', 7:'Elazığ', 8:'Diyarbakır', 9:'Kocaeli', 10:'Antalya'}

def get_key(val):
    for key, value in citycodemap.items():
        if val == value:
            return key
    return "key doesn't exist"

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
    agfdetails          = program['agf']
    weather_info        = CONT.get_weather_info(weatherdetails)
    all_races           = CONT.get_all_races(racedetails)
    all_horses          = CONT.get_all_horses(racedetails)
    all_agf_rates       = CONT.get_all_agf_rates(agfdetails)
    
    try:
        resultsurl          = '''https://ebayi.tjk.org/s/d/sonuclar/%s/full/%s.json''' %(date_for_request, cityname)
        results             = requests.get(resultsurl).json()
        resultdetails       = results['kosular']
        for result in resultdetails:
            horseorders = result['atlar']
            for horse in horseorders:
                for item in all_horses:
                    if(item.code == horse['KOD']):
                        if(horse['KOSMAZ'] == True):
                            item.result = 1000
                        else:
                            item.result = horse['SONUC']
    except:
        pass
    
    if date_for_request == now.strftime("%Y%m%d"):
        currenttime     = now.strftime("%H:%M")
        nextracetime    = (now + timedelta(minutes=30)).strftime("%H:%M")
    else:
        currenttime     = prgdate.strftime("%H:%M")
        nextracetime    = (prgdate + timedelta(minutes=30)).strftime("%H:%M")
    
    return render(request, "racedetails.html", {'currenttime': currenttime, 'nextracetime': nextracetime, 'weather': weather_info, 'cityname': cityname, 'racedetails' : all_races, 'agfdetails' : all_agf_rates, 'allhorses' : all_horses })

def horsepower(request):
    horsecode           = request.GET.get("horsecode")
    courtcode           = request.GET.get("courtcode")
    distance            = request.GET.get("distance")
    weight              = request.GET.get("weight")
    horse_power_list    = CONT.get_horse_power(horsecode)
    avg_speed           = CONT.get_horse_avg_speed(horse_power_list, courtcode)
    #avg_speed           = avg_speed / float(weight)
    if avg_speed != 0:
        avg_degree      = CONT.convert_to_degree(float(distance) / float(avg_speed))
    else:
        avg_degree = 0
    return HttpResponse(json.dumps({'avg_degree': avg_degree}), "application/json")


def horsespeed(request):
    horsecode           = request.GET.get("horsecode")
    courtcode           = request.GET.get("courtcode")
    distance            = request.GET.get("distance")
    weight              = request.GET.get("weight")
    horse_power_list    = CONT.get_horse_power(horsecode)
    prize_avg_speed     = CONT.get_horse_prize_avg_speed(horse_power_list, courtcode)
    #prize_avg_speed     = prize_avg_speed / float(weight)
    if prize_avg_speed != 0:
        prize_avg_degree    = CONT.convert_to_degree(float(distance) / float(prize_avg_speed))
    else:
        prize_avg_degree = 0
    return HttpResponse(json.dumps({'prize_avg_degree': prize_avg_degree}), "application/json")


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
    results     = CONT.get_stats_info(horsecode)
    context = {
        'rivalsinfo': rivalsinfo,
        'stats'     : results,
    }
    data = json.dumps(context, indent=4, sort_keys=True, default=str)
    return HttpResponse(data, "application/json")

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

def startrace(request):
    #return render(request, "trial2.html")
    return render(request, "trial.html")

def gamepage(request):
    date_for_request    = datetime.now().strftime("%Y%m%d")
    cityname            = request.GET.get("cityname")
    racecode            = request.GET.get("racecode")
    url                 = '''https://ebayi.tjk.org/s/d/program/%s/full/%s.json''' %(date_for_request, cityname)
    program             = requests.get(url).json()
    racedetails         = program['kosular']

    for race in racedetails:
        if racecode == race['KOD']:
            horses = race['atlar']
            
    result = CONT.get_all_horses_single_race(horses, racecode)
    return render(request, "trial.html", {'horses': result})


