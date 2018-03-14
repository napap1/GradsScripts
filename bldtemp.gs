function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

* gradsdap -l -c 'run bldtemp 20170214 00

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

**'set lon -32 30'
**'set lat 30 65'
**'set mpvals -2 19 47 59'

*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 45 70'

'set lon -40 40'
'set lat 25 80'
'set mpvals -5 30 46.5 61.5'

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
runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

***********************************************
* 850mb Theta-E                               *
***********************************************

* iteratie
**********
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs -55 30 0.5 -gxout shaded -kind (62,62,62)->(56,82,81)->(49,102,101)->(43,123,121)->(36,143,141)->(30,164,161)->(23,184,181)->(17,205,201)->(10,225,221)->(4,245,241)->(7,216,145)->(12,181,44)->(255,255,0)->(212,139,0)->(170,24,0)->(239,4,211)->(246,129,232)->(255,255,255)'


*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
*'set string 1 r 12 0' ; 'draw string 10.95 8.3 850mb Temperature, 850mb streamlines & 500mb Geopotential height'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 BL avg dewpoint temperature, 850mb Windvectors & 500mb GPM'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define u850 = ugrdprs(lev=850)'
'define v850 = vgrdprs(lev=850)'

'define t1000 = tmpprs(lev=1000)'
'define rh1000 = rhprs(lev=1000)'

'define t975 = tmpprs(lev=975)'
'define rh975 = rhprs(lev=975)'

'define t950 = tmpprs(lev=950)'
'define rh950 = rhprs(lev=950)'

'define t925 = tmpprs(lev=925)'
'define rh925 = rhprs(lev=925)'

'define t900 = tmpprs(lev=900)'
'define rh900 = rhprs(lev=900)'

'define t850 = tmpprs(lev=850)'
'define rh850 = rhprs(lev=850)'

'define tavg = (t1000 + t975 + t950 + t925 + t900 + t850)/6'
'define rhavg = (rh1000 + rh975 + rh950 + rh925 + rh900 + rh850)/6'

'define dewp = (tavg-273.15)-((14.55+0.114*(tavg-273.15))*(1-0.01*rhavg)+pow((2.5+0.007*(tavg-273.15))*(1-0.01*rhavg),3)+(15.9+0.117*(tavg-273.15))*pow((1-0.01*rhavg),14))'

*'define temp = tmpprs(lev=850)-273.16'

say '.Visualisations'
* visualisatie Theta-E 850mb
****************************
say '..850mb temperature'
'd dewp'

'set gxout contour'
'set rgb 250 0 0 0 50'
'set ccolor 250'
'set cstyle 1'
'set cint 1'
'set clopts -1'
'set clab off'
'set cthick 1'
'd dewp'

say '..850mb streamlines'
* visualisatie streamlines
**************************
'set rgb 250 0 0 0 45'
'set gxout vector'
'set digsiz 0.055'
'set ccolor 250'
'set cstyle 1'
'set cthick 7'
'd skip(u850,3.5,3.5);v850'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 255'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'

*'set gxout contour'
*'set rgb 250 0 0 0 100'
*'set cthick 3'
*'set ccolor 250'
*'set cstyle 1'
*'set cint 10'
*'set clopts -1'
*'set clab masked'
*'d hgtprs(lev=500)'


say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <------ Celsius, Higher means thicker & warmer airmass ------->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Average BL dewpoint temperature: Thin contours each 1 degree Celsius'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb Geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 850mb Wind: Vectorfield'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\bl_dtemp_eur_'i'.png x1024 y768'

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
