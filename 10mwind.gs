'sdfopen http://monsoondata.org:9090/dods/gfs0p25/gfs.2015021006'

*wind = sqrt(u10m*u10m+v10m*v10m)

'set lev 300'

'set display color white'
'set mpdset hires'
'clear'
'set grads off'

'set lat 49 54'
'set lon 0 8'

'set parea 0.5 10.0 0.5 7.5'

'set t 3'

'set gxout barb'

'display u ; v'
'display ave(u,t=1,t=10) ; ave(v,t=1,t=10)'

'printim 10mwind.png x1000 y800'

**