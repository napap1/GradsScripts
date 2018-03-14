function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'

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
'set grid off'
'set ylab off'
'set parea 0.04 9.7 0.8 8.0'
'set grid off'

'set grads off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 82

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

****************************************************************
* Upper level watervapor, 500mb geopotential height & isotachs *
****************************************************************

'set grads off'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

say 'timestep: ' i

**

* kleurentabel
**************
'color.gs 0 100 1 -gxout shaded -kind (30,30,30)-(100)->(230,230,230)'

'd rhprs(lev=700)'

* visualisatie 700mb Theta-E
*******************************
'set rgb 101 125 0 91' 
'set rgb 102 119 1 101'
'set rgb 103 112 2 111'
'set rgb 104 105 3 121'
'set rgb 105 99 4 132'
'set rgb 106 92 5 142'
'set rgb 107 85 6 152'
'set rgb 108 79 7 162'
'set rgb 109 72 9 173'
'set rgb 110 65 10 183'
'set rgb 111 59 11 193'
'set rgb 112 52 12 203'
'set rgb 113 45 13 214'
'set rgb 114 39 14 224'
'set rgb 115 32 15 234'
'set rgb 116 25 16 244'
'set rgb 117 18 18 255'
'set rgb 118 17 30 235'
'set rgb 119 15 43 215'
'set rgb 120 14 55 195'
'set rgb 121 12 68 175'
'set rgb 122 10 81 155'
'set rgb 123 9 93 135' 
'set rgb 124 7 106 115'
'set rgb 125 5 119 95'
'set rgb 126 5 134 75'
'set rgb 127 6 149 55'
'set rgb 128 7 164 35'
'set rgb 129 8 179 15'
'set rgb 130 39 188 14'
'set rgb 131 70 198 12'
'set rgb 132 101 207 10'
'set rgb 133 132 217 8'
'set rgb 134 162 226 6'
'set rgb 135 193 236 4'
'set rgb 136 224 245 2'
'set rgb 137 255 255 0'
'set rgb 138 252 240 0'
'set rgb 139 248 225 0'
'set rgb 140 245 210 1'
'set rgb 141 241 195 1'
'set rgb 142 238 180 1'
'set rgb 143 234 165 2'
'set rgb 144 231 150 2'
'set rgb 145 227 135 2'
'set rgb 146 224 120 3'
'set rgb 147 220 105 3'
'set rgb 148 217 90 3'
'set rgb 149 213 75 4'
'set rgb 150 210 60 4'
'set rgb 151 206 45 4'
'set rgb 152 203 30 5'
'set rgb 153 199 15 5'
'set rgb 154 200 8 32'
'set rgb 155 205 17 58'
'set rgb 156 210 26 84'
'set rgb 157 215 35 110'
'set rgb 158 220 44 136'
'set rgb 159 225 53 162'
'set rgb 160 230 62 188'
'set rgb 161 235 71 214'
'set rgb 162 236 84 217'
'set rgb 163 237 97 220'
'set rgb 164 239 110 223'
'set rgb 165 240 123 226'
'set rgb 166 241 136 229'
'set rgb 167 243 149 232'
'set rgb 168 244 162 235'
'set rgb 169 246 175 238'
'set rgb 170 247 188 241'
'set rgb 171 248 201 244'
'set rgb 172 250 214 247'
'set rgb 173 251 227 250'

*'define t = tmpprs(lev=700)'
*'define rh = rhprs(lev=700)'
*'define dewp700mb = (t-273.15)-((14.55+0.114*(t-273.15))*(1-0.01*rh)+pow((2.5+0.007*(t-273.15))*(1-0.01*rh),3)+(15.9+0.117*(t-273.15))*pow((1-0.01*rh),14))'
*'define vapr700mb = 6.112*exp((17.67*dewp700mb)/(dewp700mb+243.5))'
*'define e700mb    = vapr700mb*1.001+(700-100)/900*0.0034'
*'define w700mb    = 0.62197*(e700mb/(700-e700mb))'
*'define te700mb   = (t+(2260000*w700mb/1004))'
*'define ept700mb1  = (te700mb*pow((1000/700),(287/1004)))-273.16'

*'set gxout contour'
*'set csmooth on'
*'set cstyle 1'
*'set cthick 1'
*'set clab masked'
*'set clopts -1'

*'set clevs 1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39  40  41  42  43  44  45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72'
*'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 170 172 173'
*'d ept700mb1'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set rgb 101 0 255 255'
'set gxout contour'
'set csmooth on'
'set ccolor 1'
'set cint 60'
'set clab off'
'set lev 500'
'set cthick 7'
'd hgtprs'

* visualisatie 300-200mb windbarbs
*****************************
* kleurtabel
'set rgb 101 0 0 255' 
'set rgb 102 0 72 255'
'set rgb 103 0 157 255'
'set rgb 104 0 242 255'
'set rgb 105 2 224 183'
'set rgb 106 5 202 99'
'set rgb 107 8 179 15'
'set rgb 108 65 196 12'
'set rgb 109 131 216 8'
'set rgb 110 198 237 4'
'set rgb 111 255 255 0'
'set rgb 112 250 229 0'
'set rgb 113 244 203 0'
'set rgb 114 239 180 0'
'set rgb 115 234 154 0'
'set rgb 116 228 128 0'
'set rgb 117 223 105 0'
'set rgb 118 231 80 0'
'set rgb 119 239 55 0'
'set rgb 120 245 33 0'
'set rgb 121 253 8 0'
'set rgb 122 219 7 28'
'set rgb 123 190 5 52' 
'set rgb 124 156 4 80'
'set rgb 125 122 2 108'
'set rgb 126 92 1 132'
'set rgb 127 124 1 156'
'set rgb 128 157 1 181'
'set rgb 129 184 1 202'
'set rgb 130 217 1 226'
'set rgb 131 255 0 255'

'define u300 = ugrdprs(lev=300)*1.943844'
'define v300 = vgrdprs(lev=300)*1.943844'
'define u250 = ugrdprs(lev=250)*1.943844'
'define v250 = vgrdprs(lev=250)*1.943844'
'define umean = (u300 + u250)/2'
'define vmean = (v300 + v250)/2'
'define windspeed = sqrt(umean * umean + vmean * vmean)'

'set gxout vector'
'set csmooth on'
'set cthick 1'
'set digsiz 2'

'set clevs 0   5   10  15  20  25  30  35  40  45  50  55  60  65  70  75  80  85  90  95  100 105 110 115 120 125 130 135 140 145'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131'

'd skip(umean,4,4);vmean;windspeed'

'run cbarm'

* visualisatie 500mb isotachs
*****************************
'set rgb 180 255 0 255'
'define u500 = ugrdprs(lev=500)'
'define v500 = vgrdprs(lev=500)'
'define windspeed = sqrt(u500*u500 + v500*v500)'
'set gxout contour'
'set csmooth on'
'set ccolor 0'
'set cmin 50'
'set cint 10'
'set cthick 5'
'set clopts -1'
'set clab masked'

'd windspeed*1.943844'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <----------- kts, higher means faster Jetstream ----------->'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 700mb RH(%), 500mb GPM+Isot(>50kts) & 250-300mb wvect'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.0.2.oga.2\i686\rh700jets'i'.png x1024 y768'

'clear'
'set grads off'

* loop progressie
*****************
i = i+1
endwhile
'set grads off'

'quit'


* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* END OF MAIN SCRIPT                                        *
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


return
