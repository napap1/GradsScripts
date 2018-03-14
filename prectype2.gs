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

'clear'

'set rgb 100 255 255 255'
'set rgb 101 250 255 255'
'set rgb 102 200 255 255'
'set rgb 103 150 255 255'
'set rgb 104 100 255 255'
'set rgb 105 50 255 255'
'set rgb 106 0 255 255'
'set rgb 107 0 245 245'
'set rgb 108 0 234 234'
'set rgb 109 0 224 224'
'set rgb 110 0 213 213'
'set rgb 111 0 203 203'
'set rgb 112 0 192 192'
'set rgb 113 0 182 182'
'set rgb 114 0 171 171'
'set rgb 115 0 161 161'
'set rgb 116 0 156 156'
'set rgb 117 0 151 151'
'set rgb 118 0 145 145'
'set rgb 119 0 140 140'
'set rgb 120 0 135 135'
'set rgb 121 0 129 129'
'set rgb 122 0 124 124'
'set rgb 123 0 118 118'
'set rgb 124 0 113 113'
'set rgb 125 0 108 108'
'set rgb 126 0 102 102'
'set rgb 127 0 97 97'
'set rgb 128 0 92 92'
'set rgb 129 0 86 86'
'set rgb 130 0 81 81'
'set rgb 131 0 78 87'
'set rgb 132 0 75 94'
'set rgb 133 0 72 101'
'set rgb 134 0 69 108'
'set rgb 135 0 65 115'
'set rgb 136 0 62 122'
'set rgb 137 0 59 129'
'set rgb 138 0 56 136'
'set rgb 139 0 52 143'
'set rgb 140 0 49 150'
'set rgb 141 0 46 157'
'set rgb 142 0 43 164'
'set rgb 143 0 39 171'
'set rgb 144 0 36 178'
'set rgb 145 0 33 185'
'set rgb 146 18 47 192'
'set rgb 148 36 62 199'
'set rgb 149 54 77 206'
'set rgb 150 72 91 213'
'set rgb 151 90 106 220'
'set rgb 152 108 121 227'
'set rgb 153 126 135 234'
'set rgb 154 144 150 241'
'set rgb 155 162 165 248'
'set rgb 156 180 180 255'

'set gxout shaded'
'set clevs 0.00 0.005 0.01 0.025 0.50 0.75 1.0 2.0 3.0 4.0 5.0 6.0 7.0 8.0 9.0 10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28 29  30  31  32  33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48  49  50'
'set ccols 100  101  102  103   104  105  106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156'

'd (apcpsfc*smth9(csnowsfc))'

'set rgb 200 255 255 255'

*'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow.png x1024 y768'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\prectype.png png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain.png -t 100'



*'d (apcpsfc*smth9(csnowsfc))'

*'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snow.png x1024 y768'

*'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\fullprectype.png x1024 y768 -b C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\rain_frzrain.png -t 200'



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
