function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_hd/gfs_hd'date'/gfs_hd_'hour'z'
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
*'set map 0 1 1'
'set grid off'
'set grads off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 83

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

********************************************************
* Frontogenesis                                        *
********************************************************

* kleurentabel
**************
'set rgb 101 50 50 50'
'set rgb 102 60 60 60'
'set rgb 103 70 70 70'
'set rgb 104 80 80 80'
'set rgb 105 90 90 90'
'set rgb 106 100 100 100'
'set rgb 107 110 110 110'
'set rgb 108 120 120 120'
'set rgb 109 130 130 130'
'set rgb 110 140 140 140'
'set rgb 111 150 150 150'
'set rgb 112 160 160 160'
'set rgb 113 170 170 170'
'set rgb 114 180 180 180'
'set rgb 115 190 190 190'
'set rgb 116 200 200 200'
'set rgb 117 211 211 211'
'set rgb 118 222 222 222'
'set rgb 119 233 233 233'
'set rgb 120 244 244 244'
'set rgb 121 255 255 255'

'set rgb 150 0 255 255'

'set rgb 160 250 0 0'

* declaratie constanten
***********************

'pi=3.14159'
'dtr=pi/180'
'a=6.37122e6'
'omega=7.2921e-5'
'g=9.8'
'R=287'

'set grads off'

* iteratie
**********
  i = 15
  while ( i<maps )
'set t ' i

* declaratie variabelen
***********************
'define td = dpt2m-273.16'


* visualisatie sneeuwval
************************
'set gxout shaded'
'set csmooth on'
'set cint 0.05'
'set clevs 0.05 0.10 0.15 0.20 0.25 0.30 0.35 0.40 0.45 0.50 0.55 0.60 0.65 0.70 0.75 0.80 0.85 0.90 0.95 1.0'
'set ccols 121  120  119  118  117  116  115  114  113  112  111  110  109  108  107  106  105  104  103  102  101'


'd smth9(csnowsfc)'
'run cbarm'

* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set csmooth on'
'set ccolor 2'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab masked'
'd slp'

* visualisatie MSLP
*******************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set csmooth on'
'set ccolor 2'
'set cstyle 3'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 7'
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
'd td'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <-------- higher means increasing chances for snow -------->'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model (0p25deg), run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 Snow, Mean sea layer pressure & 0deg DP-isotherm (2m)'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.0.2.oga.2\i686\snow13km0'i'.png x1024 y768'

'clear'
'set grads off'



* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


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
