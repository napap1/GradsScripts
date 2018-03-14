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

* Colortable
************
*'color.gs 0 100 5 -gxout shaded -kind (255,255,255)->(226,226,226)->(196,196,196)->(166,166,166)->(136,136,136)->(81,120,190)->(25,104,244)->(79,139,186)->(134,175,128)->(189,211,70)->(255,255,0)->(246,233,22)->(236,211,44)->(227,188,66)->(217,166,89)->(207,144,111)->(198,121,133)->(188,99,155)->(179,77,178)->(169,54,200)->(159,32,222)'
*'color.gs 0 110 2 -gxout shaded2 -kind (255,255,255)->(226,226,226)->(196,196,196)->(166,166,166)->(136,136,136)->(81,120,190)->(25,104,244)->(79,139,186)->(134,175,128)->(189,211,70)->(255,255,0)->(246,233,22)->(236,211,44)->(227,188,66)->(217,166,89)->(207,144,111)->(198,121,133)->(188,99,155)->(179,77,178)'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 244 244 244'
'set rgb 103 226 226 226'
'set rgb 104 214 214 214'
'set rgb 105 196 196 196'
'set rgb 106 184 184 184'
'set rgb 107 166 166 166'
'set rgb 108 154 154 154'
'set rgb 109 136 136 136'
'set rgb 110 114 130 157'
'set rgb 111 81 120 190'
'set rgb 112 58 114 211'
'set rgb 113 25 104 244'
'set rgb 114 46 118 221'
'set rgb 115 79 139 186'
'set rgb 116 101 154 163'
'set rgb 117 134 175 128'
'set rgb 118 156 190 105'
'set rgb 119 189 211 70'
'set rgb 120 211 226 47'
'set rgb 121 244 247 12'
'set rgb 122 239 234 25'
'set rgb 123 236 225 34'
'set rgb 124 230 211 47'
'set rgb 125 227 202 56'
'set rgb 126 221 189 69'
'set rgb 127 218 180 78'
'set rgb 128 212 166 91'
'set rgb 129 209 157 100'
'set rgb 130 200 135 122'
'set rgb 131 195 121 135'
'set rgb 132 191 112 144'
'set rgb 133 186 99 157'
'set rgb 134 182 90 166'
'set rgb 135 177 76 179'
'set rgb 136 173 67 188'
'set rgb 137 131 112 204'
'set rgb 138 103 143 215'
'set rgb 139 61 189 231'


*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Sub-zero temperature probability at 2m above ground'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 Dzengiz Tafa - http://www.chase2.be - http://www.facebook.com/chase2be'

say '.Calculations'
* Declaration variables & calculations
**************************************
*'set e 1'
*'define temp1 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 2'
*'define temp2 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 3'
*'define temp3 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 4'
*'define temp4 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 5'
*'define temp5 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 6'
*'define temp6 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 7'
*'define temp7 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 8'
*'define temp8 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 9'
*'define temp9 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 10'
*'define temp10 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 11'
*'define temp11 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 12'
*'define temp12 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 13'
*'define temp13 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 14'
*'define temp14 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 15'
*'define temp15 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 16'
*'define temp16 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 17'
*'define temp17 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 18'
*'define temp18 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 19'
*'define temp19 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 20'
*'define temp20 = const( const( maskout( ((tmp2m - 273.16) * -1), ((tmp2m - 273.16) * -1) - 0), 1), 0.0, -u)'


*'set e 21'
*'define temp21 = const( const( maskout( tmp2m, tmp2m - 0), 1), 0.0, -u)'



*'define tempoverlap = (temp1 + temp2 + temp3 + temp4 + temp5 + temp6 + temp7 + temp8 + temp9 + temp10 + temp11 + temp12 + temp13 + temp14 + temp15 + temp16 + temp17 + temp18 + temp19 + temp20 + temp21) / 21'

'set e 1 21'
'temp = const( const( maskout( (tmp2m - 273.16), (tmp2m - 273.16) + 0), 0), 1.0, -u)'

'set e 1'
'tempoverlap=ave(temp,e=1,e=21)'

'define freezeprob = 100 * tempoverlap'

say '.Visualisations'
* visualisatie sub zero probability
***********************************
say '..probability of sub zero temperatures'
*'set clevs 2.5 5.0 7.5 10.0 12.5 15.0 17.5 20.0 22.5 25.0 27.5 30.0 32.5 35.0 37.5 40.0 42.5 45.0 47.5 50.0 52.5 55.0 57.5 60.0 62.5 65.0 67.5 70.0 72.5 75.0 77.5 80.0 82.5 85.0 87.5 90.0 92.5 95.0'
*'set ccols 101 102 103 104  105  106  107  108  109  110  111  112  113  114  115  116  117  118  119  120  121  122  123  124  125  126  127  128  129 130  131  132  133  134  135  136  137  138'
'set gxout shaded'
'd freezeprob'

'set rgb 250 0 0 0 20'
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
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <- %, Higher means increasing chances for sub-zero temperatures ->' 

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
