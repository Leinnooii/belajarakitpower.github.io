// js/tools.js - Multimeter dan mode servis (solder) (classic script, tanpa module)
const M={on:0,mode:'VDC',r:null,b:null};
function meter(){if(!M.on)return;const rd=$('rd');
if(M.mode==='Suhu'){rd.textContent=M.r&&M.r.t?(M.r.t==='amp'?'Heatsink amp: ':'Trafo: ')+Math.round(M.r.temp)+'°C'+(M.r.temp>100?' (BAHAYA)':''):'Tap amp atau trafo untuk cek suhu.';return}
[[M.r,'#e8281e','+'],[M.b,'#111','-']].forEach(([id,c,l])=>{const q=id&&pinInfo(id);if(q){Q(q.x,q.y-16,9,c);TX(l,q.x,q.y-12,'#fff',12)}});
if(!M.r||!M.b){rd.textContent='Tap pin merah (+), lalu pin hitam (-).';return}
uf={};wires.forEach(w=>{uf[fd(w.a)]=fd(w.b)});
const a=fd(M.r),b=fd(M.b),g=t=>parts.find(p=>p.t===t),pl=g('pln'),tr=g('trafo'),am=g('amp'),n=(p,k)=>p&&fd(p.id+'.'+k);let r;
if(M.mode==='Ohm')r=a===b?'0.3 Ω (tersambung)':'OL (putus)';
else if(!pl||!tr||!am)r='Pasang listrik, trafo, dan amp dulu.';
else if(!S.run)r='0.00 V (rangkaian belum jalan)';
else if(M.mode==='VAC')r=(a===n(pl,'L')&&b===n(pl,'N'))||(a===n(pl,'N')&&b===n(pl,'L'))?'220 V AC':'0.0 V AC';
else{const v0=tr.w>100?36:24;r=a===n(tr,'S1')&&b===n(tr,'S2')?'+'+v0+'.0 V DC':a===n(tr,'S2')&&b===n(tr,'S1')?'-'+v0+'.0 V DC (terbalik)':a===n(am,'O+')&&b===n(am,'O-')?(am.hp.some(v=>v==1)?(8+am.temp/12).toFixed(1)+' V DC (offset besar, amp rusak)':'0.03 V DC (offset normal)'):'0.00 V DC'}
rd.textContent=r}
function svcG(){const w=C.width/dpr,h=C.height/dpr,s=Math.min((w-24)/156,(h-260)/132,3.2),x0=(w-156*s)/2,y0=120;return{w,h,s,x0,y0,by:y0+132*s+60}}
function svcDraw(dt){if(!V)return;const g=svcG(),{w,h,s,x0,y0}=g;X.fillStyle='#0e3c6b';X.fillRect(0,0,w,h);
R(x0,y0,156*s,132*s,'#b3201f',8*s);X.strokeStyle='#e8b08a66';X.lineWidth=2;X.beginPath();for(let i=1;i<7;i++){X.moveTo(x0+14*s,y0+i*132*s/7);X.lineTo(x0+142*s,y0+i*132*s/7)}X.stroke();
intArt(V.a,x0,y0,s);TX('Servis amp',w/2,y0-44,'#fff',16);TX(V.msg,w/2,y0-20,'#ffe600',12);
R(w/2-60,g.by,120,40,'#d98c3a',10);TX('Selesai',w/2,g.by+25,'#201407',14);
if(V.an){const a=V.an,q=IP[a.i];a.t+=dt;const tx=x0+(q[1]+q[3]/2)*s,ty=y0+(q[2]+q[4]/2)*s,e=Math.min(1,a.t/.6),ix=tx+(1-e)*140,iy=ty-(1-e)*110;
if(a.t>.6){Q(tx,ty,5*s*(.6+.4*Math.sin(T*30))+4,'#ff8a2a');for(let k=0;k<5;k++){X.globalAlpha=.4;Q(tx+Math.sin(T*4+k)*8,ty-k*10-((a.t*40)%20),3+k,'#ddd');X.globalAlpha=1}Q(tx+6*s,ty+4*s,3*s,'#cfd3d8')}
X.save();X.translate(ix,iy);X.rotate(-.8);R(0,-3,18,6,'#ccc',2);R(18,-6,80,12,'#e0a030',5);X.restore();
if(a.t>1.8){V.a.hp[a.i]=0;V.msg=q[0]+' baru terpasang dan disolder.';V.an=null}}}
function svcTap(x,y){const g=svcG();if(V.an)return;
if(x>g.w/2-60&&x<g.w/2+60&&y>g.by&&y<g.by+40){V=null;st('Servis selesai. Jalankan lagi untuk tes.');return}
IP.forEach((q,i)=>{const bx=g.x0+q[1]*g.s,by=g.y0+q[2]*g.s;if(x>=bx-6&&x<=bx+q[3]*g.s+6&&y>=by-6&&y<=by+q[4]*g.s+6){if(V.a.hp[i]==0)V.msg=q[0]+' masih bagus, tidak perlu diganti.';else{V.an={i,t:0};V.msg='Melepas dan menyolder '+q[0]+'...'}}})}
