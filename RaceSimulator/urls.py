"""RaceSimulator URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from RaceSimulator import views
from django.contrib import admin

urlpatterns = [
    path("admin/",          admin.site.urls),
    path('accounts/',       include('django.contrib.auth.urls')),
    path('',                views.home,         name='home'),
    path('login/',          views.login,        name='login'),
    path('registeruser/',   views.registeruser, name='registeruser'),
    path('fixture/',        views.fixture,      name='fixture'),
    path('prgchange/',      views.prgchange,    name='prgchange'),
    path('singlerace/',     views.singlerace,   name='singlerace'),
    path('horsepower/',     views.horsepower,   name='horsepower'),
    path('horsespeed/',     views.horsespeed,   name='horsespeed'),
    path('degreepredict/',  views.degreepredict,name='degreepredict'),
    path('horsehistory/',   views.horsehistory, name='horsehistory'),
    path('rivalstats/',     views.rivalstats,   name='rivalstats'),
    path('gallop/',         views.gallop,       name='gallop'),
    path('last800/',        views.last800,      name='last800'),
    path('statsinfo/',      views.statsinfo,    name='statsinfo'),
    path('racerule/',       views.racerule,     name='racerule'),
    path('yearprize/',      views.yearprize,    name='yearprize'),
    path('horsetype/',      views.horsetype,    name='horsetype'),
    path('jockeyrate/',     views.jockeyrate,   name='jockeyrate'),
]
