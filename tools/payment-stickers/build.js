const fs=require('fs');
const t=(x,y,s,txt,fill,w,extra)=>`<text x="${x}" y="${y}" font-size="${s}" fill="${fill}" font-weight="${w||700}" text-anchor="middle" font-family="Onest,Arial,Helvetica,sans-serif" ${extra||""}>${txt}</text>`;
const L={
 nfc:()=>`<circle cx="50" cy="50" r="40" fill="none" stroke="#222" stroke-width="3"/>${[10,20,30].map(r=>{const x=(32+r*0.643).toFixed(1),a=(50-r*0.766).toFixed(1),b=(50+r*0.766).toFixed(1);return `<path d="M${x} ${a} A${r} ${r} 0 0 1 ${x} ${b}" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>`}).join("")}`,
 giro:()=>`<rect x="14" y="14" width="72" height="72" fill="none" stroke="#1b3d8f" stroke-width="2.5"/>${t(50,45,17,"giro","#1b3d8f")}${t(50,63,17,"card","#1b3d8f")}<rect x="40" y="70" width="20" height="8" fill="#1b3d8f"/>`,
 mc:()=>`<circle cx="37" cy="44" r="22" fill="#eb001b"/><circle cx="63" cy="44" r="22" fill="#f79e1b"/><path d="M50 26a22 22 0 0 1 0 36a22 22 0 0 1 0-36z" fill="#ff5f00"/>${t(50,84,12,"mastercard","#222",500)}`,
 maestro:()=>`<circle cx="37" cy="44" r="22" fill="#eb001b"/><circle cx="63" cy="44" r="22" fill="#00a2e5"/><path d="M50 26a22 22 0 0 1 0 36a22 22 0 0 1 0-36z" fill="#7375cf"/>${t(50,84,13,"maestro","#222",500)}`,
 visa:()=>`${t(50,58,32,"VISA","#1a1f71",800,'font-style="italic"')}<rect x="20" y="66" width="60" height="5" fill="#f7b600"/>`,
 vpay:()=>`<rect x="22" y="14" width="56" height="72" fill="#fff" stroke="#1a1f71" stroke-width="3"/>${t(50,47,28,"V","#1a1f71",800)}<rect x="22" y="56" width="56" height="30" fill="#1a1f71"/>${t(50,78,19,"PAY","#fff",800)}`,
 apple:()=>`<rect x="12" y="28" width="76" height="44" rx="8" fill="#fff" stroke="#111" stroke-width="3"/><g transform="translate(4 6)"><path d="M33 44c0-5 4-7 6-7-1-3-4-4-6-4-3 0-4 2-6 2s-3-2-6-2c-3 0-6 3-6 8 0 6 4 13 7 13 2 0 2-1 5-1s3 1 5 1c2 0 4-3 5-6-2-1-4-2-4-4z" fill="#111"/><path d="M33 31c1-2 3-3 4-3 0 2-1 3-2 4-1 1-2 1-2-1z" fill="#111"/></g>${t(64,59,19,"Pay","#111",600)}`,
 google:()=>`<rect x="10" y="30" width="80" height="40" rx="20" fill="#fff" stroke="#3c4043" stroke-width="3"/>${t(36,59,22,"G","#4285f4",700)}${t(62,58,17,"Pay","#3c4043",600)}`,
 amex:()=>`<rect x="18" y="18" width="64" height="64" fill="#2e77bb"/>${t(50,47,11.5,"AMERICAN","#fff",800)}${t(50,61,11.5,"EXPRESS","#fff",800)}`,
};
const pair=(a,b)=>`<svg x="10" y="0" width="80" height="50" viewBox="0 0 100 100">${L[a]()}</svg><line x1="20" y1="50" x2="80" y2="50" stroke="#c9d3dd" stroke-width="1"/><svg x="10" y="50" width="80" height="50" viewBox="0 0 100 100">${L[b]()}</svg>`;
L.mcm=()=>pair("mc","maestro"); L.visav=()=>pair("visa","vpay");
const NAME={nfc:"Безконтактно",giro:"girocard",mcm:"Mastercard + Maestro",visav:"Visa + V PAY",apple:"Apple Pay",google:"Google Pay",amex:"American Express"};

const T=44,G=3;
function sheet(cfg,{ids,crop}){
  const {W,H,mx,my,pieces}=cfg;
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}mm" height="${H}mm" role="img" aria-label="${cfg.title}">`;
  s+=`<rect width="${W}" height="${H}" fill="#f6f5f1"/>`;
  if(crop) s+=`<rect x="0.3" y="0.3" width="${W-0.6}" height="${H-0.6}" fill="none" stroke="#bbb" stroke-width="0.3"/>`;
  for(const p of pieces){
    const x=mx+p.c*(T+G), y=my+p.r*(T+G), w=p.w*T+(p.w-1)*G, h=p.h*T+(p.h-1)*G;
    s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5" fill="#fff" stroke="#9aa3ad" stroke-width="0.35" stroke-dasharray="${crop?"1.2 0.8":"0"}"/>`;
    // tiles inside piece: spread evenly
    const cw=w/p.w, ch=h/p.h;
    p.items.forEach((it,k)=>{
      const cx=x+(k%p.w)*cw, cy=y+Math.floor(k/p.w)*ch;
      s+=`<rect x="${cx+2.5}" y="${cy+2.5}" width="${cw-5}" height="${ch-5}" rx="1.5" fill="none" stroke="#8fa6c4" stroke-width="0.3"/>`;
      s+=`<svg x="${cx+5}" y="${cy+5}" width="${cw-10}" height="${ch-10}" viewBox="0 0 100 100">${L[it]()}</svg>`;
    });
    if(ids){s+=`<g><circle cx="${x+w-1}" cy="${y+1}" r="5" fill="#1f2a24" stroke="#fff" stroke-width="0.8"/>${`<text x="${x+w-1}" y="${y+2.9}" font-size="5.4" fill="#fff" font-weight="700" text-anchor="middle" font-family="Onest,Arial,sans-serif">${p.id}</text>`}</g>`}
  }
  return s+`</svg>`;
}
const A={title:"Варіант A — аркуш A4 горизонтально",W:297,H:210,mx:(297-(6*T+5*G))/2,my:(210-(4*T+3*G))/2,pieces:[
 {id:1,c:0,r:0,w:6,h:1,items:["nfc","giro","mcm","visav","apple","google"]},
 {id:2,c:0,r:1,w:3,h:2,items:["nfc","giro","apple","mcm","visav","google"]},
 {id:3,c:3,r:1,w:3,h:1,items:["nfc","giro","apple"]},
 {id:4,c:3,r:2,w:1,h:1,items:["mcm"]},
 {id:5,c:4,r:2,w:1,h:1,items:["visav"]},
 {id:6,c:5,r:2,w:1,h:1,items:["google"]},
 {id:7,c:0,r:3,w:5,h:1,items:["nfc","mcm","visav","apple","google"]},
 {id:8,c:5,r:3,w:1,h:1,items:["amex"]},
]};
const B={title:"Варіант B — вузька смуга 100 × 385 мм",W:100,H:385,mx:(100-(2*T+G))/2,my:(385-(8*T+7*G))/2,pieces:[
 {id:1,c:0,r:0,w:2,h:3,items:["nfc","giro","apple","google","mcm","visav"]},
 {id:2,c:0,r:3,w:1,h:3,items:["nfc","giro","apple"]},
 {id:3,c:1,r:3,w:1,h:5,items:["nfc","mcm","visav","apple","google"]},
 {id:4,c:0,r:6,w:1,h:1,items:["amex"]},
 {id:5,c:0,r:7,w:1,h:1,items:["google"]},
]};
for(const [k,c] of [["A",A],["B",B]]){
  fs.writeFileSync(`sheet-${k}.svg`,sheet(c,{ids:false,crop:true}));
  fs.writeFileSync(`sheet-${k}-ids.svg`,sheet(c,{ids:true,crop:false}));
}
fs.writeFileSync("names.json",JSON.stringify(NAME));
