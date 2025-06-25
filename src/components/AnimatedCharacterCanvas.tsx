'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedCharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 400;

    let x = 100;
    let y = 300;
    let velocityY = 0;
    const gravity = 1;
    let isJumping = false;
    let frame = 0;

    const keys: { [key: string]: boolean } = {};

    const drawStickman = (ctx: CanvasRenderingContext2D, x: number, y: number, frame: number, isWalking: boolean) => {
      ctx.strokeStyle = '#9900FF';
      ctx.fillStyle = '#9900FF';
      ctx.lineWidth = 6;

      const legSwing = isWalking ? Math.sin(frame / 5) * 10 : 0;
      const armSwing = isWalking ? Math.sin(frame / 5 + Math.PI) * 10 : 0;

      // Head
      ctx.beginPath();
      ctx.arc(x, y - 60, 20, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.moveTo(x, y - 40);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - 20, y - 10 + armSwing);
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x + 20, y - 10 - armSwing);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 15, y + 30 + legSwing);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 15, y + 30 - legSwing);
      ctx.stroke();
    };

    const update = () => {
      const isMoving = keys['a'] || keys['d'];

      // Movement
      if (keys['a']) x -= 4;
      if (keys['d']) x += 4;

      // Jump
      if (keys[' '] && !isJumping) {
        velocityY = -15;
        isJumping = true;
      }

      // Gravity
      velocityY += gravity;
      y += velocityY;
      if (y >= 300) {
        y = 300;
        velocityY = 0;
        isJumping = false;
      }

      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStickman(ctx, x, y, frame, isMoving);

      requestAnimationFrame(update);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    update();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="border border-purple-500 border-3" />;
}
