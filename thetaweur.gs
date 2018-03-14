function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

'set lon -60 55'
'set lat 25 80'
'set mpvals -10 35 45 70'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

*******************************************************************
********************** Tijdsinformatie ****************************
tsize = subwrd(_tdef,2)
_t1 = 1       ;
_t2 = 45
tsize = _t2 - _t1 + 1
'set t '_t1' '_t2
'q dims'
times  = sublin(result,5)
_time1 = subwrd(times,6)  
_time2 = subwrd(times,8)
_tdim = _time1' '_time2
tincr = subwrd(_tdef,5)
_tdef = 'tdef 'tsize' linear '_time1' 'tincr
huh = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* iteratie
**********
'maps = 82'
  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs -15 35 1 -gxout contour -kind (150,150,150)->(129,129,170)->(104,104,194)->(79,79,218)->(56,66,230)->(44,114,176)->(29,171,113)->(14,228,50)->(9,189,29)->(4,156,11)->(255,255,0)->(231,192,0)->(206,128,0)->(184,73,0)->(159,10,0)->(203,6,119)->(242,2,221)->(200,2,194)->(161,2,160)->(202,118,207)->(238,219,147)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Theta-W, 500mb Geopotential height (m) & MSLP'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define t = tmpprs(lev=850)'
'define rh = rhprs(lev=850)'
'define dewp850mb = (t-273.15)-((14.55+0.114*(t-273.15))*(1-0.01*rh)+pow((2.5+0.007*(t-273.15))*(1-0.01*rh),3)+(15.9+0.117*(t-273.15))*pow((1-0.01*rh),14))'
'define vapr850mb = 6.112*exp((17.67*dewp850mb)/(dewp850mb+243.5))'
'define e850mb    = vapr850mb*1.001+(850-100)/900*0.0034'
'define w850mb    = 0.62197*(e850mb/(850-e850mb))'
'define te850mb   = (t+(2260000*w850mb/1004))'
'define ept850mb1  = (te850mb*pow((1000/850),(287/1004)))-273.16'

'wpt = (-6.2609512839 + 6.6480400261 * 0.1 * ept850mb1) -(5.1338815795 * 0.001 * pow(ept850mb1,2)) + (8.1910107184 * 0.000001 * pow(ept850mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept850mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept850mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept850mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept850mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept850mb1,8))'

say '.Visualisations'
* visualisatie Theta-E 850mb
****************************
say '..Theta-W'
'set csmooth on'
'set cint 1'
'd wpt'
'run cbarm'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 80'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 150'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 255 255 255 255'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
*'d smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <---- Celsius, Higher means warmer and more humid airmass ---->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG), run: 'huh

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\thetaW'i'.png x1024 y768'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


************************************************************* 
* END OF MAIN SCRIPT                                        *
************************************************************* 

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
