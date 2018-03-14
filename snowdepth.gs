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
huh = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

************************************************
* 500mb Isotachs                               *
************************************************

* iteratie
**********
maps = 82

  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep ' i

* Colortable
************
'color.gs 0 150 1 -gxout shaded -kind (255,255,255)->(96,107,107)->(48,181,181)->(0,255,255)->(0,200,255)->(0,145,254)->(48,118,254)->(97,90,254)->(146,62,254)->(195,34,254)->(244,6,254)->(213,5,221)->(182,4,188)->(150,3,155)->(119,2,121)->(88,1,88)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Accumulated snowdepth (fixed ratio, cm), MSLP & 0degC Isotherm (2m)'


say '.Calculations'
* Declaration variables & calculations
**************************************
'define slp  = const((prmslmsl*0.01),0,-u)'
'define td = dpt2m-273.16'

* visualisatie sneeuwval
************************
'd weasdsfc'

say '..Snowdepth per 1mb'
* visualisatie MSLP
*******************
'set gxout contour'
'set rgb 250 255 255 255 150'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 10'
'set cmin 0'
'set clopts -1'
'set clab off'
'd weasdsfc'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 40'
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
'set rgb 250 0 0 0 90'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

say '..500mb Geopotential height'
* visualisatie 500mb height contours
************************************
*'set gxout contour'
*'set rgb 250 0 0 0 200'
*'set cthick 13'
*'set ccolor 250'
*'set cstyle 1'
*'set cint 50'
*'set clopts -1'
*'set clab masked'
*'set cthick 7'
*'d smth9(hgtprs(lev=500))'

* visualisatie 0° 2m isotherm
*****************************
'set rgb 200 0 0 255 100'
'set gxout contour'
'set csmooth on'
'set ccolor 200'
'set cstyle 3'
'set clopts -1'
'set clab masked'
'set cthick 7'
'set cmax 0'
'set cmin 0'
'set antialias on'
'd tmp2m-276.15'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'                                                                                               
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- cm, Higher means increasing accumulating snowdepth ----->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed black contours each 1mb, Thick contours each 4mb'
*'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick black contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 Snowdepth: Dashed white contours, each 5cm'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 0deg Isotherm: Dashed blue contour'
'set string 1 r 4 0' ; 'draw string 10.95 7.00 Ratio used: standard 1/10'


'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'huh' - `4Valid: 'hub


say '.Saving file'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snowdepth_eur_'i'_valid_'hub'_run_'huh'.png x1024 y768'


say '..Run, 'huh
say '..Valid, 'hub
say '***'
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
