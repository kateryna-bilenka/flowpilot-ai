// node mkdocx.js -> naklejky.docx: each sheet layout as one Word table, one logo per cell, thick borders = one sticker
const fs=require('fs');const {LAYOUTS}=require('./sheetlib.js');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,ImageRun,WidthType,BorderStyle,ShadingType,AlignmentType,VerticalAlign,HeightRule,PageOrientation,HeadingLevel,TableLayoutType}=require('docx');
const MM=56.7,T=Math.round(40*MM),HH=Math.round(16*MM),IMG=Math.round(30/25.4*96),FONT="Arial";
const THICK={style:BorderStyle.SINGLE,size:48,color:"000000"},THIN={style:BorderStyle.DOTTED,size:4,color:"C8CDD2"},NONE={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
const img=id=>new ImageRun({type:"png",data:fs.readFileSync(`png/${id}.png`),transformation:{width:IMG,height:IMG},altText:{title:id,description:id,name:id}});
function grid(lay){
  const rows=Math.max(...lay.pieces.map(p=>p.r+p.h)),at=(r,c)=>lay.pieces.find(p=>r>=p.r&&r<p.r+p.h&&c>=p.c&&c<p.c+p.w);
  const out=[];
  const hdrs=lay.pieces.filter(p=>p.hdr&&p.r===0).sort((a,b)=>a.c-b.c);
  if(hdrs.length) out.push(new TableRow({cantSplit:true,height:{value:HH,rule:HeightRule.EXACT},children:hdrs.map(p=>new TableCell({columnSpan:p.w,width:{size:T*p.w,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR,fill:"7BA23A",color:"auto"},verticalAlign:VerticalAlign.CENTER,margins:{left:120,right:120},
    borders:{top:THICK,left:THICK,right:THICK,bottom:THIN},
    children:[new Paragraph({keepNext:true,children:[new TextRun({text:"REA CARD",bold:true,color:"FFFFFF",size:p.w>1?30:22,font:FONT}),...(p.w>1?[new TextRun({text:"   www.rea-card.de",color:"FFFFFF",size:14,font:FONT})]:[])]})]}))}));
  for(let r=0;r<rows;r++){
    const cells=[];
    for(let c=0;c<lay.cols;c++){
      const p=at(r,c),id=p&&p.items[(r-p.r)*p.w+(c-p.c)],first=p&&r===p.r&&c===p.c;
      cells.push(new TableCell({width:{size:T,type:WidthType.DXA},verticalAlign:VerticalAlign.CENTER,margins:{top:0,bottom:0,left:40,right:40},
        borders:p?{top:r===p.r&&!p.hdr?THICK:THIN,bottom:r===p.r+p.h-1?THICK:THIN,left:c===p.c?THICK:THIN,right:c===p.c+p.w-1?THICK:THIN}:{top:THIN,bottom:THIN,left:THIN,right:THIN},
        children:[...(first?[new Paragraph({keepNext:true,spacing:{after:0},children:[new TextRun({text:String(p.id),size:14,bold:true,color:"8A949C",font:FONT})]})]:[]),
          new Paragraph({keepNext:r<rows-1,alignment:AlignmentType.CENTER,children:id?[img(id)]:[]})]}));
    }
    out.push(new TableRow({cantSplit:true,height:{value:T,rule:HeightRule.EXACT},children:cells}));
  }
  return new Table({borders:{top:NONE,bottom:NONE,left:NONE,right:NONE,insideHorizontal:NONE,insideVertical:NONE},layout:TableLayoutType.FIXED,width:{size:T*lay.cols,type:WidthType.DXA},columnWidths:Array(lay.cols).fill(T),rows:out});
}
const P=(text,o={})=>new Paragraph({spacing:{before:o.before??0,after:o.after??100},children:[new TextRun({text,font:FONT,size:o.size??20,bold:o.bold,color:o.color})]});
const H=t=>new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{after:80},children:[new TextRun({text:t,font:FONT,size:32,bold:true,color:"1F2A24"})]});
const NOTE="Кожна клітинка — один логотип 40 × 40 мм. Жирна чорна рамка — одна наклейка (вирізається разом); пунктир — межа між логотипами всередині наклейки. Щоб перегрупувати: змініть, де жирні лінії (Конструктор таблиць → Межі). Сірий номер у куточку відповідає таблиці «яка каса — що клеїти». Логотипи схематичні: правою кнопкою → Змінити рисунок.";
const M=454; // 8 mm margins
const sec=(w,h,children)=>({properties:{page:{size:{width:Math.round(h*MM),height:Math.round(w*MM),orientation:PageOrientation.LANDSCAPE},margin:{top:M,bottom:M,left:M,right:M}}},children});
const LK=[["Що приймає каса","Аркуш A","Смуга B"],
 ["Базова: REA + girocard + оплата карткою","1","1"],["girocard + Mastercard + Visa","4 (смуга) або 5 (кубик)","2"],["Тільки girocard + безконтактно","2","3"],
 ["Mastercard + Visa, без girocard","6","4"],["Mastercard + Visa без Apple Pay / Google Pay","3","6 + 7"],["girocard + лише Mastercard (або лише Visa)","2 + 7 (або 8) + 9","3 + 6 (або 7) + 5"],
 ["American Express","+ 12","+ 9"],["Diners Club","+ 13","+ 10"],["JCB","+ 14","+ 11"],["UnionPay","+ 15","+ 12"],["SEPA Lastschrift","+ 16","+ 13"],["Окремо «оплата карткою»","—","14"]];
const W=[7000,4200,4200];
const lookup=new Table({width:{size:W[0]+W[1]+W[2],type:WidthType.DXA},columnWidths:W,rows:LK.map((r,i)=>new TableRow({children:r.map((t,j)=>new TableCell({width:{size:W[j],type:WidthType.DXA},
  shading:i===0?{type:ShadingType.CLEAR,fill:"E6EEDB",color:"auto"}:undefined,margins:{top:60,bottom:60,left:120,right:120},borders:{top:THIN,bottom:THIN,left:THIN,right:THIN},
  children:[new Paragraph({children:[new TextRun({text:t,font:FONT,size:20,bold:i===0||j>0})]})]}))}))});
const doc=new Document({styles:{default:{document:{run:{font:FONT}}}},sections:[
 sec(420,297,[H("Аркуш A — широкий"),P(NOTE,{color:"5F6A63",size:18}),grid(LAYOUTS.A)]),
 sec(500,140,[P("Смуга B — довга, усе горизонтально",{bold:true,size:24,after:60}),grid(LAYOUTS.B)]),
 sec(297,210,[H("Яка каса — що клеїти"),lookup,P("Google Pay не працює з girocard, тому в блоці girocard є тільки Apple Pay.",{before:160,color:"5F6A63"})]),
]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync('naklejky.docx',b));
