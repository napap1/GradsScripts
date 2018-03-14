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
huh = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

********************************************************
* BOw echo derecho index                               *
********************************************************

* iteratie
**********
maps = 82
  i = 1
  while ( i<maps )
'set t ' i

say 'Timestep 'i

* Colortable
************
*'color.gs 0 60 0.5 -gxout shaded -kind (255,255,255)->(176,176,228)->(97,97,201)->(17,17,173)->(2,233,247)->(55,133,196)->(108,33,144)->(128,63,125)->(148,93,106)->(169,123,87)->(189,154,68)->(210,184,49)->(230,214,30)'
'color.gs 0 60 0.5 -gxout shaded -kind (255,255,255)->(140,206,140)->(25,156,25)->(33,77,3)->(255,255,0)->(205,134,0)->(155,13,0)->(245,9,231)->(167,5,160)->(88,1,88)->(63,77,138)->(38,153,189)->(12,230,240)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Precipitable water, 500mb Geopotential height & MSLP'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define pwat = pwatclm'
'define slp = prmslmsl/100'


say '.Visualisations'
* visualisatie precipitable water
*********************************
'd pwat'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 80'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 150'
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
'set rgb 250 255 255 255 150'
'set cthick 13'
'set ccolor 250'
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
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 6 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- mm, Higher means increasing amount of water avail. for precip ->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'huh' - `4Valid: 'hub

say '.Saving file'
say '..Valid: 'hub
say '..Run: 'huh

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\pwat_eur_'i'_valid_'hub'_run_'huh'.png x1024 y768'

say '***'
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
