from django.db import models

class RaceInfo(models.Model):
    key     = models.CharField(max_length=200)
    raceid  = models.IntegerField();
    name    = models.CharField(max_length=200)
    location= models.CharField(max_length=200)
    day     = models.CharField(max_length=200)


class WeatherInfo(models.Model):
    location    = models.CharField(max_length=200)
    status      = models.CharField(max_length=200)
    temperature = models.CharField(max_length=200)
    humidity    = models.CharField(max_length=200)
    grassstatus = models.CharField(max_length=200)
    grassrate   = models.CharField(max_length=200)
    sandstatus  = models.CharField(max_length=200)
    sandrate    = models.CharField(max_length=200)
    
class HorseInfo(models.Model):
    racecode    = models.IntegerField();
    code        = models.IntegerField();
    key         = models.CharField(max_length=200)
    number      = models.IntegerField();
    name        = models.CharField(max_length=200)
    startno     = models.IntegerField();
    age         = models.CharField(max_length=200)
    weight      = models.IntegerField();
    weightex    = models.IntegerField();
    fathername  = models.CharField(max_length=200)
    mothername  = models.CharField(max_length=200)
    jockey      = models.CharField(max_length=200)
    owner       = models.CharField(max_length=200)
    trainer     = models.CharField(max_length=200)
    fathercode  = models.IntegerField();
    mothercode  = models.IntegerField();
    jockeycode  = models.IntegerField();
    ownercode   = models.IntegerField();
    trainercode = models.IntegerField();
    handycap    = models.IntegerField();
    kgs         = models.IntegerField();
    jerseyimg   = models.CharField(max_length=200)
    disabled    = models.BooleanField()
    apprantice  = models.BooleanField()
    stablemate  = models.CharField(max_length=200)
    bestdegree  = models.CharField(max_length=200)
    ganyan      = models.CharField(max_length=200)
    lastsix     = models.CharField(max_length=200)
    tool        = models.CharField(max_length=200)
    dpvalue     = models.CharField(max_length=200)
    divalue     = models.CharField(max_length=200)
    cdvalue     = models.CharField(max_length=200)
    result      = models.IntegerField(default=0);
    
class SingleRaceInfo(models.Model):
    no          = models.IntegerField();
    key         = models.CharField(max_length=200)
    date        = models.CharField(max_length=200)
    daterequest = models.CharField(max_length=200)
    time        = models.CharField(max_length=200)
    distance    = models.IntegerField();
    court       = models.CharField(max_length=200)
    courtcode   = models.CharField(max_length=200)
    courtbg     = models.CharField(max_length=200)
    racenumber  = models.IntegerField();
    group       = models.CharField(max_length=200)
    info        = models.CharField(max_length=200)
    summary     = models.CharField(max_length=200)
    betinfo     = models.CharField(max_length=200)
    
class AgfInfo(models.Model):
    racenumber  = models.IntegerField();
    horsenumber = models.IntegerField();
    horsename   = models.CharField(max_length=200)
    agforder    = models.IntegerField();
    agfrate     = models.FloatField()
    jockey      = models.CharField(max_length=200)
    
class HorsePowerInfo(models.Model):
    horsecode   = models.IntegerField();
    racedate    = models.CharField(max_length=200)
    racecity    = models.CharField(max_length=200)
    distance    = models.IntegerField();
    court       = models.CharField(max_length=200)
    courtrate   = models.CharField(max_length=200)
    rank        = models.CharField(max_length=200)
    degree      = models.CharField(max_length=200)
    weight      = models.CharField(max_length=200)
    tools       = models.CharField(max_length=200)
    jockey      = models.CharField(max_length=200)
    startno     = models.CharField(max_length=200)
    ganyan      = models.CharField(max_length=200)
    group       = models.CharField(max_length=200)
    raceinfo    = models.CharField(max_length=200)
    racetype    = models.CharField(max_length=200)
    trainer     = models.CharField(max_length=200)
    owner       = models.CharField(max_length=200)
    handycap    = models.IntegerField();
    prize       = models.IntegerField();
    
class RivalCompareInfo(models.Model):
    shorsename  = models.CharField(max_length=200)
    shorsecode  = models.CharField(max_length=200)
    thorsename  = models.CharField(max_length=200)
    thorsecode  = models.CharField(max_length=200)
    swin        = models.IntegerField();
    sloss       = models.IntegerField(); 
    
    