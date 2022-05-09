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
from django.urls import path
from RaceSimulator import views

urlpatterns = [
    path('',            views.home,         name='home'),
    path('fixture/',    views.fixture,      name='fixture'),
    path('prgchange/',  views.prgchange,    name='prgchange'),
    path('singlerace/', views.singlerace,   name='singlerace'),
    path('horsepower/', views.horsepower,   name='horsepower'),
    path('horsespeed/', views.horsespeed,   name='horsespeed'),
    path('gallop/',     views.gallop,       name='gallop'),
    path('last800/',    views.last800,      name='last800'),
    path('statsinfo/',  views.statsinfo,    name='statsinfo'),
    path('racerule/',   views.racerule,     name='racerule'),
    path('yearprize/',  views.yearprize,    name='yearprize'),
    path('startrace/',  views.startrace,    name='startrace'),
    path('gamepage/',   views.gamepage,     name='gamepage'),
    path('horsetype/',  views.horsetype,    name='horsetype'),
]
