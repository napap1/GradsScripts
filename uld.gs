
********************************************************
* Frontogenesis                                        *
********************************************************

'set t 1'

* kleurentabel
**************
'set rgb 101 255 255 255'
'set rgb 102 233 255 233'
'set rgb 103 210 255 210'
'set rgb 104 188 255 188'
'set rgb 105 158 255 158'
'set rgb 106 135 255 135'  
'set rgb 107 105 255 105'  
'set rgb 108 83 255 83'    
'set rgb 109 60 255 60'    
'set rgb 110 30 255 30'    
'set rgb 111 8 255 8'      
'set rgb 112 8 242 8'      
'set rgb 113 7 224 7'      
'set rgb 114 6 210 6'      
'set rgb 115 5 196 5'      
'set rgb 116 4 178 4'      
'set rgb 117 4 164 4'      
'set rgb 118 3 151 3'      
'set rgb 119 2 132 2'      
'set rgb 120 1 119 1'      
'set rgb 121 1 105 1'      
'set rgb 122 22 117 1'     
'set rgb 123 51 134 1'     
'set rgb 124 73 147 1'     
'set rgb 125 102 164 1'    
'set rgb 126 124 177 1'    
'set rgb 127 146 190 1'    
'set rgb 128 175 207 1'    
'set rgb 129 196 220 1'    
'set rgb 130 218 233 1'    
'set rgb 131 247 250 1'    
'set rgb 132 247 236 1'    
'set rgb 133 247 221 1'    
'set rgb 134 247 206 1'    
'set rgb 135 248 187 1'    
'set rgb 136 248 172 1'    
'set rgb 137 248 152 1'    
'set rgb 138 249 138 1'    
'set rgb 139 249 123 1'    
'set rgb 140 249 103 1'    
'set rgb 141 250 89 1'     
'set rgb 142 250 74 1'     
'set rgb 143 250 54 1'     
'set rgb 144 251 40 1'     
'set rgb 145 251 25 1'     
'set rgb 146 245 10 1'     
'set rgb 147 227 8 1'      
'set rgb 148 208 7 1'      
'set rgb 149 184 4 1'      
'set rgb 150 165 3 1'      
'set rgb 151 147 1 1'      
'set rgb 152 170 17 57'    
'set rgb 153 188 30 99'    
'set rgb 154 206 43 142'   
'set rgb 155 230 60 198'   
'set rgb 156 248 72 240'    
'set rgb 157 249 96 241'    
'set rgb 158 250 120 242'   
'set rgb 159 251 153 244'   
'set rgb 160 252 177 245'   
'set rgb 161 253 201 246'   

* declaratie constanten
***********************
'pi=3.14159'
'dtr=pi/180'
'a=6.37122e6'
'omega=7.2921e-5'
'g=9.8'
'R=287'
'set grads off'

* visualisatie q-vector divergence
**********************************
'set ccolor 160'
'set cstyle 2'
'set gxout shaded'

'set clevs 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.65, 1.70, 1.75, 1.80, 1.85, 1.90, 1.95, 2.00, 2.05, 2.10, 2.15, 2.20, 2.25, 2.30, 2.35, 2.40, 2.45, 2.50, 2.55, 2.60, 2.65, 2.70, 2.75, 2.80, 3.00, 3.25, 3.75, 4.00'
'set ccols  101   102   103   104   105   106   107   108   109   110   111   112   113   114   115   116   117   118   119   120   121   122   123   124   125   126   127   128   129   130  131  132   133   134   135   136   137   138   139   140   141   142   143   144   145   146   147   148   149   150   151   152   153   154   155   156   157   158   159   160   161'
'd (ave(hdivg(ugrdprs,vgrdprs),lev=300,lev=200))*10000'
'cbarm'

* visualisatie SFC-1km deep convergence
***************************************
'set cmax -0.1'
'set cstyle 3'
'set cint 0.1'
'set gxout contour'
'set ccolor 1'
'set clopts -1'
'set clab masked'
'd (ave(hdivg(ugrdprs,vgrdprs),lev=1000,lev=900))*10000'

* visualisatie 500mb geopotential height
****************************************
'set gxout contour'
'set cmax 10000'
'set rgb 200 0 0 0'
'set ccolor 1'
'set cint 40'
'set cstyle 1'
'set cthick 7'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Dzengiz Tafa'
'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 9.9 0.8 <----- 1E-5, Higher means increasing upper level divergence ----->'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model (13km), run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 300-200mb UL div, SFC-1km Deep conv & 500mb GPM'

'printim ULdivergence'i'.png x1024 y768'

'clear'
'set grads off'


* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* basisfunctionaliteit                                      *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function setmap(args)
*'set mproj lambert'
*'set mpvals 15 52 54 71'
'set lon -20 40'
'set lat 40 60'
'set mpdset hires'

'set display color white'
'set background 98'
'c'
'set grads off'

*'set parea 0.02 9.54 0.8 8.50'
'set parea off'
'set rgb 99 1 1 1'
*'draw rec 0.02 0.02 9.54 0.81'
*'draw rec 9.54 0.02 10.99 8.48'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function vrng(f1,f2)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymx = subwrd(data,5)
ymn = subwrd(data,4)
'd 'f2
data = sublin(result,8)
zmx = subwrd(data,5)
zmn = subwrd(data,4)
if (zmx > ymx) ; ymx = zmx ; endif
if (zmn < ymn) ; ymn = zmn ; endif
dy = ymx-ymn
ymx = ymx + 0.08 * dy
ymn = ymn - 0.08 * dy
if ((ymx-ymn)/2.2 < 1)
  incr = (ymx-ymn)/4
  incr = 0.01 * (math_nint(100*incr))
else
  incr = math_nint((ymx-ymn)/4)
endif
'set vrange 'ymn' 'ymx
'set ylint 'incr
if (ymn=0 & ymx=0 & incr=0)
  'set vrange -.9 .9'
  'set ylint 1'
endif
'set gxout line'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function rh2vrng(f1)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymn = subwrd(data,4)
ymx = subwrd(data,5)
if (ymn < 20) 
  miny = 0 
  'set ylevs 20 40 60 80'
endif
if (ymn >= 20 & ymn < 30) 
  miny = 20 
  'set ylevs 30 50 70 90'
endif
if (ymn >= 30 & ymn < 40) 
  miny = 30 
  'set ylevs 40 50 60 70 80 90'
endif
if (ymn >= 40 & ymn < 50) 
  miny = 40 
  'set ylevs 50 60 70 80 90'
endif
if (ymn >= 50 & ymn < 60) 
  miny = 50
  'set ylevs 60 70 80 90'
endif
if (ymn >= 60) 
  miny = 60
  'set ylevs 70 80 90'
endif
'set vrange 'miny' 'ymx+3
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

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

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getgrid(dodsvar,myvar)

'set lon '_xdim
'set lat '_ydim
'set lev '_zgrd
'set time '_tdim

* schrijf een variabele naar een bestand
'set gxout fwrite'
'set fwrite dummy.dat'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand (.ctl)
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_zdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_zbot' '_ztop
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getetarh(dodsvar,myvar)

* drukveriabelen eruit halen
tmpzgrd = _zgrd
tmpzdef = _zdef
tmpzbot = _zbot
tmpztop = _ztop
tmpzsize = _newzsize

* rh data over de rh-druk range
_zgrd = _rhzgrd
_zdef = _trhzdef
_ztop = _rhztop
_zbot = _rhzbot
_newzsize = _trhzsize
getgrid(dodsvar,tmprh)

* stop er de originele drukveriabelen terug in
_zgrd = tmpzgrd
_zdef = tmpzdef
_zbot = tmpzbot
_ztop = tmpztop
_newzsize = tmpzsize

'set lon '_xdim
'set lat '_ydim
'set lev '_rhzgrd
'set time '_tdim

* schrijf de veriabelen naar een textfile
'set gxout fwrite'
'set fwrite dummy.dat'
t = _t1
while (t <= _t2)
  'set t 't
  z = 1
  while (z <= _newrhzsize)
    level = subwrd(_rhlevs,z) 
    'set lev 'level
    'd tmprh'
    z = z + 1
  endwhile
  t = t + 1
endwhile
'disable fwrite'

* schrijf terug het descriptor bestand (ctl) 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_rhzdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newrhzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* open het dummy bestand, maak instanties aan & sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_rhzbot' '_rhztop
'set time '_time1' '_time2
'q dims'
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getseries(dodsvar,myvar,level)

*'set lon '_xdim
*'set lat '_ydim
*'set lev 'level' 'level
'set time '_tdim

* schrijf een veriabele naar een bestand
'set fwrite dummy.dat'
'set gxout fwrite'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,'zdef 1 linear 1 1',append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy 0 -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close(dummy.ctl)

* open het dummy bestand, maak een variabele aan en sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev 'level
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
'set gxout contour'

return
