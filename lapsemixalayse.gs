*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'
'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set grid off'
'set parea 0.04 9.7 0.8 8.0'
'set grads off'
'set grads off'
*'set map 0 1 1'
'set grid off'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)


*******************************************************************
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************

******************************************************
* CAPE                                               *
******************************************************

'set grads off'

* kleurentabel
**************
'set rgb 101 255 255 250'
'set rgb 102 250 250 246'
'set rgb 103 245 245 241'
'set rgb 104 240 240 236'
'set rgb 105 235 235 231'
'set rgb 106 230 230 226'
'set rgb 107 225 225 221'
'set rgb 108 220 220 217'
'set rgb 109 215 215 212'
'set rgb 110 210 210 207'
'set rgb 111 205 205 202'
'set rgb 112 200 200 197'
'set rgb 113 195 195 192'
'set rgb 114 190 190 188'
'set rgb 115 185 185 183'
'set rgb 116 180 180 178'
'set rgb 117 175 175 173'
'set rgb 118 170 170 168'
'set rgb 119 165 165 163'
'set rgb 120 160 160 159'
'set rgb 121 155 155 154'
'set rgb 122 150 150 149'
'set rgb 123 145 145 144'
'set rgb 124 140 140 139'
'set rgb 125 135 135 134'
'set rgb 126 130 130 130'
'set rgb 127 125 125 125'
'set rgb 128 120 120 120'
'set rgb 129 115 115 115'
'set rgb 130 110 110 110'
'set rgb 131 105 105 105'

'set rgb 132 104 110 116'
'set rgb 133 102 116 127'
'set rgb 134 101 122 139'
'set rgb 135 99 128 150'
'set rgb 136 98 134 161'
'set rgb 137 96 140 173'
'set rgb 138 95 146 184'
'set rgb 139 93 152 195'
'set rgb 140 92 158 207'
'set rgb 141 90 164 218'

'set rgb 142 87 162 210'
'set rgb 143 83 160 201'
'set rgb 144 80 157 192'
'set rgb 145 76 155 183'
'set rgb 146 73 152 174'
'set rgb 147 69 150 165'
'set rgb 148 66 147 157'
'set rgb 149 62 145 148'
'set rgb 150 58 142 139'
'set rgb 151 55 140 130'
'set rgb 152 51 137 121'
'set rgb 153 48 135 112'
'set rgb 154 44 132 103'
'set rgb 155 41 130 95'
'set rgb 156 37 127 86'
'set rgb 157 33 125 77'
'set rgb 158 30 122 68'
'set rgb 159 26 120 59'
'set rgb 160 23 117 50'
'set rgb 161 19 115 41'
'set rgb 162 39 126 29'
'set rgb 163 63 140 26'
'set rgb 164 87 154 23'
'set rgb 165 111 169 20'
'set rgb 166 135 183 17'
'set rgb 167 159 197 14'
'set rgb 168 183 212 11'
'set rgb 169 207 226 8'
'set rgb 170 232 240 4'

'set rgb 171 255 255 0'
'set rgb 172 249 234 2'
'set rgb 173 243 212 3'
'set rgb 174 236 191 5'
'set rgb 175 230 169 6'
'set rgb 176 224 147 8'
'set rgb 177 217 126 9'
'set rgb 178 211 104 11'
'set rgb 179 205 82 12'
'set rgb 180 198 61 14'
'set rgb 181 192 39 15'
'set rgb 182 198 36 39'
'set rgb 183 204 32 63'
'set rgb 184 210 28 87'
'set rgb 185 217 24 111'
'set rgb 186 223 20 135'
'set rgb 187 229 16 159'
'set rgb 188 236 12 183'
'set rgb 189 242 8 207'
'set rgb 190 248 4 231'
'set rgb 191 255 0 255'
'set rgb 192 240 0 240'
'set rgb 193 225 0 225'
'set rgb 194 210 0 210'
'set rgb 195 195 0 195'
'set rgb 196 180 0 180'
'set rgb 197 165 0 165'
'set rgb 198 150 0 150'
'set rgb 199 135 0 135'
'set rgb 200 120 0 120'
'set rgb 201 105 0 105'

'set rgb 225 100 100 100'

* visualisatie lapse rates
**************************
'define t1000=(tmpprs(lev=1000))-273.15'
'define t850=(tmpprs(lev=850))-273.15'

'define h1000=hgtprs(lev=1000)'
'define h850=hgtprs(lev=850)'

'define lapserate=((t1000-t850)/(h850-h1000))*1000'

'set gxout shaded'
'set csmooth on'

'set clevs 0.0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2.0 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 2.9 3.0 3.1 3.2 3.3 3.4 3.5 3.6 3.7 3.8 3.9 4.0 4.1 4.2 4.3 4.4 4.5 4.6 4.7 4.8 4.9 5.0 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 6.0 6.1 6.2 6.3 6.4 6.5 6.6 6.7 6.8 6.9 7.0 7.1 7.2 7.3 7.4 7.5 7.6 7.7 7.8 7.9 8.0 8.1 8.2 8.3 8.4 8.5 8.6 8.7 8.8 8.9 9.0 9.1 9.2 9.3 9.4 9.5 9.6 9.7 9.8 9.9'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200 201'

'd lapserate'
'run cbarm'

'set gxout contour'
'set rgb 230 255 255 255 80'
'set cint 1'
'set ccolor 230'
'set cmin 1'
'set clopts -1'
'set clab masked'
'set cthick 4'
'set cstyle 1'
'd lapserate'

* visualisatie 10m windveld
***************************
'set gxout stream'
'set cthick 10'
'set rgb 250 0 0 0 60'
'set strmden 7'
'set ccolor 250'
'd ugrd100m;vgrd100m'

* visualisatie 500mb geopotential height
****************************************
'set gxout contour'
'set cthick 12'
'set rgb 240 255 255 255'
'set ccolor 240'
'set cint 50'
'set clab masked'
'set clopts -1'
'set cstyle 1'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Chase2be'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 C/km'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model. run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 BL lapse rates, 100mb streamlines & 500mb GPM'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\BL_lapse.png x1280 y1024'

'clear'
'set grads off'
