function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p50/gfs'date'/gfs_0p50_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'
*'sdfopen https://rda.ucar.edu/thredds/dodsC/files/g/ds084.1/2015/20150831/gfs.0p25.2015083112.f006.grib2'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

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
'set t 1'

* Colortable
************
'color.gs 0 12 0.2 -gxout shaded -kind (255,255,255)->(208,208,208)->(160,160,160)->(28,112,28)->(252,214,4)->(227,156,12)->(202,97,20)->(176,38,29)->(88,146,141)->(0,255,255)->(31,176,254)->(62,96,254)->(93,16,254)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 400-200mb Potential vorticity, PV-advection, Streamlines & GPM'

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

say '.Visualisations'

say '..400-250 Potential vorticity'

* visualisatie 400-250 Potential vorticity
******************************************
'd potvort*1000000'

'set rgb 250 0 0 0 25'
'set gxout contour'
'set ccolor 250'
'set cmin 3'
'set cint 1'
'set clab off'
'd potvort*1000000'

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
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <--- PVU, higher means increasingly intense IPV- anomaly --->'

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
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\PVpres_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

say '**'
say ''

'clear'
'set grads off'

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
