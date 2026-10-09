// Builds the certificate Word file from a spec made by make_certificates.py
const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,ImageRun,Table,TableRow,TableCell,WidthType,AlignmentType,BorderStyle,PageOrientation,VerticalAlign,PageBorderDisplay,PageBorderOffsetFrom}=require('docx');
const spec=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const F="Georgia",S="Arial",NAVY="0D3B66";
const POS={1:["FIRST","🥇","C9A227"],2:["SECOND","🥈","8C8C8C"],3:["THIRD","🥉","B0703A"]};
const t=(s,o={})=>new TextRun({text:s,font:o.font||F,...o});
const P=(c,o={})=>new Paragraph({alignment:AlignmentType.CENTER,children:c,...o});
const none={style:BorderStyle.NONE,size:0,color:"FFFFFF"};const nob={top:none,bottom:none,left:none,right:none};
const line=n=>"_".repeat(n);
const val=(c,k,n)=>c.blank||!c[k]?line(n):c[k];
function cell(w,children,align){return new TableCell({width:{size:w,type:WidthType.DXA},borders:nob,verticalAlign:VerticalAlign.CENTER,children})}
const sections=spec.certs.map(c=>{const [word,medal,col]=POS[c.position];
 const border={style:BorderStyle.DOUBLE,size:30,color:col,space:18};
 const qr=new ImageRun({type:"png",data:fs.readFileSync(c.qr),transformation:{width:92,height:92}});
 return {properties:{page:{size:{width:11906,height:16838,orientation:PageOrientation.LANDSCAPE},margin:{top:800,bottom:600,left:1000,right:1000},
   borders:{pageBorderTop:border,pageBorderBottom:border,pageBorderLeft:border,pageBorderRight:border,pageBorders:{display:PageBorderDisplay.ALL_PAGES,offsetFrom:PageBorderOffsetFrom.PAGE}}}},
  children:[
   P([t("FUTURE TALENT ACADEMY JAMSHORO",{bold:true,size:44,color:NAVY,font:S,characterSpacing:40})],{spacing:{before:300}}),
   P([t("Affiliated with ",{size:22,color:"555555",font:S}),t("TalentCore Global",{bold:true,size:22,color:col,font:S})],{spacing:{after:40}}),
   P([t("Yasir Restaurant Road, Near Karonjhar Cafe, Saeedabad, Jamshoro",{size:18,color:"777777",font:S})],{spacing:{after:220}}),
   P([t("Certificate of Achievement",{bold:true,italics:true,size:76,color:col})],{spacing:{after:100}}),
   P([t(`${medal}  ${word} POSITION  ${medal}`,{bold:true,size:40,color:NAVY,font:S,characterSpacing:30})],{spacing:{after:300}}),
   P([t("This certificate is proudly presented to",{italics:true,size:30,color:"444444"})],{spacing:{after:200}}),
   P([t(val(c,"name",44),{bold:!c.blank,size:c.blank?34:52,color:"222222"})],{spacing:{after:80}}),
   P([t("S/O  /  D/O   "+val(c,"father",30),{size:28,color:"444444"})],{spacing:{after:260}}),
   P([t("for securing the ",{size:30,color:"333333"}),t(`${word} POSITION`,{bold:true,size:30,color:col}),t(" in the ",{size:30,color:"333333"}),
      t(c.blank?"☐ English  ☐ Computer":c.class,{bold:true,size:30,color:NAVY,font:S})],{spacing:{after:80}}),
   P([t("Monthly Tests of  ",{size:30,color:"333333"}),t(val(c,"month",16),{bold:!c.blank,size:30,color:NAVY}),t("  with  ",{size:30,color:"333333"}),t(c.blank?line(6)+" %":c.percentage,{bold:!c.blank,size:30,color:NAVY}),t("  marks.",{size:30,color:"333333"})],{spacing:{after:200}}),
   P([t("We are proud of your hard work and wish you continued success!",{italics:true,size:24,color:"666666"})],{spacing:{after:300}}),
   new Table({width:{size:9800,type:WidthType.DXA},columnWidths:[3300,3200,3300],alignment:AlignmentType.CENTER,borders:{...nob,insideHorizontal:none,insideVertical:none},
    rows:[new TableRow({children:[
     cell(3300,[P([t(line(26),{size:22,color:"555555",font:S})]),P([t("Class Teacher",{bold:true,size:22,color:NAVY,font:S})])]),
     cell(3200,[P([qr]),P([t("Scan to verify",{size:16,color:"555555",font:S})]),P([t("Certificate No: "+(c.blank?line(16):c.id),{bold:true,size:16,color:NAVY,font:S})]),P([t("Issued: "+(c.blank?line(10):c.issued),{size:15,color:"555555",font:S})])]),
     cell(3300,[P([t(line(26),{size:22,color:"555555",font:S})]),P([t("Director / Principal",{bold:true,size:22,color:NAVY,font:S})])]),
    ]})]}),
  ]};});
Packer.toBuffer(new Document({styles:{default:{document:{run:{font:F}}}},sections})).then(b=>fs.writeFileSync(spec.out,b));
