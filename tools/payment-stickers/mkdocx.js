const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,ImageRun,WidthType,BorderStyle,ShadingType,AlignmentType,VerticalAlign,HeightRule,PageOrientation,HeadingLevel,TableLayoutType}=require('docx');
const MM=56.7, T=Math.round(40*MM), HH=Math.round(16*MM), IMG=Math.round(30/25.4*96);
const THICK={style:BorderStyle.SINGLE,size:24,color:"000000"}, THIN={style:BorderStyle.SINGLE,size:4,color:"9AA3AD"}, NONE={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
const img=id=>new ImageRun({type:"png",data:fs.readFileSync(`png/${id}.png`),transformation:{width:IMG,height:IMG},altText:{title:id,description:id,name:id}});
const FONT="Arial";
function block(cols,items,hdr){
  const rows=Math.ceil(items.length/cols), out=[];
  if(hdr) out.push(new TableRow({cantSplit:true,height:{value:HH,rule:HeightRule.EXACT},children:[new TableCell({columnSpan:cols,width:{size:T*cols,type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR,fill:"7BA23A",color:"auto"},verticalAlign:VerticalAlign.CENTER,
    borders:{top:THICK,left:THICK,right:THICK,bottom:THIN},margins:{left:150,right:150},
    children:[new Paragraph({keepNext:true,children:[new TextRun({text:"REA CARD",bold:true,color:"FFFFFF",size:cols>1?30:24,font:FONT}),
      ...(cols>1?[new TextRun({text:"   www.rea-card.de",color:"FFFFFF",size:14,font:FONT})]:[])]})]})]}));
  for(let r=0;r<rows;r++){
    out.push(new TableRow({cantSplit:true,height:{value:T,rule:HeightRule.EXACT},children:[...Array(cols)].map((_,c)=>{
      const id=items[r*cols+c];
      return new TableCell({width:{size:T,type:WidthType.DXA},verticalAlign:VerticalAlign.CENTER,
        borders:{top:(r===0&&!hdr)?THICK:THIN,bottom:r===rows-1?THICK:THIN,left:c===0?THICK:THIN,right:c===cols-1?THICK:THIN},
        children:[new Paragraph({keepNext:r<rows-1,alignment:AlignmentType.CENTER,children:id?[img(id)]:[]})]});
    })}));
  }
  return new Table({layout:TableLayoutType.FIXED,width:{size:T*cols,type:WidthType.DXA},columnWidths:Array(cols).fill(T),rows:out});
}
const P=(text,o={})=>new Paragraph({keepNext:o.keep,spacing:{before:o.before??0,after:o.after??80},children:[new TextRun({text,font:FONT,size:o.size??20,bold:o.bold,color:o.color})]});
const H=(text,pb)=>new Paragraph({pageBreakBefore:!!pb,heading:HeadingLevel.HEADING_2,spacing:{before:280,after:60},keepNext:true,children:[new TextRun({text,font:FONT,size:26,bold:true,color:"1F2A24"})]});
const size=(cols,n,hdr)=>`${cols*40} × ${Math.ceil(n/cols)*40+(hdr?16:0)} мм`;
const BLOCKS=[
 [1,"Базова: REA + girocard","для всіх клієнтів, girocard приймають скрізь",1,["giro"],1],
 [2,"girocard + безконтактно + Apple Pay","каса тільки з girocard (Google Pay з girocard не працює)",3,["nfc","giro","apple"],1],
 [3,"Mastercard + Visa","без Apple Pay / Google Pay",2,["mcm","visav"],1],
 [4,"Усе разом, смугою","girocard + Mastercard + Visa, найчастіший випадок",6,["nfc","giro","mcm","visav","apple","google"],0],
 [5,"Усе разом, кубиком","те саме, що 4, але квадратом",3,["nfc","giro","apple","mcm","visav","google"],0],
 [6,"Без girocard","тільки Mastercard + Visa",5,["nfc","mcm","visav","apple","google"],0],
 [10,"Apple Pay + Google Pay","пара гаманців",2,["apple","google"],0],
];
const SINGLES=[[7,"Mastercard + Maestro","mcm"],[8,"Visa + V PAY","visav"],[9,"Google Pay","google"],[11,"Безконтактно","nfc"],[12,"American Express","amex"],[13,"Diners Club","diners"],[14,"JCB","jcb"],[15,"UnionPay","unionpay"],[16,"SEPA Lastschrift","sepa"]];
const body=[
 new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{after:80},children:[new TextRun({text:"Універсальний аркуш наклейок",font:FONT,size:40,bold:true})]}),
 P("Кожна наклейка — окрема таблиця з жирною рамкою. Тонкі лінії всередині — окремі логотипи в одній наклейці. Розміри справжні: квадратик 40 × 40 мм, шапка REA 16 мм. Логотипи схематичні: перед друком замініть їх офіційними (клацніть картинку → Змінити рисунок).",{color:"5F6A63"}),
];
for(const [n,name,sub,cols,items,hdr] of BLOCKS){
  body.push(H(`${n}. ${name}`),P(`${sub} · ${size(cols,items.length,hdr)}`,{color:"5F6A63",keep:true}),block(cols,items,hdr));
}
body.push(H("Окремі квадратики"),P("кожен 40 × 40 мм",{color:"5F6A63",keep:true}));
const per=5, CW=T+600;
for(let i=0;i<SINGLES.length;i+=per){
  const chunk=SINGLES.slice(i,i+per);
  body.push(new Table({layout:TableLayoutType.FIXED,width:{size:CW*per,type:WidthType.DXA},columnWidths:Array(per).fill(CW),borders:{top:NONE,bottom:NONE,left:NONE,right:NONE,insideHorizontal:NONE,insideVertical:NONE},
    rows:[new TableRow({cantSplit:true,children:[...Array(per)].map((_,k)=>{const s=chunk[k];return new TableCell({width:{size:CW,type:WidthType.DXA},borders:{top:NONE,bottom:NONE,left:NONE,right:NONE},
      children:s?[new Paragraph({spacing:{after:40},children:[new TextRun({text:`${s[0]}. ${s[1]}`,font:FONT,size:18,bold:true})]}),block(1,[s[2]],0),new Paragraph({children:[]})]:[new Paragraph({children:[]})]})})})]}));
}
// lookup
const LK=[["Що приймає каса","Що клеїти"],
 ["Будь-яка каса (базова)","1"],["girocard + Mastercard + Visa","4 (смуга) або 5 (кубик)"],["Тільки girocard + безконтактно","2"],
 ["Mastercard + Visa, без girocard","6"],["Mastercard + Visa без Apple Pay / Google Pay","3"],["girocard + лише Mastercard (або лише Visa)","2 + 7 (або 8) + 9"],
 ["American Express","+ 12"],["Diners Club","+ 13"],["JCB","+ 14"],["UnionPay","+ 15"],["SEPA Lastschrift","+ 16"],["Інша комбінація","з окремих 7–11"]];
const W1=7000,W2=5000;
body.push(H("Яка каса — що клеїти",1),new Table({width:{size:W1+W2,type:WidthType.DXA},columnWidths:[W1,W2],rows:LK.map((r,i)=>new TableRow({children:r.map((t,j)=>new TableCell({width:{size:j?W2:W1,type:WidthType.DXA},
  shading:i===0?{type:ShadingType.CLEAR,fill:"E6EEDB",color:"auto"}:undefined,margins:{top:60,bottom:60,left:120,right:120},
  borders:{top:THIN,bottom:THIN,left:THIN,right:THIN},children:[new Paragraph({children:[new TextRun({text:t,font:FONT,size:20,bold:i===0||j===1})]})]}))}))}),
 P("Google Pay не працює з girocard, тому в наклейці 2 є тільки Apple Pay.",{before:160,color:"5F6A63"}));
const doc=new Document({styles:{default:{document:{run:{font:FONT}}}},sections:[{properties:{page:{size:{width:11906,height:16838,orientation:PageOrientation.LANDSCAPE},margin:{top:720,bottom:720,left:720,right:720}}},children:body}]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync('naklejky.docx',b));
