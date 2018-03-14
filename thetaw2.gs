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

*'set mpvals -2 19 47 59'
'set mpvals -2 19 43 54'

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
'maps = 82'
  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'set rgb 101 0 0 255' 
'set rgb 102 1 18 231'
'set rgb 103 2 36 207'
'set rgb 104 2 54 183'
'set rgb 105 3 72 159'
'set rgb 106 4 90 135'
'set rgb 107 5 107 111'
'set rgb 108 6 125 87'
'set rgb 109 6 143 63'
'set rgb 110 7 161 39'
'set rgb 111 8 179 15'
'set rgb 112 33 187 14'
'set rgb 113 51 192 12'
'set rgb 114 82 202 11'
'set rgb 115 107 209 9'
'set rgb 116 132 217 8'
'set rgb 117 156 225 6'
'set rgb 118 181 232 5'
'set rgb 119 206 240 3'
'set rgb 120 230 247 2'
'set rgb 121 255 255 0'
'set rgb 122 253 238 0'
'set rgb 123 251 221 0' 
'set rgb 124 249 204 0'
'set rgb 125 247 187 0'
'set rgb 126 245 170 0'
'set rgb 127 243 153 0'
'set rgb 128 241 136 0'
'set rgb 129 239 119 0'
'set rgb 130 238 107 0'
'set rgb 131 235 85 0'
'set rgb 132 228 68 0'
'set rgb 133 221 51 0'
'set rgb 134 214 34 0'
'set rgb 135 207 17 0'
'set rgb 136 202 5 0'
'set rgb 137 179 5 28'
'set rgb 138 159 4 52'
'set rgb 139 139 3 75'
'set rgb 140 119 2 99'
'set rgb 141 104 2 117'
'set rgb 142 110 1 141'
'set rgb 143 126 1 154'
'set rgb 144 142 1 166'
'set rgb 145 158 1 179'
'set rgb 146 174 1 192'
'set rgb 147 190 1 204'
'set rgb 148 206 1 217'
'set rgb 149 222 1 229'
'set rgb 150 238 1 242'
'set rgb 151 250 1 251'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Theta-W, 500mb Geopotential height (m) & MSLP'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define t = tmpprs(lev=850)'
'define rh = rhprs(lev=850)'
'define dewp850mb = (t-273.15)-((14.55+0.114*(t-273.15))*(1-0.01*rh)+pow((2.5+0.007*(t-273.15))*(1-0.01*rh),3)+(15.9+0.117*(t-273.15))*pow((1-0.01*rh),14))'
'define vapr850mb = 6.112*exp((17.67*dewp850mb)/(dewp850mb+243.5))'
'define e850mb    = vapr850mb*1.001+(850-100)/900*0.0034'
'define w850mb    = 0.62197*(e850mb/(850-e850mb))'
'define te850mb   = (t+(2260000*w850mb/1004))'
'define ept850mb1  = (te850mb*pow((1000/850),(287/1004)))-273.16'

'wpt = (-6.2609512839 + 6.6480400261 * 0.1 * ept850mb1) -(5.1338815795 * 0.001 * pow(ept850mb1,2)) + (8.1910107184 * 0.000001 * pow(ept850mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept850mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept850mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept850mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept850mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept850mb1,8))'

say '.Visualisations'
* visualisatie Theta-E 850mb
****************************
say '..Theta-W'
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs 0.0 0.5 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5 10.0 10.5 11.0 11.5 12.0 12.5 13.0 13.5 14.0 14.5 15.0 15.5 16.0 16.5 17.0 17.5 18.0 18.5 19.0 19.5 20.0 20.5 21.0 21.5 22.0 22.5 23.0 23.5 24.0 24.5'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121  122  123  124  125  126  127  128  129  130  131  132  133 134  135  136  137  138  139  140  141  142  143  144  145  146  147  148  149  150  151'
'd wpt'
'run cbarm'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
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
'define slp  = const((prmslmsl*0.01),0,-u)'
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
'set lwid 13 3.0'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- J/kg, Higher means thermodynamically more favorable for TSTMS ->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG), run: 'huh

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\thetaW'i'.png x1024 y768'

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
