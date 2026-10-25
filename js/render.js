// js/render.js - Gambar komponen, kabel, heatsink, dan frame utama (classic script, tanpa module)
const WC=['#e8281e','#1faa3c','#f6f6f6','#f28c1e','#141414','#e83ec4'];
const R=(x,y,w,h,c,r=3)=>{X.fillStyle=c;X.beginPath();X.roundRect(x,y,w,h,r);X.fill()},Q=(x,y,r,c)=>{X.fillStyle=c;X.beginPath();X.arc(x,y,r,0,7);X.fill()},TX=(s,x,y,c,z=10)=>{X.fillStyle=c;X.font='700 '+z+'px system-ui,sans-serif';X.textAlign='center';X.fillText(s,x,y)};
function art(p){const t=TY[p.t],x=p.x,y=p.y,w=t.w,h=t.h,cx=x+w/2,cy=y+h/2,k=p.t;X.save();X.shadowColor='#0008';X.shadowBlur=10;X.shadowOffsetY=4;
if(k==='pln'){R(x,y,w,h*.64,'#1c1c1c',10);X.shadowColor='transparent';R(x+8,y+8,w-16,h*.64-16,'#303030',7);TX('220V',cx,y+h*.32+4,'#e8e8e8',12);[.3,.7].forEach(f=>R(x+w*f-4,y+h*.64,8,h*.36,'#cfd3d8',2))}
else if(k==='trafo'){R(x,y,w,h,'#4b5058',6);X.shadowColor='transparent';for(let i=6;i<h-4;i+=6)R(x+3,y+i,w-6,2,'#3a3e45',1);R(x+16,y+14,w-32,h-28,'#b8702a',8);for(let i=0;i<8;i++)R(x+20,y+20+i*(h-52)/7,w-40,3,'#d99244',1);R(cx-34,cy-14,68,28,'#e5b53b',4);TX(p.w+'W 50/60Hz',cx,cy+4,'#222',10);[[6,6],[w-6,6],[6,h-6],[w-6,h-6]].forEach(q=>Q(x+q[0],y+q[1],3,'#222'))}
else if(k==='amp'){R(x,y,w,h,'#b3201f',5);X.shadowColor='transparent';X.strokeStyle='#e8b08a66';X.lineWidth=2;X.beginPath();for(let i=1;i<7;i++){X.moveTo(x+14,y+i*h/7);X.lineTo(x+w-14,y+i*h/7)}X.stroke();
R(x+34,y+16,38,22,'#111',2);R(x+34,y+46,38,22,'#111',2);for(let i=0;i<6;i++){R(x+37+i*6,y+13,3,4,'#cfd3d8',0);R(x+37+i*6,y+37,3,4,'#cfd3d8',0)}
Q(x+50,y+96,11,'#1d3a6a');Q(x+78,y+96,11,'#1d3a6a');Q(x+50,y+96,5,'#9aa');Q(x+78,y+96,5,'#9aa');[0,1,2].forEach(i=>R(x+86,y+18+i*12,20,6,'#d8c08a',2));
if(p.w>100){R(x+w-40,y+16,32,52,'#9aa0a8',3);for(let i=0;i<7;i++)R(x+w-38,y+20+i*7,28,3,'#6f757d',1)}
TX('AMP '+p.w+'W',cx,y+h-8,'#fff',11);intArt(p,x,y,1)}
else if(k==='spk'){R(x,y,w,h,'#181818',12);X.shadowColor='transparent';[[9,9],[w-9,9],[9,h-9],[w-9,h-9]].forEach(q=>Q(x+q[0],y+q[1],4,'#777'));
const run=S.run&&S.sp===p&&!p.bad,r=h*.4*(1+(run?.06*Math.sin(T*50):0)),g=X.createRadialGradient(cx-6,cy-6,2,cx,cy,r);g.addColorStop(0,p.q>.8?'#777':'#555');g.addColorStop(1,'#101010');
Q(cx,cy,r+4,p.q>.8?'#d9a441':'#333');Q(cx,cy,r,'#0c0c0c');X.fillStyle=g;X.beginPath();X.arc(cx,cy,r*.82,0,7);X.fill();Q(cx,cy,r*.3,'#1b1b1b');Q(cx-3,cy-3,r*.12,'#555')}
else{R(x,y,w,h,'#17191c',7);X.shadowColor='transparent';R(x+10,y+10,w*.45,16,'#0b2a16',2);TX('00:12',x+10+w*.225,y+22,'#4fe07a',11);[0,1,2,3,4].forEach(i=>Q(x+16+i*14,y+40,4,'#6a6f76'));R(x+10,y+h-20,26,10,'#8a8f96',2);TX('Bluetooth',x+w*.6,y+h-11,'#9ab',9)}
if(k!=='pln')t.pins.forEach(d=>{const px=x+w*d[1],py=y+h*d[2];R(px-9,py-9,18,18,d[0]==='+'?'#d62a2a':d[0]==='-'?'#161616':'#2f9a4a',3)});
X.restore()}
function intArt(p,x,y,s){const hot=Math.max(0,Math.min(1,(p.temp-40)/80));
R(x+116*s,y+14*s,34*s,56*s,'#9aa0a8',3*s);for(let i=0;i<7;i++)R(x+118*s,y+(18+i*7)*s,30*s,3*s,'#6f757d',1);
if(hot>0){X.globalAlpha=hot*.75;R(x+116*s,y+14*s,34*s,56*s,'#ff3b10',3*s);X.globalAlpha=1}
IP.forEach((q,i)=>{const v=p.hp[i],bx=x+q[1]*s,by=y+q[2]*s,bw=q[3]*s,bh=q[4]*s;R(bx,by,bw,bh,v==2?'#050505':q[5],2*s);
if(v==1){X.globalAlpha=.55;R(bx,by,bw,bh,'#8a5a1e',2*s);X.globalAlpha=1}
if(v==2){X.strokeStyle='#ff6a3d';X.lineWidth=2*s;X.beginPath();X.moveTo(bx+3*s,by+3*s);X.lineTo(bx+bw-3*s,by+bh-3*s);X.stroke()}
if(s>1.5)TX(q[0],bx+bw/2,by+bh+11*s,'#fff',10)})}
function draw(dt){T+=dt;thermal(dt);const w=C.width/dpr,h=C.height/dpr;X.setTransform(dpr,0,0,dpr,0,0);X.fillStyle='#1d86d8';X.fillRect(0,0,w,h);
X.fillStyle='#3a9be4';for(let i=12;i<w;i+=24)for(let j=12;j<h;j+=24)X.fillRect(i,j,2,2);
X.lineCap='round';
wires.forEach((wr,i)=>{const a=pinInfo(wr.a),b=pinInfo(wr.b);if(!a||!b)return;const live=S.run&&S.live&&S.live.has(fd(wr.a));
X.strokeStyle=live?'#fff200':WC[i%6];X.lineWidth=sel&&sel.o===wr?7:4;X.globalAlpha=live?1:.85;X.beginPath();X.moveTo(a.x,a.y);X.bezierCurveTo(a.x+a.dx*60,a.y+a.dy*60,b.x+b.dx*60,b.y+b.dy*60,b.x,b.y);X.stroke();X.globalAlpha=1});
if(drag&&drag.k==='w'){const a=pinInfo(drag.from);if(a){X.strokeStyle='#fff9';X.lineWidth=3;X.setLineDash([6,5]);X.beginPath();X.moveTo(a.x,a.y);X.lineTo(drag.x,drag.y);X.stroke();X.setLineDash([])}}
parts.forEach(p=>{const t=TY[p.t],cx=p.x+t.w/2,cy=p.y+t.h/2;X.globalAlpha=p.bad?.45:1;art(p);
if(sel&&sel.o===p){X.strokeStyle='#fff';X.lineWidth=3;X.setLineDash([6,4]);X.strokeRect(p.x-4,p.y-4,t.w+8,t.h+8);X.setLineDash([])}
X.fillStyle='#f3ead7';X.font='600 11px system-ui,sans-serif';X.textAlign='center';X.fillText(p.n+(p.temp>45?' '+Math.round(p.temp)+'°C':''),cx,p.y+t.h+16);
if(p.bad){X.strokeStyle='#ff6a3d';X.lineWidth=5;X.beginPath();X.moveTo(p.x+10,p.y+10);X.lineTo(p.x+t.w-10,p.y+t.h-10);X.moveTo(p.x+t.w-10,p.y+10);X.lineTo(p.x+10,p.y+t.h-10);X.stroke()}
X.globalAlpha=1;
t.pins.forEach(d=>{const q=pinInfo(p.id+'.'+d[0]);X.fillStyle='#e8e8e8';X.beginPath();X.arc(q.x,q.y,6,0,7);X.fill();X.fillStyle='#f3ead7';X.font='10px system-ui,sans-serif';
if(d[1]===0){X.textAlign='left';X.fillText(d[0],q.x+10,q.y+3)}else if(d[1]===1&&d[2]<1){X.textAlign='right';X.fillText(d[0],q.x-10,q.y+3)}else{X.textAlign='center';X.fillText(d[0],q.x,q.y-10)}})});
fx.forEach(p=>{p.y-=p.v*dt;p.x+=p.vx*dt;p.a-=dt*(p.k==='s'?.5:2.2);X.globalAlpha=Math.max(0,p.a)*(p.k==='s'?.6:1);if(p.k==='s'){X.fillStyle='#999';X.beginPath();X.arc(p.x,p.y,6+(1-p.a)*16,0,7);X.fill()}else{X.fillStyle='#ffb347';X.fillRect(p.x,p.y,3,3)}});X.globalAlpha=1;fx=fx.filter(p=>p.a>0);meter();svcDraw(dt)}
