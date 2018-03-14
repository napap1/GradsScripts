function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

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
'set grid off'
'set grads off'
'set antialias on'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 181

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



*******************************************************************
* Mean seay layer pressure                                        *
*******************************************************************

"run constants.gs"

* kleurentabel
**************
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

* Iteratie
**********
  i = 42
  while ( i<maps )
'set t 'i

* MSLP
******
'set gxout shaded'
'set csmooth on'
'set clevs 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049'
'set ccols 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200'
'set antialias on'
'd prmslmsl/100'
'run cbarm'

* visualisatie MSLP
*******************
'set rgb 210 255 255 255 100'
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set ccolor 210'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set antialias on'
'd slp'

* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set ccolor 210'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 7'
'set antialias on'
'd slp'

* visualisatie 500mb height contours
************************************
'set rgb 220 0 0 0 120'
'set gxout contour'
'set ccolor 220'
'set cint 50'
'set clopts -1'
'set cstyle 1'
'set clab masked'
'set cthick 7'
'set antialias on'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 millibar'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Mean sea layer pressure & 500mb Geopotential height'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\mslp'i'.png x1024 y768'

* iteratie progressie
*********************

'clear'
'set grads off'
i = i+1
endwhile



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
