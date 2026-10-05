const { chromium } = require('playwright');
const src=require('fs').readFileSync('sheetlib.js','utf8');
const ids=["nfc","giro","mcm","visav","apple","google","amex","diners","jcb","unionpay","sepa"];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:400}});
for(const id of ids){
 const svg=await p.evaluate(([src,id])=>{eval(src.replace(/if\(typeof module[\s\S]*$/,'')+';window.__L=L;');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400">${window.__L[id]()}</svg>`},[src,id]);
 await p.setContent(`<body style="margin:0;background:#fff">${svg}</body>`);
 await p.screenshot({path:`png/${id}.png`,clip:{x:0,y:0,width:400,height:400}});
}
await b.close();})();
