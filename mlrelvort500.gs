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
runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

***********************************************
* 850mb Theta-E                               *
***********************************************

* iteratie
**********
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs 0 60 0.5 -gxout shaded -kind (255,255,255)->(178,178,178)->(110,110,110)->(33,191,230)->(63,138,235)->(93,85,241)->(123,31,247)->(144,67,208)->(165,103,168)->(186,139,128)->(208,175,88)->(229,211,44)->(250,250,0)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 700 - 500mb Relative vorticity, 500mb GPM, windfield & windbarbs'
*'set string 1 r 12 0' ; 'draw string 10.95 8.3 500mb Relative vorticity, 500mb GPM, windfield & windbarbs'

say '.Calculations'
* Declaration variables & calculations
**************************************
say '..U-components'
'define u700 = ugrdprs(lev=700)'
'define u650 = ugrdprs(lev=650)'
'define u600 = ugrdprs(lev=600)'
'define u550 = ugrdprs(lev=550)'
'define u500 = ugrdprs(lev=500)'
say '..V-components'
'define v700 = vgrdprs(lev=700)'
'define v650 = vgrdprs(lev=650)'
'define v600 = vgrdprs(lev=600)'
'define v550 = vgrdprs(lev=550)'
'define v500 = vgrdprs(lev=500)'
say '..Windspeeds kts'
'define windspeed = sqrt(u500*u500 + v500*v500)*1.943844'
say '..U & V average 700 - 500mb'
'define uavg = (u700 + u650 + u600 + u550 + u500)/5'
'define vavg = (v700 + v650 + v600 + v550 + v500)/5'
say '..Relative vorticity'
'define relvort = hcurl(uavg,vavg)*100000'
*'define relvort = hcurl(u500,v500)*100000'

say '.Visualisations'
* visualisatie Relative vorticity
*********************************
say '..Relative vorticity'

'd relvort'

'set rgb 200 255 255 255 160'
'set gxout contour'
'set cstyle 3'
'set ccolor 200'
'set cint 5'
'set cmin 5'
'set clab off'
'd relvort'

* visualisatie streamlines
**************************
say '..500mb streamlines'
'set rgb 200 0 0 0 35'
'set gxout stream'
'set strmden 7'
'set ccolor 200'
'd u500;v500'

say '..500mb windbarbs'
* visualisatie 500mb isotachs
*****************************
'set gxout barb'
'set rgb 250 255 0 0 180'
'set cthick 1'
'set ccolor 250'
'set cstyle 1'
'set cint 10'
'set cmin 50'
'set clopts -1'
'set clab masked'
*'d skip((u500*1.943844),5,5);(v500*1.943844)'
'set digsiz 0.05'
'set cthick 5'
'd skip(maskout((u500*1.943844),windspeed-50),5,5); v500*1.943844'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set cthick 13'
'set ccolor 1'
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
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- 10E-5/sec, Higher means increasing relative vorticity ----->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Vorticity: Dashed white contours each 5E-5/sec, starting at 5E-5/sec'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb windbarbs: Red windbarbs in kts, starting at 50kts'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\mlvorticity_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

'clear'
'set grads off'

say '**'
say ''

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
