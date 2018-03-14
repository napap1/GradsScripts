function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p50/gfs'date'/gfs_0p50_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

** Western Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

** Full Europe
'set lon -60 55'
'set lat 25 80'
'set mpvals -10 35 45 70'
**'set mpvals -10 35 40 65'
**'set mpvals -25 10 40 60'

** SW Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -4 17 45 57'

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
maps = 37
  i = 36
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs 0 10 0.1 -gxout shaded -kind (255,255,255)->(100,100,100)->(0,202,0)->(85,219,0)->(170,237,0)->(255,255,0)->(233,205,0)->(210,154,0)->(187,103,0)->(164,52,0)->(140,0,0)->(168,0,63)->(197,0,127)->(226,0,191)->(255,0,255)->(230,0,255)->(204,0,255)->(178,0,255)->(152,0,255)->(126,0,255)->(100,0,255)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 925-850mb Relative vorticity & 500mb Geopotential height & MSLP'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define u925 = ugrdprs(lev=925)'
'define u900 = ugrdprs(lev=900)'
'define u850 = ugrdprs(lev=850)'

'define v925 = vgrdprs(lev=925)'
'define v900 = vgrdprs(lev=900)'
'define v850 = vgrdprs(lev=850)'

'define umean = ((u925 + u900 + u850)/3)'
'define vmean = ((v925 + v900 + v850)/3)'

say '.Visualisations'
say '..925-850mb relative vorticity'
* visualisatie 925-850mb relative vorticity contours
****************************************************
say '...Colorfield'
'd hcurl(umean,vmean)*10000'

say '...Contours'
'set gxout contour'
'set rgb 250 0 0 0 100'
'set cthick 1'
'set ccolor 250'
'set cstyle 1'
'set cmin 0.5'
'set cint 0.5'
'set clopts -1'
'set clab masked'
*'set cthick 12'
'd hcurl(umean,vmean)*10000'

*say '..MSLP per 1mb'
* visualisatie MSLP
*******************
*'define slp  = const((prmslmsl*0.01),0,-u)'
*'set rgb 250 255 255 255 100'
*'set gxout contour'
*'set ccolor 250'
*'set cstyle 3'
*'set cint 1'
*'set clopts -1'
*'set clab off'
*'set cthick 4'
*'d slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 60'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 4'
'd slp'

*say '..Windfield at 2PVU contours'
*'set rgb 250 255 255 255 80'
*'set gxout barb'
*'set ccolor 250'
*'set digsiz 0.04'
*'d skip(u2pv,5,5);v2pv'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 120'
'set cthick 8'
'set ccolor 250'
'set cstyle 1'
'set cint 60'
'set clopts -1'
'set clab masked'
'set cthick 10'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <---- Celsius, Higher means warmer and more humid airmass ---->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 925-850mb Relative vorticity: Thin black contours each 0.5*10E-5/s'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick black contours each 60 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 MSLP: Black contours each 4mb'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.5DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\LLvort_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

say '**'
say ''

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
