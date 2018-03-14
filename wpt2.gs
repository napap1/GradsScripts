function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_hd/gfs_hd'date'/gfs_hd_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'
'set lon -60 55'
'set lat 25 80'
'set mpvals -10 35 45 70'
'set display color white'
'set csmooth on'
*'set lat 42 56'
*'set lon -5 15'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set grid off'
'set ylab off'
'set parea 0.04 9.7 0.8 8.0'
'set grads off'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 65

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

**************************************************************
* 850mb theta-e, 500mb geopotential height & SFC convergence *
**************************************************************

'set grads off'

* kleurentabel
**************
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

'wpt = (-6.2609512839 + 6.6480400261 * 0.1 * ept850mb1) -(5.1338815795 * 0.001 * pow(ept850mb1,2)) + (8.1910107184 * 0.000001 * pow(ept850mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept850mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept850mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept850mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept850mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept850mb1,8))'

* visualisatie Theta-E 850mb
****************************
'set gxout shaded'
'set csmooth on'
'set cint 1'
'set clevs 0.0 0.5 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5 10.0 10.5 11.0 11.5 12.0 12.5 13.0 13.5 14.0 14.5 15.0 15.5 16.0 16.5 17.0 17.5 18.0 18.5 19.0 19.5 20.0 20.5 21.0 21.5 22.0 22.5 23.0 23.5 24.0 24.5'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121  122  123  124  125  126  127  128  129  130  131  132  133 134  135  136  137  138  139  140  141  142  143  144  145  146  147  148  149  150  151'
'd wpt'
'run cbarm'

* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set ccolor 0'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'd slp'

* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set ccolor 0'
'set cstyle 3'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

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
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model (13km), run: 'huh
'set strsiz 0.18'P
'set string 1 l 12 0' ; 'draw string 0.15 8.3 850mb Theta-W & Mean sea layer pressure'

'printim theta-w0'i'.png x1024 y768'

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
  incr = (ymx-ymn)/4  incr = 0.01 * (math_nint(100*incr))
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
* i sntropic level.  Can also be used on non-pressure level data, such
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
