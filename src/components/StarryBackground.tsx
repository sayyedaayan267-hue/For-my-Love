import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

const STAR_COLORS = [
  '#fed7e2', // soft rose
  '#fbcfe8', // pink-200
  '#e9d5ff', // lavender
  '#fef3c7', // warm cream
  '#ffffff', // soft white
];

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((width * height) / 3800);
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          alpha: Math.random() * 0.7 + 0.2,
          targetAlpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
      starsRef.current = stars;
    };

    initStars();
    window.addEventListener('resize', handleResize);

    // Mouse / touch stardust interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Add a couple of stardust sparkles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: clientX + (Math.random() * 16 - 8),
          y: clientY + (Math.random() * 16 - 8),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          life: 1,
          maxLife: 40 + Math.random() * 20,
          color: Math.random() > 0.5 ? '#f472b6' : '#e9d5ff',
          size: Math.random() * 2 + 1,
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Spawn shooting stars occasionally
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.35) {
        shootingStarsRef.current.push({
          x: Math.random() * width * 0.8 + width * 0.2,
          y: Math.random() * height * 0.4,
          length: 70 + Math.random() * 60,
          speed: 7 + Math.random() * 5,
          angle: (140 * Math.PI) / 180,
          opacity: 1,
          active: true,
        });
      }
    }, 4200);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle
        if (Math.abs(star.alpha - star.targetAlpha) < 0.02) {
          star.targetAlpha = Math.random() * 0.8 + 0.15;
        } else if (star.alpha < star.targetAlpha) {
          star.alpha += star.twinkleSpeed;
        } else {
          star.alpha -= star.twinkleSpeed;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra subtle glow for brighter stars
        if (star.size > 1.8 && star.alpha > 0.6) {
          ctx.globalAlpha = star.alpha * 0.25;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render Shooting Stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        if (!s.active) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        const dx = Math.cos(s.angle) * s.length;
        const dy = Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
        grad.addColorStop(0, `rgba(255, 240, 245, ${s.opacity})`);
        grad.addColorStop(0.3, `rgba(244, 114, 182, ${s.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(244, 114, 182, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - dx, s.y - dy);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.018;

        if (s.opacity <= 0 || s.x < 0 || s.y > height) {
          s.active = false;
        }
      }

      // Render interactive particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life -= 1 / p.maxLife;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      clearInterval(shootingStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
