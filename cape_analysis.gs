function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

'open 2009062500.ctl'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
'set lon -32 30'
'set lat 30 65'

*'set mpvals -2 19 47 59'
'set mpvals -2 19 43 54'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* Colortable
************
'color.gs 0 6000 50 -gxout shaded -kind (255,255,255)->(0,150,0)->(255,255,0)->(192,132,0)->(129,8,0)->(188,5,120)->(251,1,247)->(221,11,218)->(191,21,188)->(162,31,160)->(131,42,131)->(101,52,101)->(72,72,72)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 CAPE, SFC-100m layer windfield, 500mb GPM(m) & Lifted Index'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define cape1 = capesfc'
'define cape2 = cape180_0mb'
'define cape3 = cape255_0mb'
'define meancape = (capesfc + cape180_0mb + cape255_0mb)/3'

'define u10m = ugrd10m * 1.943844'
'define v10m = vgrd10m * 1.943844'
'define u100m = ugrd100m * 1.943844'
'define v100m = vgrd100m * 1.943844'

'define umean = (u10m + u100m) / 2'
'define vmean = (v10m + v100m) / 2'

say '.Visualisations'
* visualisatie CAPE
*******************
say '..mean CAPE'

'd meancape'

* visualisatie streamlines
**************************
say '..10-100m streamlines'
'set rgb 200 150 150 150 100'
'set gxout stream'
'set strmden 7'
'set ccolor 200'
'd umean;vmean'

* Visualiatie Lifted index
**************************
say '..Lifted index'
'set gxout contour'
'set rgb 200 255 255 255 160'
'set cmax 0'
'set cint 1'
'set cstyle 3'
'set ccolor 200'
'set cthick 2'
'set clab masked'
'set clopts -1'
'set csmooth on'
'd lftxsfc'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set cthick 13'
'set ccolor 11'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- J/kg, Higher means more favorable for (& severity of) TSTMS -->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 500mb geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 Lifted index: Dashed white contours each 1deg'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG), Analysis'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: Analysis - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\CAPE_eur_valid_'validvar'_run_analysis.png x1024 y768'

'clear'
'set grads off'

say '**'
say ''
*'quit'

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
