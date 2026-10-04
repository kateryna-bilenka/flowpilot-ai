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
 diners:()=>`<rect x="14" y="20" width="72" height="60" rx="6" fill="#fff" stroke="#004a97" stroke-width="2.5"/><circle cx="50" cy="40" r="13" fill="none" stroke="#004a97" stroke-width="4"/><rect x="47.5" y="27" width="5" height="26" fill="#004a97"/>${t(50,66,10.5,"Diners Club","#004a97",700)}${t(50,75,6.5,"INTERNATIONAL","#004a97",600)}`,
 jcb:()=>`<rect x="16" y="28" width="21" height="44" rx="5" fill="#0e4c96"/><rect x="39.5" y="28" width="21" height="44" rx="5" fill="#e21836"/><rect x="63" y="28" width="21" height="44" rx="5" fill="#007b40"/>${t(26.5,57,16,"J","#fff")}${t(50,57,16,"C","#fff")}${t(73.5,57,16,"B","#fff")}`,
 unionpay:()=>`<path d="M20 22h22l-7 56H13z" fill="#e21836"/><path d="M41 22h22l-7 56H34z" fill="#00447c"/><path d="M62 22h24l-7 56H55z" fill="#007b84"/>${t(50,56,11.5,"UnionPay","#fff",800)}`,
 sepa:()=>`${t(56,26,15,"SEPA","#10298e",800)}${t(56,38,9,"Lastschrift","#10298e",600)}<rect x="20" y="46" width="60" height="38" fill="none" stroke="#10298e" stroke-width="2"/><rect x="50" y="52" width="24" height="15" rx="2" fill="none" stroke="#888" stroke-width="2" transform="rotate(-30 62 60)"/><path d="M30 78l26-26 4 4-26 26z" fill="#10298e"/><path d="M26 76c6-4 10 2 16-2" fill="none" stroke="#10298e" stroke-width="2"/>`,
 picto:()=>`<g fill="none" stroke="#8a9a2c" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><rect x="14" y="16" width="28" height="18"/><rect x="20" y="34" width="16" height="12"/><path d="M24 22h3M31 22h3M24 28h3M31 28h3"/><path d="M58 18h26l-6 18H64z"/><circle cx="66" cy="42" r="2.5"/><circle cx="78" cy="42" r="2.5"/><path d="M16 58h18l6 6v22H16z"/><path d="M22 66h6v6h-6z"/><rect x="58" y="56" width="26" height="30" rx="3"/><path d="M63 62h16v6H63zM63 73h3M70 73h3M77 73h2M63 79h3M70 79h3M77 79h2"/></g>`,
 amex:()=>`<rect x="18" y="18" width="64" height="64" fill="#2e77bb"/>${t(50,47,11.5,"AMERICAN","#fff",800)}${t(50,61,11.5,"EXPRESS","#fff",800)}`,
};
const pair=(a,b)=>`<svg x="10" y="0" width="80" height="50" viewBox="0 0 100 100">${L[a]()}</svg><line x1="20" y1="50" x2="80" y2="50" stroke="#c9d3dd" stroke-width="1"/><svg x="10" y="50" width="80" height="50" viewBox="0 0 100 100">${L[b]()}</svg>`;
L.mcm=()=>pair("mc","maestro"); L.visav=()=>pair("visa","vpay");
const NAME={diners:"Diners Club",jcb:"JCB",unionpay:"UnionPay",sepa:"SEPA Lastschrift",picto:"Kartenzahlung (піктограми)",nfc:"Безконтактно",giro:"girocard",mcm:"Mastercard + Maestro",visav:"Visa + V PAY",apple:"Apple Pay",google:"Google Pay",amex:"American Express"};

const G=3;
function sheet(cfg,{ids,crop}){
  const {W,H,mx,my,pieces,T}=cfg;
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
    if(ids){s+=`<g><circle cx="${x+w-1}" cy="${y+1}" r="4.6" fill="#1f2a24" stroke="#fff" stroke-width="0.8"/>${`<text x="${x+w-1}" y="${y+2.6}" font-size="4.6" fill="#fff" font-weight="700" text-anchor="middle" font-family="Onest,Arial,sans-serif">${p.id}</text>`}</g>`}
  }
  return s+`</svg>`;
}
const P=(id,c,r,w,h,items)=>({id,c,r,w,h,items});
const TA=37;
const A={title:"Варіант A — аркуш A4 горизонтально",T:TA,W:297,H:210,mx:(297-(7*TA+6*G))/2,my:(210-(5*TA+4*G))/2,pieces:[
 P(1,0,0,6,1,["nfc","giro","mcm","visav","apple","google"]),
 P(12,6,0,1,1,["amex"]),
 P(2,0,1,3,2,["nfc","giro","apple","mcm","visav","google"]),
 P(3,3,1,3,1,["nfc","giro","apple"]),
 P(13,6,1,1,1,["diners"]),
 P(4,3,2,1,1,["mcm"]),P(5,4,2,1,1,["visav"]),P(6,5,2,1,1,["google"]),
 P(14,6,2,1,1,["jcb"]),
 P(7,0,3,5,1,["nfc","mcm","visav","apple","google"]),
 P(15,5,3,1,1,["unionpay"]),P(16,6,3,1,1,["sepa"]),
 P(8,0,4,2,1,["mcm","visav"]),P(9,2,4,2,1,["apple","google"]),
 P(10,4,4,1,1,["nfc"]),P(11,5,4,1,1,["giro"]),P(17,6,4,1,1,["picto"]),
]};
const TB=44;
const B={title:"Варіант B — вузька смуга",T:TB,W:100,H:12*TB+11*G+12,mx:(100-(2*TB+G))/2,my:6,pieces:[
 P(1,0,0,2,3,["nfc","giro","apple","google","mcm","visav"]),
 P(2,0,3,1,3,["nfc","giro","apple"]),
 P(3,1,3,1,5,["nfc","mcm","visav","apple","google"]),
 P(4,0,6,1,1,["google"]),P(5,0,7,1,1,["mcm"]),
 P(6,0,8,1,1,["visav"]),P(7,1,8,1,1,["nfc"]),
 P(8,0,9,1,1,["amex"]),P(9,1,9,1,1,["diners"]),
 P(10,0,10,1,1,["jcb"]),P(11,1,10,1,1,["unionpay"]),
 P(12,0,11,1,1,["sepa"]),P(13,1,11,1,1,["picto"]),
]};
for(const [k,c] of [["A",A],["B",B]]){
  fs.writeFileSync(`sheet-${k}.svg`,sheet(c,{ids:false,crop:true}));
  fs.writeFileSync(`sheet-${k}-ids.svg`,sheet(c,{ids:true,crop:false}));
}
fs.writeFileSync("names.json",JSON.stringify(NAME));console.log("B height",B.H);
