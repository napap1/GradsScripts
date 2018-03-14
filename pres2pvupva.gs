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
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Pressure at 2 PVU, 500-300mb PVA, 500mb Geopotential height & CAPE'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

* Declaration variables & calculations
**************************************
say '.Calculations'
say '..Positive vorticity advection'
say '...lev 300'
'set lev 300'
'dynamic.gs'
'pva1=vadv'

say '...lev 350'
'set lev 350'
'dynamic.gs'
'pva2=vadv'

say '...lev 400'
'set lev 400'
'dynamic.gs'
'pva3=vadv'

say '...lev 450'
'set lev 450'
'dynamic.gs'
'pva4=vadv'

say '...lev 500'
'set lev 500'
'dynamic.gs'
'pva5=vadv'

say '...Total layer PVA'
'define layer = (pva1+pva2+pva3+pva4+pva5)'

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
'set cint 250'
'set cmin 250'
'set clab masked'
'set clopts -1'
'd (capesfc+cape180_0mb+cape255_0mb)/3'

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

* Visualisation 500mb Isotachs
******************************
say '.Plotting 500-300mb PVA'
'set rgb 250 255 255 255 150'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cmin 4.0e-08'
'set cint 0.25e-07'
'set clopts -1'
'set clab masked'
'set cthick 5'
'd layer'



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
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500-300mb PVA: Thick contours each increment by 0.25e-07, starting at 4.0e-08'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 CAPE: Thick contours each increment by 250 J/kg, starting at 250 J/kg'
'set string 1 r 4 0' ; 'draw string 10.95 7.25 500mb GPM:: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (13km), run: 'huh

* Saving
********
say '.Saving file'
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\pres2pvu_pva_'i'.png x1024 y768'
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
