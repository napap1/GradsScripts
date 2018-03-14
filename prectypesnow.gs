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

* iteratie
**********
maps = 82

  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs 0 1 0.05 -gxout shaded -kind (60,60,60)->(255,255,255)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Precipitation type: Snow, MSLP (mb) & 0deg dpt-isotherm (2m, Celsius)'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define slp  = const((prmslmsl*0.01),0,-u)'
'define td = dpt2m-273.16'

* visualisatie sneeuwval
************************
'd smth9(csnowsfc)'

* visualisatie MSLP
*******************
* colortable
'set rgb 100 220 220 220'
'set rgb 101 215 216 220'
'set rgb 102 210 211 221'
'set rgb 103 205 206 222'
'set rgb 104 200 201 223'
'set rgb 105 195 196 224'
'set rgb 106 190 191 225'
'set rgb 107 184 187 226'
'set rgb 108 179 182 227'
'set rgb 109 174 177 228'
'set rgb 110 169 172 229'
'set rgb 111 164 167 230'
'set rgb 112 159 162 231'
'set rgb 113 153 158 232'
'set rgb 114 148 153 232'
'set rgb 115 143 148 233'
'set rgb 116 138 143 234'
'set rgb 117 133 138 235'
'set rgb 118 128 133 236'
'set rgb 119 123 128 237'
'set rgb 120 117 124 238'
'set rgb 121 112 119 239'
'set rgb 122 107 114 240'
'set rgb 123 102 109 241'
'set rgb 124 97 104 242'
'set rgb 125 92 99 243'
'set rgb 126 89 104 243'
'set rgb 127 86 109 243'
'set rgb 128 83 114 243'
'set rgb 129 80 119 244'
'set rgb 130 76 124 244'
'set rgb 131 73 130 244'
'set rgb 132 70 135 244'
'set rgb 133 67 140 245'
'set rgb 134 63 145 245'
'set rgb 135 60 150 245'
'set rgb 136 57 156 245'
'set rgb 137 54 161 246'
'set rgb 138 51 166 246'
'set rgb 139 47 171 246'
'set rgb 140 44 176 247'
'set rgb 141 41 182 247'
'set rgb 142 38 187 247'
'set rgb 143 34 192 247'
'set rgb 144 31 197 248'
'set rgb 145 28 202 248'
'set rgb 146 25 208 248'
'set rgb 147 21 213 248'
'set rgb 148 18 218 249'
'set rgb 149 15 223 249'
'set rgb 150 12 228 249'
'set rgb 151 11 218 222'
'set rgb 152 10 208 195'
'set rgb 153 8 198 168'
'set rgb 154 7 188 141'
'set rgb 155 6 178 114'
'set rgb 156 4 168 87'
'set rgb 157 3 158 60'
'set rgb 158 45 172 51'
'set rgb 159 87 186 42'
'set rgb 160 129 200 33'
'set rgb 161 171 215 24'
'set rgb 162 213 229 15'
'set rgb 163 255 244 5'
'set rgb 164 254 226 5'
'set rgb 165 253 210 5'
'set rgb 166 251 194 5'
'set rgb 167 249 178 5'
'set rgb 168 247 162 4'
'set rgb 169 245 146 4'
'set rgb 170 243 130 4'
'set rgb 171 241 114 3'
'set rgb 172 239 98 3'
'set rgb 173 237 82 3'
'set rgb 174 235 66 2'
'set rgb 175 233 50 2'
'set rgb 176 222 46 2'
'set rgb 177 211 42 2'
'set rgb 178 200 37 2'
'set rgb 179 189 33 2'
'set rgb 180 178 29 2'
'set rgb 181 167 24 2'
'set rgb 182 156 20 2'
'set rgb 183 145 16 2'
'set rgb 184 134 11 2'
'set rgb 185 123 7 2'
'set rgb 186 131 7 17'
'set rgb 187 139 7 33'
'set rgb 188 147 6 49'
'set rgb 189 156 6 65'
'set rgb 190 164 5 81'
'set rgb 191 172 5 96'
'set rgb 192 180 4 112'
'set rgb 193 189 4 128'
'set rgb 194 197 4 144'
'set rgb 195 205 3 160'
'set rgb 196 213 3 175'
'set rgb 197 222 2 191'
'set rgb 198 230 2 207'
'set rgb 199 238 1 223'
'set rgb 200 246 1 239'

'set clevs 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049'
'set ccols 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200'

'set gxout contour'
'set csmooth on'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set antialias on'
'set cthick 1'

'd slp'

* visualisatie MSLP
*******************
'set gxout contour'
'set csmooth on'
'set cstyle 3'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 7'
'set antialias on'
'set clevs 950, 954, 958, 962, 966, 970, 974, 978, 982, 986, 990, 994, 998, 1002, 1006, 1010, 1014, 1018, 1022, 1026, 1030, 1034, 1038, 1042, 1046'
'set ccols 100  104  108  112  116  120  124  128  132  136  140  144  148  152   156   160   164   168   172   176   180   184   188   192   196   200'
'd slp'

* visualisatie 0° 2m isotherm
*****************************
'set gxout contour'
'set csmooth on'
'set ccolor 4'
'set cstyle 3'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 7'
'set cmax 0'
'set cmin 0'
'set antialias on'
'd td'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <--- Higher means increasing chance for snow as precip-type --->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 0deg dewpoint: Dashed blue contour'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG), run: 'huh

say '.Saving file'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\snoweur_2'i'.png x1024 y768'

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
