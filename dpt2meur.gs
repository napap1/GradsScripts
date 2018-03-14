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
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* iteratie
**********
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs -20 30 1 -gxout shaded -kind (50,50,50)->(95,95,95)->(140,140,140)->(185,185,185)->(245,245,245)->(0,155,0)->(255,255,0)->(220,133,0)->(180,0,0)->(255,100,255)->(150,0,255)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Dewpoint temperature 2m & Mean sea layer pressure'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define dewpoint = dpt2m-273.15'
'define slp  = const((prmslmsl*0.01),0,-u)'

say '.Visualisations'
* visualisatie Theta-E 850mb
****************************
say '..Dewpoint 2m'
'set csmooth on'
'set cint 1'
'd dewpoint'

* visualisatie 2m isotherms
***************************
say '..Temperature 2m contours'
say '...per 1 deg'
'set rgb 200 0 0 0 100'
'set gxout contour'
'set csmooth on'
'set ccolor 200'
'set cstyle 3'
'set cint 5'
'set clopts -1'
'set clab off'
'set cthick 1'
'set antialias on'
'd dewpoint'

* visualisatie 2m isotherms
***************************
say '...0deg isotherm'
'set gxout contour'
'set csmooth on'
'set ccolor 1'
'set cstyle 1'
'set cint 5'
'set clopts -1'
'set clab masked'
'set cthick 6'
'set cmax 0'
'set cmin 0'
'set antialias on'
'd dewpoint'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 40'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set csmooth on'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 90'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'set csmooth on'
'd slp'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- Celsius, Higher means increasing moisture content ----->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Dewpoint temperature: Dashed contours each 5deg, Thick contour 0deg'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Dashed contours each 1mb, Thick contours each 4mb'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\dpt2m'i'.png x1024 y768'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

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
