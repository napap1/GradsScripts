function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gens/gens'date'/gep_all_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

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
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************


*******************************************************************
* Precipitation probability                                       *
*******************************************************************

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 237 237 237'
'set rgb 103 210 210 210'
'set rgb 104 193 223 152'
'set rgb 105 159 251 36'
'set rgb 106 131 243 35'
'set rgb 107 87 229 32'
'set rgb 108 58 220 30'
'set rgb 109 15 207 27'
'set rgb 110 13 197 23'
'set rgb 111 9 181 15'
'set rgb 112 7 171 10'
'set rgb 113 3 155 3'
'set rgb 114 4 142 25'
'set rgb 115 6 121 58'
'set rgb 116 8 107 80'
'set rgb 117 10 86 113'
'set rgb 118 17 95 137'
'set rgb 119 28 110 173'
'set rgb 120 35 120 197'
'set rgb 121 46 135 233'
'set rgb 122 34 145 231'
'set rgb 123 26 153 230'
'set rgb 124 13 164 228'
'set rgb 125 5 171 226'
'set rgb 126 5 191 224'
'set rgb 127 5 204 223'
'set rgb 128 6 224 221'
'set rgb 129 6 238 219'
'set rgb 130 73 202 183'
'set rgb 131 118 177 159'
'set rgb 132 185 140 122'
'set rgb 133 230 116 98'
'set rgb 134 231 85 72'
'set rgb 135 232 64 54'
'set rgb 136 234 32 27'
'set rgb 137 235 11 9'
'set rgb 138 169 0 0'
'set rgb 139 123 0 0'

* iteratie
**********
  i = 2
  while ( i < 9 )
'set t ' i

'set e 1'
'define prec5mm1 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 2'
'define prec5mm2 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 3'
'define prec5mm3 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 4'
'define prec5mm4 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 5'
'define prec5mm5 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 6'
'define prec5mm6 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 7'
'define prec5mm7 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 8'
'define prec5mm8 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 9'
'define prec5mm9 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 10'
'define prec5mm10 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 11'
'define prec5mm11 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 12'
'define prec5mm12 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 13'
'define prec5mm13 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 14'
'define prec5mm14 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 15'
'define prec5mm15 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 16'
'define prec5mm16 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 17'
'define prec5mm17 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 18'
'define prec5mm18 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 19'
'define prec5mm19 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 20'
'define prec5mm20 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'


'set e 21'
'define prec5mm21 = const( const( maskout( apcpsfc, apcpsfc - 1), 1), 0.0, -u)'



'define tsoverlap = (prec5mm1 + prec5mm2 + prec5mm3 + prec5mm4 + prec5mm5 + prec5mm6 + prec5mm7 + prec5mm8 + prec5mm9 + prec5mm10 + prec5mm11 + prec5mm12 + prec5mm13 + prec5mm14 + prec5mm15 + prec5mm16 + prec5mm17 + prec5mm18 + prec5mm19 + prec5mm20 + prec5mm21) / 21'

'define percentts = 100 * tsoverlap'

'set gxout shaded'
'set csmooth on'
'set clevs 0 2.5 5.0 7.5 10.0 12.5 15.0 17.5 20.0 22.5 25.0 27.5 30.0 32.5 35.0 37.5 40.0 42.5 45.0 47.5 50.0 52.5 55.0 57.5 60.0 62.5 65.0 67.5 70.0 72.5 75.0 77.5 80.0 82.5 85.0 87.5 90.0 92.5'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139'
'd percentts'
'run cbarm'

* visualisatie TSTMS
********************
'set gxout contour'
'set ccolor 0'
'set cstyle 3'
'set cmin 5'
'set cint 10'
'set clopts -1'
'set clab off'
'd percentts'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Stormplatform'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <- Higher means increasing possibility of precipitation (> 1mm/6hrs) ->'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GEFS model, run: 'date' 'hour'Z'
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 GEFS: Precipitation poss (20mem + contr)' 

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\prec'i'.png x1024 y768'
'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile

'quit'

**
