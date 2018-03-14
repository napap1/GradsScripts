function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'
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

maps = 249

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

'run constants.gs'

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
say '700mb Relative humidity'
'color.gs 0 100 1 -gxout shaded -kind (30,30,30)-(100)->(230,230,230)'

'd rhprs(lev=700)'
'run cbarm'

* visualisatie BL temperature advection
***************************************
say 'BL temp advection'
'set rgb 101 255 0 250'
'set rgb 102 234 3 250'
'set rgb 103 213 7 250'
'set rgb 104 192 10 250'
'set rgb 105 171 14 250'
'set rgb 106 150 17 250'
'set rgb 107 129 21 250'
'set rgb 108 108 24 250'
'set rgb 109 87 28 250'
'set rgb 110 66 31 250'
'set rgb 111 45 35 250'
'set rgb 112 0 39 235'
'set rgb 113 0 50 219'
'set rgb 114 0 62 204'
'set rgb 115 0 73 188'
'set rgb 116 0 84 172'
'set rgb 117 0 96 157'
'set rgb 118 0 107 141'
'set rgb 119 0 119 125'
'set rgb 120 0 130 110'
'set rgb 121 0 141 94'
'set rgb 122 0 153 79'
'set rgb 123 0 164 63'
'set rgb 124 0 175 47'
'set rgb 125 0 187 32'
'set rgb 126 0 198 16'
'set rgb 127 51 209 63'
'set rgb 128 102 220 111'
'set rgb 129 153 232 159'
'set rgb 130 204 243 207'
'set rgb 131 255 247 255'
'set rgb 132 250 250 180'
'set rgb 133 250 250 143'
'set rgb 134 255 250 123'
'set rgb 135 255 255 74'
'set rgb 136 255 255 37'
'set rgb 137 255 241 36'
'set rgb 138 255 227 34'
'set rgb 139 255 213 32'
'set rgb 140 255 199 30'
'set rgb 141 255 185 28'
'set rgb 142 254 171 26'
'set rgb 143 254 157 24'
'set rgb 144 254 143 22'
'set rgb 145 254 129 20'
'set rgb 146 254 115 18'
'set rgb 147 253 101 16'
'set rgb 148 253 87 14'
'set rgb 149 253 73 12'
'set rgb 150 253 59 10'
'set rgb 151 253 45 8'
'set rgb 152 245 15 3'
'set rgb 153 236 14 3'
'set rgb 154 226 12 3'
'set rgb 155 217 11 2'
'set rgb 156 207 9 2'
'set rgb 157 198 8 2'
'set rgb 158 188 6 2'
'set rgb 159 179 5 1'
'set rgb 160 169 3 1'
'set rgb 161 160 2 1'

'define tcos = cos(lat*d2r)'

say 'math (dtx, dty, dx, dy)'
'set lev 850'
'define dty = cdiff(tmpprs,y)'
'define dtx = cdiff(tmpprs,x)'
'define dy = cdiff(lat,y)*d2r*rearth'
'define dx = cdiff(lon,x)*d2r*rearth*tcos'
say '.tadvection'
'define tadv = (-1*ugrdprs*(dtx/dx)-1*vgrdprs*(dty/dy))*3600'

'set gxout contour'
'set csmooth on'
'set cstyle 1'
'set cthick 1'
'set clab masked'
'set clopts -1'

'set clevs -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0,  0.1,  0.2,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8,  0.9,  1.0,  1.1,  1.2,  1.3,  1.4,  1.5,  1.6,  1.7,  1.8,  1.9,  2.0,  2.1,  2.2,  2.3,  2.4,  2.5,  2.6,  2.7,  2.8,  2.9'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161'

'd tadv'

* visualisatie 500mb geopotentiele hoogte
*****************************************
'set rgb 101 0 255 255'
'set gxout contour'
'set csmooth on'
'set ccolor 101'
'set cint 50'
'set clab off'
'set lev 500'
'set cthick 7'
'd hgtprs'

* visualisatie 500mb isotachs
*****************************
'define u500 = ugrdprs(lev=500)'
'define v500 = vgrdprs(lev=500)'
'define windspeed = sqrt(u500*u500 + v500*v500)'
'set gxout contour'
'set csmooth on'
'set ccolor 0'
'set cmin 50'
'set cint 5'
'set cthick 1'
'set clopts -1'
'set clab masked'

'd windspeed*1.943844'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Chase2be'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.7 4.6 g/m`a3`n'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 700mb RH(%), Tadv(C/hr), 500mb GPM & Isotachs (>50kts)'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.0.2.oga.2\i686\rh700tadv'i'.png x1024 y768'

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
