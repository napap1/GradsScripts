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
*'color.gs -30 30 1 -gxout shaded -kind (200,200,200)->(110,120,198)->(13,34,195)->(7,144,225)->(1,248,253)->(1,177,131)->(1,105,8)->(255,255,0)->(223,132,0)->(163,15,0)->(249,3,240)->(188,2,246)->(130,2,252)'

'set rgb 101 0 0 127' 
'set rgb 102 9 16 139'
'set rgb 103 19 32 152'
'set rgb 104 28 48 165'
'set rgb 105 38 64 178'
'set rgb 106 48 80 191'
'set rgb 107 57 96 203'
'set rgb 108 67 112 216'
'set rgb 109 76 128 229'
'set rgb 110 86 144 242'
'set rgb 111 96 160 255'
'set rgb 112 92 154 243'
'set rgb 113 87 147 230'
'set rgb 114 82 141 217'
'set rgb 115 77 134 204'
'set rgb 116 72 128 191'
'set rgb 117 67 121 179'
'set rgb 118 62 115 166'
'set rgb 119 57 108 153'
'set rgb 120 52 102 140'
'set rgb 121 47 95 127'
'set rgb 122 44 108 137'
'set rgb 123 40 121 147' 
'set rgb 124 36 134 157'
'set rgb 125 32 147 167'
'set rgb 126 28 160 177'
'set rgb 127 25 173 187'
'set rgb 128 21 186 197'
'set rgb 129 17 199 207'
'set rgb 130 13 212 217'
'set rgb 131 9 225 227'
'set rgb 132 0 255 0'
'set rgb 133 0 231 0'
'set rgb 134 0 206 0'
'set rgb 135 0 182 0'
'set rgb 136 0 157 0'
'set rgb 137 51 176 0'
'set rgb 138 102 196 0'
'set rgb 139 153 215 0'
'set rgb 140 204 235 0'
'set rgb 141 255 255 0'
'set rgb 142 247 232 0'
'set rgb 143 239 209 0'
'set rgb 144 231 186 0'
'set rgb 145 223 163 0'
'set rgb 146 215 140 0'
'set rgb 147 207 117 0'
'set rgb 148 199 94 0'
'set rgb 149 191 71 0'
'set rgb 150 183 48 0'
'set rgb 151 174 24 0'
'set rgb 152 187 20 51'
'set rgb 153 200 16 102'
'set rgb 154 213 12 153'
'set rgb 155 226 8 204'
'set rgb 156 240 4 244'
'set rgb 157 229 4 255'
'set rgb 158 217 3 255'
'set rgb 159 205 2 255'
'set rgb 160 194 2 255'
'set rgb 161 182 1 255'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 850mb temperature, 500mb Geopotential height & MSLP'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define t850 = tmpprs(lev=850)-273.15'
'define slp  = const((prmslmsl*0.01),0,-u)'

say '.Visualisations'
* visualisatie 850mb temperature
********************************
say '..850mb temperature'
'set clevs -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4    5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121  122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161'
'set gxout shaded'
'd t850'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 80'
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
'set rgb 250 0 0 0 150'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 255 255 255 255'
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
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- Celsius, higher means increasing 850mb temperatures ----->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG), run: 'huh

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\t850'i'.png x1024 y768'

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
