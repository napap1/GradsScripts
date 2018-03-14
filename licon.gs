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
'set mpvals -2 19 46 58'

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
'color.gs -15 0 0.2 -gxout shaded -kind (0,0,0)->(52,0,52)->(103,0,103)->(154,0,154)->(205,0,205)->(255,0,255)->(202,0,127)->(150,0,0)->(185,85,0)->(220,170,0)->(255,255,0)->(0,130,0)->(0,193,0)->(0,255,0)->(100,100,100)->(255,255,255)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 LI, 10-100m Streamlines, 500mb GPM & Shearbarbs (DLS >40kts)'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define u10m = ugrd10m * 1.943844'
'define v10m = vgrd10m * 1.943844'

'define u1000 = ugrdprs(lev=1000)*1.943844'
'define v1000 = vgrdprs(lev=1000)*1.943844'
'define u450 = ugrdprs(lev=450)*1.943844'
'define v450 = vgrdprs(lev=450)*1.943844'
'define ushear = u450 - u1000'
'define vshear = v450 - v1000'

'define shear = sqrt(ushear * ushear + vshear * vshear)'

say '.Visualisations'
* visualisatie Lifted index
***************************
say '..Lifted index'

'd (lftxsfc+no4lftxsfc)/2'

'set rgb 200 0 0 0 100'
'set gxout contour'
'set cstyle 1'
'set ccolor 200'
'set cint 1'
'set cmax 0'
'set cthick 6'
'set clab masked'
'd (lftxsfc+no4lftxsfc)/2'

say '10 - 100m streamlines'
'set rgb 200 0 0 0 15'
'set gxout stream'
'set strmden 7'
'set ccolor 200'
'd u10m;v10m'

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

say '..500mb windbarbs'
* visualisatie 500mb isotachs
*****************************
'set gxout barb'
'set rgb 250 0 0 0 125'
'set cthick 1'
'set ccolor 250'
'set cstyle 1'
'set cint 10'
'set cmin 50'
'set clopts -1'
'set clab masked'
*'d skip((u500*1.943844),5,5);(v500*1.943844)'
'set digsiz 0.033'
'set strsiz 0.033'
'set cthick 5'
'd skip(maskout((ushear),shear-40),3,3); vshear'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- Neg Celsius, lower means more favorable for & severe TSTMS -->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Deep layer shearbarbs: Black windbarbs in kts, starting at 40kts, 0-6km'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb Geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 Lifted index: Black contours, each 1deg'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Chase2be - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\LIsfc_meur_'i'_valid_'validvar'_run_'runvar'.png x1280 y1024'

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
