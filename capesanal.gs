function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

'open 2014060918.ctl'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
'set lon -32 30'
'set lat 30 65'

*'set mpvals -2 19 47 59'
'set mpvals -2 19 43 54'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* Colortable
************
'color.gs 0 6000 100 -gxout shaded -kind (255,255,255)->(226,226,226)->(196,196,196)->(167,167,167)->(137,137,137)->(108,108,108)->(60,140,60)->(12,173,12)->(93,200,8)->(174,227,4)->(255,255,0)->(245,231,0)->(234,206,0)->(225,181,0)->(215,156,0)->(204,131,0)->(194,106,0)->(184,81,0)->(174,56,0)->(163,32,0)->(153,7,0)->(172,6,48)->(191,5,97)->(211,3,145)->(230,2,194)->(250,1,242)->(239,1,243)->(228,1,244)->(216,1,245)->(205,1,247)->(193,1,248)->(182,1,249)->(171,1,250)->(159,1,252)->(148,1,253)->(136,1,254)->(128,17,254)->(119,33,254)->(110,49,254)->(101,66,254)->(92,82,254)->(83,98,254)->(74,115,254)->(65,131,254)->(56,147,254)->(47,164,254)->(38,180,254)->(29,196,254)->(21,213,254)->(12,229,254)->(3,245,254)->(3,222,230)->(3,198,205)->(3,174,180)->(3,150,155)->(3,126,131)->(3,102,106)->(3,78,81)->(3,54,56)->(3,30,31)->(3,6,7)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 CAPE, 10m Windfield, Supercel composite parameter & 500mb GPM'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
say '..U-compontents'

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
'define u350=ugrdprs(lev=350)'

say '..V-compontents'
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
'define v350=vgrdprs(lev=350)'

say '..DLS'
'define usheardls=u450-u1000'
'define vsheardls=v450-v1000'
'define sheardls=sqrt(usheardls*usheardls+vsheardls*vsheardls)'

say '..Meanwind 0-6km'
'define umean=(u1000+u975+u950+u925+u900+u850+u800+u750+u700+u650+u600+u550+u500+u450)/14.0'
'define vmean=(v1000+v975+v950+v925+v900+v850+v800+v750+v700+v650+v600+v550+v500+v450)/14.0'
'define meanwind=sqrt(umean*umean+vmean*vmean)'

say '..SRH3km'
'define umotion=((umean+(7.5/(sheardls))*vsheardls))'
'define vmotion=((vmean-(7.5/(sheardls))*usheardls))'

'define srh1=((u975-umean)*(v1000-vmean)-(u1000-umean)*(v975-vmean))'
'define srh2=((u950-umean)*(v975-vmean)-(u975-umean)*(v950-vmean))'
'define srh3=((u925-umean)*(v950-vmean)-(u950-umean)*(v925-vmean))'
'define srh4=((u900-umean)*(v925-vmean)-(u925-umean)*(v900-vmean))'
'define srh5=((u850-umean)*(v900-vmean)-(u900-umean)*(v850-vmean))'
'define srh6=((u800-umean)*(v850-vmean)-(u850-umean)*(v800-vmean))'
'define srh7=((u750-umean)*(v800-vmean)-(u800-umean)*(v750-vmean))'
'define srh8=((u700-umean)*(v750-vmean)-(u750-umean)*(v700-vmean))'

'define srh3km=srh1+srh2+srh3+srh4+srh5+srh6+srh7+srh8'

say '..Supercel Composite'
'define shearterm = (sheardls/20)'
'shearterm = const(maskout(shearterm, shearterm-0.5),0,-u)'
'shearterm = const(maskout(shearterm, 1-shearterm),1,-u)'
'define scp = ((capesfc/1000)*(shearterm)*(srh3km/50))'

* visualisatie CAPE
*******************
'd capesfc'

* visualisatie Stormmotion
**************************
'set rgb 250 0 0 0 40'
'set gxout stream'
'set cthick 7'
'set ccolor 250'
'set strmden 7'
'set cstyle 1'
'd ugrd10m;vgrd10m'

* visualisatie SCP
******************
'set gxout contour'
'set rgb 250 255 255 255'
'set cint 1'
'set cmin 1'
'set cstyle 1'
'set ccolor 250'
'set clab masked'
'set clopts -1'
'set cthick 1'
'd scp'

* visualisatie RM superceldirection
***********************************
'set gxout vector'
'set arrlab off'
'set rgb 250 255 255 255 100'
'set ccolor 250'
'set cthick 7'
'd maskout(1.944*umotion,scp-1);1.944*vmotion'

* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 0 0 0 255'
'set lwid 13 3.0'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'd smth9(hgtprs(lev=500))'

* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- J/kg, Higher means thermodynamically more favorable for TSTMS ->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Supercel composite: Thin white contours, each increment of 1'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 Vectors: Direction of Rightmoving supercels'
'set string 1 r 4 0' ; 'draw string 10.95 7.25 Streamlines: 10m windfield'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (13km), Analysis'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\CAPE_anal'hub'.png x1024 y768'

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
