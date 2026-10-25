// js/circuit.js - Geometri pin, hit-test, dan union-find jaringan (net) (classic script, tanpa module)
const pinInfo=id=>{const[a,k]=id.split('.'),p=parts.find(q=>q.id==a);if(!p)return null;const t=TY[p.t],d=t.pins.find(q=>q[0]===k);return{id,x:p.x+t.w*d[1],y:p.y+t.h*d[2],dx:d[1]===0?-1:d[1]===1?1:0,dy:d[2]===1?1:0}};
const allPins=()=>parts.flatMap(p=>TY[p.t].pins.map(d=>pinInfo(p.id+'.'+d[0])));
const hitPin=(x,y)=>allPins().find(q=>Math.hypot(q.x-x,q.y-y)<15);
const hitPart=(x,y)=>[...parts].reverse().find(p=>{const t=TY[p.t];return x>=p.x&&x<=p.x+t.w&&y>=p.y&&y<=p.y+t.h});
const bz=(a,b,t)=>{const c1=[a.x+a.dx*60,a.y+a.dy*60],c2=[b.x+b.dx*60,b.y+b.dy*60],u=1-t;return[u**3*a.x+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t**3*b.x,u**3*a.y+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t**3*b.y]};
const hitWire=(x,y)=>wires.find(w=>{const a=pinInfo(w.a),b=pinInfo(w.b);if(!a||!b)return;for(let i=0;i<=20;i++){const p=bz(a,b,i/20);if(Math.hypot(p[0]-x,p[1]-y)<12)return true}});
const fd=a=>{if(uf[a]===undefined)uf[a]=a;return uf[a]===a?a:(uf[a]=fd(uf[a]))};
