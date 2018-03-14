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

'set t 3'

* Colortable
************

* test1
*******
'set rgb 200 60 60 60'

*Categorical Rain
'set rgb 16 60 60 60'
'set rgb 17 56 65 56'
'set rgb 18 51 71 51'
'set rgb 19 47 77 47'
'set rgb 20 42 83 42'
'set rgb 21 37 89 37'
'set rgb 22 33 95 33'
'set rgb 23 29 117 29'
'set rgb 24 25 140 25'
'set rgb 25 21 163 21'
'set rgb 26 17 186 17'
'set rgb 27 13 209 13'
'set rgb 28 9 232 9'

*Categorical freezing rain
'set rgb 29 255 172 172'
'set rgb 30 255 156 156'
'set rgb 31 253 140 140'
'set rgb 32 255 124 124'
'set rgb 33 255 108 108'
'set rgb 34 255 96 96'
'set rgb 35 255 80 80'
'set rgb 36 255 64 56'
'set rgb 37 240 32 128'
'set rgb 38 240 16 255'
'set rgb 39 240 0 255'

*Categorical Ice Pellets / Mix
'set rgb 39 255 200 0'
'set rgb 40 255 180 0'
'set rgb 41 255 160 0'
'set rgb 42 255 140 0'
'set rgb 43 255 124 0'
'set rgb 44 255 108 0'
'set rgb 45 255 96 0'
'set rgb 46 255 80 0'
'set rgb 47 255 64 0'
'set rgb 48 255 32 0'
'set rgb 49 255 16 0'

*Categorical snow
'set rgb 50 4 233 231'
'set rgb 51 0 173 255'
'set rgb 52 0 148 255'
'set rgb 53 0 123 255'
'set rgb 54 0 104 255'
'set rgb 55 0 85 255'
'set rgb 56 4 67 245'
'set rgb 57 0 38 255'
'set rgb 58 0 14 255'
'set rgb 59 0 0 255'
'set rgb 60 0 0 223'
'set rgb 61 255 255 255'

'set gxout shaded'
'set rgb 100 185 185 185'

'color.gs 0 50 0.25 -gxout shaded -kind (255,255,255)->(0,255,0)->(1,246,1)->(2,237,2)->(3,228,3)->(4,219,4)->(5,210,5)->(6,200,6)->(7,191,7)->(8,182,8)->(9,173,9)->(10,159,10)->(9,154,9)->(9,150,9)->(8,145,8)->(7,141,7)->(7,136,7)->(6,132,6)->(5,127,5)->(5,122,5)->(4,118,4)->(4,113,4)->(3,109,3)->(2,104,2)->(2,100,2)->(1,95,1)->(11,101,1)->(21,107,1)->(31,114,1)->(41,120,1)->(51,127,1)->(61,133,1)->(72,139,1)->(82,146,1)->(92,152,1)->(102,159,1)->(112,165,1)->(122,171,1)->(133,178,2)->(143,184,2)->(153,191,2)->(163,197,2)->(173,203,2)->(183,210,2)->(194,216,2)->(204,223,2)->(214,229,2)->(224,235,2)->(234,242,2)->(244,248,2)->(255,255,0)'
'd (apcpsfc*smth9(crainsfc))'
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain.png x1024 y768'

*Categorical freezing rain
'set rgb 16 60 60 60'
'set rgb 17 56 75 73'
'set rgb 18 51 90 87'
'set rgb 19 47 105 101'
'set rgb 20 42 120 115'
'set rgb 21 37 135 129'
'set rgb 22 33 150 143'
'set rgb 23 28 165 156'
'set rgb 24 24 180 170'
'set rgb 25 19 195 184'
'set rgb 26 14 210 198'
'set rgb 27 10 225 212'
'set rgb 28 5 240 226'

'set clevs 0  0.01 0.05 0.1 0.5 1.0 2.5 5  10 20 30 40'
'set ccols 0 17   18  19  20  21   22  23 24 25 26 27 28'

'd (apcpsfc*smth9(cfrzrsfc))'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\frz_rain.png x1024 y768'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain_frzrain.png png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain.png -t 1'



'set clevs 0 0.01 0.05 0.1 0.5 1.0 2.5 5  10 20 30 40'
'set ccols 200 50   51   52  53  54  55  56 57 58 59 60 61'

'd (apcpsfc*smth9(csnowsfc))'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow.png x1024 y768'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\fullprectype.png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain_frzrain.png -t 200'



*'clear'
*'set grads off'

*'set rgb 100 25 200 230'
*'set clevs 0.5 1'
*'set ccols 0 100'
*'color.gs 0 1 0.05 -gxout shaded -kind (255,255,255)->(25,200,230)'
*'d smth9(cfrzrsfc)'

*'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow_frzrain.png png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow.png -t 1'

*'set rgb 100 56 138 220'

*'set clevs 0.5 1'
*'set ccols 0 100'
*'color.gs 0 1 0.05 -gxout shaded -kind (255,255,255)->(25,200,230)'
*'d smth9(crainsfc)'

*'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow_frzrain_rain.png png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow_frzrain.png -t 1'


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
