"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { CircuitLines } from "@/components/CircuitLines";
import { ChipVisual } from "@/components/ChipVisual";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Zap, Shield, Cpu } from "lucide-react";
import { Footer } from "@/components/frontend/footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const circuitImageUrl =
    "https://images.unsplash.com/photo-1602493054376-d9dc3dfcbc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBtaWNyb2NoaXB8ZW58MXx8fHwxNzYwMTIzOTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background effects */}
      <BackgroundEffects />
      <CircuitLines />

      {/* Main hero content */}
      <div className="relative z-10 container mx-auto ml-10 px-20 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src="/logo-solo.svg" // file at /public/icons/logo.svg
                  alt="Companylogo"
                  width={30}
                  height={32}
                  priority
                />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 153, 51, 0.5)",
                      "0 0 40px rgba(255, 153, 51, 0.8)",
                      "0 0 20px rgba(255, 153, 51, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="tracking-wider font-semibold text-xl text-[#FF9933]">
                  TVIC
                </h3>
                <p className="text-xs text-gray-400 tracking-wide">
                  The Verification Center for Integrated Circuits
                </p>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1
                className="text-6xl md:text-7xl tracking-tight mb-4"
                style={{
                  fontWeight: 700,
                  lineHeight: 1.1,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #FF9933 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Authenticity
                <br />
                Starts Here.
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-gray-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              TVIC ensures genuine Integrated Circuits through automated image
              inspection, OCR verification, and OEM data matching.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="flex flex-wrap gap-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: Shield, label: "Secure" },
                { icon: Zap, label: "Instant" },
                { icon: Cpu, label: "Precise" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-[#FF9933]" />
                  <span className="text-sm text-gray-400">{feature.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                size="lg"
                className="relative bg-[#FF9933] hover:bg-[#ff8800] text-black px-8 py-6 overflow-hidden group"
                style={{
                  fontWeight: 600,
                  fontSize: "1.125rem",
                }}
              >
                <span className="relative z-10">Start Verification</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ff8800] to-[#ffaa33]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-75 blur-xl"
                  style={{
                    background: "rgba(255, 153, 51, 0.6)",
                    animation: "pulse 2s infinite",
                  }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                style={{
                  fontWeight: 600,
                  fontSize: "1.125rem",
                }}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center gap-6 pt-8 border-t border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div>
                <div
                  className="text-2xl text-[#FF9933]"
                  style={{ fontWeight: 700 }}
                >
                  99.9%
                </div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div>
                <div
                  className="text-2xl text-[#FF9933]"
                  style={{ fontWeight: 700 }}
                >
                  &lt;2s
                </div>
                <div className="text-xs text-gray-500">Verification Time</div>
              </div>
              <div className="w-px h-10 bg-gray-800" />
              <div>
                <div
                  className="text-2xl text-[#FF9933]"
                  style={{ fontWeight: 700 }}
                >
                  24/7
                </div>
                <div className="text-xs text-gray-500">Automated</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ChipVisual imageUrl={circuitImageUrl} />
          </motion.div>
        </div>
      </div>

      {/* Additional subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF9933]/5 to-transparent pointer-events-none" />

      {/* Custom styles for button glow animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Features Section */}
      <FeaturesSection />

      {/* Process & Why Better Section */}
      <ProcessSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
