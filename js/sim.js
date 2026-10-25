// js/sim.js - Simulasi sirkuit, suara, suhu, ledakan (classic script, tanpa module)
function boom(p){const t=TY[p.t];for(let i=0;i<16;i++)fx.push({x:p.x+t.w/2+Math.random()*30-15,y:p.y+t.h/2,v:25+Math.random()*40,vx:Math.random()*40-20,a:1,k:'s'});for(let i=0;i<10;i++)fx.push({x:p.x+t.w/2,y:p.y+t.h/2,v:Math.random()*160-80,vx:Math.random()*160-80,a:1,k:'p'})}
function stop(){S.run=false;S.live=null;if(S.end)S.end();S.end=null;clearTimeout(S.tm);ui()}
function sound(dist,w){try{const t=AC.currentTime,g=AC.createGain(),f=AC.createBiquadFilter(),ws=AC.createWaveShaper(),c=new Float32Array(256);f.type='lowpass';f.frequency.value=dist?1600:2800;
for(let i=0;i<256;i++){const x=i/128-1;c[i]=dist?Math.tanh(x*9):x}ws.curve=c;g.gain.value=Math.min(.3,.05+w/600);
const os=[110,165,220,277].map((fr,i)=>{const o=AC.createOscillator();o.type=i?'triangle':'sawtooth';o.frequency.value=fr;o.connect(ws);o.start();return o});
ws.connect(f);f.connect(g);g.connect(AC.destination);
S.end=()=>{const n=AC.currentTime;g.gain.setTargetAtTime(0,n,.05);os.forEach(o=>o.stop(n+.3))}}catch(e){}}
function sim(){stop();uf={};wires.forEach(w=>{uf[fd(w.a)]=fd(w.b)});
const g=t=>parts.find(p=>p.t===t&&!p.bad),n=(p,k)=>fd(p.id+'.'+k),L=['pln','trafo','amp','spk','src'].map(g);
const [pl,tr,am,sp,sr]=L,m=L.map((p,i)=>p?'':NM[i]).filter(Boolean);
if(m.length)return st('Belum ada: '+m.join(', ')+'. Kalau ada yang rusak, hapus lalu ganti baru.');
if(n(pl,'L')===n(pl,'N')){pl.bad=1;boom(pl);return st('Korslet! L dan N tersambung langsung, listrik 220V rusak.')}
const pri=(n(tr,'P1')===n(pl,'L')&&n(tr,'P2')===n(pl,'N'))||(n(tr,'P1')===n(pl,'N')&&n(tr,'P2')===n(pl,'L'));
if(!pri)return st('Primer trafo (P1, P2) belum tersambung ke L dan N.');
const rev=n(am,'V+')===n(tr,'S2')&&n(am,'GND')===n(tr,'S1');if(rev){am.hp[0]=Math.max(am.hp[0],1);am.hp[1]=Math.max(am.hp[1],1)}
if(!rev&&!(n(am,'V+')===n(tr,'S1')&&n(am,'GND')===n(tr,'S2')))return st('Amp belum dapat daya: sambung V+ ke S1 dan GND ke S2 trafo.');
if(!(n(am,'IN')===n(sr,'SIG')&&n(sr,'GND')===n(am,'GND')))return st('Sinyal belum masuk: sambung SIG ke IN, dan GND sumber audio ke GND amp.');
const o=n(sp,'+')===n(am,'O+')&&n(sp,'-')===n(am,'O-'),oi=n(sp,'+')===n(am,'O-')&&n(sp,'-')===n(am,'O+');
if(!o&&!oi)return st('Speaker belum tersambung ke output amp (O+ dan O-).');
const dd=am.hp.map((v,i)=>v==2?IP[i][0]:'').filter(Boolean);if(dd.length)return st('Komponen amp hangus: '+dd.join(', ')+'. Pilih amp, tekan Servis, lalu ganti dengan solder.');
const bt=tr.w<am.w*.9,bs=sp.w<am.w*.7;
S.live=new Set([n(pl,'L'),n(pl,'N'),n(tr,'S1'),n(tr,'S2'),n(am,'O+'),n(am,'O-'),n(am,'IN')]);S.run=true;S.sp=sp;S.am=am;S.tr=tr;S.hot=bt;sound(bt||bs||am.hp.some(v=>v),am.w);ui();
if(bt||bs){const r=[];if(bt){tr.bad=1;boom(tr);r.push('Trafo '+tr.w+'W gosong, daya kurang dari amp '+am.w+'W.')}if(bs){sp.bad=1;boom(sp);r.push('Speaker '+sp.w+'W pecah, daya kurang dari amp.')}st(r.join(' '));S.tm=setTimeout(()=>{stop()},1500)}
else st(am.hp.some(v=>v)?'Menyala, tapi amp panas abnormal'+(rev?' (polaritas V+ dan GND terbalik)':'')+'. Cek suhu dan multimeter, hentikan sebelum meledak.':'Menyala, suara keluar.'+(oi?' Fase speaker terbalik, tapi tetap bunyi.':'')+(sp.q<.8?' Driver murah, suaranya kurang bersih.':' Driver bagus, suaranya jernih.'))}
function thermal(dt){parts.forEach(p=>{let g=30;if(S.run&&(S.am===p||S.tr===p))g=p.t==='amp'?(p.hp.some(v=>v==1)?150:62):(S.hot?95:48);p.temp+=(g-p.temp)*dt*(g>p.temp?.35:.15)});if(S.run&&S.am&&S.am.temp>100)explode(S.am)}
function explode(a){a.hp.forEach((v,i)=>{if(v==1||i>2)a.hp[i]=2});const nm=a.hp.map((v,i)=>v==2?IP[i][0]:'').filter(Boolean);
a.hp.forEach((v,i)=>{if(v==2)for(let k=0;k<8;k++)fx.push({x:a.x+IP[i][1]+IP[i][3]/2,y:a.y+IP[i][2]+IP[i][4]/2,v:Math.random()*140-70,vx:Math.random()*140-70,a:1,k:'p'})});
boom(a);stop();st('Meledak! Hangus: '+nm.join(', ')+'. Pilih amp, tekan Servis, lalu ganti dengan solder.')}
