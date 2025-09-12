# Love-
<!doctype html>
<html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div>
      </div>
    </body>
</html><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Love Surprise ❤️</title>
<style>
:root{--bg1:#ff4b2b;--bg2:#ff416c;--accent:#ff1744;--card-bg:#fff}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,Segoe UI,Roboto,sans-serif;background:linear-gradient(135deg,var(--bg1),var(--bg2));overflow-x:hidden;color:#222}
.hearts{position:absolute;inset:0;pointer-events:none;z-index:0}
.hearts span{position:absolute;bottom:-60px;width:20px;height:20px;background:rgba(255,255,255,0.85);transform:rotate(45deg);border-radius:5px;animation:floatUp linear infinite}
.hearts span::before,.hearts span::after{content:"";position:absolute;width:20px;height:20px;background:rgba(255,255,255,0.85);border-radius:50%}
.hearts span::before{top:-10px;left:0}.hearts span::after{left:10px;top:0}
@keyframes floatUp{from{transform:translateY(0) rotate(45deg) scale(.9);opacity:1}to{transform:translateY(-900px) rotate(45deg) scale(1.1);opacity:0}}

.container{width:100%;max-width:1000px;padding:12px;z-index:2;display:flex;flex-direction:column;align-items:center;gap:16px}

/* heart flip cards */
.cards{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.heart-card{width:180px;height:200px;perspective:1000px;cursor:pointer}
.heart-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s}
.heart-card.flipped .heart-inner{transform:rotateY(180deg)}
.heart-front,.heart-back{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 20px rgba(0,0,0,0.25)}
.heart-front{background:var(--accent);color:white;font-size:48px}
.heart-back{background:#fff;transform:rotateY(180deg);overflow:hidden;border:3px solid var(--accent)}
.heart-back img{width:50%;height:50%;object-fit:cover;display:block}

/* gift box and letter */
.actions{display:flex;flex-direction:column;align-items:center;gap:10px}
.box{width:100px;height:100px;border-radius:14px;background:var(--card-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 10px 20px rgba(0,0,0,0.25);cursor:pointer;z-index:3;transition:transform .16s}
.box:active{transform:scale(.96)}
.message-area{min-height:70px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;z-index:3;text-align:center;padding:0 8px}
.blast-heart{font-size:90px;animation:blast 900ms ease-out forwards;color:var(--accent);position:absolute;top:42%;left:50%;transform:translate(-50%,-50%)}
@keyframes blast{0%{transform:translate(-50%,-50%) scale(.2);opacity:1}100%{transform:translate(-50%,-50%) scale(3.2);opacity:0}}

.caption{font-size:16px;font-weight:700;color:white;text-shadow:0 4px 10px rgba(0,0,0,.2);text-align:center}

/* letter modal */
.letter-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);display:none;align-items:center;justify-content:center;z-index:30;padding:16px}
.letter{background:#fff;width:100%;max-width:500px;padding:20px;border-radius:12px;box-shadow:0 14px 30px rgba(0,0,0,.4);position:relative;animation:paperIn .5s}
@keyframes paperIn{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
.close-btn{position:absolute;top:10px;right:10px;background:var(--accent);color:#fff;border:none;border-radius:6px;padding:6px 8px;cursor:pointer}

/* responsive tweaks */
@media (max-width:60px){
  .cards{flex-direction:column;gap:10px}
  .heart-card{width:200%;max-width:20px;height:20px}
  .box{width:10px;height:10px;font-size:30px}
  .caption{font-size:14px}
}
</style>
</head>
<body>
<div class="hearts" id="hearts"></div>

<div class="container" id="homeScreen">
  <div class="cards">
    <div class="heart-card">
      <div class="heart-inner">
        <div class="heart-front">💖</div>
        <div class="heart-back">
          <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyazBtMHA3MWJoazgxNXN0d2xxOHNjamsyeTY3MTU4emZveW0yY21sYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41JWw65TcBGjPpRK/giphy.gif" alt="Cute hearts GIF">
        </div>
      </div>
    </div>

    <div class="heart-card">
      <div class="heart-inner">
        <div class="heart-front">💖</div>
        <div class="heart-back">
          <img src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyYWk1Z240b3FkbXRza3U0M2UzbDNodGNsMWJ1aGF2YjQ2cnc2ZTZiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lv2VhwHrt6ljhvZ6LF/giphy.gif" alt="Romantic love GIF">
        </div>
      </div>
    </div>
  </div>

  <div class="actions">
    <div class="box" id="surpriseBox" title="Tap to open the surprise">🎁</div>
    <div class="message-area" id="messageArea"></div>
    <button class="small-btn" id="openLetter">💌 Read Love Letter</button>
  </div>

  <div class="caption">💞 You are My Everything 🌍</div>
</div>

<div class="letter-overlay" id="letterOverlay">
  <div class="letter">
    <button class="close-btn" id="closeLetter">✖</button>
    <h2 style="color:var(--accent);margin:0 0 10px">shreya ji 🫠 ❤️</h2>
    <p style="font-size:16px;line-height:1.5">
      From the moment I met you, everything changed. You are my smile, my strength, my always.
      I promise to love you through every sunrise and every storm. <br><br>
      Forever yours, <br> — <strong>manish</strong>
    </p>
  </div>
</div>

<script>
/* background hearts */
(function makeHearts(){
  const hearts=document.getElementById('hearts');
  for(let i=0;i<10;i++){const s=document.createElement('span'); s.style.left=(6+i*8)+'%';
    s.style.animationDelay=(Math.random()*3).toFixed(2)+'s'; s.style.animationDuration=(5+Math.random()*4).toFixed(1)+'s';
    hearts.appendChild(s);
  }
})();

/* card flip */
document.querySelectorAll('.heart-card').forEach(c=>{
  c.addEventListener('click', ()=> c.classList.toggle('flipped'));
});

/* surprise box */
const surpriseBox = document.getElementById('surpriseBox');
const messageArea = document.getElementById('messageArea');
const lines = ["Love you Ji ❤️","You are my happiness 🌸","You are my heartbeat 💓","Forever with you 💕"];
function blastHeart(){
  const b = document.createElement('div'); b.className='blast-heart'; b.textContent='💖';
  document.body.appendChild(b); setTimeout(()=> b.remove(),900);
}
function typeLines(){
  messageArea.innerHTML = ''; let i=0;
  function next(){ if(i>=lines.length) return; const d=document.createElement('div'); d.textContent = lines[i];
    d.style.color='white'; d.style.fontSize='18px'; d.style.fontWeight='700'; d.style.textAlign='center';
    messageArea.appendChild(d); i++; setTimeout(next,2000);
  } next();
}
surpriseBox.addEventListener('click', ()=>{ blastHeart(); typeLines(); });

/* letter open/close */
const letterOverlay = document.getElementById('letterOverlay');
document.getElementById('openLetter').addEventListener('click', ()=>{
  document.getElementById('homeScreen').style.display = 'none';
  letterOverlay.style.display = 'flex';
});
document.getElementById('closeLetter').addEventListener('click', ()=>{
  letterOverlay.style.display = 'none';
  document.getElementById('homeScreen').style.display = 'flex';
});
</script>
</body>
</html>
