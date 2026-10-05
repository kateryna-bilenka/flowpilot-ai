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
 card:()=>`<rect x="14" y="20" width="72" height="46" rx="6" fill="#fff" stroke="#1f2a24" stroke-width="3"/><rect x="14" y="30" width="72" height="8" fill="#1f2a24"/><rect x="22" y="45" width="14" height="10" rx="2" fill="#d9a400"/><path d="M44 52h30M44 58h18" stroke="#1f2a24" stroke-width="2.5" stroke-linecap="round"/>${t(50,84,11.5,"Kartenzahlung","#1f2a24",700)}`,
 rea:()=>`<rect x="10" y="26" width="80" height="48" rx="5" fill="#7ba23a"/>${t(50,50,19,"REA","#fff",800)}${t(50,66,13,"CARD","#fff",700)}`,
 amex:()=>`<rect x="18" y="18" width="64" height="64" fill="#2e77bb"/>${t(50,47,11.5,"AMERICAN","#fff",800)}${t(50,61,11.5,"EXPRESS","#fff",800)}`,
};
const pair=(a,b)=>`<svg x="10" y="0" width="80" height="50" viewBox="0 0 100 100">${L[a]()}</svg><line x1="20" y1="50" x2="80" y2="50" stroke="#c9d3dd" stroke-width="1"/><svg x="10" y="50" width="80" height="50" viewBox="0 0 100 100">${L[b]()}</svg>`;
L.mcm=()=>pair("mc","maestro"); L.visav=()=>pair("visa","vpay");

const LAYOUTS={
 C:{name:"Варіант C — ескіз 6 колонок",cols:6,pieces:[
  {id:1,c:0,r:0,w:3,h:1,hdr:1,items:["nfc","giro","apple"]},
  {id:2,c:3,r:0,w:3,h:1,hdr:1,items:["nfc","mcm","visav"]},
  {id:3,c:0,r:1,w:3,h:2,hdr:1,items:["nfc","giro","apple","mcm","visav","google"]},
  {id:4,c:3,r:1,w:3,h:2,items:["rea","mcm","apple","nfc","visav","google"]},
  {id:5,c:0,r:3,w:1,h:1,items:["diners"]},{id:6,c:1,r:3,w:1,h:1,items:["amex"]},{id:7,c:2,r:3,w:1,h:1,items:["jcb"]},
  {id:8,c:3,r:3,w:1,h:1,items:["unionpay"]},{id:9,c:4,r:3,w:1,h:1,items:["sepa"]},{id:10,c:5,r:3,w:1,h:1,items:["card"]},
 ]},
 A:{name:"Варіант A — широкий аркуш",cols:7,pieces:[
  {id:1,c:0,r:0,w:2,h:1,hdr:1,items:["giro","card"]},
  {id:2,c:2,r:0,w:3,h:1,hdr:1,items:["nfc","giro","apple"]},
  {id:3,c:5,r:0,w:2,h:1,hdr:1,items:["mcm","visav"]},
  {id:4,c:0,r:1,w:6,h:1,items:["nfc","giro","mcm","visav","apple","google"]},
  {id:12,c:6,r:1,w:1,h:1,items:["amex"]},
  {id:5,c:0,r:2,w:3,h:2,items:["nfc","giro","apple","mcm","visav","google"]},
  {id:7,c:3,r:2,w:1,h:1,items:["mcm"]},{id:8,c:4,r:2,w:1,h:1,items:["visav"]},{id:9,c:5,r:2,w:1,h:1,items:["google"]},
  {id:13,c:6,r:2,w:1,h:1,items:["diners"]},
  {id:10,c:3,r:3,w:2,h:1,items:["apple","google"]},{id:11,c:5,r:3,w:1,h:1,items:["nfc"]},{id:14,c:6,r:3,w:1,h:1,items:["jcb"]},
  {id:6,c:0,r:4,w:5,h:1,items:["nfc","mcm","visav","apple","google"]},
  {id:15,c:5,r:4,w:1,h:1,items:["unionpay"]},{id:16,c:6,r:4,w:1,h:1,items:["sepa"]},
 ]},
 B:{name:"Варіант B — довга горизонтальна смуга",cols:13,pieces:[
  {id:1,c:0,r:0,w:2,h:1,hdr:1,items:["giro","card"]},
  {id:5,c:0,r:1,w:1,h:1,items:["google"]},{id:6,c:1,r:1,w:1,h:1,items:["mcm"]},
  {id:2,c:2,r:0,w:3,h:2,hdr:1,items:["nfc","giro","apple","mcm","visav","google"]},
  {id:3,c:5,r:0,w:3,h:1,hdr:1,items:["nfc","giro","apple"]},
  {id:7,c:5,r:1,w:1,h:1,items:["visav"]},{id:8,c:6,r:1,w:1,h:1,items:["nfc"]},{id:9,c:7,r:1,w:1,h:1,items:["amex"]},
  {id:4,c:8,r:0,w:5,h:1,hdr:1,items:["nfc","mcm","visav","apple","google"]},
  {id:10,c:8,r:1,w:1,h:1,items:["diners"]},{id:11,c:9,r:1,w:1,h:1,items:["jcb"]},{id:12,c:10,r:1,w:1,h:1,items:["unionpay"]},
  {id:13,c:11,r:1,w:1,h:1,items:["sepa"]},{id:14,c:12,r:1,w:1,h:1,items:["card"]},
 ]}
};
// T tile, G gap, M margin, HH header height (all mm)
function measure(lay,{T,G,M,HH}){
  const rows=Math.max(...lay.pieces.map(p=>p.r+p.h));
  const rowH=[...Array(rows)].map((_,r)=>T+(lay.pieces.some(p=>p.hdr&&p.r===r)?HH:0));
  const rowY=[];let y=M;rowH.forEach((h,i)=>{rowY[i]=y;y+=h+G});
  return {rowH,rowY,W:2*M+lay.cols*T+(lay.cols-1)*G,H:y-G+M};
}
function sheet(lay,opt){
  const {T,G,HH}=opt,{rowH,rowY,W,H}=measure(lay,opt),M=opt.M;
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" ${opt.mm?`width="${W}mm" height="${H}mm"`:'class="sheet-svg"'} role="img" aria-label="${lay.name}">`;
  s+=`<rect width="${W}" height="${H}" fill="#f6f5f1"/>`;
  if(opt.crop) s+=`<rect x="0.3" y="0.3" width="${W-0.6}" height="${H-0.6}" fill="none" stroke="#bbb" stroke-width="0.3"/>`;
  for(const p of lay.pieces){
    const x=M+p.c*(T+G), y=rowY[p.r], w=p.w*T+(p.w-1)*G;
    const h=rowY[p.r+p.h-1]+rowH[p.r+p.h-1]-y;
    s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5" fill="#fff" stroke="#9aa3ad" stroke-width="0.35" ${opt.crop?'stroke-dasharray="1.2 0.8"':""}/>`;
    let ty=y;
    if(p.hdr){
      s+=`<path d="M${x+2} ${y+2}h${w-4}v${HH-2}h${-(w-4)}z" fill="#7ba23a"/>`;
      const fs=Math.min(HH*0.5,w*0.12);
      s+=`<text x="${x+5}" y="${y+2+(HH-2)/2+fs*0.36}" font-size="${fs}" fill="#fff" font-weight="800" letter-spacing="${fs*0.06}" font-family="Onest,Arial,Helvetica,sans-serif">REA CARD</text>`;
      if(w>2*T-1) s+=`<text x="${x+w-5}" y="${y+2+(HH-2)/2+1}" font-size="${Math.min(3,HH*0.2)}" fill="#fff" text-anchor="end" font-family="Onest,Arial,sans-serif">www.rea-card.de</text>`;
      ty=y+HH;
    }
    const cw=w/p.w, ch=(y+h-ty)/p.h;
    p.items.forEach((it,k)=>{
      const cx=x+(k%p.w)*cw, cy=ty+Math.floor(k/p.w)*ch, sz=Math.min(cw,ch)-10;
      s+=`<rect x="${cx+2.5}" y="${cy+2.5}" width="${cw-5}" height="${ch-5}" rx="1.5" fill="none" stroke="#8fa6c4" stroke-width="0.3"/>`;
      s+=`<svg x="${cx+(cw-sz)/2}" y="${cy+(ch-sz)/2}" width="${sz}" height="${sz}" viewBox="0 0 100 100">${L[it]()}</svg>`;
    });
    if(opt.ids){const r=Math.max(3.5,T*0.1);s+=`<circle cx="${x+w-1}" cy="${y+1}" r="${r}" fill="#1f2a24" stroke="#fff" stroke-width="0.7"/><text x="${x+w-1}" y="${y+1+r*0.38}" font-size="${r*1.05}" fill="#fff" font-weight="700" text-anchor="middle" font-family="Onest,Arial,sans-serif">${p.id}</text>`}
  }
  return s+`</svg>`;
}
if(typeof module!=="undefined") module.exports={LAYOUTS,measure,sheet};
