function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)
* location = subwrd(args,3)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p50/gfs'date'/gfs_0p50_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

** Southwestern Europe
*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 44 56'

** Western Europe
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'

** Full Europe
*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 43 68'

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
maps = 85
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs 0 6000 50 -gxout shaded -kind (255,255,255)->(0,150,0)->(255,255,0)->(192,132,0)->(129,8,0)->(188,5,120)->(251,1,247)->(221,11,218)->(191,21,188)->(162,31,160)->(131,42,131)->(101,52,101)->(72,72,72)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 CAPE, 400-200mb Streamlines, PV-advection & GPM'

say '.Calculations'
* Declaration variables & calculations
**************************************
'pi=3.14159'
'dtr=pi/180'
'a=6.37122e6'
'omega=7.2921e-5'
'g=9.8'
'R=287'

'define coriolis=2*omega*sin(lat*dtr)'

'define t400 = tmpprs(lev=400)'
'define t200 = tmpprs(lev=200)'
'define theta400 = t400*pow(1000/400,0.286)'
'define theta200 = t200*pow(1000/200,0.286)'
'define dtheta = theta400-theta200'

'define dp = 100*(400-200)'
'define dthetadp=dtheta/dp'

'define uavg = ugrdprs(lev=300)'
'define vavg = vgrdprs(lev=300)'
'define vorticity = hcurl(uavg,vavg)'

'define potvort = ((g*-1)*(coriolis+vorticity)*dthetadp)'

'define dpvx = cdiff(potvort,x)'
'define dpvy = cdiff(potvort,y)'
'define dx = cdiff(lon,x)*dtr'
'define dy = cdiff(lat,y)*dtr'

'define pvadv = -1*( (uavg*dpvx)/(cos(lat*3.1416/180)*dx) + vavg*dpvy/dy )'

'define cape1 = capesfc'
'define cape2 = cape180_0mb'
'define cape3 = cape255_0mb'
'define meancape = (cape180_0mb + cape255_0mb)/2'

say '.Visualisations'

say '..400-250 Potential vorticity'

* visualisatie 400-250 Potential vorticity
******************************************
'd meancape'

'set rgb 250 0 0 0 25'
'set gxout contour'
'set ccolor 250'
'set cmin 200'
'set cint 200'
'set clab off'
'd meancape'

say '..Potential vorticity advection'
* visualisatie Isotachs
*******************
'set rgb 250 0 0 0 180'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set clopts -1'
'set clab off'
'set cthick 1'
'set cmin 1'
'set cint 0.5'
'd smth9(smth9(pvadv*1000))'

'set rgb 250 0 0 0 180'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set clopts -1'
'set clab off'
'set cmin 2.5'
'set cint 2.5'
'set cthick 4'
'd smth9(smth9(pvadv*1000))'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 180'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 60'
'set clopts -1'
'set clab masked'
'set cthick 9'
'd smth9(hgtprs(lev=500))'

say '..400-200mb streamlines'
* visualisatie 500mb height contours
************************************
'set gxout stream'
'set rgb 250 0 0 0 30'
'set ccolor 250'
'set cthick 1'
'set strmden 7'
'd uavg;vavg'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <-- J/kg, Higher means more favorable for & severity of TSTMS -->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 400-200mb PV-advection: Thin contours each 0.5 PVU/s, Thick contours each 2.5 PVU/s starting at 1 PVU/s'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thin contours each 60 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\PVcape_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

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
