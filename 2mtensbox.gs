function main(args)

  date = subwrd(args,1)
  hour  = subwrd(args,2)

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gens/gens'date'/gep_all_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gens/gens'date'/gec00_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'

* Tijdsinstellingen
*******************
'set t 1 last'

* Diagramopmaak
***************
** origineel
* 'set parea 0.00 11.0 0.00 8.0'

'set parea 0.40 10.75 0.35 8.0'

*'set parea 0.5 10.5 1 8.0'

'set display color white'
'c'
'set cthick 1'
'set cmark 0'
'set ylint 1'
'set vrange -20 20'
*'set vrange -35 10'
'set csmooth on'
'set grads off'


*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.72 8.3 2m & 850mb Temperatures (20 members, EnsMean, Contr & Oper)'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.72 8.1 Dzengiz Tafa'

* Geolocatie Brussel
********************
'set lat 50.8503'
'set lon 4.3517'

*'set lat 47.48'
*'set lon 10.71'
'set csmooth on'

'set e 2'
'set ccolor 13'
'set cmark 0'
'define temp1 = tmp2m.1-273.15'
'd temp1'

'set e 3'
'set ccolor 13'
'set cmark 0'
'define temp2 = tmp2m.1-273.15'
'd temp2'

'set e 4'
'set ccolor 13'
'set cmark 0'
'define temp3 = tmp2m.1-273.15'
'd temp3'

'set e 5'
'set ccolor 13'
'set cmark 0'
'define temp4 = tmp2m.1-273.15'
'd temp4'

'set e 6'
'set ccolor 13'
'set cmark 0'
'define temp5 = tmp2m.1-273.15'
'd temp5'

'set e 7'
'set ccolor 13'
'set cmark 0'
'define temp6 = tmp2m.1-273.15'
'd temp6'

'set e 8'
'set ccolor 13'
'set cmark 0'
'define temp7 = tmp2m.1-273.15'
'd temp7'

'set e 9'
'set ccolor 13'
'set cmark 0'
'define temp8 = tmp2m.1-273.15'
'd temp8'

'set e 10'
'set ccolor 13'
'set cmark 0'
'define temp9 = tmp2m.1-273.15'
'd temp9'

'set e 11'
'set ccolor 13'
'set cmark 0'
'define temp10 = tmp2m.1-273.15'
'd temp10'

'set e 12'
'set ccolor 13'
'set cmark 0'
'define temp11 = tmp2m.1-273.15'
'd temp11'

'set e 13'
'set ccolor 13'
'set cmark 0'
'define temp12 = tmp2m.1-273.15'
'd temp12'

'set e 14'
'set ccolor 13'
'set cmark 0'
'define temp13 = tmp2m.1-273.15'
'd temp13'

'set e 15'
'set ccolor 13'
'set cmark 0'
'define temp14 = tmp2m.1-273.15'
'd temp14'

'set e 16'
'set ccolor 13'
'set cmark 0'
'define temp15 = tmp2m.1-273.15'
'd temp15'

'set e 17'
'set ccolor 13'
'set cmark 0'
'define temp16 = tmp2m.1-273.15'
'd temp16'

'set e 18'
'set ccolor 13'
'set cmark 0'
'define temp17 = tmp2m.1-273.15'
'd temp17'

'set e 19'
'set ccolor 13'
'set cmark 0'
'define temp18 = tmp2m.1-273.15'
'd temp18'

'set e 20'
'set ccolor 13'
'set cmark 0'
'define temp19 = tmp2m.1-273.15'
'd temp19'

'set e 21'
'set ccolor 13'
'set cmark 0'
'define temp20 = tmp2m.1-273.15'
'd temp20'

'define ensmean = (temp1 + temp2 + temp3 + temp4 + temp5 + temp6 + temp7 + temp8 + temp9 + temp10 + temp11 + temp12 + temp13 + temp14 + temp15 + temp16 + temp17 + temp18 + temp19 + temp20)/20'

'set ccolor 1'
'set cmark 0'
'set cstyle 1'
'set cthick 12'
'd ensmean'

'set e 1'
'set ccolor 4'
'set cmark 0'
'set cthick 12'
'set cstyle 1'
'd tmp2m.2-273.15'

'set ccolor 2'
'set cmark 0'
'set cstyle 1'
'set cthick 12'
'd tmp2m.3-273.15'

*'define ensmean = tloop(ave(tmpprs(lev=850).1,e=1,e=21))'

**
'set e 2'
'define temp1 = tmpprs.1(lev=850)-273.15'

'set e 3'
'define temp2 = tmpprs.1(lev=850)-273.15'

'set e 4'
'define temp3 = tmpprs.1(lev=850)-273.15'

'set e 5'
'define temp4 = tmpprs.1(lev=850)-273.15'

'set e 6'
'define temp5 = tmpprs.1(lev=850)-273.15'

'set e 7'
'define temp6 = tmpprs.1(lev=850)-273.15'

'set e 8'
'define temp7 = tmpprs.1(lev=850)-273.15'

'set e 9'
'define temp8 = tmpprs.1(lev=850)-273.15'

'set e 10'
'define temp9 = tmpprs.1(lev=850)-273.15'

'set e 11'
'define temp10 = tmpprs.1(lev=850)-273.15'

'set e 12'
'define temp11 = tmpprs.1(lev=850)-273.15'

'set e 13'
'define temp12 = tmpprs.1(lev=850)-273.15'

'set e 14'
'define temp13 = tmpprs.1(lev=850)-273.15'

'set e 15'
'define temp14 = tmpprs.1(lev=850)-273.15'

'set e 16'
'define temp15 = tmpprs.1(lev=850)-273.15'

'set e 17'
'define temp16 = tmpprs.1(lev=850)-273.15'

'set e 18'
'define temp17 = tmpprs.1(lev=850)-273.15'

'set e 19'
'define temp18 = tmpprs.1(lev=850)-273.15'

'set e 20'
'define temp19 = tmpprs.1(lev=850)-273.15'

'set e 21'
'define temp20 = tmpprs.1(lev=850)-273.15'

'define ensmean = (temp1 + temp2 + temp3 + temp4 + temp5 + temp6 + temp7 + temp8 + temp9 + temp10 + temp11 + temp12 + temp13 + temp14 + temp15 + temp16 + temp17 + temp18 + temp19 + temp20)/20'
**

'set ccolor 1'
'set cmark 0'
'set cstyle 3'
'set cthick 6'
'd ensmean'

'set e 1'
'set ccolor 4'
'set cmark 0'
'set cthick 6'
'set cstyle 3'
'd tmpprs.2(lev=850)-273.15'

'set ccolor 2'
'set cmark 0'
'set cstyle 3'
'set cthick 6'
'd tmpprs.3(lev=850)-273.15'




* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.72 7.85 Dashed contours = 850mb temperature'
'set string 1 r 4 0' ; 'draw string 10.72 7.65 Full contours = 2m temperature'
'set string 1 r 4 0' ; 'draw string 10.72 7.45 Black = Ensemble Mean'
'set string 1 r 4 0' ; 'draw string 10.72 7.25 Red = Operational'
'set string 1 r 4 0' ; 'draw string 10.72 7.05 Blue = Control'

'set string 1 r 4 0' ; 'draw string 10.72 6.65 Units = Celsius'

'set strsiz 0.10'
'set string 1 r 10 0' ; 'draw string 10.72 0.45 Run: 'date'-'hour'Z'
'set string 1 l 10 0' ; 'draw string 0.45 0.45 Data: Noaa GFS Ensemble model (1.0DEG)'
*'set string 1 l 10 0' ; 'draw string 0.45 0.65 Valid: 'hub

'set strsiz 0.10'
'set string 1 l 10 0' ; 'draw string 0.45 7.85 Location: Brussels (50.8503, 4.3517)'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\ens_2mtemp_Brussel.png x1280 y1024'

*'clear'

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* einde script
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function getctl(handle)
line = 1
found = 0
while (!found)
  info = sublin(_ctl,line)
  if (subwrd(info,1)=handle)
    _handle = info
    found = 1
  endif
  line = line + 1
endwhile
return _handle

return
