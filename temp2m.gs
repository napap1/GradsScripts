function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_hd/gfs_hd'date'/gfs_hd_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'
'set display color white'
'set csmooth on'
*'set lat 42 56'
*'set lon -5 15'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
*'set parea 0.04 9.7 0.8 8.0'
**'set parea 0.95 10.95 0.8 8.0'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
*'set map 0 1 1'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 82

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

*******************************************************************
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************

********************************************************
* Frontogenesis                                        *
********************************************************

* kleurentabel
**************
'set rgb 101 250 0 250' 
'set rgb 102 225 0 238'
'set rgb 103 200 0 226'
'set rgb 104 175 0 214'
'set rgb 105 150 0 201'
'set rgb 106 125 0 189'
'set rgb 107 100 0 177'
'set rgb 108 75 0 164'
'set rgb 109 50 0 152'
'set rgb 110 25 0 140'
'set rgb 111 0 0 127'
'set rgb 112 9 16 139'
'set rgb 113 19 32 152'
'set rgb 114 28 48 165'
'set rgb 115 38 64 178'
'set rgb 116 48 80 191'
'set rgb 117 57 96 203'
'set rgb 118 67 112 216'
'set rgb 119 76 128 229'
'set rgb 120 86 144 242'
'set rgb 121 96 160 255'
'set rgb 122 92 154 243'
'set rgb 123 87 147 230' 
'set rgb 124 82 141 217'
'set rgb 125 77 134 204'
'set rgb 126 72 128 191'
'set rgb 127 67 121 179'
'set rgb 128 62 115 166'
'set rgb 129 57 108 153'
'set rgb 130 52 102 140'
'set rgb 131 47 95 127'
'set rgb 132 43 111 139'
'set rgb 133 38 127 151'
'set rgb 134 33 143 163'
'set rgb 135 29 159 176'
'set rgb 136 24 175 188'
'set rgb 137 19 191 200'
'set rgb 138 15 207 213'
'set rgb 139 10 223 225'
'set rgb 140 5 239 237'
'set rgb 141 0 255 0'
'set rgb 142 0 241 0'
'set rgb 143 0 226 0'
'set rgb 144 0 211 0'
'set rgb 145 0 196 0'
'set rgb 146 0 181 0'
'set rgb 147 0 167 0'
'set rgb 148 0 152 0'
'set rgb 149 0 137 0'
'set rgb 150 0 122 0'
'set rgb 151 0 107 0'
'set rgb 152 25 121 0'
'set rgb 153 51 136 0'
'set rgb 154 76 151 0'
'set rgb 155 102 166 0'
'set rgb 156 127 181 0'
'set rgb 157 153 195 0'
'set rgb 158 178 210 0'
'set rgb 159 204 225 0'
'set rgb 160 229 240 0'
'set rgb 161 255 255 0'
'set rgb 162 255 230 0'
'set rgb 163 253 207 0'
'set rgb 164 250 184 0'
'set rgb 165 248 161 0'
'set rgb 166 245 138 0'
'set rgb 167 243 115 0'
'set rgb 168 240 92 0'
'set rgb 169 238 69 0'
'set rgb 170 235 46 0'
'set rgb 171 233 23 0'
'set rgb 172 227 23 14'
'set rgb 173 220 23 28'
'set rgb 174 214 23 43'
'set rgb 175 207 23 57'
'set rgb 176 201 23 72'
'set rgb 177 194 22 86'
'set rgb 178 188 22 101'
'set rgb 179 181 22 115'
'set rgb 180 175 22 130'
'set rgb 181 168 22 144'
'set rgb 182 175 41 153'
'set rgb 183 182 60 162'
'set rgb 184 189 79 171'
'set rgb 185 196 98 181'
'set rgb 186 203 117 190'
'set rgb 187 210 137 199'
'set rgb 188 217 156 208'
'set rgb 189 224 175 218'
'set rgb 190 231 194 227'
'set rgb 191 238 213 236'

* declaratie constanten
***********************

'pi=3.14159'
'dtr=pi/180'
'a=6.37122e6'
'omega=7.2921e-5'
'g=9.8'
'R=287'

'set grads off'

* iteratie
**********
  i = 1
  while ( i<maps )
'set t ' i

* visualisatie 2m temp
************************
'set clevs -39 -38 -37 -36 -35 -34 -33 -32 -31 -30 -29 -28 -27 -26 -25 -24 -23 -22 -21 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10  -9  -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48  49'
'set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 170 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190'

'set gxout shaded'
'd tmp2m-273.16'

*'set parea 0.95 10.95 0.8 8.0'
*      bounds,           bardirection, lijntjes
*'run cbarm'

* visualisatie 2m isotherms
***************************
'set rgb 200 0 0 0 100'
'set gxout contour'
'set csmooth on'
'set ccolor 200'
'set cstyle 3'
'set cint 5'
'set clopts -1'
'set clab off'
'set cthick 1'
'set antialias on'
'd tmp2m-273.16'

* visualisatie 2m isotherms
***************************
'set gxout contour'
'set csmooth on'
'set ccolor 1'
'set cstyle 1'
'set cint 5'
'set clopts -1'
'set clab masked'
'set cthick 6'
'set cmax 0'
'set cmin 0'
'set antialias on'
'd tmp2m-273.16'

* visualisatie MSLP
*******************
'set rgb 199 255 255 255 150'
'define slp  = const((prmslmsl*0.01),0,-u)'
'set gxout contour'
'set csmooth on'

* color was 0
'set ccolor 199'

'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'set cthick 1'
'set antialias on'
'd slp'

* visualisatie MSLP
*******************
'set gxout contour'
'set csmooth on'

* color was 0
'set ccolor 199'

'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'set antialias on'
'd slp'

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11 -foffset -1'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <------ Celsius, higher means increasing 2m temperature ------>'
'set string 1 r 6 0' ; 'draw string 10.95 0.45 Valid: 'hub
'set string 1 r 6 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (13km), run: 'huh
'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 Temperature: Dashed contours each 5deg, Thick contour 0deg'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 2m Temperature (C) & Mean sea layer pressure'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\temp_2m'i'.png x1024 y768'

'clear'
'set grads off'



* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* END OF MAIN SCRIPT                                        *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

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

return
