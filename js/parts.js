// js/parts.js - Definisi komponen, daftar model, bagian dalam amp, dan tray (classic script, tanpa module)
const TY={
pln:{w:92,h:72,c:'#9c3a2e',pins:[['L',.3,1],['N',.7,1]]},
trafo:{w:136,h:112,c:'#3b4252',pins:[['P1',0,.3],['P2',0,.7],['S1',1,.3],['S2',1,.7]]},
amp:{w:156,h:132,c:'#2d3a4a',pins:[['V+',0,.22],['GND',0,.5],['IN',0,.78],['O+',1,.35],['O-',1,.65]]},
spk:{w:104,h:104,c:'#33302c',pins:[['+',0,.35],['-',0,.65]]},
src:{w:116,h:74,c:'#2e4a3c',pins:[['SIG',1,.3],['GND',1,.7]]}};
const NM=['Listrik 220V','Trafo','Amp','Speaker','Sumber audio'];
const MD=[{t:'pln',n:'Listrik 220V'},{t:'trafo',n:'Trafo 50W',w:50},{t:'trafo',n:'Trafo 150W',w:150},{t:'amp',n:'Amp IC 40W',w:40},{t:'amp',n:'Amp transistor 120W',w:120},{t:'spk',n:'Speaker murah 30W',w:30,q:.4},{t:'spk',n:'Driver bagus 150W',w:150,q:1},{t:'src',n:'Sumber audio'}];
const IP=[['Transistor driver',34,16,38,22,'#111'],['Dioda bias',34,46,38,22,'#111'],['Resistor emitter',84,16,24,10,'#d8c08a'],['Final Q1',118,18,28,22,'#222'],['Final Q2',118,44,28,22,'#222']];
MD.forEach(m=>{const b=document.createElement('button');b.textContent=m.n;b.onclick=()=>{stop();parts.push({...m,id:nid++,temp:30,hp:[0,0,0,0,0],x:20+(parts.length*43)%190,y:130+(parts.length*61)%250});sel=null;ui()};$('tray').appendChild(b)});
