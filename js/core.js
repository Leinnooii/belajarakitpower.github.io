// js/core.js - Kanvas, state global, dan helper UI (classic script, tanpa module)
const $=i=>document.getElementById(i),C=$('c'),X=C.getContext('2d'),dpr=devicePixelRatio||1;
let AC,nid=1,T=0,fx=[],parts=[],wires=[],sel=null,drag=null,uf={},V=null,S={run:false};
const fit=()=>{C.width=C.clientWidth*dpr;C.height=C.clientHeight*dpr};addEventListener('resize',fit);fit();
const st=t=>($('st').textContent=t),ui=()=>{$('go').textContent=S.run?'■ Berhenti':'▶ Jalankan';$('del').disabled=!sel;$('svc').disabled=!(sel&&sel.o.t==='amp')};
