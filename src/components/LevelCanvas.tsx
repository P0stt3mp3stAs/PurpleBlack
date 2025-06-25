// src/components/LevelCanvas.tsx
'use client';

import { useState } from 'react';
import Character from './Character';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2'; // You can add more levels here

interface LevelCanvasProps {
  level: number;
}

export default function LevelCanvas({ level }: LevelCanvasProps) {
  const [characterPosition, setCharacterPosition] = useState({ x: 100, y: 300 });

  const renderLevel = () => {
    switch (level) {
      case 1:
        return <Level1 playerX={characterPosition.x} playerY={characterPosition.y} onPlayerDeath={() => {
          alert("You fell into the trap! 💀");
          // Optional: reset characterPosition or trigger death screen
        }} />;
      case 2:
        return <Level2 />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-[800px] h-[400px] bg-gray-100 overflow-hidden border border-purple-500 border-3">
      {renderLevel()}
      <Character/>
    </div>
  );
}
webkitURL