function main(args)

************************************************************
************************************************************
***     700mb Theta-E, windfield, 500mb GPM & MSLP       ***
************************************************************
************************************************************

* Argument parsing
******************
date = subwrd(args,1)
hour  = subwrd(args,2)

* Opendap connectionstring
**************************
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

* Map options & resolution
**************************
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

* Info from deiscriptorfile
***************************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

* Time information
******************
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

* iteratie
**********
maps = 82
i = 1

while ( i<82 )
'set t ' i
say 'timestamp 'i

* Colortable
************
say '.Colortable'
'color.gs 100 700 10 -gxout shaded -kind (255,255,255)->(184,184,184)->(107,107,107)->(154,154,83)->(202,202,59)->(246,246,37)->(220,171,103)->(193,95,169)->(166,30,230)->(130,79,235)->(91,132,241)->(52,185,246)->(17,234,251)'

* Titles & labels
*****************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Pressure at 2 PVU, 500mb GPM, 500mb Windbarbs & CAPE'

* Visualisation pressure @ 2PVU
*******************************
say '.Plotting pressure @ 2PVU shaded'
'd pres2pv/100'

say '.Plotting pressure @ 2PVU contours'
'set gxout contour'
'set rgb 250 0 0 0 100'
'set ccolor 250'
'set cstyle 3'
'set cint 100'
'set cmin 100'
'set clopts -1'
'set clab off'
'set cthick 2'
'd pres2pv/100'

* Visualisation CAPE
*******************
say '.Plotting CAPE contours'
'set gxout contour'
'set rgb 250 0 0 0 100'
'set ccolor 250'
'set cstyle 1'
'set cthick 7'
'set cint 200'
'set cmin 200'
'set clab masked'
'set clopts -1'
'd (capesfc+cape180_0mb+cape255_0mb)/3'

* visualisatie 500mb isotachs
*****************************
'define u500 = ugrdprs(lev=500)'
'define v500 = vgrdprs(lev=500)'
'define windspeed = sqrt(u500*u500 + v500*v500)*1.943844'

say '.Plotting 500mb windbarbs'
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

* Visualisation 500mb height contours
*************************************
say '.Plotting 500mb GPM contours'
'set gxout contour'
'set ccolor 1'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'

* Colorbar & annotations
************************
say '.Plotting colorbar & annotations'
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- mb, higher means increasing intensity of shortwaves ----->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Pres2PVU: Dashed contours each 100 mb, Higher is more conducive to upper level forcing downstream of max'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 Mean CAPE: Thick contours each increment by 200 J/kg, starting at 200 J/kg'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb Geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.25 500mb Windbarbs: Red windbarbs, starting at 50 kts'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'huh' - `4Valid: 'hub

* Saving
********
say '.Saving file'
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\pres2pvu_'i'_valid_'hub'_run_'huh'.png x1024 y768'
say '**'
say ' '

'clear'
'set grads off'

* Iteration progression
***********************
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
