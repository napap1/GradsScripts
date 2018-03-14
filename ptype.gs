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

** Western Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

** Alpen
'set lon 0 30'
'set lat 30 65'
'set mpvals 7 20 45 52'

** Full Europe
*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 45 70'
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
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Accumulated precipitation, Ptype, MSLP & 500mb Geopotential height (m)'

say '.Calculations'
* Declaration variables & calculations
**************************************

say '.Visualisations'
* visualisatie Theta-E 850mb
****************************
'set rgb 20 255 255 255 0'
'set rgb 21 220 220 255'
'set rgb 22 208 208 255'
'set rgb 23 184 184 255'
'set rgb 24 162 162 255'
'set rgb 25 138 138 255'
'set rgb 26 117 117 255'
'set rgb 27 92 92 255'
'set rgb 28 71 71 255'
'set rgb 29 46 46 255'
'set rgb 30 25 25 255'
'set rgb 31 0 0 255'
'set rgb 32 0 0 229'
'set rgb 33 0 0 205'
'set rgb 34 0 0 178'
'set rgb 35 0 0 155'
'set rgb 36 0 0 128'
'set rgb 37 0 0 105'
'set rgb 38 0 0 78'
'set rgb 39 0 0 54'
'set rgb 40 0 0 27'
'set rgb 41 0 0 0'

'set clevs 0  0.25 0.50 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5'
'set ccols 20 21   22   23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39  40  41'
'set gxout shaded'

if (i=2 | i=4 | i=6 | i=8 | i=10 | i=12 | i=14 | i=16 | i=18 | i=20 | i=22 | i=24 | i=26 | i=28 | i=30 | i=32 | i=34 | i=36 | i=38 | i=40 | i=42 | i=44 | i=46 | i=48 | i=50 | i=52 | i=54 | i=56 | i=58 | i=60 | i=62 | i=64 | i=68 | i=70 | i=72 | i=74 | i=76 | i=78 | i=80)
  'd acpcpsfc*crainsfc'
else
  'd ((acpcpsfc*crainsfc) - (apcpsfc(t-1)*crainsfc(t-1)))'
endif

'set rgb 50 255 255 255 0'
'set rgb 51 255 220 255'
'set rgb 52 253 208 255'
'set rgb 53 247 184 255'
'set rgb 54 242 163 255'
'set rgb 55 236 139 255'
'set rgb 56 230 118 255'
'set rgb 57 225 94 255'
'set rgb 58 219 73 255'
'set rgb 59 214 49 255'
'set rgb 60 208 28 255'
'set rgb 61 200 0 255'
'set rgb 62 180 0 229'
'set rgb 63 161 0 205'
'set rgb 64 140 0 178'
'set rgb 65 122 0 155'
'set rgb 66 101 0 128'
'set rgb 67 83 0 105'
'set rgb 68 62 0 78'
'set rgb 69 44 0 54'
'set rgb 70 23 0 27'
'set rgb 71 0 0 0'

'set clevs 0  0.25 0.50 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5'
'set ccols 50 51   52   53  54  55  56  57  58  59  60  61  62  63  64  65  66  67  68  69  70  71'
'set gxout shaded'


if (i=2 | i=4 | i=6 | i=8 | i=10 | i=12 | i=14 | i=16 | i=18 | i=20 | i=22 | i=24 | i=26 | i=28 | i=30 | i=32 | i=34 | i=36 | i=38 | i=40 | i=42 | i=44 | i=46 | i=48 | i=50 | i=52 | i=54 | i=56 | i=58 | i=60 | i=62 | i=64 | i=68 | i=70 | i=72 | i=74 | i=76 | i=78 | i=80)
  'd acpcpsfc*csnowsfc'
else
  'd ((acpcpsfc*csnowsfc) - (apcpsfc(t-1)*csnowsfc(t-1)))'
endif

'set rgb 80 255 255 255 0'
'set rgb 81 150 255 255'
'set rgb 82 154 250 252'
'set rgb 83 126 238 246'
'set rgb 84 111 228 241'
'set rgb 85 95 217 235'
'set rgb 86 81 207 230'
'set rgb 87 64 195 224'
'set rgb 88 50 185 219'
'set rgb 89 33 174 213'
'set rgb 90 19 163 207'
'set rgb 91 3 152 201'
'set rgb 92 3 136 180'
'set rgb 93 3 122 161'
'set rgb 94 3 106 140'
'set rgb 95 2 92 121'
'set rgb 96 2 75 100'
'set rgb 97 2 61 81'
'set rgb 98 1 45 59'
'set rgb 99 1 31 41'
'set rgb 100 1 15 27'
'set rgb 101 0 0 0'

'set clevs   0  0.25 0.50 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5'
'set ccols 80 81   82   83  84  85  86  87  88  89  90  91  92  93  94  95  96  97  98  99  100  101'
'set gxout shaded'

if (i=2 | i=4 | i=6 | i=8 | i=10 | i=12 | i=14 | i=16 | i=18 | i=20 | i=22 | i=24 | i=26 | i=28 | i=30 | i=32 | i=34 | i=36 | i=38 | i=40 | i=42 | i=44 | i=46 | i=48 | i=50 | i=52 | i=54 | i=56 | i=58 | i=60 | i=62 | i=64 | i=68 | i=70 | i=72 | i=74 | i=76 | i=78 | i=80)
  'd acpcpsfc*cfrzrsfc'
else
  'd ((acpcpsfc*cfrzrsfc) - (apcpsfc(t-1)*cfrzrsfc(t-1)))'
endif

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 100'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set cthick 1'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 250 0 0 0 200'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 1'
'd slp'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 255 0 0 200'
'set cthick 8'
'set ccolor 250'
'set cstyle 1'
'set cint 60'
'set clopts -1'
'set clab masked'
'set cthick 8'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 2.80 -direction v -levcol 20 1 21 0.25 22 0.5 23 1 24 1.5 25 2.0 26 2.5 27 3.0 28 3.5 29 4.0 30 4.5 31 5.0 32 5.5 33 6.0 34 6.5 35 7.0 36 7.5 37 8.0 38 8.5 39 9.0 40 9.5 41 -line on -fskip 5 -fwidth 0.10 -fheight 0.11'
'xcbar 0.28 0.53 2.90 5.35 -direction v -levcol 50 1 51 0.25 52 0.5 53 1 54 1.5 55 2.0 56 2.5 57 3.0 58 3.5 59 4.0 60 4.5 61 5.0 62 5.5 63 6.0 64 6.5 65 7.0 66 7.5 67 8.0 68 8.5 69 9.0 70 9.5 71 -line on -fskip 5 -fwidth 0.10 -fheight 0.11'
'xcbar 0.28 0.53 5.45 7.9 -direction v -levcol 80 1 81 0.25 82 0.5 83 1 84 1.5 85 2.0 86 2.5 87 3.0 88 3.5 89 4.0 90 4.5 91 5.0 92 5.5 93 6.0 94 6.5 95 7.0 96 7.5 97 8.0 98 8.5 99 9.0 100 9.5 101 -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- mm,  Freez rain -> <- mm,   Snowfall  -> <- mm,   Rainfall   ->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Accumulated precipitationfield: Alternating 3-6hr timestep'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Dashed contours each 1mb, Full contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Red contours each 60 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\ptype_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

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
