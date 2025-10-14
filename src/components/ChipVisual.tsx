import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChipVisualProps {
  imageUrl: string;
}

export function ChipVisual({ imageUrl }: ChipVisualProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main chip container with 3D effect */}
      <motion.div
        className="relative w-[500px] h-[500px]"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ perspective: '1000px' }}
      >
        {/* Glowing border frame */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[#FF9933]/30 animate-pulse" />
        <div className="absolute inset-4 rounded-xl border border-[#FF9933]/50" />

        {/* Circuit board image with overlay */}
        <div className="absolute inset-8 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt="Integrated Circuit"
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Saffron gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/20 via-transparent to-[#FF9933]/10 mix-blend-overlay" />
          
          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent"
            animate={{
              y: [0, 400, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              boxShadow: '0 0 20px rgba(255, 153, 51, 0.8)',
            }}
          />
        </div>

        {/* Corner indicators */}
        {[
          { top: 0, left: 0, rotate: 0 },
          { top: 0, right: 0, rotate: 90 },
          { bottom: 0, right: 0, rotate: 180 },
          { bottom: 0, left: 0, rotate: 270 },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8"
            style={corner}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M 0 8 L 0 0 L 8 0"
                stroke="#FF9933"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ))}

        {/* Floating data points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FF9933] rounded-full"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 60}%`,
              boxShadow: '0 0 10px rgba(255, 153, 51, 0.8)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Verification status indicator */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-[#FF9933]/50 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-[#FF9933] rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <span className="text-[#FF9933] text-sm">Scanning Active</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting elements */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-[#FF9933] rounded-full"
          style={{
            boxShadow: '0 0 15px rgba(255, 153, 51, 0.8)',
          }}
          animate={{
            x: [
              Math.cos((angle * Math.PI) / 180) * 280,
              Math.cos(((angle + 360) * Math.PI) / 180) * 280,
            ],
            y: [
              Math.sin((angle * Math.PI) / 180) * 280,
              Math.sin(((angle + 360) * Math.PI) / 180) * 280,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
