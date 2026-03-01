"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ArrowDown, Instagram, Mail 
} from 'lucide-react';

export default function PageClient(props: any) {
  // Using fallback data for the Canvas preview environment
  const page = props.data?.page || {
    heroTagline: "Nature • Connection • Simplicity",
    heroTitle: "Grannen Lodge",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
    experienceTitle: "The Experience",
    experienceText: "A quiet escape from the noise of the world. Connect with nature and yourself in the heart of the forest.",
    offerings: [
      {
        title: "Guided Retreats",
        description: "Curated experiences for every group.",
        image: "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Quiet Escapes",
        description: "Find the space to simply be.",
        image: "https://images.unsplash.com/photo-1542714598-3419241f99de?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  };

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c3e2d] font-sans selection:bg-[#2c3e2d] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 px-6 py-6 ${scrolled ? 'bg-white/80 shadow-sm backdrop-blur-lg py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-2xl font-serif tracking-tight cursor-pointer transition-colors duration-500 ${scrolled ? 'text-[#2c3e2d]' : 'text-white'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Grannen Lodge
          </motion.div>

          <div className="hidden md:flex gap-10 items-center">
            {['Experience', 'Offerings', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-xs uppercase tracking-[0.2em] transition-all hover:opacity-50 ${scrolled ? 'text-[#2c3e2d]' : 'text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')} 
              className={`px-8 py-2.5 rounded-full border text-xs uppercase tracking-widest transition-all ${
                scrolled 
                ? 'bg-[#2c3e2d] text-white border-[#2c3e2d] hover:bg-transparent hover:text-[#2c3e2d]' 
                : 'bg-white/10 text-white border-white hover:bg-white hover:text-[#2c3e2d]'
              }`}
            >
              Get in Touch
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className={scrolled ? 'text-[#2c3e2d]' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#2c3e2d] text-white flex flex-col items-center justify-center gap-8 p-6"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {['Experience', 'Offerings', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-4xl font-serif italic">{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={page.heroImage} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Hero" 
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-4 text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="uppercase tracking-[0.5em] mb-6 text-sm font-light"
          >
            {page.heroTagline}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-7xl md:text-[10rem] font-serif leading-none mb-8"
          >
            {page.heroTitle}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="animate-bounce opacity-50" />
          </motion.div>
        </div>
      </header>

      {/* Experience Section */}
      <section id="experience" className="py-32 md:py-56 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1]">{page.experienceTitle}</h2>
            <div className="w-20 h-px bg-[#2c3e2d] opacity-20" />
            <p className="text-xl opacity-80 leading-relaxed font-light whitespace-pre-wrap max-w-xl">
              {page.experienceText}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 mt-12 md:mt-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1542714598-3419241f99de?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover transition-all duration-1000"
              alt="Experience"
            />
          </motion.div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section id="offerings" className="bg-[#2c3e2d] py-32 md:py-48 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6 italic">Nature is the Host</h2>
            <p className="text-white/50 tracking-widest uppercase text-xs">Curated experiences for every group</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {page.offerings?.map((offering: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative h-[30rem] bg-[#2c3e2d] p-10 flex flex-col justify-end group overflow-hidden"
              >
                  <img 
                    src={offering.image} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000" 
                    alt={offering.title} 
                  />
                  <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="text-3xl font-serif mb-4 italic">{offering.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {offering.description}
                    </p>
                    <div className="w-8 h-px bg-white/40 group-hover:w-full transition-all duration-700" />
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 md:py-48 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-5xl font-serif italic block mb-8 opacity-20 text-[#2c3e2d]">"</span>
          <h2 className="text-3xl md:text-5xl font-serif italic leading-snug">
            The forest does not rush, yet everything is accomplished. Here, you find the space to simply be.
          </h2>
          <span className="text-5xl font-serif italic block mt-4 opacity-20 text-[#2c3e2d]">"</span>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-56 text-center px-6 bg-[#2c3e2d] text-white">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-12"
         >
            <h2 className="text-6xl md:text-8xl font-serif leading-tight">Start the conversation.</h2>
            <p className="text-white/60 text-lg font-light tracking-wide">
              We operate with a personal touch. Tell us about your vision for a camp, a retreat, or a quiet escape.
            </p>
            <div className="pt-8">
              <a 
                href="mailto:hello@grannenlodge.com" 
                className="inline-block px-16 py-6 border border-white rounded-full text-sm tracking-[0.3em] uppercase hover:bg-white hover:text-[#2c3e2d] transition-all duration-500"
              >
                Reach Out
              </a>
            </div>
         </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-black/5 opacity-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] tracking-[0.2em] uppercase">
          <div>© 2026 Grannen Lodge Retreats</div>
          <div className="flex gap-8 italic font-serif text-sm normal-case opacity-60">
            <span>Nature</span>
            <span>Connection</span>
            <span>Simplicity</span>
          </div>
          <div className="flex gap-6 opacity-60">
            <Instagram size={16} />
            <Mail size={16} />
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        
        body {
          overflow-x: hidden;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #faf9f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #2c3e2d;
        }
      `}} />
    </div>
  );
}