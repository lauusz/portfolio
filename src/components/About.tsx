import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Briefcase, Code } from 'lucide-react';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { useCountUpRef } from '../hooks/useCountUp';
import GlassCard from '../components/GlassCard';

const paragraphs = [
  "I'm a tech-driven full-stack developer with a strong focus on Data Science, AI, and Web3. With over 3 years of hands-on experience, I've built responsive web apps that solve real-world problems — from SaaS products to smart contract integrations.",
  "I specialize in building modern, scalable applications using technologies like React, Next.js, Node.js, TypeScript, and Supabase. I'm also diving deep into Machine Learning and LLMs, currently experimenting with AI agents and automation tools to push the limits of what software can do. Clean architecture, maintainable code, and staying ahead of tech trends are my top priorities.",
];

const stats = [
  { icon: Calendar, end: 3, label: 'Years Experience', suffix: '+' },
  { icon: Briefcase, end: 10, label: 'Projects Completed', suffix: '+' },
  { icon: Code, end: 15, label: 'Technologies', suffix: '+' },
];

const lineMaskContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const lineMaskItem = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const statsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const statsItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

interface StatCardProps {
  stat: typeof stats[0];
  prefersReducedMotion: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, prefersReducedMotion }) => {
  const { count, ref } = useCountUpRef(stat.end, 2000);
  const displayValue = prefersReducedMotion ? stat.end : count;

  return (
    <motion.div variants={statsItem}>
      <div ref={ref}>
        <GlassCard className="p-4 sm:p-6 text-center">
          <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
            {displayValue}{stat.suffix}
          </div>
          <div className="text-xs sm:text-sm text-primary mt-1">{stat.label}</div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useTiltEffect(imageRef, 10);

  return (
    <section id="about" ref={sectionRef} className="bg-background relative overflow-hidden section-padding">
      {/* Background gradient orb */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-muted uppercase tracking-wider text-sm font-medium">ABOUT ME</p>
          <h2 className="text-text text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block mb-8 sm:mb-12">
            About Me
            <span className="absolute -bottom-2 left-0 w-2/3 h-1 bg-accent rounded-full" />
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bio */}
          <div>
            <motion.div
              variants={lineMaskContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-4"
            >
              {paragraphs.map((text, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    variants={lineMaskItem}
                    className="text-primary text-base sm:text-lg leading-relaxed"
                  >
                    {text}
                  </motion.p>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="/Resume_Nikolaus_Satria.pdf" download className="btn btn-outline">
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: imageY }}
            className="flex justify-center md:justify-end"
          >
            <div
              ref={imageRef}
              className="relative group"
            >
              {/* Animated gradient border */}
              <div
                className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-accent via-cta to-accent animate-spin opacity-75 group-hover:opacity-100 transition-opacity"
                style={{ animationDuration: '3s' }}
              />
              {/* Image container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,107,53,0.1)] group-hover:shadow-[0_0_40px_rgba(255,107,53,0.2)] transition-shadow duration-300">
                <img
                  src="/profile.jpeg"
                  alt="Nikolaus Satria"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12"
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
