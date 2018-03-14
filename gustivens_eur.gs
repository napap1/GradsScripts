function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

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
validvar = subwrd(times,6)

***********************************************
* 850mb Theta-E                               *
***********************************************

* iteratie
**********
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
'color.gs 0 200 1 -gxout shaded -kind (255,255,255)->(217,217,217)->(178,178,178)->(139,139,139)->(100,100,100)->(50,140,50)->(0,180,0)->(127,217,0)->(255,255,0)->(189,128,0)->(122,0,0)->(188,0,127)->(255,0,255)->(222,0,255)->(189,0,255)->(155,0,255)->(121,0,255)->(92,0,193)->(62,0,131)->(33,0,69)->(0,0,0)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Max windgusts(IVENS), MSLP(mb), 500mb GPM(m) & 10-100m wvectors'

say '.Calculations'
* Declaration variables & calculations
**************************************
* equivalent potential temperature (theta-e) 850mb
**

'define t850 = tmpprs(lev=850)'
'define rh850 = rhprs(lev=850)'
'define dewp850mb = (t850-273.15)-((14.55+0.114*(t850-273.15))*(1-0.01*rh850)+pow((2.5+0.007*(t850-273.15))*(1-0.01*rh850),3)+(15.9+0.117*(t850-273.15))*pow((1-0.01*rh850),14))'
'define td850k= dewp850mb+273.15'
'define vapr850mb = 6.112*exp((17.67*dewp850mb)/(dewp850mb+243.5))'
'define e850mb    = vapr850mb*1.001+(850-100)/900*0.0034'
'define w850mb    = 0.62197*(e850mb/(850-e850mb))'
'define te850mb   = (t850+(2260000*w850mb/1004))'
'define ept850mb1  = (te850mb*pow((1000/850),(287/1004)))-273.16'



* windspeed & potentiele temperatuur 850mb
**

'define u850=ugrdprs(lev=850)'
'define v850=vgrdprs(lev=850)'
'define wind850mb = (sqrt((u850*u850+v850*v850)))'

* wetbulb potential temperature 850mb
**

'define wpt850mb = ((-6.2609512839 + 6.6480400261 * 0.1 * ept850mb1) -(5.1338815795 * 0.001 * pow(ept850mb1,2)) + (8.1910107184 * 0.000001 * pow(ept850mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept850mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept850mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept850mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept850mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept850mb1,8)))+273.16'

* equivalent potential temperature (theta-e) 500mb
**

'define t500 = tmpprs(lev=500)'
'define rh500 = rhprs(lev=500)'
'define dewp500mb = (t500-273.15)-((14.55+0.114*(t500-273.15))*(1-0.01*rh500)+pow((2.5+0.007*(t500-273.15))*(1-0.01*rh500),3)+(15.9+0.117*(t500-273.15))*pow((1-0.01*rh500),14))'

'define td500k= dewp500mb+273.15'

'define vapr500mb = 6.112*exp((17.67*dewp500mb)/(dewp500mb+243.5))'
'define e500mb    = vapr500mb*1.001+(500-100)/900*0.0034'
'define w500mb    = 0.62197*(e500mb/(500-e500mb))'

'define te500mb   = (t500+(2260000*w500mb/1004))'

'define ept500mb1  = (te500mb*pow((1000/500),(287/1004)))-273.16'



'define wpt500mb = ((-6.2609512839 + 6.6480400261 * 0.1 * ept500mb1) -(5.1338815795 * 0.001 * pow(ept500mb1,2)) + (8.1910107184 * 0.000001 * pow(ept500mb1,3)) + (4.5363160786 * 0.0000001 * pow(ept500mb1,4)) - (6.3992885228 * 0.000000001 * pow(ept500mb1,5)) + (4.0670460222 * 0.00000000001 * pow(ept500mb1,6)) - (1.2831483168 * 0.0000000000001 * pow(ept500mb1,7)) + (1.6177730539 * 0.0000000000000001 * pow(ept500mb1,8)))+273.16'

* windspeed & potentiele temperatuur 500mb
**

'define u500=ugrdprs(lev=500)'
'define v500=vgrdprs(lev=500)'
'define wind500mb = (sqrt((u500*u500+v500*v500)))'



'define t2c = tmp2m-273.15'

* IvENS variabelen
**

'define u250 = ugrdprs(lev=250)'
'define v250 = vgrdprs(lev=250)'
'define wind250mb = (sqrt((u250*u250+v250*v250)))'

* IVENS method
**


'define wmax = (8.17+0.473*abs(wpt850mb-wpt500mb) + (0.174*wind850mb + 0.057*wind250mb)*sqrt(abs(tmax2m - wpt850mb)))*3.6'

'define u10m = ugrd10m * 1.943844'
'define v10m = vgrd10m * 1.943844'
'define u100m = ugrd100m * 1.943844'
'define v100m = vgrd100m * 1.943844'

'define umean = (u10m + u100m) / 2'
'define vmean = (v10m + v100m) / 2'

'define slp  = const((prmslmsl*0.01),0,-u)'

say '.Visualisations'
* visualisatie Gusts
********************
say '..Windgusts'

'd wmax'

'set rgb 250 255 255 255 160'
'set gxout contour'
'set cstyle 3'
'set ccolor 250'
'set cint 10'
'set cmin 80'
'set clab masked'
'set clopts -1'
'd wmax'

* visualisatie vectors
**********************
say '..10-100m vectors'
'set rgb 250 0 0 0 40'
'set gxout vector'
'set ccolor 250'
'd skip(umean,3,3);vmean'
*'d skip(umean,3;vmean)'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 50'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 1'
'set clopts -1'
'set clab off'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 75'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set cthick 13'
'set ccolor 11'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- km/hr, Higher means increasing intensity of maximum windgusts ->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Windgusts: Dashed white contours each 10km/hr, starting at 80 km/hr'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Dashed black contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'
* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\Gust_eur_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

'clear'
'set grads off'

say '**'
say ''

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
