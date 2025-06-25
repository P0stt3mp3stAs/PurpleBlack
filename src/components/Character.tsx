// src/components/Character.tsx
import { useEffect, useState } from "react";

export default function Character() {
  const [x, setX] = useState(50); // Starting X position
  const [y, setY] = useState(100); // Starting Y position
  const [isJumping, setIsJumping] = useState(false);
  const [velocityY, setVelocityY] = useState(0);
  const [frame, setFrame] = useState(0);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  const moveSpeed = 4;       // reduced from 4
  const jumpPower = -8;      // reduced from -15
  const gravity = 0.5;       // reduced from 1

  // Movement controls (a for left, d for right, space for jump)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
  
    const update = () => {
      let newX = x;
      let newY = y;
      let newIsJumping = isJumping;
      let newVelocityY = velocityY;
  
      // Movement
      if (keys["a"]) newX -= moveSpeed;
      if (keys["d"]) newX += moveSpeed;
  
      // Jump
      if ((keys[" "] || keys["w"]) && !newIsJumping) {

        newVelocityY = jumpPower;
        newIsJumping = true;
      }
  
      // Gravity
      newVelocityY += gravity;
      newY += newVelocityY;
  
      // Land
      if (newY >= 300) {
        newY = 300;
        newVelocityY = 0;
        newIsJumping = false;
      }
  
      setX(newX);
      setY(newY);
      setVelocityY(newVelocityY);
      setIsJumping(newIsJumping);
      setFrame((prev) => prev + 1);
  
      animationFrameId = requestAnimationFrame(update);
    };
  
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [x, y, velocityY, isJumping, keys]);  

  const isWalking = keys["a"] || keys["d"];
const legSwing = isWalking ? Math.sin(frame / 5) * 10 : 0;
const armSwing = isWalking ? Math.sin(frame / 5 + Math.PI) * 10 : 0;


  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "50px",
        height: "100px",
      }}
    >
      <svg width="60" height="120" viewBox="0 0 60 120">
        {/* Head */}
        <circle cx="30" cy="20" r="10" fill="#9900FF" />

        {/* Body */}
        <line x1="30" y1="30" x2="30" y2="70" stroke="#9900FF" strokeWidth="6" />

        {/* Arms */}
        <line
          x1="30"
          y1="40"
          x2={30 - 20}
          y2={50 + armSwing}
          stroke="#9900FF"
          strokeWidth="6"
        />
        <line
          x1="30"
          y1="40"
          x2={30 + 20}
          y2={50 - armSwing}
          stroke="#9900FF"
          strokeWidth="6"
        />

        {/* Legs */}
        <line
          x1="30"
          y1="70"
          x2={30 - 15}
          y2={100 + legSwing}
          stroke="#9900FF"
          strokeWidth="6"
        />
        <line
          x1="30"
          y1="70"
          x2={30 + 15}
          y2={100 - legSwing}
          stroke="#9900FF"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
}
