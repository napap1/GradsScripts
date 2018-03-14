function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'


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
'set grid off'
'set arrlab off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 85

*******************************************************************
********************** Tijdsinformatie ***************************
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

******************************************************
* CAPE                                               *
******************************************************

'set grads off'

* stroomlijndensiteit
*********************
'set strmden 6'

* kleurentabel
**************
'set rgb 101 255 255 250'
'set rgb 102 225 254 220'
'set rgb 103 178 251 175'
'set rgb 104 147 250 145'
'set rgb 105 101 247 99'
'set rgb 106 70 246 69'
'set rgb 107 24 243 24'
'set rgb 108 20 218 20'
'set rgb 109 14 181 14'
'set rgb 110 10 156 10'
'set rgb 111 4 118 4'
'set rgb 112 22 128 4'
'set rgb 113 50 143 4'
'set rgb 114 69 153 4'
'set rgb 115 97 168 3'
'set rgb 116 116 178 3'
'set rgb 117 144 194 3'
'set rgb 118 162 204 3'
'set rgb 119 190 219 2'
'set rgb 120 209 229 2'
'set rgb 121 255 255 2'
'set rgb 122 255 244 4'
'set rgb 123 255 233 7'
'set rgb 124 255 215 10'
'set rgb 125 255 198 14'
'set rgb 126 255 187 17'
'set rgb 127 255 163 16'
'set rgb 128 254 145 14'
'set rgb 129 252 117 10'
'set rgb 130 251 99 7'
'set rgb 131 250 72 4'
'set rgb 132 242 58 2'
'set rgb 133 230 51 2'
'set rgb 134 222 46 2'
'set rgb 135 210 39 2'
'set rgb 136 202 34 2'
'set rgb 137 191 27 2'
'set rgb 138 183 23 2'
'set rgb 139 171 16 2'
'set rgb 140 163 11 2'
'set rgb 141 151 4 2'
'set rgb 142 158 9 20'
'set rgb 143 169 17 47'
'set rgb 144 177 22 66'
'set rgb 145 184 27 84'
'set rgb 146 195 35 111'
'set rgb 147 206 43 139'
'set rgb 148 214 48 157'
'set rgb 149 225 56 185'
'set rgb 150 233 61 203'
'set rgb 151 244 69 230'
'set rgb 152 244 80 231'
'set rgb 153 245 98 233'
'set rgb 154 246 110 234'
'set rgb 155 247 127 236'
'set rgb 156 248 139 237'
'set rgb 157 249 157 239'
'set rgb 158 250 168 240'
'set rgb 159 251 186 242'
'set rgb 160 251 198 244'
'set rgb 161 252 210 245'

'set rgb 200 100 100 100'

'set rgb 201 75 75 75'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie Vorticity Generation Parameter
*********************************************
'define u1000 = ugrdprs(lev=1000)'
'define u975 = ugrdprs(lev=975)'
'define u950 = ugrdprs(lev=950)'
'define u925 = ugrdprs(lev=925)'
'define u900 = ugrdprs(lev=900)'
'define u850 = ugrdprs(lev=850)'
'define u800 = ugrdprs(lev=800)'
'define u750 = ugrdprs(lev=750)'
'define u700 = ugrdprs(lev=700)'

'define v1000 = vgrdprs(lev=1000)'
'define v975 = vgrdprs(lev=975)'
'define v950 = vgrdprs(lev=950)'
'define v925 = vgrdprs(lev=925)'
'define v900 = vgrdprs(lev=900)'
'define v850 = vgrdprs(lev=850)'
'define v800 = vgrdprs(lev=800)'
'define v750 = vgrdprs(lev=750)'
'define v700 = vgrdprs(lev=700)'

'define ushear1 = u975 - u1000'
'define ushear2 = u950 - u975'
'define ushear3 = u925 - u950'
'define ushear4 = u900 - u925'
'define ushear5 = u850 - u900'
'define ushear6 = u800 - u850'
'define ushear7 = u750 - u800'
'define ushear8 = u700 - u750'

'define vshear1 = v975 - v1000'
'define vshear2 = v950 - v975'
'define vshear3 = v925 - v950'
'define vshear4 = v900 - v925'
'define vshear5 = v850 - v900'
'define vshear6 = v800 - v850'
'define vshear7 = v750 - v800'
'define vshear8 = v700 - v750'

'define shear1 = sqrt(ushear1*ushear1+vshear1*vshear1)'
'define shear2 = sqrt(ushear2*ushear2+vshear2*vshear2)'
'define shear3 = sqrt(ushear3*ushear3+vshear3*vshear3)'
'define shear4 = sqrt(ushear4*ushear4+vshear4*vshear4)'
'define shear5 = sqrt(ushear5*ushear5+vshear5*vshear5)'
'define shear6 = sqrt(ushear6*ushear6+vshear6*vshear6)'
'define shear7 = sqrt(ushear7*ushear7+vshear7*vshear7)'
'define shear8 = sqrt(ushear8*ushear8+vshear8*vshear8)'

'define meanshear = (shear1+shear2+shear3+shear4+shear5+shear6+shear7+shear8)/3000'
'define vgp3 = meanshear*(sqrt(cape180_0mb))'



'set gxout shaded'
*'set csmooth on'

'color 0 8 0.1 -gxout shaded -kind (255,255,255)->(24,139,24)->(255,255,0)->(230,163,35)->(204,70,70)->(100,0,0)->(255,0,250)->(115,0,160)->(28,210,241)'


*'set clevs 0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050 1100 1150 1200 1250 1300 1350 1400 1450 1500 1550 1600 1650 1700 1750 1800 1850 1900 2000 2050 2100 2150 2200 2250 2300 2350 2400 2450 2500 2550 2600 2650 2700 2750 2800 2850 2900 2950 3000'
*'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161'

'd vgp3*10'
'run cbarm'

* visualisatie hailsize contouren
******************************


'set rgb 200 75 75 75'
'set gxout contour'
'set ccolor 200'
'set cint 0.5'
'set cstyle 3'
'set cthick 5'
'set csmooth on'
'set clopts -1'
'set clab masked'
'd hailsize'


* visualisatie 500mb geopotential height
****************************************
'set gxout contour'
'set cint 40'
'set cstyle 1'
'set ccolor 1'
'set cthick 7'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <- s10E-1: increasing stretching & tilting contribution for SC & TOR ->'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 '
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 0-3km Vorticity Generation Parameter & 500mb GPM'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.0.1.oga.1\i686\vgp'i'.png x1280 y1024'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'



* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* END OF MAIN SCRIPT
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Templcl(temp,dewp)

*------------------------------------------------------
* Calculate the temp at the LCL given temp & dewp in C
*------------------------------------------------------

tempk=temp
dewpk=dewp+273.15
Parta=1/(dewpk-56)
Partb=math_log(tempk/dewpk)/800
Tlcl=1/(Parta+Partb)+56
return(Tlcl-273.15)

**************************************************************************

function Preslcl(temp,dewp,pres)

*-------------------------------------------------------
* Calculate press of LCL given temp & dewp in C and pressure
*-------------------------------------------------------

Tlclk=Templcl(temp,dewp)+273.15
tempk=temp+273.15
theta=tempk*math_pow(1000/pres,0.286)
plcl=1000*math_pow(Tlclk/theta,3.48)
return(plcl)

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
