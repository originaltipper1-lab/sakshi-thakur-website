'use strict';
const TARGET_URL = 'https://t.me/+zz_LuzUKEFAzOGY1';
const totalTime = 3;
const deadline = Date.now() + totalTime * 1000;
const timerCount = document.getElementById('timer-count');
const textCount = document.getElementById('text-count');
const progress = document.getElementById('timer-progress');
const circumference = 2 * Math.PI * 55;
progress.style.strokeDasharray = String(circumference);
const timerInterval = window.setInterval(() => {
  const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  timerCount.textContent = String(remaining);
  textCount.textContent = String(remaining);
  progress.style.strokeDashoffset = String(circumference * (1 - remaining / totalTime));
  if (remaining === 0) {
    window.clearInterval(timerInterval);
    document.getElementById('redirect-note').textContent = 'Opening Telegram… Use the button if you stay here.';
    window.location.href = TARGET_URL;
  }
}, 250);

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (ctx && !reducedMotion.matches) {
  let width, height;
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
  const reset = (particle) => Object.assign(particle, {
    x: Math.random() * width, y: Math.random() * height,
    size: Math.random() * 2.2 + .8,
    vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6,
    alpha: Math.random() * .6 + .2,
    color: Math.random() > .5 ? '#00f2fe' : '#ff007f',
  });
  const particles = Array.from({ length: width < 600 ? 30 : 65 }, () => reset({}));
  const animate = () => {
    if (reducedMotion.matches) return;
    ctx.clearRect(0, 0, width, height);
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height) reset(particle);
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    window.requestAnimationFrame(animate);
  };
  animate();
}
