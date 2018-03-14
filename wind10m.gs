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

'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'

*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 45 70'

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
maps = 81
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs 0 65 1 -gxout shaded -kind (255,255,255)->(222,222,222)->(181,181,181)->(141,141,141)->(100,100,100)->(0,200,0)->(255,255,0)->(239,180,0)->(220,90,0)->(200,0,0)->(255,0,255)->(219,0,255)->(182,0,255)->(150,0,255)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 10m Sustained wind, 500mb GPM & MSLP'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define u10m = ugrd10m * 1.943844'
'define v10m = vgrd10m * 1.943844'

'define wspeed = sqrt(u10m * u10m + v10m * v10m)'

'define slp  = const((prmslmsl*0.01),0,-u)'

say '.Visualisations'
* visualisatie Gusts
********************
say '..Windgusts'

'd wspeed'

'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 1'

'set cmin 22'
'set cmax 22'
'set clab forced'
'set clab masked'
'set clab 6'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 3'

'set cmin 28'
'set cmax 28'
'set clab forced'
'set clab masked'
'set clab 7'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 5'

'set cmin 34'
'set cmax 34'
'set clab forced'
'set clab masked'
'set clab 8'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 7'

'set cmin 41'
'set cmax 41'
'set clab forced'
'set clab masked'
'set clab 9'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 9'

'set cmin 48'
'set cmax 48'
'set clab forced'
'set clab masked'
'set clab 10'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 11'

'set cmin 56'
'set cmax 56'
'set clab forced'
'set clab masked'
'set clab 11'
'set clopts -1'
'd wspeed'
*
'set rgb 250 255 255 255 160'
'set gxout contour'
'set cint 1'
'set cstyle 3'
'set ccolor 250'
'set cthick 13'

'set cmin 64'
'set cmax 64'
'set clab forced'
'set clab masked'
'set clab 12'
'set clopts -1'
'd wspeed'
*
'set clab off'

* visualisatie vectors
**********************
say '..10-100m vectors'
'set rgb 250 0 0 0 40'
'set gxout vector'
'set ccolor 250'
'd skip(u10m,2,2);v10m'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 50'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 1'
*'set clopts -1'
*'set clab off'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 75'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
*'set clopts -1'
*'set clab masked'
'set cthick 6'
'd slp'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set cthick 13'
'set ccolor 11'
'set cstyle 1'
'set cint 50'
*'set clopts -1'
*'set clab masked'
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
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- kts, Higher means increasing intensity of max sustained wind -->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Sustained windspeeds: White contours with thickness increasing each 1bft, starting at 6bft'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Thin black contours each 1mb, thick black contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb Geopotential height: Thick cyan contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\wind10m_meur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

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
