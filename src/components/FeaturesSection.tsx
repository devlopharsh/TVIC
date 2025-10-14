import { motion } from 'motion/react';
import {
  Shield,
  Zap,
  ScanLine,
  Database,
  CheckCircle2,
  Eye,
  Clock,
  FileCheck,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Automated Verification',
    description:
      'AI-powered automated inspection eliminates manual checking and reduces human error for faster, more reliable results.',
  },
  {
    icon: Shield,
    title: 'Authenticity Guarantee',
    description:
      'Advanced algorithms detect counterfeit ICs by analyzing visual markers, text patterns, and manufacturer data.',
  },
  {
    icon: ScanLine,
    title: 'Optical Inspection',
    description:
      'High-resolution image analysis captures microscopic details to identify inconsistencies and manufacturing defects.',
  },
  {
    icon: FileCheck,
    title: 'OCR Verification',
    description:
      'Intelligent text recognition extracts and validates part numbers, date codes, and manufacturer information.',
  },
  {
    icon: Database,
    title: 'OEM Data Matching',
    description:
      'Cross-reference with official manufacturer databases to verify authenticity against original specifications.',
  },
  {
    icon: Clock,
    title: 'Real-Time Results',
    description:
      'Get instant verification results in under 2 seconds with detailed reports and confidence scores.',
  },
  {
    icon: Eye,
    title: 'Visual Comparison',
    description:
      'Side-by-side comparison with authentic samples highlights differences and suspicious markings.',
  },
  {
    icon: CheckCircle2,
    title: 'Multi-Layer Analysis',
    description:
      'Comprehensive verification through multiple inspection layers ensures maximum accuracy and reliability.',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description:
      'Enterprise-grade security protects your data with encrypted transmission and secure storage protocols.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF9933] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#FF9933] rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="feature-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#FF9933"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#feature-grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 mb-6 border border-[#FF9933]/30 rounded-full bg-[#FF9933]/5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm text-[#FF9933]">Why Choose TVIC</span>
          </motion.div>

          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffffff 0%, #FF9933 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Comprehensive IC Verification
          </h2>
          <p className="text-lg text-gray-400">
            Advanced technology and intelligent algorithms working together to
            ensure every integrated circuit meets authentic standards.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="relative h-full p-6 rounded-xl border border-gray-800/50 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#FF9933]/30 hover:shadow-[0_0_30px_rgba(255,153,51,0.1)]">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/0 via-[#FF9933]/0 to-[#FF9933]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF9933]/0 to-transparent group-hover:via-[#FF9933] transition-all duration-500" />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 relative inline-block">
                    <div className="absolute inset-0 bg-[#FF9933]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-3 rounded-lg bg-[#FF9933]/10 border border-[#FF9933]/20 group-hover:border-[#FF9933]/40 transition-colors duration-300">
                      <feature.icon
                        className="w-6 h-6 text-[#FF9933]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-white group-hover:text-[#FF9933] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M 64 48 L 64 64 L 48 64"
                      stroke="#FF9933"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </div>

              {/* Animated connection line (for larger screens) */}
              {index < features.length - 1 && index % 3 !== 2 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-gradient-to-r from-[#FF9933]/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 mb-4">
            Ready to verify your integrated circuits?
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#FF9933] rounded-full animate-pulse" />
            <span className="text-sm text-[#FF9933]">
              System online and ready
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
