* Qvector.gs
*-----------------------------------------------------------------------
*-----------------------------------------------------------------------
* Leo Kroon (leo.kroon@wur.nl) / Wageningen University MAQ 
* 5/Dec/07
* Script to calculate the Q vector
* 
*-----------------------------------------------------------------------
*-----------------------------------------------------------------------
*

'eu.gs'

"run constants.gs"
* Define abbreviation
*
"define tcos   = cos(lat*d2r)"
*
* Calculate for all levels, change if necessary
*
"set lev 550"
*
* Horizontal increments
*
"define dhy = cdiff(hgtprs,y)"
"define dhx = cdiff(hgtprs,x)"
"define dy = cdiff(lat,y)*d2r*rearth"
"define dx = cdiff(lon,x)*d2r*rearth*tcos"
*
* Geostrophic windcomponents
*
"define ug = -1*(grav/fcor)*(dhy/dy)"
"define vg = (grav/fcor)*(dhx/dx)"
*
* Gradient of geostrophic windcomponents
*
"define dugx = cdiff(ug,x)"
"define dugy = cdiff(ug,y)"
"define dvgx = cdiff(vg,x)"
"define dvgy = cdiff(vg,y)"
"define dugdx = dugx/dx"
"define dugdy = dugy/dy"
"define dvgdx = dvgx/dx"
"define dvgdy = dvgy/dy"
*
* Temperature gradients
*
"define dtx = cdiff(tmpprs,x)"
"define dty = cdiff(tmpprs,y)"
"define dtdx = dtx/dx"
"define dtdy = dty/dy"
*
* Compose Q vector components Q1 and Q2
*
"define Q1 = -1*(rdry/lev)*(dugdx*dtdx + dvgdx*dtdy)"
"define Q2 = -1*(rdry/lev)*(dugdy*dtdx + dvgdy*dtdy)"
*
* Calculate divergence of Q-vector
*
"define divq = hdivg(Q1,Q2)"
*
* Return to single level and output
*
'mmap.gs'
say 'Ready script Geostrophic.gs' 
say 'Calculated Q1, Q2 and divq=div(Q1,Q2) at 550hPa'
'res = -1*divq'
'color.gs 0 5e-15 0.1e-15 -gxout shaded -kind white-(0)->grainbow'
'd res'
'cbarm'

'set gxout contour'
'set cthick 7'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
geldig = subwrd(times,6)

'set t 1'
'q time'
times  = sublin(result,1)
run = subwrd(times,5)

'draw title Q-vector convergence & 500hPa geopotential'
'draw string 0.65 0.20 Michael Verhaeghe (Fastowarn/Chase2Be)'
'draw string 0.65 0.50 GFS ENS mean 'run

'set string 1 r 5 0' ; 'draw string 9.05 0.20 Valid: 'geldig


'printim qvectMean'geldig'.png x1075 y875'

**