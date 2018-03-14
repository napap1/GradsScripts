function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'
'set display color white'
'set csmooth on'
*'set lat 42 56'
*'set lon -5 15'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.04 9.7 0.8 8.0'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 24

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

*******************************************************************
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************

function Templcl(temp,dewp)

*------------------------------------------------------
* Calculate the temp at the LCL given temp & dewp in C
*------------------------------------------------------

tempk=temp+273.15
dewpk=dewp+273.15
Parta=1/(dewpk-56)
Partb=math_log(tempk/dewpk)/800
Tlcl=1/(Parta+Partb)+56
return(Tlcl-273.15)


* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

'define temp2m = t2m-273.15'
'define dewpoint2m = (243.12*(log(rh/100)+((17.62*temp2m)/(243.12+temp2m))))/(17.62-(log(rh/100)+((17.62*temp2m)/(243.12+temp2m))))'

Tlclk=Templcl(temp,dewp)+273.15
tempk=temp+273.15
theta=tempk*math_pow(1000/pres,0.286)
plcl=1000*math_pow(Tlclk/theta,3.48)
*return(plcl)

'd plcl'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'


******************************************************
* CAPE                                               *
******************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 255 254 254'
'set rgb 102 208 231 196'
'set rgb 103 161 208 137'
'set rgb 104 113 185 79'
'set rgb 105 59 158 12'
'set rgb 106 64 191 4'
'set rgb 107 76 228 4'
'set rgb 108 254 254 0'
'set rgb 109 248 236 2'
'set rgb 110 242 218 4'
'set rgb 111 235 197 6'
'set rgb 112 229 179 8'
'set rgb 113 223 160 10'
'set rgb 114 216 139 13'
'set rgb 115 210 121 15'
'set rgb 116 204 103 17'
'set rgb 117 197 82 19'
'set rgb 118 191 64 22'
'set rgb 119 185 45 24'
'set rgb 120 179 27 26'
'set rgb 121 172 6 28'
'set rgb 122 185 3 50'
'set rgb 123 199 2 72'
'set rgb 124 215 2 97'
'set rgb 125 229 1 119'
'set rgb 126 243 1 140'     
'set rgb 127 245 27 164'     
'set rgb 128 247 51 185'     
'set rgb 129 249 74 206'     
'set rgb 130 252 101 230'
'set rgb 131 254 124 251' 
'set rgb 132 231 101 228' 
'set rgb 133 203 74 202' 
'set rgb 134 180 51 178'
'set rgb 135 156 27 155'
'set rgb 136 132 4 132'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie cape
*******************
'set gxout shaded'
'set csmooth on'
'set clevs 100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000 2100 2200 2300 2400 2500 2600 2700 2800 2900 3000 3200 3400 3600 3800 4000'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136'
'd capesfc'
'run cbarm'

* visualisatie 10m windveld
***************************
'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'set gxout stream'
'set ccolor 15'
'd u10;v10'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 11'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 6'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 J/kg'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 SBCAPE, 10m windfield & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\cape'i'.png x1024 y768'

'undefine u10'
'undefine v10'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'

**************************************************************
* 850mb theta-e, 500mb geopotential height & SFC convergence *
**************************************************************

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

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

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

* visualisatie Theta-E 850mb
****************************
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 170 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191'
'd ept850mb1'
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

* visualisatie surface convergence
**********************************
'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'set gxout contour'
'set ccolor 1'
'set clab off'
'set cint 1e-5'
'set cmax -0.5e-5'
*'set clopts -1'
*'set clab masked'
*'set clab forced'
'set cstyle 3'
'set cthick 5'
'set csmooth on'
'd hdivg(u10,v10)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 °C'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 850mb Theta-E, 500mb Geopotential height & SFC-convergence'

'printim C:\OpenGrADS\OutputGFSSevere\theta-e'i'.png x1024 y768'

'undefine t'
'undefine rh'
'undefine dewp850mb'
'undefine vapr850mb'
'undefine e850mb'
'undefine w850mb'
'undefine te850mb'
'undefine ept850mb1'
'undefine u10'
'undefine v10'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'

********************************************************
* SRH3km, storm motion & RM storm motion & SCP         *
********************************************************

'set grads off'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 216 216 245'
'set rgb 103 192 192 242'
'set rgb 104 175 211 206'
'set rgb 105 154 234 161'
'set rgb 106 109 239 111'
'set rgb 107 66 239 67'
'set rgb 108 130 231 28'
'set rgb 109 221 215 5'
'set rgb 110 239 189 1'
'set rgb 111 239 165 1'
'set rgb 112 239 153 1'
'set rgb 113 239 140 1'
'set rgb 114 235 113 1'
'set rgb 115 224 62 1'
'set rgb 116 213 11 1'
'set rgb 117 202 8 1'
'set rgb 118 188 3 1'
'set rgb 119 177 1 1'
'set rgb 120 155 2 2'
'set rgb 121 154 2 2'
'set rgb 122 142 2 2'
'set rgb 123 129 2 2' 
'set rgb 124 117 2 2'
'set rgb 125 104 1 1'
'set rgb 126 89 1 1'
'set rgb 127 111 1 41'
'set rgb 128 134 1 81'
'set rgb 129 158 1 121'
'set rgb 130 181 1 181'
'set rgb 131 205 1 201'
'set rgb 132 195 1 192'
'set rgb 133 185 1 182'
'set rgb 134 162 1 161'
'set rgb 135 152 1 151'
'set rgb 136 157 36 157'
'set rgb 137 163 71 163'
'set rgb 138 169 106 169'
'set rgb 139 175 141 175'
'set rgb 140 181 176 181'
'set rgb 141 187 187 187'
'set rgb 142 193 193 193'
'set rgb 143 197 197 197'
'set rgb 144 202 202 202'
'set rgb 145 207 207 207'
'set rgb 146 213 213 213'
'set rgb 147 219 219 219'
'set rgb 148 225 225 225'
'set rgb 149 231 231 231'
'set rgb 150 236 236 236'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u1000=ugrdprs(lev=1000)'
'define u950=ugrdprs(lev=950)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

'define v1000=vgrdprs(lev=1000)'
'define v950=vgrdprs(lev=950)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/13.0'
'define ushear=u450-u1000'
'define vshear=v450-v1000'
'define ushear3=u700-u1000'
'define vshear3=v700-v1000'

'define shear3=sqrt((ushear3*ushear3+vshear3*vshear3))'
'define shear=sqrt(ushear*ushear+vshear*vshear)'
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'

'define srh1=((u950-umotion)*(v1000-vmotion)-(u1000-umotion)*(v950-vmotion))'
'define srh2=((u900-umotion)*(v950-vmotion)-(u950-umotion)*(v900-vmotion))'
'define srh3=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))'
'define srh4=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))'
'define srh5=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))'
'define srh6=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))'

'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6'
'define srh1km=srh1+srh2'

* visualisatie SRH3
*******************
'set gxout shaded'
'set csmooth on'
'set cint 20'
'set clevs 0 20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500 520 540 560 580 600 620 640 660 680 700 720 740 760 780 800 820 840 860 880 900 920 940 960 980'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150'
'd srh3km'
'run cbarm'

* visualisatie RM storm motion
******************************
'set arrlab off'
'set gxout barb'
'set ccolor 0'
'd skip(umotion,2,2);vmotion'

* visualisatie gewone storm motion
**********************************
'set ccolor 1'
'd skip(umean,2,2);vmean'


* visualisatie supercel composite prarameter depricated
********************************************
if shear < 20
   if shear >= 10
       'define scp=((capesfc/1000)*(shear/20)*(srh3km/50))'
   endif
   if shear < 10
       'define scp=((capesfc/1000)*0*(srh3km/50))'
   endif
endif
if shear > 20
       'define scp=((capesfc/1000)*1*(srh3km/50))'
endif

'set gxout contour'
'set ccolor 1'
'set clab on'
'set cint 0.5'
'set cmin 0.5'
'set clopts -1'
'set clab masked'
*'set clab forced'
'set cstyle 3'
'set cthick 5'
'set csmooth off'
'd scp'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m2/s2'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 SRH3km, Stmotion (black), RM STmotion (white) & SCP (SPC method)'

'printim C:\OpenGrADS\OutputGFSSevere\srh3km'i'.png x1024 y768'

'undefine u1000'
'undefine u950'
'undefine u900'
'undefine u850'
'undefine u800'
'undefine u750'
'undefine u700'
'undefine u650'
'undefine u600'
'undefine u550'
'undefine u500'
'undefine u450'
'undefine u400'

'undefine v1000'
'undefine v950'
'undefine v900'
'undefine v850'
'undefine v800'
'undefine v750'
'undefine v700'
'undefine v650'
'undefine v600'
'undefine v550'
'undefine v500'
'undefine v450'
'undefine v400'

'undefine umean'
'undefine vmean'
'undefine ushear'
'undefine vshear'
'undefine ushear3'
'undefine vshear3'

'undefine shear3'
'undefine shear'
'undefine umotion'
'undefine vmotion'

'undefine srh1'
'undefine srh2'
'undefine srh3'
'undefine srh4'
'undefine srh5'
'undefine srh6'

'undefine srh3km'
'undefine srh1km'

'undefine scp'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'

********************************************************
* SRH3km, storm motion & RM storm motion & SCP         *
********************************************************

'set grads off'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 216 216 245'
'set rgb 103 192 192 242'
'set rgb 104 175 211 206'
'set rgb 105 154 234 161'
'set rgb 106 109 239 111'
'set rgb 107 66 239 67'
'set rgb 108 130 231 28'
'set rgb 109 221 215 5'
'set rgb 110 239 189 1'
'set rgb 111 239 165 1'
'set rgb 112 239 153 1'
'set rgb 113 239 140 1'
'set rgb 114 235 113 1'
'set rgb 115 224 62 1'
'set rgb 116 213 11 1'
'set rgb 117 202 8 1'
'set rgb 118 188 3 1'
'set rgb 119 177 1 1'
'set rgb 120 155 2 2'
'set rgb 121 154 2 2'
'set rgb 122 142 2 2'
'set rgb 123 129 2 2' 
'set rgb 124 117 2 2'
'set rgb 125 104 1 1'
'set rgb 126 89 1 1'
'set rgb 127 111 1 41'
'set rgb 128 134 1 81'
'set rgb 129 158 1 121'
'set rgb 130 181 1 181'
'set rgb 131 205 1 201'
'set rgb 132 195 1 192'
'set rgb 133 185 1 182'
'set rgb 134 162 1 161'
'set rgb 135 152 1 151'
'set rgb 136 157 36 157'
'set rgb 137 163 71 163'
'set rgb 138 169 106 169'
'set rgb 139 175 141 175'
'set rgb 140 181 176 181'
'set rgb 141 187 187 187'
'set rgb 142 193 193 193'
'set rgb 143 197 197 197'
'set rgb 144 202 202 202'
'set rgb 145 207 207 207'
'set rgb 146 213 213 213'
'set rgb 147 219 219 219'
'set rgb 148 225 225 225'
'set rgb 149 231 231 231'
'set rgb 150 236 236 236'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u1000=ugrdprs(lev=1000)'
'define u950=ugrdprs(lev=950)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

'define v1000=vgrdprs(lev=1000)'
'define v950=vgrdprs(lev=950)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/13.0'
'define ushear=u450-u1000'
'define vshear=v450-v1000'
'define ushear3=u700-u1000'
'define vshear3=v700-v1000'

'define shear3=sqrt((ushear3*ushear3+vshear3*vshear3))'
'define shear=sqrt(ushear*ushear+vshear*vshear)'
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'

'define srh1=((u950-umotion)*(v1000-vmotion)-(u1000-umotion)*(v950-vmotion))'
'define srh2=((u900-umotion)*(v950-vmotion)-(u950-umotion)*(v900-vmotion))'


'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6'
'define srh1km=srh1+srh2'

* visualisatie SRH1
*******************
'set gxout shaded'
'set csmooth on'
'set cint 20'
'set clevs 0 20 40 60 80 100 120 140 160 180 200 220 240 260 280 300 320 340 360 380 400 420 440 460 480 500 520 540 560 580 600 620 640 660 680 700 720 740 760 780 800 820 840 860 880 900 920 940 960 980'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150'
'd srh1km'
'run cbarm'

* visualisatie RM storm motion
******************************
'set arrlab off'
'set gxout barb'
'set ccolor 0'
'd skip(umotion,2,2);vmotion'

* visualisatie gewone storm motion
**********************************
'set ccolor 1'
'd skip(umean,2,2);vmean'

*LCL
**********************************
'td2m = (243.12*(log(rh2m/100)+((17.62*t2m)/(243.12+t2m))))/(17.62-(log(rh2m/100)+((17.62*t2m)/(243.12+t2m))))'

't2 = t2m-273.15'

'lcl = (20+(t2/5))*(100-rh2m)'


*EXCEPTIONS
if lcl<1000
   'stp = (capesfc/1500)*1*(srh/150)*(rshear/20)'
else
   if lcl>2000
      'stp = 0'
   else
      'stp = (capesfc/1500)*((2000-(lcl))/1000)*(srh/150)*(rshear/20)'
   endif	
endif

******************************************************************************

if rshear<12.5
   'stp = 0'
else
   if rshear>30
      'stp = (capesfc/1500)*((2000-(lcl))/1000)*(srh/150)*1.5'
   else
      'stp = (capesfc/1500)*((2000-(lcl))/1000)*(srh/150)*(rshear/20)'
   endif	
endif


'set gxout contour'
'set ccolor 1'
'set clab on'
'set cint 0.5'
'set cmin 0.5'
'set clopts -1'
'set clab masked'
*'set clab forced'
'set cstyle 3'
'set cthick 5'
'set csmooth off'
'd stp'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa & Michael Verhaeghe (Fastowarn/Chase2Be)'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 m2/s2'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 SRH3km, Stmotion (black), RM STmotion (white) & STP (SPC method)'

'printim C:\OpenGrADS\OutputGFSSevere\srh1km'i'.png x1024 y768'

'undefine u1000'
'undefine u950'
'undefine u900'
'undefine u850'
'undefine u800'
'undefine u750'
'undefine u700'
'undefine u650'
'undefine u600'
'undefine u550'
'undefine u500'
'undefine u450'
'undefine u400'

'undefine v1000'
'undefine v950'
'undefine v900'
'undefine v850'
'undefine v800'
'undefine v750'
'undefine v700'
'undefine v650'
'undefine v600'
'undefine v550'
'undefine v500'
'undefine v450'
'undefine v400'

'undefine umean'
'undefine vmean'
'undefine ushear'
'undefine vshear'
'undefine ushear3'
'undefine vshear3'

'undefine shear3'
'undefine shear'
'undefine umotion'
'undefine vmotion'

'undefine srh1'
'undefine srh2'
'undefine srh3'
'undefine srh4'
'undefine srh5'
'undefine srh6'

'undefine srh3km'
'undefine srh1km'

'undefine scp'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'



********************************************************
* low level Stormrelative wind                         *
********************************************************


* stroomlijndensiteit
*********************
'set strmden 5'

'set grads off'

* kleurentabel
**************
'set rgb 100 255 254 255 200'
'set rgb 101 242 230 246 200'
'set rgb 102 236 213 241 200'
'set rgb 103 225 198 236 200'
'set rgb 104 217 171 227 200'
'set rgb 105 198 130 213 200'
'set rgb 106 179 88 199 200'
'set rgb 107 154 41 182 200'
'set rgb 108 148 37 186 200'
'set rgb 109 142 33 190 200'
'set rgb 110 135 29 194 200'
'set rgb 111 129 25 199 200'
'set rgb 112 123 21 203 200'
'set rgb 113 117 17 207 200'
'set rgb 114 111 13 212 200'
'set rgb 115 104 9 216 200'
'set rgb 116 98 5 220 200'
'set rgb 117 92 1 224 200'
'set rgb 118 82 22 228 200'
'set rgb 119 73 44 231 200'
'set rgb 120 65 67 233 200'
'set rgb 121 58 84 235 200'
'set rgb 122 48 112 239 200'
'set rgb 123 39 134 241 200'
'set rgb 124 30 157 244 200'
'set rgb 125 24 173 246 200'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u1000=ugrdprs(lev=1000)'
'define u950=ugrdprs(lev=950)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

'define v1000=vgrdprs(lev=1000)'
'define v950=vgrdprs(lev=950)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

* windschering
'define ushear=u450-u1000'
'define vshear=v450-v1000'
'define shear=sqrt(ushear*ushear+vshear*vshear)'

* mean wind in de 0-2km laag & steering layer
'define umean2km=(u1000+u950+u900+u850+u800)/5'
'define vmean2km=(v1000+v950+v900+v850+v800)/5'

* stormmotion
'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+u400)/13.0'

* RM stormmotion
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'

* 0-2km stormrelatieve windsterkte
'define urel2km=(umean2km-umotion)'
'define vrel2km=(vmean2km-vmotion)'
'define stormrelwindmag=sqrt(urel2km*urel2km+vrel2km*vrel2km)'

* 950mb stormrelatieve wind
'define u950sr=(u950-umotion)'
'define v950sr=(v950-vmotion)'

* visualisatie stormrelative windmagnitude
******************************************
'set gxout shaded'
'set csmooth on'
'set clevs 0 2 4 6 8 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24'
'set ccols 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125'
'd stormrelwindmag'
'run cbarm'

'set gxout contour'
'set cint 2'
'set ccolor 0'
'set cmin 10'
'set clopts -1'
'set clab masked'
'set cstyle 3'
'set cthick 6'
'd stormrelwindmag'

* visualisatie 950mb stormrelative wind barbs
*********************************************
*'set arrlab off'
*'set gxout stream'
*'set ccolor 15'
*'d u950sr;v950sr'

* visualisatie SC storm motion
******************************
'set ccolor 1'
'set cthick 4'
'set gxout barb'
'd skip(umotion,2,2);vmotion'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 6'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 ms-1'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 950mb STRWmag, STRstream & RM-Storm motion (barb)'

'printim C:\OpenGrADS\OutputGFSSevere\sfc-2km-strel-wind'i'.png x1280 y1024'


'undefine u1000'
'undefine u950'
'undefine u900'
'undefine u850'
'undefine u800'
'undefine u750'
'undefine u700'
'undefine u650'
'undefine u600'
'undefine u550'
'undefine u500'
'undefine u450'
'undefine u400'

'undefine v1000'
'undefine v950'
'undefine v900'
'undefine v850'
'undefine v800'
'undefine v750'
'undefine v700'
'undefine v650'
'undefine v600'
'undefine v550'
'undefine v500'
'undefine v450'
'undefine v400'

'undefine umean'
'undefine vmean'
'undefine ushear'
'undefine vshear'
'undefine ushear3'
'undefine vshear3'

'undefine shear3'
'undefine shear'
'undefine umotion'
'undefine vmotion'

'undefine srh1'
'undefine srh2'
'undefine srh3'
'undefine srh4'
'undefine srh5'
'undefine srh6'

'undefine srh3km'
'undefine srh1km'

'undefine urel2km'
'undefine vrel2km'
'undefine stormrelwindmag'

'undefine u950sr'
'undefine v950sr'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'


****************************************************************
* 10m - 850mb relative vorticity & 500mb gpm                   *
****************************************************************

'set grads off'

* kleurentabel
**************
'set rgb 110 255 254 255 200'
'set rgb 111 236 213 241 200'
'set rgb 112 217 171 227 200'
'set rgb 113 198 130 213 200'
'set rgb 114 179 88 199 200'
'set rgb 115 154 41 182 200'
'set rgb 116 148 37 186 200'
'set rgb 117 142 33 190 200'
'set rgb 118 135 29 194 200'
'set rgb 119 129 25 199 200'
'set rgb 120 123 21 203 200'
'set rgb 121 117 17 207 200'
'set rgb 122 111 13 212 200'
'set rgb 123 104 9 216 200'
'set rgb 124 98 5 220 200'
'set rgb 125 92 1 224 200'
'set rgb 126 82 22 228 200'
'set rgb 127 73 44 231 200'
'set rgb 128 65 67 233 200'
'set rgb 129 58 84 235 200'
'set rgb 130 48 112 239 200'
'set rgb 131 39 134 241 200'
'set rgb 132 30 157 244 200'
'set rgb 133 24 173 246 200'
'set rgb 134 13 201 249 200'
'set rgb 135 5 224 252 200'
'set rgb 136 2 223 245 200'
'set rgb 137 2 215 237 200'
'set rgb 138 2 208 229 200'
'set rgb 139 2 200 220 200'
'set rgb 140 2 193 212 200'
'set rgb 141 2 185 204 200'
'set rgb 142 2 178 196 200'
'set rgb 143 1 170 187 200'
'set rgb 144 1 153 179 200'
'set rgb 145 1 155 171 200'
'set rgb 146 1 148 153 200'
'set rgb 147 1 140 154 200'
'set rgb 148 1 133 146 200'
'set rgb 149 1 125 138 200'
'set rgb 150 1 119 132 200'
'set rgb 150 1 105 124 200'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie 0-1km vorticity
******************************
'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'define vort10 = hcurl(u10,v10)'

'define u975  = const(ugrdprs(lev=975),0,-u)'
'define v975  = const(vgrdprs(lev=975),0,-u)'
'define vort975 = hcurl(u975,v975)'

'define u950  = const(ugrdprs(lev=950),0,-u)'
'define v950  = const(vgrdprs(lev=950),0,-u)'
'define vort950 = hcurl(u950,v950)'

'define u925  = const(ugrdprs(lev=925),0,-u)'
'define v925  = const(vgrdprs(lev=925),0,-u)'
'define vort925 = hcurl(u925,v925)'

'define u900  = const(ugrdprs(lev=900),0,-u)'
'define v900  = const(vgrdprs(lev=900),0,-u)'
'define vort900 = hcurl(u900,v900)'

'define vortavg = ((vort10 + vort975 + vort950 + vort925 + vort900)/5)*100000'

'set gxout shaded'
'set csmooth on'
'set cint 1e-05'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40'
'set ccols 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150'
'd vortavg'
'run cbarm'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 1e-5 s-1'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Sfc - 1km relative vorticity & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\relvort_scf-850mb'i'.png x1024 y768'

'undefine u10'
'undefine v10'
'undefine vort10'

'undefine u975'
'undefine v975'
'undefine vort975'

'undefine u950'
'undefine v950'
'undefine vort950'

'undefine u925'
'undefine v925'
'undefine vort925'

'undefine u900'
'undefine v900'
'undefine vort900'

'undefine vortavg'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'

********************************************************
* 850mb windspeed & 850mb gpm                          *
********************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 246 245 254'
'set rgb 102 238 235 253'
'set rgb 103 229 226 252'
'set rgb 104 221 216 251'
'set rgb 105 213 206 250'
'set rgb 106 204 197 249'
'set rgb 107 196 187 248'
'set rgb 108 187 177 247'
'set rgb 109 179 168 246'
'set rgb 110 171 158 245'
'set rgb 111 162 149 244'
'set rgb 112 154 139 243'
'set rgb 113 146 129 242'
'set rgb 114 137 120 241'
'set rgb 115 129 110 240'
'set rgb 116 113 89 255'
'set rgb 117 98 71 255'
'set rgb 118 83 54 255'
'set rgb 119 68 36 255'
'set rgb 120 53 18 255'
'set rgb 121 62 18 255'
'set rgb 122 72 18 254'
'set rgb 123 82 17 254'
'set rgb 124 92 17 253'
'set rgb 125 101 16 253'
'set rgb 126 111 16 252'
'set rgb 127 121 16 252'
'set rgb 128 131 15 251'
'set rgb 129 140 15 251'
'set rgb 130 150 14 250'
'set rgb 131 160 14 250'
'set rgb 132 170 14 249'
'set rgb 133 179 13 249'
'set rgb 134 189 13 248'
'set rgb 135 199 12 248'
'set rgb 136 209 12 247'
'set rgb 137 218 12 247'
'set rgb 138 229 11 246'
'set rgb 139 238 11 246'
'set rgb 140 238 19 246'
'set rgb 141 239 27 246'
'set rgb 142 240 35 246'
'set rgb 143 241 43 246'
'set rgb 144 242 51 247'
'set rgb 145 242 59 247'
'set rgb 146 243 67 247'
'set rgb 147 244 75 247'
'set rgb 148 245 83 248'
'set rgb 149 245 97 248'
'set rgb 150 245 111 249'
'set rgb 151 247 125 249'
'set rgb 152 248 140 240'
'set rgb 153 249 154 250'
'set rgb 154 249 168 251'
'set rgb 155 250 182 252'
'set rgb 156 251 197 252'
'set rgb 157 252 211 253'
'set rgb 158 253 225 253'
'set rgb 159 254 239 254'
'set rgb 160 255 245 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u850=ugrdprs(lev=850)*1.94384'
'define v850=vgrdprs(lev=850)*1.94384'

'define speedmag=(sqrt(u850*u850+v850*v850))'

* windmagnitude
***************
'set gxout shaded'
'set csmooth on'
'set cint 2'
'set clevs 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100 102 104 106 108 110 112 114 116 118'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160'
'd speedmag'
'run cbarm'

'set gxout contour'
'set cint 5'
'set ccolor 1'
'set cmin 30'
'set clopts -1'
'set clab masked'
'set cstyle 3'
'set cthick 4'
'd speedmag'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 0'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 4'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Knots'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 850mb windspeed & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\850mbwind'i'.png x1024 y768'

'undefine u850'
'undefine v850'

'undefine speedmag'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'

'set grads off'

********************************************************
* 500mb windspeed & 500mb gpm                          *
********************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 246 245 254'
'set rgb 102 238 235 253'
'set rgb 103 229 226 252'
'set rgb 104 221 216 251'
'set rgb 105 213 206 250'
'set rgb 106 204 197 249'
'set rgb 107 196 187 248'
'set rgb 108 187 177 247'
'set rgb 109 179 168 246'
'set rgb 110 171 158 245'
'set rgb 111 162 149 244'
'set rgb 112 154 139 243'
'set rgb 113 146 129 242'
'set rgb 114 137 120 241'
'set rgb 115 129 110 240'
'set rgb 116 113 89 255'
'set rgb 117 98 71 255'
'set rgb 118 83 54 255'
'set rgb 119 68 36 255'
'set rgb 120 53 18 255'
'set rgb 121 62 18 255'
'set rgb 122 72 18 254'
'set rgb 123 82 17 254'
'set rgb 124 92 17 253'
'set rgb 125 101 16 253'
'set rgb 126 111 16 252'
'set rgb 127 121 16 252'
'set rgb 128 131 15 251'
'set rgb 129 140 15 251'
'set rgb 130 150 14 250'
'set rgb 131 160 14 250'
'set rgb 132 170 14 249'
'set rgb 133 179 13 249'
'set rgb 134 189 13 248'
'set rgb 135 199 12 248'
'set rgb 136 209 12 247'
'set rgb 137 218 12 247'
'set rgb 138 229 11 246'
'set rgb 139 238 11 246'
'set rgb 140 238 19 246'
'set rgb 141 239 27 246'
'set rgb 142 240 35 246'
'set rgb 143 241 43 246'
'set rgb 144 242 51 247'
'set rgb 145 242 59 247'
'set rgb 146 243 67 247'
'set rgb 147 244 75 247'
'set rgb 148 245 83 248'
'set rgb 149 245 97 248'
'set rgb 150 245 111 249'
'set rgb 151 247 125 249'
'set rgb 152 248 140 240'
'set rgb 153 249 154 250'
'set rgb 154 249 168 251'
'set rgb 155 250 182 252'
'set rgb 156 251 197 252'
'set rgb 157 252 211 253'
'set rgb 158 253 225 253'
'set rgb 159 254 239 254'
'set rgb 160 255 245 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u500=ugrdprs(lev=500)*1.94384'
'define v500=vgrdprs(lev=500)*1.94384'

'define speedmag=(sqrt(u500*u500+v500*v500))'

* windmagnitude
***************
'set gxout shaded'
'set csmooth on'
'set cint 2'
'set clevs 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100 102 104 106 108 110 112 114 116 118'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160'
'd speedmag'
'run cbarm'

'set gxout contour'
'set cint 5'
'set ccolor 1'
'set cmin 50'
'set clopts -1'
'set clab masked'
'set cstyle 3'
'set cthick 4'
'd speedmag'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 0'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 4'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Knots'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 500mb windspeed & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\500mbwind'i'.png x1024 y768'

'undefine u500'
'undefine v500'

'undefine speedmag'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'

'set grads off'

********************************************************
* 250mb windspeed, streamlines & 500mb gpm             *
********************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 246 245 254'
'set rgb 102 238 235 253'
'set rgb 103 229 226 252'
'set rgb 104 221 216 251'
'set rgb 105 213 206 250'
'set rgb 106 204 197 249'
'set rgb 107 196 187 248'
'set rgb 108 187 177 247'
'set rgb 109 179 168 246'
'set rgb 110 171 158 245'
'set rgb 111 162 149 244'
'set rgb 112 154 139 243'
'set rgb 113 146 129 242'
'set rgb 114 137 120 241'
'set rgb 115 129 110 240'
'set rgb 116 113 89 255'
'set rgb 117 98 71 255'
'set rgb 118 83 54 255'
'set rgb 119 68 36 255'
'set rgb 120 53 18 255'
'set rgb 121 62 18 255'
'set rgb 122 72 18 254'
'set rgb 123 82 17 254'
'set rgb 124 92 17 253'
'set rgb 125 101 16 253'
'set rgb 126 111 16 252'
'set rgb 127 121 16 252'
'set rgb 128 131 15 251'
'set rgb 129 140 15 251'
'set rgb 130 150 14 250'
'set rgb 131 160 14 250'
'set rgb 132 170 14 249'
'set rgb 133 179 13 249'
'set rgb 134 189 13 248'
'set rgb 135 199 12 248'
'set rgb 136 209 12 247'
'set rgb 137 218 12 247'
'set rgb 138 229 11 246'
'set rgb 139 238 11 246'
'set rgb 140 238 19 246'
'set rgb 141 239 27 246'
'set rgb 142 240 35 246'
'set rgb 143 241 43 246'
'set rgb 144 242 51 247'
'set rgb 145 242 59 247'
'set rgb 146 243 67 247'
'set rgb 147 244 75 247'
'set rgb 148 245 83 248'
'set rgb 149 245 97 248'
'set rgb 150 245 111 249'
'set rgb 151 247 125 249'
'set rgb 152 248 140 240'
'set rgb 153 249 154 250'
'set rgb 154 249 168 251'
'set rgb 155 250 182 252'
'set rgb 156 251 197 252'
'set rgb 157 252 211 253'
'set rgb 158 253 225 253'
'set rgb 159 254 239 254'
'set rgb 160 255 245 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u250=ugrdprs(lev=250)*1.94384'
'define v250=vgrdprs(lev=250)*1.94384'

'define speedmag=(sqrt(u250*u250+v250*v250))'

* windmagnitude
***************
'set gxout shaded'
'set csmooth on'
'set cint 2'
'set clevs 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100 102 104 106 108 110 112 114 116 118'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160'
'd speedmag'
'run cbarm'

'set gxout contour'
'set cint 5'
'set ccolor 1'
'set cmin 60'
'set clopts -1'
'set clab masked'
'set cstyle 3'
'set cthick 4'
'd speedmag'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 0'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 4'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Knots'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 250mb windspeed & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\250mbwind'i'.png x1024 y768'

'undefine u250'
'undefine v250'

'undefine speedmag'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'


******************************************************
* K-index & EHI                                      *
******************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 246 251 255'
'set rgb 103 236 247 254'
'set rgb 104 226 243 254'
'set rgb 105 216 239 253'
'set rgb 106 206 235 253'
'set rgb 107 196 231 252'
'set rgb 108 186 227 252'
'set rgb 109 176 223 251'
'set rgb 110 166 219 251'
'set rgb 111 156 215 250'
'set rgb 112 156 210 250'
'set rgb 113 155 205 249'
'set rgb 114 155 200 249'
'set rgb 115 154 195 248'
'set rgb 116 153 190 247'
'set rgb 117 153 185 247'
'set rgb 118 152 180 246'
'set rgb 119 151 175 246'
'set rgb 120 151 170 245'
'set rgb 121 150 165 244'
'set rgb 122 149 160 244'
'set rgb 123 149 155 243'
'set rgb 124 148 150 243'
'set rgb 125 147 145 242'
'set rgb 126 147 140 241'
'set rgb 127 148 135 241'
'set rgb 128 145 130 240'
'set rgb 129 145 125 240'
'set rgb 130 144 120 239'
'set rgb 131 148 125 232'
'set rgb 132 152 130 224'
'set rgb 133 156 135 217'
'set rgb 134 161 140 209'
'set rgb 135 165 145 202'
'set rgb 136 189 151 194'
'set rgb 137 173 156 187'
'set rgb 138 178 161 179'
'set rgb 139 182 166 172'
'set rgb 140 186 171 164'
'set rgb 141 191 176 157'
'set rgb 142 195 182 149'
'set rgb 143 199 187 141'
'set rgb 144 203 192 134'
'set rgb 145 208 197 126'
'set rgb 146 212 202 119'
'set rgb 147 216 208 111'
'set rgb 148 220 213 104'
'set rgb 149 225 218 96'
'set rgb 150 229 223 89'
'set rgb 151 233 228 81'
'set rgb 152 243 215 79'
'set rgb 153 244 191 92'
'set rgb 154 245 167 105'
'set rgb 155 247 143 118'
'set rgb 156 248 120 131'
'set rgb 157 249 96 144'
'set rgb 158 251 72 157'
'set rgb 159 252 48 170'
'set rgb 160 253 24 183'
'set rgb 161 255 0 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u1000=ugrdprs(lev=1000)'
'define u950=ugrdprs(lev=950)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

'define v1000=vgrdprs(lev=1000)'
'define v950=vgrdprs(lev=950)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/13.0'
'define ushear=u450-u1000'
'define vshear=v450-v1000'
'define ushear3=u700-u1000'
'define vshear3=v700-v1000'

'define shear3=sqrt((ushear3*ushear3+vshear3*vshear3))'
'define shear=sqrt(ushear*ushear+vshear*vshear)'
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'


'define srh1=((u950-umotion)*(v1000-vmotion)-(u1000-umotion)*(v950-vmotion))'
'define srh2=((u900-umotion)*(v950-vmotion)-(u950-umotion)*(v900-vmotion))'
'define srh3=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))'
'define srh4=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))'
'define srh5=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))'
'define srh6=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))'

'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6'

* visualisatie EHI
******************
'set gxout shaded'
'set csmooth on'
'set clevs 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0 1.1 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2.0 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 2.9 3.0 3.1 3.2 3.3 3.4 3.5 3.6 3.7 3.8 3.9 4.0 4.1 4.2 4.3 4.4 4.5 4.6 4.7 4.8 4.9 5.0 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 6.0'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161'
'd (cape180_0mb*srh3km)/160000'
'run cbarm'

'set gxout contour'
'set ccolor 0'
'set clab on'
'set cint 0.5'
'set cmin 0.5'
'set clopts -1'
'set clab masked'
*'set clab forced'
*'set cstyle 3'
'set cthick 3'
'set csmooth off'
'd (cape180_0mb*srh3km)/160000'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 '
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Energy Helicity index & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\ehi'i'.png x1024 y768'

'undefine u1000'
'undefine u950'
'undefine u900'
'undefine u850'
'undefine u800'
'undefine u750'
'undefine u700'
'undefine u650'
'undefine u600'
'undefine u550'
'undefine u500'
'undefine u450'
'undefine u400'

'undefine v1000'
'undefine v950'
'undefine v900'
'undefine v850'
'undefine v800'
'undefine v750'
'undefine v700'
'undefine v650'
'undefine v600'
'undefine v550'
'undefine v500'
'undefine v450'
'undefine v400'

'undefine umean'
'undefine vmean'
'undefine ushear'
'undefine vshear'
'undefine ushear3'
'undefine vshear3'

'undefine shear3'
'undefine shear'
'undefine umotion'
'undefine vmotion'

'undefine srh1'
'undefine srh2'
'undefine srh3'
'undefine srh4'
'undefine srh5'
'undefine srh6'

'undefine srh3km'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'

****************************************************************
* K-index                      *
****************************************************************

*DECLARATIE
'set lev 500'
't500 = t-273.15'

'set lev 700'
't700 = t-273.15'

'td700 = (243.12*(log(rh/100)+((17.62*t700)/(243.12+t700))))/(17.62-(log(rh/100)+((17.62*t700)/(243.12+t700))))'

'set lev 850'
't850 = t-273.15'
'td850 = (243.12*(log(rh/100)+((17.62*t850)/(243.12+t850))))/(17.62-(log(rh/100)+((17.62*t850)/(243.12+t850))))'

'kindex = ((t850-t500)+td850-(t700-td700))'

'color -10 40 1 -gxout shaded -kind (160,0,200)-(6)->(130,0,220)-(4)->(0,100,254)-(3)->(0,200,254)-(4)->(40,230,160)-(3)->(160,230,50)-(5)->yellow-(5)->(240,130,40)-(2)->(220,75,30)-(5)->(200,0,100)-(5)->(255,0,200)'

'd kindex'

'cbarn'

'set gxout contour'
'set cmin 20'
'set cint 5'

'd kindex'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Michael Verhaeghe (Fastowarn/Chase2Be)'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 '
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Soaring Index (C)'

'printim C:\OpenGrADS\OutputGFSSevere\soaring'i'.png x1024 y768'

****************************************************************
* 500mb absolute vorticity & streamlines                       *
****************************************************************

'set grads off'

* stroomlijnensiteit
********************
'set strmden 6'

* kleurentabel
**************
'set rgb 110 255 254 255 200'
'set rgb 111 236 213 241 200'
'set rgb 112 217 171 227 200'
'set rgb 113 198 130 213 200'
'set rgb 114 179 88 199 200'
'set rgb 115 154 41 182 200'
'set rgb 116 148 37 186 200'
'set rgb 117 142 33 190 200'
'set rgb 118 135 29 194 200'
'set rgb 119 129 25 199 200'
'set rgb 120 123 21 203 200'
'set rgb 121 117 17 207 200'
'set rgb 122 111 13 212 200'
'set rgb 123 104 9 216 200'
'set rgb 124 98 5 220 200'
'set rgb 125 92 1 224 200'
'set rgb 126 82 22 228 200'
'set rgb 127 73 44 231 200'
'set rgb 128 65 67 233 200'
'set rgb 129 58 84 235 200'
'set rgb 130 48 112 239 200'
'set rgb 131 39 134 241 200'
'set rgb 132 30 157 244 200'
'set rgb 133 24 173 246 200'
'set rgb 134 13 201 249 200'
'set rgb 135 5 224 252 200'
'set rgb 136 2 223 245 200'
'set rgb 137 2 215 237 200'
'set rgb 138 2 208 229 200'
'set rgb 139 2 200 220 200'
'set rgb 140 2 193 212 200'
'set rgb 141 2 185 204 200'
'set rgb 142 2 178 196 200'
'set rgb 143 1 170 187 200'
'set rgb 144 1 153 179 200'
'set rgb 145 1 155 171 200'
'set rgb 146 1 148 153 200'
'set rgb 147 1 140 154 200'
'set rgb 148 1 133 146 200'
'set rgb 149 1 125 138 200'
'set rgb 150 1 119 132 200'
'set rgb 150 1 105 124 200'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie 500mb vorticity
******************************
'set gxout shaded'
'set csmooth on'
'set lev 500'
'set cint 1e-05'
'set clevs 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49'
'set ccols 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150'
'd absvprs*100000'
'run cbarm'

* visualisatie 500mb wind
*************************
'define u10  = const(ugrdprs(lev=500),0,-u)'
'define v10  = const(vgrdprs(lev=500),0,-u)'
'set gxout stream'
'set ccolor 15'
'd u10;v10'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Fastowarn - Chase2be: Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 1e-5 s-1'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 500mb vorticity, windfield & gpm'

'printim C:\OpenGrADS\OutputGFSSevere\vort'i'.png x1024 y768'

'undefine u10'
'undefine v10'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'



********************************************************
* MLS, convective precip contours & 500mb geopotentiele hoogte      *
********************************************************

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 235 248 238'
'set rgb 102 209 239 215'
'set rgb 103 189 231 197'
'set rgb 104 163 222 175'
'set rgb 105 143 214 157'
'set rgb 106 117 205 135'
'set rgb 107 96 197 117'
'set rgb 108 71 183 94'
'set rgb 109 51 171 75'
'set rgb 110 26 156 51'
'set rgb 111 66 174 42'
'set rgb 112 116 196 31'
'set rgb 113 157 214 21'
'set rgb 114 207 237 10'
'set rgb 115 248 255 0'
'set rgb 116 240 229 4'
'set rgb 117 233 208 8'
'set rgb 118 224 182 13'
'set rgb 119 218 161 16'
'set rgb 120 209 135 21'
'set rgb 121 202 113 25'
'set rgb 122 194 87 29'
'set rgb 123 187 66 33' 
'set rgb 124 177 40 38'
'set rgb 125 171 19 42'
'set rgb 126 185 6 87'
'set rgb 127 199 5 122'
'set rgb 128 218 4 156'
'set rgb 129 232 3 201'
'set rgb 130 243 2 236'
'set rgb 131 255 0 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u10  = const(ugrd10m,0,-u)'
'define u450=ugrdprs(lev=450)'
'define u900=ugrdprs(lev=900)'

'define v10  = const(vgrd10m,0,-u)'
'define v450=vgrdprs(lev=450)'
'define v900=vgrdprs(lev=900)'

'define usheardls=u450-u10'
'define vsheardls=v450-v10'

'define ushearlls=u900-u10'
'define vshearlls=v900-v10'

'define ushearmls=usheardls-ushearlls'
'define vshearmls=vsheardls-vshearlls'
'define shear=sqrt(ushearmls*ushearmls+vshearmls*vshearmls)'

* visualisatie DLS
******************
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131'
'd shear'
'run cbarm'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 0'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* visualisatie 10m stroomlijnen (depricated)
*******************************
*'set gxout stream'
*'set ccolor 1'
*'d u10;v10'

* visualisatie precip contours
******************************
'set gxout contour'
'set ccolor 1'
'set clab off'
'set cint 0.5'
'set cmin 1'
'set clopts -1'
'set cstyle 3'
'set cthick 5'
'set smooth off'
'd acpcpsfc'


* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 ms-1'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 cloud depth shear: steering layer, 500mb gpm & c.precip'

'printim C:\OpenGrADS\OutputGFSSevere\mls'i'.png x1024 y768'

'undefine u10'
'undefine u450'
'undefine u900'

'undefine v10'
'undefine v450'
'undefine v900'

'undefine usheardls'
'undefine vsheardls'

'undefine ushearlls'
'undefine vshearlls'

'undefine ushearmls'
'undefine vshearmls'
'undefine shear'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


********************************************************
* Storm motion speed & streamlines                     *
********************************************************


* stroomlijndensiteit
*********************
'set strmden 5'

'set grads off'

* kleurentabel
**************
'set rgb 101 236 247 254'
'set rgb 102 216 239 253'
'set rgb 103 186 227 252'
'set rgb 104 166 219 251'
'set rgb 105 154 195 248'
'set rgb 106 151 175 246'
'set rgb 107 158 154 243'
'set rgb 108 144 124 240'
'set rgb 109 141 103 237'
'set rgb 110 141 87 230'
'set rgb 111 147 96 221'
'set rgb 112 153 105 211'
'set rgb 113 162 118 196'
'set rgb 114 168 127 187'
'set rgb 115 177 141 172'
'set rgb 116 183 150 162'
'set rgb 117 189 159 153'
'set rgb 118 199 173 138'
'set rgb 119 205 182 128'
'set rgb 120 214 195 114'
'set rgb 121 220 204 104'
'set rgb 122 226 213 94'
'set rgb 123 235 227 80' 
'set rgb 124 241 236 70'
'set rgb 125 247 245 60'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u1000=ugrdprs(lev=1000)'
'define u950=ugrdprs(lev=950)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'

'define v1000=vgrdprs(lev=1000)'
'define v950=vgrdprs(lev=950)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'

* stormmotion
'define umean=(u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/13.0'
'define vmean=(v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+u400)/13.0'
'define stormspeedmag=(sqrt(umean*umean+vmean*vmean))*3.6'

* storm motion windmagnitude
****************************
'set gxout shaded'
'set csmooth on'
'set cint 4'
'set cmin 4'
'set clevs 4 8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68 72 76 80 84 88 92 96'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125'
'd stormspeedmag'
'run cbarm'

* visualisatie storm motion streamlines
***************************************
'set arrlab off'
'set gxout stream'
'set ccolor 1'
'd umean;vmean'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 km/u'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Stormspeed & stormmotion (streamlines)'

'printim C:\OpenGrADS\OutputGFSSevere\stormspeed'i'.png x1024 y768'


'undefine u1000'
'undefine u950'
'undefine u900'
'undefine u850'
'undefine u800'
'undefine u750'
'undefine u700'
'undefine u650'
'undefine u600'
'undefine u550'
'undefine u500'
'undefine u450'
'undefine u400'

'undefine v1000'
'undefine v950'
'undefine v900'
'undefine v850'
'undefine v800'
'undefine v750'
'undefine v700'
'undefine v650'
'undefine v600'
'undefine v550'
'undefine v500'
'undefine v450'
'undefine v400'

'undefine umean'
'undefine vmean'
'undefine ushear'
'undefine vshear'
'undefine ushear3'
'undefine vshear3'

'undefine shear3'
'undefine shear'
'undefine umotion'
'undefine vmotion'

'undefine srh1'
'undefine srh2'
'undefine srh3'
'undefine srh4'
'undefine srh5'
'undefine srh6'

'undefine srh3km'

'undefine stormspeedmag'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'


********************************************************
* DLS, convective precip contours & 500mb geopotentiele hoogte      *
********************************************************

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 235 248 238'
'set rgb 102 209 239 215'
'set rgb 103 189 231 197'
'set rgb 104 163 222 175'
'set rgb 105 143 214 157'
'set rgb 106 117 205 135'
'set rgb 107 96 197 117'
'set rgb 108 71 183 94'
'set rgb 109 51 171 75'
'set rgb 110 26 156 51'
'set rgb 111 66 174 42'
'set rgb 112 116 196 31'
'set rgb 113 157 214 21'
'set rgb 114 207 237 10'
'set rgb 115 248 255 0'
'set rgb 116 240 229 4'
'set rgb 117 233 208 8'
'set rgb 118 224 182 13'
'set rgb 119 218 161 16'
'set rgb 120 209 135 21'
'set rgb 121 202 113 25'
'set rgb 122 194 87 29'
'set rgb 123 187 66 33' 
'set rgb 124 177 40 38'
'set rgb 125 171 19 42'
'set rgb 126 185 6 87'
'set rgb 127 199 5 122'
'set rgb 128 218 4 156'
'set rgb 129 232 3 201'
'set rgb 130 243 2 236'
'set rgb 131 255 0 255'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* declaratie variabelen en berekeningen
***************************************
'define u10  = const(ugrd10m,0,-u)'
'define u450=ugrdprs(lev=450)'

'define v10  = const(vgrd10m,0,-u)'
'define v450=vgrdprs(lev=450)'

'define ushear=u450-u10'
'define vshear=v450-v10'
'define shear=sqrt(ushear*ushear+vshear*vshear)'

* visualisatie DLS
******************
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131'
'd shear'
'run cbarm'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set gxout contour'
'set ccolor 0'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* visualisatie 10m stroomlijnen (depricated)
*******************************
*'set gxout stream'
*'set ccolor 1'
*'d u10;v10'

* visualisatie precip contours
******************************
'set gxout contour'
'set ccolor 1'
'set clab off'
'set cint 0.25'
'set cmin 0.5'
'set clopts -1'
'set cstyle 3'
'set cthick 5'
'set smooth off'
'd acpcpsfc'


* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 ms-1'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 0-6km Bulk shear, 500mb gpm & convective precip'

'printim C:\OpenGrADS\OutputGFSSevere\dls'i'.png x1024 y768'

'define u10'
'define u450'

'define v10'
'define v450'

'define ushear'
'define vshear'
'define shear'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


********************************************************
* BRN Shear en SBCAPE *
********************************************************
******************************************************
* CAPE                                               *
******************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 255 254 254'
'set rgb 102 208 231 196'
'set rgb 103 161 208 137'
'set rgb 104 113 185 79'
'set rgb 105 59 158 12'
'set rgb 106 64 191 4'
'set rgb 107 76 228 4'
'set rgb 108 254 254 0'
'set rgb 109 248 236 2'
'set rgb 110 242 218 4'
'set rgb 111 235 197 6'
'set rgb 112 229 179 8'
'set rgb 113 223 160 10'
'set rgb 114 216 139 13'
'set rgb 115 210 121 15'
'set rgb 116 204 103 17'
'set rgb 117 197 82 19'
'set rgb 118 191 64 22'
'set rgb 119 185 45 24'
'set rgb 120 179 27 26'
'set rgb 121 172 6 28'
'set rgb 122 185 3 50'
'set rgb 123 199 2 72'
'set rgb 124 215 2 97'
'set rgb 125 229 1 119'
'set rgb 126 243 1 140'     
'set rgb 127 245 27 164'     
'set rgb 128 247 51 185'     
'set rgb 129 249 74 206'     
'set rgb 130 252 101 230'
'set rgb 131 254 124 251' 
'set rgb 132 231 101 228' 
'set rgb 133 203 74 202' 
'set rgb 134 180 51 178'
'set rgb 135 156 27 155'
'set rgb 136 132 4 132'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie cape
*******************
'set gxout shaded'
'set csmooth on'
'set clevs 100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000 2100 2200 2300 2400 2500 2600 2700 2800 2900 3000 3200 3400 3600 3800 4000'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136'
'd capesfc'
'run cbarm'

* visualisatie 10m windveld
***************************
'define u10  = const(ugrd10m,0,-u)'
'define v10  = const(vgrd10m,0,-u)'
'set gxout stream'
'set ccolor 15'
'd u10;v10'

*SHEAR
***************************************************
*500m

'set lev 1000'
'u1000 = u'
'v1000 = v'

'set lev 950'
'u950 = u'
'v950 = v'

'averageu500m = (u10m+u1000+u950)/3'
'averagev500m = (v10m+v1000+v950)/3'

***************************************************
*6km

'set lev 900'
'u900 = u'
'v900 = v'

'set lev 850'
'u850 = u'
'v850 = v'

'set lev 800'
'u800 = u'
'v800 = v'

'set lev 750'
'u750 = u'
'v750 = v'

'set lev 700'
'u700 = u'
'v700 = v'

'set lev 650'
'u650 = u'
'v650 = v'

'set lev 600'
'u600 = u'
'v600 = v'

'set lev 550'
'u550 = u'
'v550 = v'

'set lev 500'
'u500 = u'
'v500 = v'

'averageu6km = (u10m+u1000+u950+u900+u850+u800+u750+u700+u650+u600+u550+u500)/12'
'averagev6km = (v10m+v1000+v950+v900+v850+v800+v750+v700+v650+v600+v550+v500)/12'


*VERSCHIL
'umeandiff = averageu6km-averageu500m'
'vmeandiff = averagev6km-averagev500m'

*RESULTANTE
'rmeansheardiff = sqrt(umeandiff*umeandiff+vmeandiff*vmeandiff)'


*BRN
'brnshear = 0.5*(rmeansheardiff*rmeansheardiff)'


*DISPLAY
'set csmooth on'

'set gxout contour'
'set cmin 0'
'set cint 5'
'set cthick 10'

'd brnshear'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa & Michael Verhaeghe (Fastowarn/Chase2Be)'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 J/kg'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 SBCAPE, 10m windfield & BRN Shear (m/s)'

'printim C:\OpenGrADS\OutputGFSSevere\capebrn'i'.png x1024 y768'

'undefine u10'
'undefine v10'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'




********************************************************
* Precipitable water, 850-500mb shear & 10m windvector *
********************************************************

'set grads off'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 247 249 255'
'set rgb 103 239 242 255'
'set rgb 104 230 236 255'
'set rgb 105 222 229 255'
'set rgb 106 214 222 255'
'set rgb 107 205 216 255'
'set rgb 108 197 209 255'
'set rgb 109 189 203 255'
'set rgb 110 180 196 255'
'set rgb 111 172 189 255'
'set rgb 112 164 183 255'
'set rgb 113 155 176 255'
'set rgb 114 147 169 255'
'set rgb 115 138 163 255'
'set rgb 116 130 156 255'
'set rgb 117 122 150 255'
'set rgb 118 113 143 255'
'set rgb 119 105 136 255'
'set rgb 120 97 130 255'
'set rgb 121 86 123 255'
'set rgb 122 80 116 255'
'set rgb 123 72 110 255' 
'set rgb 124 63 103 255'
'set rgb 125 55 97 255'
'set rgb 126 46 90 255'
'set rgb 127 38 83 255'
'set rgb 128 30 77 255'
'set rgb 129 21 70 255'
'set rgb 130 17 67 255'
'set rgb 131 5 57 255'
'set rgb 132 27 52 255'
'set rgb 133 50 47 255'
'set rgb 134 72 41 255'
'set rgb 135 95 36 255'
'set rgb 136 117 30 255'
'set rgb 137 140 25 255'
'set rgb 138 162 20 255'
'set rgb 139 185 14 255'
'set rgb 140 208 9 255'
'set rgb 141 230 3 255'
'set rgb 142 232 3 230'
'set rgb 143 235 3 204'
'set rgb 144 237 3 179'
'set rgb 145 240 2 153'
'set rgb 146 242 2 128'
'set rgb 147 245 2 102'
'set rgb 148 247 1 77'
'set rgb 149 250 1 51'
'set rgb 150 252 1 26'
'set rgb 151 253 1 13'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* windvariabelen 10m
********************
'define u10=const(ugrd10m,0,-u)'
'define v10=const(vgrd10m,0,-u)'

* pwat variabelen
'define pw=const(pwatclm,0,-u)'

* windvariabelen 500mb
'define u500=ugrdprs(lev=500)'
'define v500=vgrdprs(lev=500)'

* windvariabelen 850mb
'define u850=ugrdprs(lev=850)'
'define v850=vgrdprs(lev=850)'

* berekening 850,500mb windshearvector
'define ushear=u500-u850'
'define vshear=v500-v850'

* visualisatie PW
****************

'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151'
'd pw'
'run cbarm'

* visualisatie 10m wind
***********************
'set arrlab off'
'set gxout barb'
'set ccolor 15'
'd skip(u10,2,2);v10'

* visualisatie 850-500mb windshearvector
****************************************
'set ccolor 0'
'd skip(ushear,2,2);vshear'

* visualisatie 500mb gpm
************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'set lev 500'
'set cthick 5'
'd hgtprs'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 mm'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 TPW, 850-500mb shear(white), 10m wind(grey) & 500mb gpm'

'printim C:\OpenGrADS\OutputGFSSevere\pwat'i'.png x1024 y768'

'undefine u10'
'undefine v10'

'undefine pw'

'undefine u500'
'undefine v500'

'undefine u850'
'undefine v850'

'undefine ushear'
'undefine vshear'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'

'quit'


* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* END OF MAIN SCRIPT                                        *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function setmap(args)
*'set mproj lambert'
*'set mpvals 15 52 54 71'
'set lon -20 40'
'set lat 40 60'
'set mpdset hires'

'set display color white'
'set background 98'
'c'
'set grads off'

*'set parea 0.02 9.54 0.8 8.50'
'set parea off'
'set rgb 99 1 1 1'
*'draw rec 0.02 0.02 9.54 0.81'
*'draw rec 9.54 0.02 10.99 8.48'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function vrng(f1,f2)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymx = subwrd(data,5)
ymn = subwrd(data,4)
'd 'f2
data = sublin(result,8)
zmx = subwrd(data,5)
zmn = subwrd(data,4)
if (zmx > ymx) ; ymx = zmx ; endif
if (zmn < ymn) ; ymn = zmn ; endif
dy = ymx-ymn
ymx = ymx + 0.08 * dy
ymn = ymn - 0.08 * dy
if ((ymx-ymn)/2.2 < 1)
  incr = (ymx-ymn)/4
  incr = 0.01 * (math_nint(100*incr))
else
  incr = math_nint((ymx-ymn)/4)
endif
'set vrange 'ymn' 'ymx
'set ylint 'incr
if (ymn=0 & ymx=0 & incr=0)
  'set vrange -.9 .9'
  'set ylint 1'
endif
'set gxout line'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function rh2vrng(f1)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymn = subwrd(data,4)
ymx = subwrd(data,5)
if (ymn < 20) 
  miny = 0 
  'set ylevs 20 40 60 80'
endif
if (ymn >= 20 & ymn < 30) 
  miny = 20 
  'set ylevs 30 50 70 90'
endif
if (ymn >= 30 & ymn < 40) 
  miny = 30 
  'set ylevs 40 50 60 70 80 90'
endif
if (ymn >= 40 & ymn < 50) 
  miny = 40 
  'set ylevs 50 60 70 80 90'
endif
if (ymn >= 50 & ymn < 60) 
  miny = 50
  'set ylevs 60 70 80 90'
endif
if (ymn >= 60) 
  miny = 60
  'set ylevs 70 80 90'
endif
'set vrange 'miny' 'ymx+3
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function isen(field,tgrid,pgrid,tlev)
*----------------------------------------------------------------------
* Bob Hart (hart@ems.psu.edu) /  PSU Meteorology
* 2/26/1999
*
* 2/26/99 - Fixed a bug that caused the script to crash on
*           certain machines.  
*
* GrADS function to interpolate within a 3-D grid to a specified
* isentropic level.  Can also be used on non-pressure level data, such
* as sigma or eta-coordinate output where pressure is a function
* of time and grid level.  Can be used to create isentropic PV surfaces
* (examples are given at end of documentation just prior to
* function.)
* 
* Advantages:  Easy to use, no UDFs.  Disadvantages:  Can take 5-20 secs.
*
* Arguments:
*    field = name of 3-D grid to interpolate
*
*    tgrid = name of 3-D grid holding temperature values (deg K) at each
*            gridpoint.
*
*    pgrid = name of 3-D grid holding pressure values (mb) at each gridpoint
*            If you are using regular pressure-level data, this should be
*            set to the builtin GrADS variable 'lev'.
*
*    tlev  = theta-level (deg K) at which to interpolate
*
* Function returns:  defined grid interp holding interpolated values
*
* NOTE:  YOU NEED TO INCLUDE A COPY OF THIS FUNCTION IN YOUR SCRIPT
*
* NOTE:  Areas having tlev below bottom level or above upper level 
*        will be undefined in output field. Extrapolation is NOT
*        performed!!
*
*------------------------------------------------------------------------
*
* EXAMPLE FUNCTION CALLS:
*
* Sample variables: u = u-wind in m/s
*                   v = v-wind in m/s
*                   w = vertical velocity
*                   t = temperature in K
*                  PP = pressure data in mb
*
* 1) Display vertical velocity field on 320K surface:
* 
*    'd 'isen(w,t,PP,320)
*
* 2) Create & Display colorized streamlines on 320K surface:
*
*    'define u320='isen(ugrdprs,tmpprs,lev,320)
*    'define v320='isen(vgrdprs,tmpprs,lev,320)
*    'set z 1'
*    'set gxout stream'
*    'd u320;v320;mag(u320,v320)'
*
* 3) Create & display a 320K isentropic PV surface:
*
*    'set lev 1050 150'
*    'define coriol=2*7.29e-5*sin(lat*3.1415/180)'
*    'define dudy=cdiff(u,y)/(111177*cdiff(lat,y))'
*    'define dvdx=cdiff(v,x)/(111177*cdiff(lon,x)*cos(lat*3.1415/180))'
*    'define dt=t(z-1)*pow(1000/PP(z-1),0.286)-t(z+1)*pow(1000/PP(z+1),0.286)'
*    'define dp=100*(PP(z-1)-PP(z+1))'
*    'define dtdp=dt/dp'
*    'define part1='isen(dvdx,t,PP,320)
*    'define part2='isen(dudy,t,PP,320)
*    'define part3='isen(dtdp,t,PP,320)
*    'define pv320=-9.8*(coriol+part1-part2)*part3'
*    'set z 1'
*    'd pv320'
*
* PROBLEMS:  Send email to Bob Hart (hart@ems.psu.edu)
* 
*-----------------------------------------------------------------------
*-------------------- BEGINNING OF FUNCTION ----------------------------
*-----------------------------------------------------------------------

* Get initial dimensions of dataset so that exit dimensions will be
* same

'q dims'
rec=sublin(result,4)
ztype=subwrd(rec,3)
if (ztype = 'fixed') 
   zmin=subwrd(rec,9)
   zmax=zmin
else
   zmin=subwrd(rec,11)
   zmax=subwrd(rec,13)
endif

* Get full z-dimensions of dataset.

'q file'
rec=sublin(result,5)
zsize=subwrd(rec,9)

* Determine spatially varying bounding pressure levels for isen surface
* tabove = theta-value at level above ; tbelow = theta value at level
* below for each gridpoint

'set z 1 'zsize
'define theta='tgrid'*pow(1000/'pgrid',0.286)'
'set z 2 'zsize
'define thetam='tgrid'(z-1)*pow(1000/'pgrid'(z-1),0.286)'
'set z 1 'zsize-1
'define thetap='tgrid'(z+1)*pow(1000/'pgrid'(z+1),0.286)'

'define tabove=0.5*maskout(theta,theta-'tlev')+0.5*maskout(theta,'tlev'-thetam)'
'define tbelow=0.5*maskout(theta,thetap-'tlev')+0.5*maskout(theta,'tlev'-theta)'

* Isolate field values at bounding pressure levels
* fabove = requested field value above isen surface
* fbelow = requested field value below isen surface

'define fabove=tabove*0+'field
'define fbelow=tbelow*0+'field

'set z 1'

* Turn this 3-D grid of values (mostly undefined) into a 2-D isen layer

* If more than one layer is valid (rare), take the mean of all the
* valid levels. Not the best way to deal with the multi-layer issue,
* but works well, rarely if ever impacts output, and is quick.
* Ideally, only the upper most level would be used.  However, this
* is not easily done using current GrADS intrinsic functions.

'define fabove=mean(fabove,z=1,z='zsize')'
'define fbelow=mean(fbelow,z=1,z='zsize')'
'define tabove=mean(tabove,z=1,z='zsize')'
'define tbelow=mean(tbelow,z=1,z='zsize')'

* Finally, interpolate linearly in theta and create isen surface.
* Linear interpolation in theta works b/c it scales as height,
* or log-P, from Poisson equation for pot temp.

'set z 'zmin ' ' zmax

'define slope=(fabove-fbelow)/(tabove-tbelow)'
'define b=fbelow-slope*tbelow'
'define interp=slope*'tlev'+b'

* variable interp now holds isentropic field and its named it returned
* for use by the user.

say 'Done.  Newly defined variable interp has 'tlev'K 'field'-field.'

return(interp)
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
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

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getgrid(dodsvar,myvar)

'set lon '_xdim
'set lat '_ydim
'set lev '_zgrd
'set time '_tdim

* schrijf een variabele naar een bestand
'set gxout fwrite'
'set fwrite dummy.dat'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand (.ctl)
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_zdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_zbot' '_ztop
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getetarh(dodsvar,myvar)

* drukveriabelen eruit halen
tmpzgrd = _zgrd
tmpzdef = _zdef
tmpzbot = _zbot
tmpztop = _ztop
tmpzsize = _newzsize

* rh data over de rh-druk range
_zgrd = _rhzgrd
_zdef = _trhzdef
_ztop = _rhztop
_zbot = _rhzbot
_newzsize = _trhzsize
getgrid(dodsvar,tmprh)

* stop er de originele drukveriabelen terug in
_zgrd = tmpzgrd
_zdef = tmpzdef
_zbot = tmpzbot
_ztop = tmpztop
_newzsize = tmpzsize

'set lon '_xdim
'set lat '_ydim
'set lev '_rhzgrd
'set time '_tdim

* schrijf de veriabelen naar een textfile
'set gxout fwrite'
'set fwrite dummy.dat'
t = _t1
while (t <= _t2)
  'set t 't
  z = 1
  while (z <= _newrhzsize)
    level = subwrd(_rhlevs,z) 
    'set lev 'level
    'd tmprh'
    z = z + 1
  endwhile
  t = t + 1
endwhile
'disable fwrite'

* schrijf terug het descriptor bestand (ctl) 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_rhzdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newrhzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* open het dummy bestand, maak instanties aan & sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_rhzbot' '_rhztop
'set time '_time1' '_time2
'q dims'
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getseries(dodsvar,myvar,level)

*'set lon '_xdim
*'set lat '_ydim
*'set lev 'level' 'level
'set time '_tdim

* schrijf een veriabele naar een bestand
'set fwrite dummy.dat'
'set gxout fwrite'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,'zdef 1 linear 1 1',append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy 0 -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close(dummy.ctl)

* open het dummy bestand, maak een variabele aan en sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev 'level
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
'set gxout contour'

return
