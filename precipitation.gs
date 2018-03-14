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

** Mitteleurope
*'set lon -10 10'
*'set lat 45 60'
*'set mpvals 2.5 8.5 50.5 53.5'

** Full europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

** Alpen
'set lon -5 30'
'set lat 30 65'
'set mpvals 6 21 45 52'

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
*'color.gs 0 150 1 -gxout shaded -kind (255,255,255)->(114,114,225)->(57,184,249)->(15,242,244)->(89,165,247)->(163,87,251)->(237,9,254)->(203,8,254)->(168,7,253)->(133,6,252)->(101,5,252)->(122,47,241)->(141,85,231)->(161,123,221)->(180,161,211)->(197,195,202)'

*'color.gs 0 150 1 -gxout shaded -kind (255,255,255)->(115,115,115)->(61,181,181)->(9,245,248)->(5,188,248)->(65,143,248)->(126,97,248)->(187,51,248)->(248,5,248)->(227,5,228)->(205,5,207)->(179,5,181)->(153,4,154)->(126,3,126)->(100,2,100)->(74,0,74)'

** nice one 'color.gs 0 25 0.2 -gxout shaded -kind (255,255,255)->(199,199,199)->(150,150,150)->(104,141,178)->(58,132,207)->(0,124,250)->(0,148,203)->(0,173,155)->(0,198,108)->(0,223,60)->(0,248,12)->(16,232,27)->(33,216,43)->(50,200,59)->(66,183,75)->(83,167,91)->(100,151,107)->(117,135,123)->(133,118,139)->(150,102,155)->(167,86,171)->(183,70,187)->(200,53,203)->(217,37,219)->(234,21,235)->(250,5,251)->(243,5,251)->(236,5,251)->(229,5,251)->(221,5,251)->(214,5,251)->(207,4,251)->(199,4,252)->(192,4,252)->(185,4,252)->(178,4,252)->(170,3,252)->(163,3,252)->(156,3,253)->(148,3,253)->(141,3,253)->(134,2,253)->(127,2,253)->(119,2,253)->(112,2,254)->(105,2,254)->(97,1,254)->(90,1,254)->(83,1,254)->(76,1,254)->(68,1,254)'

'color.gs 0 25 0.2 -gxout shaded -kind (255,255,255)->(178,178,178)->(100,100,100)->(66,153,153)->(35,201,201)->(0,255,255)->(25,206,255)->(50,156,255)->(79,100,255)->(104,50,255)->(130,0,255)->(138,18,237)->(146,34,221)->(155,52,203)->(163,68,187)->(172,87,168)->(180,103,152)->(188,119,136)->(197,137,118)->(205,153,102)->(214,172,83)->(222,188,67)->(230,204,51)->(239,222,33)->(247,238,17)->(255,255,0)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 3hr accumulated liquid precip when Ptype = Snow, MSLP & 500mb GPM'


say '.Calculations'
* Declaration variables & calculations
**************************************
'define slp  = const((prmslmsl*0.01),0,-u)'
'define td = dpt2m-273.16'

* visualisatie sneeuwval
************************
if (i=2 | i=4 | i=6 | i=8 | i=10 | i=12 | i=14 | i=16 | i=18 | i=20 | i=22 | i=24 | i=26 | i=28 | i=30 | i=32 | i=34 | i=36 | i=38 | i=40 | i=42 | i=44 | i=46 | i=48 | i=50 | i=52 | i=54 | i=56 | i=58 | i=60 | i=62 | i=64 | i=68 | i=70 | i=72 | i=74 | i=76 | i=78 | i=80)
  'd apcpsfc*smth9(csnowsfc)'
else
  'd (apcpsfc - apcpsfc(t-1))*smth9(csnowsfc)'
endif

say '..Rain per 5mm'
* visualisatie Snowdepth
************************
'set gxout contour'
'set rgb 250 255 255 255 120'
'set ccolor 250'
'set cint 5'
'set cmin 5'
'set clab masked'
'set clopts -1'
'set cthick 7'
'set cstyle 3'
if (i=2 | i=4 | i=6 | i=8 | i=10 | i=12 | i=14 | i=16 | i=18 | i=20 | i=22 | i=24 | i=26 | i=28 | i=30 | i=32 | i=34 | i=36 | i=38 | i=40 | i=42 | i=44 | i=46 | i=48 | i=50 | i=52 | i=54 | i=56 | i=58 | i=60 | i=62 | i=64 | i=68 | i=70 | i=72 | i=74 | i=76 | i=78 | i=80)
  'd apcpsfc*smth9(csnowsfc)'
else
  'd (apcpsfc- apcpsfc(t-1))*smth9(csnowsfc)'
endif


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
'set rgb 250 0 0 0 100'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd slp'

say '..500mb Geopotential height'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 225'
'set cthick 13'
'set ccolor 250'
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
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'                                                                                               
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- mm, Higher means increasing precipitation intensity ----->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed black contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick black contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 Precip intensity: Dashed white contours, each 5cm'


'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'huh' - `4Valid: 'hub


say '.Saving file'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snowprecipintensity_eur_'i'_valid_'hub'_run_'huh'.png x1024 y768'


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
