'use client';

import React from 'react';
import { Mail, MapPin, Share2, ArrowUpRight, Linkedin, Github } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export const ContactSection: React.FC = () => {
  const { settings } = useData();

  // Dynamic social links with fallback values
  const linkedinUrl = settings?.socialLinks?.linkedin || "https://linkedin.com/in/manish-jangra";
  const githubUrl = settings?.socialLinks?.github || "https://github.com/manishjangra1";
  
  // WhatsApp configuration matching the floating WhatsAppNode
  const whatsappNum = settings?.socialLinks?.whatsapp || "919999999999";
  const whatsappMsg = encodeURIComponent('Hi Manish, can we have a meeting regarding a project or collaboration?');
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${whatsappMsg}`;
  
  const xUrl = settings?.socialLinks?.twitter || "https://x.com/manishjangra1";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Card 1: Contact Brief & Info Details */}
      <div className="bento-card flex flex-col justify-between min-h-[380px] group relative overflow-hidden">
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-foreground/30 font-mono text-[9px] uppercase tracking-widest">
            <Mail size={12} className="text-accent-amber" />
            <span>Contact Details</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Let&apos;s Build Together</h3>
            <p className="text-xs text-foreground/50 leading-relaxed font-light">
              Interested in collaborating, hiring, or discussing software engineering and projects? Reach out directly via email or connect through my social channels.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-border-standard">
          <a 
            href={settings?.socialLinks?.email ? `mailto:${settings.socialLinks.email}` : "mailto:dev.jangramanish@gmail.com"} 
            className="flex items-center gap-4 p-3 rounded-xl border border-amber-100 bg-amber-50/40 hover:border-accent-amber/20 hover:bg-amber-50/70 transition-all duration-300 group/item"
          >
            <div className="w-9 h-9 rounded-lg bg-accent-amber/5 flex items-center justify-center text-foreground/30 group-hover/item:text-accent-amber transition-colors">
              <Mail size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.25em] text-text-muted/45 font-mono">Email Address</span>
              <span className="text-xs text-text-secondary group-hover/item:text-foreground transition-colors font-medium">
                {settings?.socialLinks?.email || "dev.jangramanish@gmail.com"}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4 p-3 rounded-xl border border-border-standard bg-surface-secondary/40 group/item">
            <div className="w-9 h-9 rounded-lg bg-accent-amber/5 flex items-center justify-center text-foreground/30">
              <MapPin size={14} className="text-accent-amber" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.25em] text-text-muted/45 font-mono">Location</span>
              <span className="text-xs text-text-secondary font-medium">Chandigarh, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Social Channels Bento Grid */}
      <div className="bento-card flex flex-col justify-between min-h-[380px] group relative overflow-hidden">
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-foreground/30 font-mono text-[9px] uppercase tracking-widest">
            <Share2 size={12} className="text-accent-amber" />
            <span>Digital Channels</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Social Networks</h3>
            <p className="text-xs text-foreground/50 leading-relaxed font-light">
              Feel free to connect, collaborate, or reach out across any of these professional networks and digital platforms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border-standard">
          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex flex-col justify-between p-4 rounded-2xl border border-blue-100 bg-blue-50/40 hover:border-[#0A66C2]/30 hover:bg-blue-50/70 transition-all duration-300 min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] group-hover/item:scale-110 transition-transform duration-300">
                <Linkedin size={16} />
              </div>
              <ArrowUpRight size={14} className="text-text-muted/40 group-hover/item:text-[#0A66C2] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-4">
              <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted/45 font-mono">LinkedIn</span>
              <span className="block text-xs font-semibold text-text-secondary group-hover/item:text-foreground transition-colors mt-0.5">Manish Jangra</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex flex-col justify-between p-4 rounded-2xl border border-border-standard bg-surface-secondary/40 hover:border-foreground/20 hover:bg-surface-secondary transition-all duration-300 min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground group-hover/item:scale-110 transition-transform duration-300">
                <Github size={16} />
              </div>
              <ArrowUpRight size={14} className="text-text-muted/40 group-hover/item:text-foreground group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-4">
              <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted/45 font-mono">GitHub</span>
              <span className="block text-xs font-semibold text-text-secondary group-hover/item:text-foreground transition-colors mt-0.5">manishjangra1</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex flex-col justify-between p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 hover:border-[#25D366]/30 hover:bg-emerald-50/70 transition-all duration-300 min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover/item:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <ArrowUpRight size={14} className="text-text-muted/40 group-hover/item:text-[#25D366] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-4">
              <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted/45 font-mono">WhatsApp</span>
              <span className="block text-xs font-semibold text-text-secondary group-hover/item:text-foreground transition-colors mt-0.5">Start Chat</span>
            </div>
          </a>

          {/* X / Twitter */}
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item flex flex-col justify-between p-4 rounded-2xl border border-border-standard bg-surface-secondary/40 hover:border-foreground/20 hover:bg-surface-secondary transition-all duration-300 min-h-[110px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground group-hover/item:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <ArrowUpRight size={14} className="text-text-muted/40 group-hover/item:text-foreground group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-4">
              <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted/45 font-mono">X (Twitter)</span>
              <span className="block text-xs font-semibold text-text-secondary group-hover/item:text-foreground transition-colors mt-0.5">manishjangra1</span>
            </div>
          </a>
        </div>
      </div>

    </div>
  );
};

export default ContactSection;
