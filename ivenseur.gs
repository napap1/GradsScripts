function main(args)


*******************************************************************
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************

******************************************
********************* 
* 850mb theta-w, 500mb geopotential height & SFC convergence *
*
**************************************************************

'set grads off'



* kleurentabel
**************
'set rgb 101 243 248 240'
'set rgb 102 219 234 208'
'set rgb 103 195 221 176'
'set rgb 104 172 208 144'
'set rgb 105 149 194 113'
'set rgb 106 125 181 81'
'set rgb 107 101 168 49'
'set rgb 108 89 160 33'
'set rgb 109 85 151 15'
'set rgb 110 102 174 14'
'set rgb 111 119 187 12'
'set rgb 112 136 201 10'
'set rgb 113 153 214 7'
'set rgb 114 156 224 6'
'set rgb 115 197 241 3'
'set rgb 116 255 255 0'
'set rgb 117 255 244 0'
'set rgb 118 255 221 0'
'set rgb 119 255 199 0'
'set rgb 120 255 176 0'
'set rgb 121 255 153 0'
'set rgb 122 255 130 1'
'set rgb 123 255 107 1'
'set rgb 124 255 96 1'
'set rgb 125 255 73 1'
'set rgb 126 255 50 1'
'set rgb 127 255 15 2'
'set rgb 128 255 14 42'
'set rgb 129 255 12 83'
'set rgb 130 255 10 123'
'set rgb 131 255 8 164'
'set rgb 132 255 7 184'
'set rgb 133 235 7 196'
'set rgb 134 222 6 201'
'set rgb 135 215 6 209'
'set rgb 136 202 6 214'
'set rgb 137 195 5 222'
'set rgb 138 182 5 228'
'set rgb 139 175 5 235'
'set rgb 140 165 5 242'





* declaratie variabelen en berekeningen
***************************************

* equivalent potential temperature (theta-e) 850mb
**

'define t850 = tmpprs(lev=850)'
'define rh850 = rhprs(lev=850)'
'define dewp850mb = (t850-273.15)-((14.55+0.114*(t850-273.15))*(1-0.01*rh850)+pow((2.5+0.007*(t850-273.15))*(1-0.01*rh850),3)+(15.9+0.117*(t850-273.15))*pow((1-0.01*rh850),14))'
'define td850k= dewp850mb+273.15'
'define vapr850mb = 6.112*exp((17.67*dewp850mb)/(dewp850mb+243.5))'
'define e850mb    = vapr850mb*1.001+(850-100)/900*0.0034'
'define w850mb    = 0.62197*(e850mb/(850-e850mb))'
'define te850mb   = (t850+(2260000*w850mb/1004))'
'define ept850mb1  = (te850mb*pow((1000/850),(287/1004)))-273.16'



* windspeed & potentiele temperatuur 850mb
**

'define u850=ugrdprs(lev=850)'
'define v850=vgrdprs(lev=850)'
'define wind850mb = (sqrt((u850*u850+v850*v850)))'

* wetbulb potential temperature 850mb
**

'define wpt850mb = ((-6.2609512839 + 6.6480400261 * 0.1 * ept850mb1) -(5.1338815795 * 0.001 * pow(ept850mb1,2)) + (8.1910107184 * 0.000001 * pow(ept850mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept850mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept850mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept850mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept850mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept850mb1,8)))+273.16'

* equivalent potential temperature (theta-e) 500mb
**

'define t500 = tmpprs(lev=500)'
'define rh500 = rhprs(lev=500)'
'define dewp500mb = (t500-273.15)-((14.55+0.114*(t500-273.15))*(1-0.01*rh500)+pow((2.5+0.007*(t500-273.15))*(1-0.01*rh500),3)+(15.9+0.117*(t500-273.15))*pow((1-0.01*rh500),14))'

'define td500k= dewp500mb+273.15'

'define vapr500mb = 6.112*exp((17.67*dewp500mb)/(dewp500mb+243.5))'
'define e500mb    = vapr500mb*1.001+(500-100)/900*0.0034'
'define w500mb    = 0.62197*(e500mb/(500-e500mb))'

'define te500mb   = (t500+(2260000*w500mb/1004))'

'define ept500mb1  = (te500mb*pow((1000/500),(287/1004)))-273.16'



'define wpt500mb = ((-6.2609512839 + 6.6480400261 * 0.1 * ept500mb1) -(5.1338815795 * 0.001 * pow(ept500mb1,2)) + (8.1910107184 * 0.000001 * pow(ept500mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept500mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept500mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept500mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept500mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept500mb1,8)))+273.16'

* windspeed & potentiele temperatuur 500mb
**

'define u500=ugrdprs(lev=500)'
'define v500=vgrdprs(lev=500)'
'define wind500mb = (sqrt((u500*u500+v500*v500)))'



'define t2c = tmp2m-273.15'

* IvENS variabelen
**

'define u250 = ugrdprs(lev=250)'
'define v250 = vgrdprs(lev=250)'
'define wind250mb = (sqrt((u250*u250+v250*v250)))'

* IVENS method
**


'define wmax = (8.17+0.473*abs(wpt850mb-wpt500mb) + (0.174*wind850mb + 0.057*wind250mb)*sqrt(abs(tmax2m - wpt850mb)))*3.6'

* visualisatie IVENS gusts
**************************

'set gxout shaded'
'set csmooth on'

'set cint 5'
'set clevs 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 100 105 110 115 120 125 130 135 140 145 150 155 160 165 170 175 180 190 195 200'

'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140'
'd wmax'
'run cbarm'



* visualisatie ivens contouren
******************************


'set rgb 200 75 75 75'
'set gxout contour'
'set ccolor 200'
'set cint 10'
'set cmin 0'
'set cstyle 3'
'set cthick 1'
'set csmooth on'
'set clopts -1'
'set clab off'
'd wmax'

* visualisatie 500mb geopotential height
****************************************
'set gxout contour'
'set ccolor 0'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'




* labels & opmaak

*****************

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Stormplatform'
'set strsiz 0.12'                                          
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <----- kph: higher means increasing intensity of windgusts ----->'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Maximum convective windgusts (Ivens) & 500mb GPM (m)'

'printim ivens0'hub'.png x1024 y768'

'set grads off'