function main(args)

************************************************************
************************************************************
***     700mb Theta-E, windfield, 500mb GPM & MSLP       ***
************************************************************
************************************************************

* Argument parsing
******************
date = subwrd(args,1)
hour  = subwrd(args,2)

* Opendap connectionstring
**************************
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

* Map options & resolution
**************************
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

* Info from deiscriptorfile
***************************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

* Time information
******************
*tsize = subwrd(_tdef,2)
*_t1 = 1       ;
*_t2 = 45
*tsize = _t2 - _t1 + 1
*'set t '_t1' '_t2
*'q dims'
*times  = sublin(result,5)
*_time1 = subwrd(times,6)  
*_time2 = subwrd(times,8)
*_tdim = _time1' '_time2
*tincr = subwrd(_tdef,5)
*_tdef = 'tdef 'tsize' linear '_time1' 'tincr
*runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

* Colortable
************
say '.Colortable'
'color.gs 0 1000 10 -gxout shaded -kind (255,255,255)->(194,194,194)->(133,133,133)->(0,200,0)->(255,255,0)->(222,176,0)->(189,96,0)->(156,16,0)->(182,12,68)->(209,8,136)->(235,3,205)->(218,26,222)->(194,51,226)->(171,76,229)->(147,101,233)->(123,126,236)->(100,150,240)->(76,175,243)->(52,200,247)->(29,225,250)->(5,250,254)'

* Titles & labels
*****************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Rightmoving SREH3, SCP & STP, RM-Stormmotion & 500mb GPM (m)'

* Declaration variables & calculations
**************************************
say '.Calculations'
say '..2m Temperature'
'define t2m  = const((tmp2m-273.16),0,-u)'
say '..LCL'
'define LCL = (20+(t2m/5)) * (100 - rh2m)'
say '..U-components'
'define u1000=ugrdprs(lev=1000)'
'define u975=ugrdprs(lev=975)'
'define u950=ugrdprs(lev=950)'
'define u925=ugrdprs(lev=925)'
'define u900=ugrdprs(lev=900)'
'define u850=ugrdprs(lev=850)'
'define u800=ugrdprs(lev=800)'
'define u750=ugrdprs(lev=750)'
'define u700=ugrdprs(lev=700)'
'define u650=ugrdprs(lev=650)'
'define u600=ugrdprs(lev=600)'
'define u550=ugrdprs(lev=550)'
'define u500=ugrdprs(lev=500)'
'define u450=ugrdprs(lev=450)'
'define u400=ugrdprs(lev=400)'
say '..V-components'
'define v1000=vgrdprs(lev=1000)'
'define v975=vgrdprs(lev=975)'
'define v950=vgrdprs(lev=950)'
'define v925=vgrdprs(lev=925)'
'define v900=vgrdprs(lev=900)'
'define v850=vgrdprs(lev=850)'
'define v800=vgrdprs(lev=800)'
'define v750=vgrdprs(lev=750)'
'define v700=vgrdprs(lev=700)'
'define v650=vgrdprs(lev=650)'
'define v600=vgrdprs(lev=600)'
'define v550=vgrdprs(lev=550)'
'define v500=vgrdprs(lev=500)'
'define v450=vgrdprs(lev=450)'
'define v400=vgrdprs(lev=400)'
say '..Shear parameters'
'define umean=(u1000+u975+u950+u925+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450+u400)/15.0'
'define vmean=(v1000+v975+v950+v925+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450+v400)/15.0'
'define ushear=u450-u1000'
'define vshear=v450-v1000'
'define shear=sqrt(ushear*ushear+vshear*vshear)'
'define umotion=((umean+(7.5/(shear))*vshear))'
'define vmotion=((vmean-(7.5/(shear))*ushear))'
say '..SRH steps for integration'
'define srh1=((u975-umotion)*(v1000-vmotion)-(u1000-umotion)*(v975-vmotion))'
'define srh2=((u950-umotion)*(v975-vmotion)-(u975-umotion)*(v950-vmotion))'
'define srh3=((u925-umotion)*(v950-vmotion)-(u950-umotion)*(v925-vmotion))'
'define srh4=((u900-umotion)*(v925-vmotion)-(u925-umotion)*(v900-vmotion))'
'define srh5=((u850-umotion)*(v900-vmotion)-(u900-umotion)*(v850-vmotion))'
'define srh6=((u800-umotion)*(v850-vmotion)-(u850-umotion)*(v800-vmotion))'
'define srh7=((u750-umotion)*(v800-vmotion)-(u800-umotion)*(v750-vmotion))'
'define srh8=((u700-umotion)*(v750-vmotion)-(u750-umotion)*(v700-vmotion))'
say '..SRH1 & 3 km'
'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6+srh7+srh8'
'define srh1km=srh1+srh2+srh3+srh4'
say '..Shearterm'
'define shearterm = (shear/20)'
'shearterm = const(maskout(shearterm, shearterm-0.5),0,-u)'
'shearterm = const(maskout(shearterm, 1-shearterm),1,-u)'
say '..LCLterm'
'define LCLterm = ((2000-LCL)/1000)'
say '..Supercelcomposite'
'define scp = ((capesfc/1000) * (shearterm) * (srh3km/50))'
say '..Significant tornado (fixed)'
'define shearterm = (shear/20)'
'define stp = ((capesfc/1500) * LCLterm * (srh1km/150) * shearterm)'

* Visualisation SREH3
*********************
say '.Plotting SREH 3 shaded'
'set gxout shaded'
'd srh3km'

say '.Plotting SREH 3 contours'
*'set gxout contour'
*'set rgb 250 0 0 0 100'
*'set ccolor 250'
*'set cstyle 3'
*'set cint 100'
*'set cmin 100'
*'set clopts -1'
*'set clab off'
*'set cthick 2'
*'d srh3km'

* Visualisation Stormmotion
***************************
say '.Plotting RMStormmotion streamlines'
'set rgb 255 0 0 0 40'
'set gxout stream'
'set ccolor 255'
'set strmden 7'
'd umotion;vmotion'

* Visualisation SCP
*******************
say '.Plotting SCP contours'
'set gxout contour'
'set rgb 250 0 0 0 130'
'set ccolor 250'
'set cstyle 1'
'set cthick 1'
'set cint 1'
'set cmin 1'
'set clab masked'
'set clopts -1'
'd scp'

'set gxout contour'
'set rgb 250 255 255 255 255'
'set ccolor 250'
'set cstyle 1'
'set cthick 1'
'set cint 1'
'set cmin 1'
'set clab masked'
'set clopts -1'
'd stp'

* Visualisation 500mb height contours
*************************************
say '.Plotting 500mb GPM contours'
'set gxout contour'
'set ccolor 1'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'

* Colorbar & annotations
************************
say '.Plotting colorbar & annotations'
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <---- m`a2`n/s`a2`n, higher means increasing convective organisation ---->'

'set strsiz 0.10'
*'set string 1 r 4 0' ; 'draw string 10.95 7.85 SREH3: Dashed contours each 100 m`a2`n/s`a2`n, >=100 is conducive to supercel updraft rotation'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 SCP: Black full thin contours each increment by 1, >=1 is conducive to supercel updraft rotation'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 STP: Black dashed thin contours each increment by 1, >=1 is conducive to tornadic development'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.25 Only usable when expected stormmode is supercels'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: Analysis - `4Valid: 'validvar

* Saving
********
say '.Saving file'
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\SREH3_'i'_valid_'validvar'_run_'runvar'.png x1024 y768'
say '**'
say ' '

'clear'
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
