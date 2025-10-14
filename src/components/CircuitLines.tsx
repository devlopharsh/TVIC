import { motion } from 'motion/react';

export function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 153, 51, 0)" />
          <stop offset="50%" stopColor="rgba(255, 153, 51, 1)" />
          <stop offset="100%" stopColor="rgba(255, 153, 51, 0)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Horizontal flowing line */}
      <motion.path
        d="M 0 40 L 200 40 L 220 60 L 350 60"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vertical flowing line */}
      <motion.path
        d="M 50% 0 L 50% 100"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.5,
        }}
      />

      {/* Diagonal circuit path */}
      <motion.path
        d="M 100 80% L 200 75% L 250 70% L 350 65%"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
      />

      {/* Circuit nodes */}
      {[
        { cx: '10%', cy: '20%' },
        { cx: '90%', cy: '30%' },
        { cx: '20%', cy: '80%' },
        { cx: '80%', cy: '70%' },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="#FF9933"
          filter="url(#glow)"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
}
