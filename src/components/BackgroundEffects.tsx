import { motion } from 'motion/react';

export function BackgroundEffects() {
  // Create grid pattern
  const gridLines = Array.from({ length: 20 });
  
  // Create floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(255, 153, 51, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#FF9933] rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 10px rgba(255, 153, 51, 0.8)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#FF9933]/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#FF9933]/10 to-transparent blur-3xl" />
    </div>
  );
}
