'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ContactProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
  contactHeading?: string;
  contactDescription?: string;
}

export default function Contact({ 
  socialLinks,
  contactHeading = "Let's Connect",
  contactDescription = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
}: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Get In Touch
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.textPrimary }}
            >
              {contactHeading}
            </h3>
            <p 
              className="leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              {contactDescription}
            </p>
            
            {socialLinks && (
              <div className="flex gap-3 pt-4">
                {socialLinks.github && (
                  <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-6 h-6" style={{ color: colors.textPrimary }} />
                  </motion.a>
                )}
                {socialLinks.linkedin && (
                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                    }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-6 h-6" style={{ color: colors.textPrimary }} />
                  </motion.a>
                )}
                {socialLinks.twitter && (
                  <motion.a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-6 h-6" style={{ color: colors.textPrimary }} />
                  </motion.a>
                )}
                {socialLinks.email && (
                  <motion.a
                    href={`mailto:${socialLinks.email}`}
                    className="p-3.5 backdrop-blur-lg rounded-xl border transition-colors"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBorder;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.cardBg;
                    }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail className="w-6 h-6" style={{ color: colors.textPrimary }} />
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2.5"
                style={{ color: colors.textPrimary }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-5 py-3.5 backdrop-blur-lg border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2.5"
                style={{ color: colors.textPrimary }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-5 py-3.5 backdrop-blur-lg border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2.5"
                style={{ color: colors.textPrimary }}
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-5 py-3.5 backdrop-blur-lg border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.gradientFrom;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                }}
                placeholder="Your message..."
              />
            </div>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-xl text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderColor: 'rgba(34, 197, 94, 0.3)',
                  color: '#86efac',
                }}
              >
                Message sent successfully!
              </motion.div>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3.5 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border"
              style={{
                background: loading 
                  ? colors.cardBg 
                  : `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                borderColor: 'transparent',
              }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <Send className="w-5 h-5" />}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
