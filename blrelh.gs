function main(args)

**********************************************************
**********************************************************
**     700mb Theta-E, windfield, 500mb GPM & MSLP       **
**********************************************************
**********************************************************

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

'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'

*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 45 70'

'set lon -32 30'
'set lat 30 65'
'set mpvals 0 17 49 57'

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
runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

* iteratie
**********
'maps = 82'
i = 1

while ( i<82 )
'set t ' i

* Colortable
************
'color.gs 0 100 2 -gxout shaded -kind (255,255,255)->(230,230,230)->(205,205,205)->(179,179,179)->(154,154,154)->(129,129,129)->(103,103,103)->(78,78,78)->(53,127,53)->(28,176,28)->(3,225,3)'

* Titles & labels
*****************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 BL-moisture, 10m streamlines, 500mb GPM, mean CAPE & MSL pressure'

* Declaration variables & calculations
**************************************
'define relh1000 = rhprs(lev=1000)'
'define relh975 = rhprs(lev=975)'
'define relh950 = rhprs(lev=950)'
'define relh925 = rhprs(lev=925)'
'define relh900 = rhprs(lev=900)'
'define relh850 = rhprs(lev=850)'

'define relhavg = (relh1000 + relh975 + relh950 + relh925 + relh900 + relh850)/6'

* Visualisation RELH
********************
'd relhavg'
'set rgb 255 0 0 0 30'

'set gxout contour'
'set ccolor 255'
'set cstyle 3'
'set cint 10'
'set clopts -1'
'set clab off'
'set cthick 2'
'd relhavg'

* Visualisatie CAPE
*******************
'set gxout contour'
'set rgb 255 0 255 255 100'
'set cstyle 3'
'set ccolor 255'
'set clab masked'
'set clopts -1'
'set cint 250'
'set cmin 250'
'set cthick 5'
'd (capesfc+cape180_0mb+cape255_0mb)/3'

* Visualisation 10m streamlines
*******************************
'set rgb 255 255 255 255 25'

'set gxout stream'
'set ccolor 255'
'set cstyle 1'
'set cthick 5'
'set strmden 7'
'd ugrd10m;vgrd10m'

* Visualisation MSLP
********************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 255 0 0 0 125'
'set gxout contour'
'set ccolor 255'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set cthick 2'
'd slp'

'set gxout contour'
'set ccolor 255'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 5'
'd slp'

* Visualisation 500mb height contours
*************************************
'set rgb 250 255 255 255'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'

* Colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <------- %, higher means increasing deep BL-moisture ------->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 RELH: Dashed contours each 10%, >=70% is conducive to non-elevated convective initiation'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 CAPE: Dashed contours each 250 J/kg mean ml, mu & sbCAPE'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.25 500mb GPM: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Run: 'runvar' - `4Valid: 'validvar

* Saving
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\BLrelh'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

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
