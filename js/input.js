// js/input.js - Pointer, tombol, dan event handler (classic script, tanpa module)
const pt=e=>{const r=C.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
C.onpointerdown=e=>{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();const[x,y]=pt(e);C.setPointerCapture(e.pointerId);
if(V)return svcTap(x,y);
const hp=hitPin(x,y);
if(M.on){if(M.mode==='Suhu'){const q=hitPart(x,y);M.r=q&&(q.t==='amp'||q.t==='trafo')?q:null;return}if(hp){if(!M.r||M.b){M.r=hp.id;M.b=null}else if(hp.id!==M.r)M.b=hp.id;return}}
if(hp){drag={k:'w',from:hp.id,x,y};return}
const p=hitPart(x,y);if(p){parts.splice(parts.indexOf(p),1);parts.push(p);sel={o:p};drag={k:'p',p,dx:x-p.x,dy:y-p.y};ui();return}
const w=hitWire(x,y);sel=w?{o:w}:null;drag=null;ui()};
C.onpointermove=e=>{if(!drag)return;const[x,y]=pt(e);if(drag.k==='w'){drag.x=x;drag.y=y}else{drag.p.x=x-drag.dx;drag.p.y=y-drag.dy}};
C.onpointerup=e=>{if(drag&&drag.k==='w'){const[x,y]=pt(e),h=hitPin(x,y);if(h&&h.id!==drag.from&&!wires.some(w=>(w.a===drag.from&&w.b===h.id)||(w.b===drag.from&&w.a===h.id))){stop();wires.push({a:drag.from,b:h.id})}}drag=null};
$('del').onclick=()=>{if(!sel)return;stop();const o=sel.o;if(parts.includes(o)){parts=parts.filter(p=>p!==o);wires=wires.filter(w=>parts.some(p=>w.a.startsWith(p.id+'.'))&&parts.some(p=>w.b.startsWith(p.id+'.')))}else wires=wires.filter(w=>w!==o);sel=null;ui()};
$('mm').onclick=()=>{M.on=!M.on;M.r=M.b=null;$('mp').style.display=M.on?'flex':'none'};
document.querySelectorAll('#mp [data-m]').forEach(b=>b.onclick=()=>{M.mode=b.dataset.m;M.r=M.b=null});
$('svc').onclick=()=>{if(sel&&sel.o.t==='amp'){stop();V={a:sel.o,msg:'Tap komponen yang mau diganti. Yang hitam atau cokelat wajib diganti.',an:null}}};
$('go').onclick=()=>{if(S.run){stop();st('Dihentikan.')}else sim()};
