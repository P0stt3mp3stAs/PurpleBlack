'use client';
import { useEffect, useState } from 'react';

type Level1Props = {
  playerX: number;
  playerY: number;
  onPlayerDeath: () => void;
  onLevelComplete: () => void;
};

export default function Level1({ playerX, playerY, onPlayerDeath, onLevelComplete }: Level1Props) {
  const [trapActive, setTrapActive] = useState(false);
  const canvasWidth = 800;
  const canvasHeight = 400;

  // Spike positions (represented by ***)
  const spikes = [
    { x: 100, y: 350, width: 100 }, // Group of spikes
    { x: 250, y: 350, width: 100 },
    { x: 550, y: 350, width: 100 }
  ];

  // Trap platform (red platform)
  const trapPlatform = {
    x: 400,
    y: 350,
    width: 80,
    height: 20
  };

  // Door position (/|\)
  const door = {
    x: 700,
    y: 300,
    width: 40,
    height: 80
  };

  // Check for collisions and level completion
  useEffect(() => {
    // Check if player touched canvas boundaries
    if (playerX <= 0 || playerX >= canvasWidth || playerY >= canvasHeight) {
      onPlayerDeath();
      return;
    }

    // Check if player is on the trap platform
    if (
      playerX >= trapPlatform.x &&
      playerX <= trapPlatform.x + trapPlatform.width &&
      playerY >= trapPlatform.y - 50 && // -50 to account for character height
      playerY <= trapPlatform.y
    ) {
      setTrapActive(true);
    }

    // Check if player reached the door
    if (
      playerX >= door.x - 30 && // -30 to give some proximity
      playerX <= door.x + door.width + 30 &&
      playerY >= door.y - 100 && // -100 to account for character height
      playerY <= door.y + door.height
    ) {
      onLevelComplete();
    }
  }, [playerX, playerY]);

  return (
    <div className="relative w-full h-full bg-black">
      {/* Spikes (***) */}
      {spikes.map((spike, index) => (
        <div 
          key={index}
          className="absolute text-white font-mono text-xl"
          style={{
            left: `${spike.x}px`,
            top: `${spike.y}px`,
            width: `${spike.width}px`
          }}
        >
          {Array(3).fill('***').join('\n')}
        </div>
      ))}

      {/* Trap platform (red) */}
      <div
        className={`absolute ${trapActive ? 'bg-red-600' : 'bg-red-500'} transition-colors duration-300`}
        style={{
          left: `${trapPlatform.x}px`,
          top: `${trapPlatform.y}px`,
          width: `${trapPlatform.width}px`,
          height: `${trapPlatform.height}px`
        }}
      >
        {trapActive && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            TRAP!
          </div>
        )}
      </div>

      {/* Door (/|\) */}
      <div
        className="absolute text-white font-mono text-2xl flex flex-col items-center"
        style={{
          left: `${door.x}px`,
          top: `${door.y}px`,
          width: `${door.width}px`,
          height: `${door.height}px`
        }}
      >
        <div>/|\</div>
        <div className="mt-2 text-sm">EXIT</div>
      </div>

      {/* Bottom pit (black hole) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800"></div>
    </div>
  );
}