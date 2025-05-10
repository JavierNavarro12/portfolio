import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 180;
const STAR_SIZE = [0.7, 1.2, 1.7];
const STAR_SPEED = 0.08;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createStar(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)],
    speed: randomBetween(0.02, STAR_SPEED),
    alpha: randomBetween(0.5, 1),
    alphaChange: randomBetween(0.002, 0.008) * (Math.random() > 0.5 ? 1 : -1),
  };
}

const Starfield = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => createStar(width, height));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let star of starsRef.current) {
        // Parpadeo
        star.alpha += star.alphaChange;
        if (star.alpha <= 0.3 || star.alpha >= 1) star.alphaChange *= -1;
        // Movimiento lento hacia abajo
        star.y += star.speed;
        if (star.y > height) {
          star.x = Math.random() * width;
          star.y = 0;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => createStar(width, height));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#101624',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default Starfield; 