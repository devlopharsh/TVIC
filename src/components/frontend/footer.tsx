import { motion } from 'motion/react';
import { Cpu, Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API Documentation', href: '#api' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Support Center', href: '#support' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'White Papers', href: '#papers' },
    { label: 'FAQs', href: '#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'Security', href: '#security' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] border-t border-[#FF9933]/10">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF9933] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF9933] rounded-full blur-[150px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="footer-grid"
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
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Cpu className="w-10 h-10 text-[#FF9933]" strokeWidth={1.5} />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 153, 51, 0.3)',
                        '0 0 40px rgba(255, 153, 51, 0.6)',
                        '0 0 20px rgba(255, 153, 51, 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="tracking-wider text-white">TVIC</h3>
                  <p className="text-xs text-gray-500">Verification Center</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                The industry's most trusted platform for automated IC verification.
                Protecting supply chains with AI-powered authenticity detection.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:support@tvic.com"
                    className="hover:text-[#FF9933] transition-colors"
                  >
                    support@tvic.com
                  </a>
                </div>
                <div className="flex items-start gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-[#FF9933] transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                  <span>
                    123 Tech Valley Drive
                    <br />
                    Silicon Valley, CA 94025
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-white mb-4 capitalize">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-[#FF9933] transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="bg-[#FF9933]/10" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.div
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p>
                © {new Date().getFullYear()} TVIC. All rights reserved.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm text-gray-500 mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-[#FF9933] rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative p-2 rounded-full border border-gray-800 bg-[#0a0a0a] group-hover:border-[#FF9933]/50 transition-colors">
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-[#FF9933] transition-colors" />
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex items-center gap-4 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-800 bg-[#0a0a0a]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>System Operational</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="pb-12 pt-8 border-t border-[#FF9933]/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-white mb-2">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-6">
              Get the latest updates on IC verification technology and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-[#0f0f0f] border border-gray-800 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF9933]/50 transition-colors text-sm"
              />
              <Button
                className="bg-[#FF9933] hover:bg-[#ff8800] text-black px-6"
                style={{ fontWeight: 600 }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent opacity-30" />
    </footer>
  );
}
