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
*'set mpvals -2 19 46 58'

'set lon -64 70'
'set lat 20 75'
'set mpvals -15 35 40 70'

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

'set t 1'

* Colortable
************
'set rgb 101 0 0 0' 
'set rgb 102 0 15 15'
'set rgb 103 0 30 30'
'set rgb 104 0 50 50'
'set rgb 105 0 66 66'
'set rgb 106 0 81 81'
'set rgb 107 0 101 101'
'set rgb 108 0 117 117'
'set rgb 109 0 132 132'
'set rgb 110 0 152 152'
'set rgb 111 0 168 168'
'set rgb 112 0 183 183'
'set rgb 113 0 203 203'
'set rgb 114 0 219 219'
'set rgb 115 0 234 234'
'set rgb 116 0 255 255'
'set rgb 117 5 239 245'
'set rgb 118 10 222 234'
'set rgb 119 17 200 220'
'set rgb 120 23 184 209'
'set rgb 121 28 167 199'
'set rgb 122 35 145 185'
'set rgb 123 41 129 174' 
'set rgb 124 46 112 163'
'set rgb 125 53 90 149'
'set rgb 126 59 74 138'
'set rgb 127 64 57 128'
'set rgb 128 69 40 109'
'set rgb 129 62 58 97'
'set rgb 130 54 75 85'
'set rgb 131 44 98 70'
'set rgb 132 36 115 58'
'set rgb 133 28 133 46'
'set rgb 134 30 154 34'
'set rgb 135 60 167 30'
'set rgb 136 89 180 25'
'set rgb 137 128 198 19'
'set rgb 138 157 211 15'
'set rgb 139 186 224 11'
'set rgb 140 225 241 5'
'set rgb 141 255 255 0'
'set rgb 142 246 232 0'
'set rgb 143 233 201 0'
'set rgb 144 224 178 0'
'set rgb 145 214 155 0'
'set rgb 146 201 124 0'
'set rgb 147 187 101 0'
'set rgb 148 173 78 0'
'set rgb 149 154 47 0'
'set rgb 150 140 24 0'
'set rgb 151 125 0 0'
'set rgb 152 143 29 29'
'set rgb 153 156 52 52'
'set rgb 154 170 74 74'
'set rgb 155 188 104 104'
'set rgb 156 202 127 127'
'set rgb 157 211 150 150'
'set rgb 158 224 180 180'
'set rgb 159 233 202 202'
'set rgb 160 242 225 225'
'set rgb 161 251 247 247'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 850mb dewpoint, 850mb & 700mb windbarbs & 500mb Geopotential height'

say '.Calculations'
* Declaration variables & calculations
**************************************
*'define u500 = ugrdprs(lev=500)'
*'define v500 = vgrdprs(lev=500)'
*'define windspeed = sqrt(u500*u500 + v500*v500)*1.943844'

'define t = tmpprs(lev=850)'
'define rh = rhprs(lev=850)'
'define dewp850mb = (t-273.15)-((14.55+0.114*(t-273.15))*(1-0.01*rh)+pow((2.5+0.007*(t-273.15))*(1-0.01*rh),3)+(15.9+0.117*(t-273.15))*pow((1-0.01*rh),14))'

'define u850 = ugrdprs(lev=850)*1.943844'
'define v850 = vgrdprs(lev=850)*1.943844'
'define u700 = ugrdprs(lev=700)*1.943844'
'define v700 = vgrdprs(lev=700)*1.943844'

'define w850 = sqrt(u850*u850 + v850*v850)'
'define w700 = sqrt(u700*u700 + v700*v700)'

say '.Visualisations'
* visualisatie Lifted index
***************************
say '..Lifted index'
'set gxout shaded'
'set clevs -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9  -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161'

*'d tmpprs(lev=850)-273.16'
'd dewp850mb'

'set rgb 200 0 0 0 40'
'set gxout contour'
'set cstyle 1'
'set ccolor 200'
'set cint 1'
'set cmax 0'
'set cthick 6'
'set clab off'
'd dewp850mb'

say '..850mb windbarbs'
* visualisatie 500mb isotachs
*****************************
'set gxout barb'
'set rgb 250 0 0 0 70'
'set cthick 1'
'set ccolor 250'
'set cstyle 1'
'set cint 10'
'set cmin 50'
'set clopts -1'
'set clab masked'
'set digsiz 0.033'
'set strsiz 0.033'
'set cthick 5'
*'d skip(maskout((u850),w850-20),3,3); v850'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set cthick 13'
'set ccolor 0'
'set cstyle 1'
'set cint 60'
'set clopts -1'
'set clab masked'
'set cthick 8'
'd smth9(hgtprs(lev=500))'

say '..850mb GPM'
* visualisatie 850mb height contours
************************************
'set gxout contour'
'set rgb 250 255 255 255 150'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 60'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd smth9(hgtprs(lev=850))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- J/kg, Higher means more favorable for & severity of TSTMS -->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 700mb windbarbs: Black thick windbarbs in kts, starting at 20kts'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 850mb windbarbs: Black thin windbarbs in kts, starting at 20kts'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb Geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\850mbtemp_meur_'i'_valid_'validvar'_run_'runvar'.png x1280 y1024'

'clear'
'set grads off'

say '**'
say ''

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
