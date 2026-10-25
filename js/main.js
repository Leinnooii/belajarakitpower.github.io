// js/main.js - Titik masuk: menjalankan loop animasi (classic script, tanpa module)
let L0=performance.now();(function f(n){const dt=Math.min(.05,(n-L0)/1000);L0=n;draw(dt);requestAnimationFrame(f)})(L0);
