import { motion } from 'motion/react';
import { Button } from './ui/button';
import {
  Upload,
  ScanEye,
  Database,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  DollarSign,
} from 'lucide-react';

const processSteps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload IC Image',
    description:
      'Simply upload a high-quality image of your integrated circuit through our secure platform.',
  },
  {
    icon: ScanEye,
    number: '02',
    title: 'AI-Powered Analysis',
    description:
      'Advanced OCR and computer vision algorithms analyze visual markers, text, and manufacturing details.',
  },
  {
    icon: Database,
    number: '03',
    title: 'OEM Data Matching',
    description:
      'Cross-reference extracted data with official manufacturer databases for authenticity verification.',
  },
  {
    icon: CheckCircle2,
    number: '04',
    title: 'Instant Verification',
    description:
      'Receive detailed results: Genuine, Counterfeit, or Manual Review Required with confidence scores.',
  },
];

const advantages = [
  {
    icon: Zap,
    title: '100x Faster',
    stat: '<2 seconds',
    description: 'vs. 3-5 minutes for manual inspection',
  },
  {
    icon: Target,
    title: 'Superior Accuracy',
    stat: '99.9%',
    description: 'AI-powered precision beats human error',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solution',
    stat: '24/7',
    description: 'Automated system handles unlimited volume',
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    stat: '90% savings',
    description: 'Reduce inspection costs dramatically',
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9933] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF9933] rounded-full blur-[150px]" />
      </div>

      {/* Animated connecting lines background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="processLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 153, 51, 0)" />
            <stop offset="50%" stopColor="rgba(255, 153, 51, 1)" />
            <stop offset="100%" stopColor="rgba(255, 153, 51, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 50% L 100% 50%"
          stroke="url(#processLineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
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
            <span className="text-sm text-[#FF9933]">How It Works</span>
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
            Simple, Fast, Reliable
          </h2>
          <p className="text-lg text-gray-400">
            Our four-step verification process combines cutting-edge AI with
            industry-leading databases to deliver unmatched accuracy.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF9933]/30 to-transparent" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step number badge */}
                  <motion.div
                    className="mb-4 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
                  >
                    <div className="absolute inset-0 bg-[#FF9933] rounded-full blur-xl opacity-50" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9933] to-[#ff8800] flex items-center justify-center border-2 border-[#FF9933]/30">
                      <span className="text-xl text-black" style={{ fontWeight: 700 }}>
                        {step.number}
                      </span>
                    </div>
                  </motion.div>

                  {/* Icon */}
                  <div className="mb-4 p-4 rounded-xl bg-[#FF9933]/10 border border-[#FF9933]/20">
                    <step.icon className="w-8 h-8 text-[#FF9933]" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator for mobile/tablet */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-[#FF9933]/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why We're Better Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffffff 0%, #FF9933 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Why TVIC Stands Out
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Traditional verification methods can't match our speed, accuracy, and
              efficiency. See the difference automation makes.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative h-full p-6 rounded-xl border border-[#FF9933]/30 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative mb-4">
                    <advantage.icon
                      className="w-8 h-8 text-[#FF9933]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Stat */}
                  <div
                    className="text-3xl text-[#FF9933] mb-2"
                    style={{ fontWeight: 700 }}
                    dangerouslySetInnerHTML={{ __html: advantage.stat }}
                  />

                  {/* Title */}
                  <h4 className="text-white mb-2">{advantage.title}</h4>

                  {/* Description */}
                  <p className="text-xs text-gray-500">{advantage.description}</p>

                  {/* Animated border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF9933] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative mt-20 p-12 rounded-2xl border border-[#FF9933]/30 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f0f0f] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-[100px]" />

          {/* Animated corner accents */}
          {[
            { top: 0, left: 0, rotate: 0 },
            { top: 0, right: 0, rotate: 90 },
            { bottom: 0, right: 0, rotate: 180 },
            { bottom: 0, left: 0, rotate: 270 },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12"
              style={corner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M 0 12 L 0 0 L 12 0"
                  stroke="#FF9933"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
              Ready to Eliminate Counterfeit Risk?
            </h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join leading manufacturers and distributors who trust TVIC for IC
              verification. Start protecting your supply chain today.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="relative bg-[#FF9933] hover:bg-[#ff8800] text-black px-10 py-6 overflow-hidden group"
                style={{
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff8800] to-[#ffaa33]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className="absolute inset-0 opacity-75 blur-xl"
                  style={{
                    background: 'rgba(255, 153, 51, 0.6)',
                    animation: 'ctaPulse 2s infinite',
                  }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#FF9933]/50 text-white hover:bg-[#FF9933]/10 hover:border-[#FF9933] px-10 py-6"
                style={{
                  fontWeight: 600,
                  fontSize: '1.125rem',
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                <span>Free trial available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom animation for CTA button */}
      <style>{`
        @keyframes ctaPulse {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}
