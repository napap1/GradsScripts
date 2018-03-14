function main(args)

**********************************************************
**********************************************************
**     700mb Theta-E, windfield, 500mb GPM & MSLP       **
**********************************************************
**********************************************************

* Argument parsing
******************
date = subwrd(args,1)
hour  = subwrd(args,2)

* Opendap connectionstring
**************************
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

* Map options & resolution
**************************
'set mproj lambert'
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'
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

* iteratie
**********
'maps = 82'
i = 1

while ( i<82 )
'set t ' i

* Colortable
************
'set rgb 101 255 255 255'
'set rgb 102 251 251 251'
'set rgb 103 247 247 247'
'set rgb 104 242 242 242'
'set rgb 105 238 238 238'
'set rgb 106 234 234 234'
'set rgb 107 229 229 229'
'set rgb 108 225 225 225'
'set rgb 109 221 221 221'
'set rgb 110 216 216 216'
'set rgb 111 212 212 212'
'set rgb 112 207 207 207'
'set rgb 113 203 203 203'
'set rgb 114 199 199 199'
'set rgb 115 194 194 194'
'set rgb 116 190 190 190'
'set rgb 117 186 186 186'
'set rgb 118 181 181 181'
'set rgb 119 177 177 177'
'set rgb 120 173 173 173'
'set rgb 121 168 168 168'
'set rgb 122 164 164 164'
'set rgb 123 159 159 159'
'set rgb 124 155 155 153'
'set rgb 125 151 151 151'
'set rgb 126 146 146 146'
'set rgb 127 142 142 142'
'set rgb 128 138 138 138'
'set rgb 129 133 133 133'
'set rgb 130 129 129 129'
'set rgb 131 125 125 125'
'set rgb 132 120 120 120'
'set rgb 133 116 116 116'
'set rgb 134 111 111 111'
'set rgb 135 107 107 107'
'set rgb 136 103 103 103'
'set rgb 137 87 104 127'
'set rgb 138 70 105 152'
'set rgb 139 53 106 177'
'set rgb 140 36 107 202'
'set rgb 141 19 108 227'
'set rgb 142 10 122 219'
'set rgb 143 9 136 197'
'set rgb 144 8 149 175'
'set rgb 145 8 163 154'
'set rgb 146 7 176 132'
'set rgb 147 6 190 110'
'set rgb 148 6 203 89'
'set rgb 149 5 217 67'
'set rgb 150 4 230 45'
'set rgb 151 4 244 24'

* Titles & labels
*****************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 Deep boundary layer-moisture, 500mb GPM & Mean sea layer pressure'
'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'

* Declaration variables & calculations
**************************************
'define relh1000 = rhprs(lev=1000)'
'define relh975 = rhprs(lev=975)'
'define relh950 = rhprs(lev=950)'
'define relh925 = rhprs(lev=925)'
'define relh900 = rhprs(lev=900)'
'define relh850 = rhprs(lev=850)'

'define relhavg = (relh1000 + relh975 + relh950 + relh925 + relh900 + relh850)/6'

'set gxout shaded'
'set csmooth on'
'set clevs 0   2   4   6   8   10  12  14  16  18  20  22  24  26  28  30  32  34  36  38  40  42  44  46  48  50  52  54  56  58  60  62  64  66  68  70  72  74  76  78  80  82  84  86  88  90  92  94  96  98'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151'

* Visualisation RELH
********************
'd relhavg'

'set gxout contour'
'set ccolor 15'
'set cstyle 3'
'set cint 10'
'set clopts -1'
'set clab off'
'set cthick 2'
'd relhavg'

* Visualisation MSLP
********************
'define slp  = const((prmslmsl*0.01),0,-u)'
'set rgb 255 0 0 0 150'
'set gxout contour'
'set ccolor 255'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set cthick 2'
'd slp'

'set gxout contour'
'set ccolor 255'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 5'
'd slp'

* Visualisation 500mb height contours
*************************************
'set rgb 250 255 255 255'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd hgtprs(lev=500)'

* Colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <------- %, higher means increasing deep BL-moisture ------->'

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 RELH: Dashed contours each 10%, >=70% is conducive to non-elevated convective initiation'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 500mb geopotential height: Thick contours each 50 meter'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (13km), run: 'huh

* Saving
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\BLrelh'i'.png x1024 y768'

'clear'
'set grads off'

* Iteration progression
***********************
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
