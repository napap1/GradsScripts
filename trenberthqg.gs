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
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p50/gfs'date'/gfs_0p50_'hour'z'

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

***********************************************
* 850mb Theta-E                               *
***********************************************

* iteratie
**********
maps = 2
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs -12 12 0.2 -gxout shaded -kind (255,0,255)->(215,0,229)->(174,0,202)->(133,0,176)->(92,1,149)->(52,1,123)->(11,1,96)->(43,49,135)->(75,98,175)->(107,147,215)->(156,183,228)->(204,219,241)->(255,255,255)->(254,213,171)->(253,171,87)->(251,129,2)->(213,86,2)->(174,43,1)->(135,0,0)->(155,8,8)->(175,16,16)->(195,24,24)->(215,33,33)->(235,41,41)->(255,50,50)->'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 QG: Omega, Thermal wind, 700-300mb Thickness & 500mb GPM'

say '.Calculations'
* Declaration variables & calculations
**************************************
** Constants
'pi = 3.14159'
'dtr = pi/180'
'a = 6.37122e6'
'omega = 7.2921e-5'
'g = 9.8'
'R = 287'

'coriolis = 2*omega*sin(lat*dtr)'
'corioliso = 2*omega*sin(50*dtr)'

'dx = cdiff(lon,x)*dtr*a*cos(lat*dtr)'
'dy = cdiff(lat,y)*dtr*a'

** Variables
'define h700 = smth9(smth9(smth9(smth9(smth9(smth9(hgtprs(lev=700)))))))'
'define h500 = smth9(smth9(smth9(smth9(smth9(smth9(hgtprs(lev=500)))))))'
'define h300 = smth9(smth9(smth9(smth9(smth9(smth9(hgtprs(lev=300)))))))'

'define t700 = tmpprs(lev=700)'
'define t300 = tmpprs(lev=300)'

'define theta700 = t700*pow(1000/700,0.286)'
'define theta300 = t300*pow(1000/300,0.286)'
'define dtheta = theta700 - theta300'

'define dp = 100*(700-300)'
'define dthetadp = dtheta/dp'

* Geostophic wind vectors 700mb
'define dzx700 = cdiff(h700,x)'
'define dzy700 = cdiff(h700,y)'

'define ug700 = -1*(g/coriolis)*(dzy700/dy)'
'define vg700 = (g/coriolis)*(dzx700/dx)'

* Geostophic wind vectors 500mb
'define dzx500 = cdiff(h500,x)'
'define dzy500 = cdiff(h500,y)'

*'define ug500 = -1*(g/coriolis)*(dzy500/dy)'
*'define vg500 = (g/coriolis)*(dzx500/dx)'

'define ug500 = smth9(smth9(smth9(ugrdprs(lev=500))))'
'define vg500 = smth9(smth9(smth9(vgrdprs(lev=500))))'

* Geostophic wind vectors 300mb
'define dzx300 = cdiff(h300,x)'
'define dzy300 = cdiff(h300,y)'

'define ug300 = -1*(g/coriolis)*(dzy300/dy)'
'define vg300 = (g/coriolis)*(dzx300/dx)'

* Thermal windvectors 700-300mb
'define utherm = ug300 - ug700'
'define vtherm = vg300 - vg700'

* Geostrophic relative vorticity
'define gvortrel500 = hcurl(ug500,vg500)'

* Advection of Geostropic relative vorticity by the thermal wind
'define dgvortx = cdiff(gvortrel500,x)'
'define dgvorty = cdiff(gvortrel500,y)'

*'define gvortadvfr = -1*(( (utherm*dgvortx)/dx) + vtherm*dgvorty/dy )*2*(coriolis/dthetadp))'
'define gvortadvfr = -1*(( (utherm*dgvortx)/dx) + vtherm*dgvorty/dy )*2*((0.0001)/0.000002)'

'define gvfr = smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(smth9(gvortadvfr))))))))))))))))))))))))'

say '.Visualisations'

say '..Trenberth Approximation QG Omega'

* Advection of Geostropic absolute vorticity by the thermal wind
****************************************************************
'd gvfr'

'set rgb 250 255 255 255 150'
'set gxout contour'
'set ccolor 250'
'set cint 1'
'set clab off'
*'d gvfr'

say '..700-300mb Thickness'
* visualisatie 700-300mb Thickness contours
*******************************************
'set gxout contour'
'set rgb 250 0 0 0 100'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 5'
*'d smth9(hgtprs(lev=300)-hgtprs(lev=700))'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 180'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 11'
*'d smth9(hgtprs(lev=500))'

say '..700-300mb thermal wind streamlines'
* visualisatie 700-300mb thermal wind streamlines
*************************************************
'set gxout stream'
'set rgb 250 175 175 175 200'
'set ccolor 250'
'set cthick 1'
'set strmden 8'
*'d utherm;vtherm'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-------- Upward motion  >    <  Downward motion ------->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Trenberth Approximation QG Omega Equation = advection of 500mb Geostrophic vorticity by the 700-300mb Thermal wind'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 700-300mb Thickness: Thin black semi-transparent contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Thick black contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.5DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\TrenberthRealScaling_eur_'i'_valid_'validvar'_run_'runvar'.png x1280 y1024'

say '**'
say ''

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


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
