function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gens/gens'date'/gep_all_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'

'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'

*'set lon -60 55'
*'set lat 25 80'
*'set mpvals -10 35 45 70'

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

'define maps = 8'

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

************************************************
* 500mb Isotachs                               *
************************************************

* iteratie
**********
maps = 8

  i = 1
  while ( i<maps )
'set t ' i

say '.Calculations'
* Declaration variables & calculations
**************************************
'set e 1 21'
'temp = const( const( maskout( (tmp2m - 273.16), (tmp2m - 273.16) + 0), 0), 1.0, -u)'

'set e 1'
'tempoverlap=ave(temp,e=1,e=21)'

'define freezeprob = 100 * tempoverlap'

say '.Visualisations'
* visualisatie sub zero probability
***********************************
say '..probability of sub zero temperatures'
'set gxout shaded'
'd freezeprob'

'set rgb 250 0 0 0'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 10'
'set cmin 10'
'set clab off'
'set csmooth on'
'd freezeprob'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 GEFS: 20 members used + 1 Control member'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS ensemble model (1DEG), run: 'huh

say '.Saving file'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\freezeprob'i'.png x1024 y768'

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
