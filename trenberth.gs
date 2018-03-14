function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************


'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_1p00/gfs'date'/gfs_1p00_'hour'z'

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

** Western Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

** Full Europe
'set lon -60 55'
'set lat 25 80'
'set mpvals -10 35 45 70'

** SW Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -4 17 45 57'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

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
runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set t 25'

***********************************************
* Declarations & calculations                 *
***********************************************
** Constants
'pi = 3.14159'
'dtr = pi/180'
'a = 6.37122e6'
'omega = 7.2921e-5'
'g = 9.8'
'R = 287'

'coriolis = 2*omega*sin(lat*dtr)'

'dx = cdiff(lon,x)*dtr*a*cos(lat*dtr)'
'dy = cdiff(lat,y)*dtr*a'

** Variables
'define h700 = hgtprs(lev=700)'
'define h500 = hgtprs(lev=500)'
'define h300 = hgtprs(lev=300)'

* Geostophic wind vectors 700mb
'define dzx700 = cdiff(h700,x)'
'define dzy700 = cdiff(h700,y)'

'define ug700 = -1*(g/coriolis)*(dzy700/dy)'
'define vg700 = (g/coriolis)*(dzx700/dx)'

* Geostophic wind vectors 500mb
'define dzx500 = cdiff(h500,x)'
'define dzy500 = cdiff(h500,y)'

'define ug500 = -1*(g/coriolis)*(dzy500/dy)'
'define vg500 = (g/coriolis)*(dzx500/dx)'

* Geostophic wind vectors 300mb
'define dzx300 = cdiff(h300,x)'
'define dzy300 = cdiff(h300,y)'

'define ug300 = -1*(g/coriolis)*(dzy300/dy)'
'define vg300 = (g/coriolis)*(dzx300/dx)'

* Thermal windvectors 700-300mb
'define utherm = ug300 - ug700'
'define vtherm = vg300 - vg700'

* Geostrophic absolute vorticity
'define gvortrel500 = hcurl(ug500,vg500)'
'define gvort500 = gvortrel500 + coriolis'

* Advection of Geostropic absolute vorticity by the thermal wind
'define dgvortx = cdiff(gvort500,x)'
'define dgvorty = cdiff(gvort500,y)'
'define gvortadv = (-1*( (utherm*dgvortx)/dx) + vtherm*dgvorty/dy )) * ((2*0.0001)/0.000002)'

'set gxout contour'
'd gvortadv'

'set gxout contour'
'set cint 60'
'set ccolor 0'
'd hgtprs(lev=500)'

***********************************************
* 850mb Theta-E                               *
***********************************************



************************************************************* 
* END OF MAIN SCRIPT                                        *
************************************************************* 

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
