********************************************
* 850mb theta-w, 500mb geopotential height *
********************************************

'c'
'set grads off'

* kleurentabel
**************
'set rgb 101 0 0 0' 
'set rgb 102 0 0 20'
'set rgb 103 0 0 41'
'set rgb 104 0 0 61'
'set rgb 105 0 0 82'
'set rgb 106 0 0 112'
'set rgb 107 0 0 133'
'set rgb 108 0 0 153'
'set rgb 109 0 0 173'
'set rgb 110 0 0 204'
'set rgb 111 0 0 224'
'set rgb 112 0 0 245'
'set rgb 113 0 10 255'
'set rgb 114 0 31 255'
'set rgb 115 0 51 255'
'set rgb 116 0 82 255'
'set rgb 117 0 102 255'
'set rgb 118 0 122 255'
'set rgb 119 0 153 255'
'set rgb 120 0 173 255'
'set rgb 121 0 194 255'
'set rgb 122 0 214 255'
'set rgb 123 0 245 255' 
'set rgb 124 0 252 245'
'set rgb 125 1 246 226'
'set rgb 126 2 240 207'
'set rgb 127 3 231 178'
'set rgb 128 3 225 159'
'set rgb 129 4 219 140'
'set rgb 130 4 212 121'
'set rgb 131 5 203 92'
'set rgb 132 6 197 73'
'set rgb 133 7 191 53'
'set rgb 134 7 185 34'
'set rgb 135 8 179 15'
'set rgb 136 38 188 13'
'set rgb 137 57 194 12'
'set rgb 138 77 200 11'
'set rgb 139 97 206 10'
'set rgb 140 127 215 8'
'set rgb 141 149 222 7'
'set rgb 142 166 228 5'
'set rgb 143 186 234 4'
'set rgb 144 215 243 2'
'set rgb 145 235 249 1'
'set rgb 146 255 255 0'
'set rgb 147 255 248 0'
'set rgb 148 255 240 0'
'set rgb 149 255 229 0'
'set rgb 150 255 221 0'
'set rgb 151 255 214 0'
'set rgb 152 255 206 0'
'set rgb 153 255 195 0'
'set rgb 154 255 188 0'
'set rgb 155 255 180 0'
'set rgb 156 255 173 0'
'set rgb 157 255 158 0'
'set rgb 158 255 145 0'
'set rgb 159 255 132 0'
'set rgb 160 255 119 0'
'set rgb 161 255 99 0'
'set rgb 162 255 86 0'
'set rgb 163 255 73 0'
'set rgb 164 255 59 0'
'set rgb 165 255 46 0'
'set rgb 166 255 26 0'
'set rgb 167 255 13 0'
'set rgb 168 255 0 0'
'set rgb 169 242 0 11'
'set rgb 170 221 0 27'
'set rgb 171 208 0 38'
'set rgb 172 195 0 49'
'set rgb 173 181 0 60'
'set rgb 174 161 0 76'
'set rgb 175 147 0 87'
'set rgb 176 134 0 98'
'set rgb 177 121 0 109'
'set rgb 178 107 0 120'
'set rgb 179 87 0 136'
'set rgb 180 100 20 146'
'set rgb 181 114 41 155'
'set rgb 182 127 61 165'
'set rgb 183 147 92 179'
'set rgb 184 161 112 188'
'set rgb 185 174 133 198'
'set rgb 186 188 153 207'
'set rgb 187 208 184 222'
'set rgb 188 221 204 231'
'set rgb 189 234 224 241'
'set rgb 190 248 245 250'
'set rgb 191 255 255 255'


* declaratie variabelen en berekeningen
***************************************
'define t = tmpprs(lev=850)'
'define rh = rhprs(lev=850)'
'define dewp850mb = (t-273.15)-((14.55+0.114*(t-273.15))*(1-0.01*rh)+pow((2.5+0.007*(t-273.15))*(1-0.01*rh),3)+(15.9+0.117*(t-273.15))*pow((1-0.01*rh),14))'
'define vapr850mb = 6.112*exp((17.67*dewp850mb)/(dewp850mb+243.5))'
'define e850mb    = vapr850mb*1.001+(850-100)/900*0.0034'
'define w850mb    = 0.62197*(e850mb/(850-e850mb))'
'define te850mb   = (t+(2260000*w850mb/1004))'
'define ept850mb1  = (te850mb*pow((1000/850),(287/1004)))-273.16'

* Theta-w
*********
'define x = ept850mb1'
'define x2 = ept850mb1*ept850mb1'
'define x3 = ept850mb1*ept850mb1*ept850mb1'
'define x4 = ept850mb1*ept850mb1*ept850mb1*ept850mb1'

'define Tw = (4.3706293*10E-8)*x4 + (1.2380536*10E-5)*x3 - (0.0046825174*x2) + (0.6700496544*x) - 6.321169977'


* visualisatie Theta-W 850mb
****************************
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 170 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191'
'd Tw'
'run cbarm'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 7'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
geldig = subwrd(times,6)

'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.7 4.6 `3.`0C'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'geldig
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 850mb Theta-W, 500mb Geopotential height'

'printim thetaw'geldig'.png x1075 y875'

**