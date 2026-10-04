// node build.js [tile mm] [gap] [margin] [header] -> sheet-A.svg, sheet-B.svg
const fs=require('fs');const {LAYOUTS,measure,sheet}=require('./sheetlib.js');
const [T=40,G=3,M=5,HH=16]=process.argv.slice(2).map(Number);const o={T,G,M,HH};
for(const k of ["A","B"]){fs.writeFileSync(`sheet-${k}.svg`,sheet(LAYOUTS[k],{...o,mm:1,crop:1}));fs.writeFileSync(`sheet-${k}-ids.svg`,sheet(LAYOUTS[k],{...o,ids:1}));
const {W,H}=measure(LAYOUTS[k],o);console.log(k,W.toFixed(1),"x",H.toFixed(1),"mm");}
