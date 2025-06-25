'use client';

import { useEffect, useRef } from 'react';

export default function CharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Character properties
    const character = {
      x: 100,
      y: 300,
      width: 40,
      height: 60,
      color: '#9900FF',
    };

    function drawStickman(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.strokeStyle = '#9900FF';   // Purple outline
        ctx.fillStyle = '#9900FF';     // Purple fill
        ctx.lineWidth = 4;             // Make lines thicker

        // Head
        ctx.beginPath();
        ctx.arc(x, y - 60, 10, 0, Math.PI * 2); // head radius 10
        ctx.stroke();
      
        // Body
        ctx.beginPath();
        ctx.moveTo(x, y - 50);
        ctx.lineTo(x, y - 20);
        ctx.stroke();
      
        // Arms
        ctx.beginPath();
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x - 15, y - 30); // left arm
        ctx.moveTo(x, y - 40);
        ctx.lineTo(x + 15, y - 30); // right arm
        ctx.stroke();
      
        // Legs
        ctx.beginPath();
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x - 10, y); // left leg
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x + 10, y); // right leg
        ctx.stroke();
      }

    // Draw loop
    function draw() {
        if (!canvas) return;
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        if (ctx) {
          drawStickman(ctx, character.x, character.y);
        }
        requestAnimationFrame(draw);
      }
    
      draw();
    }, []);

  return (
    <canvas ref={canvasRef} className="border border-purple-500 border-3" />
  );
}
