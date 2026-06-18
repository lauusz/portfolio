import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Code } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedSection from '../components/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const stats = [
  { icon: Calendar, value: '3+', label: 'Years Experience' },
  { icon: Briefcase, value: '10+', label: 'Projects Completed' },
  { icon: Code, value: '15+', label: 'Technologies' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="bg-background relative overflow-hidden section-padding">
      <div className="absolute top-40 right-20 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <p className="section-subtitle">ABOUT ME</p>
          <h2 className="section-title">About Me</h2>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Column: Text */}
          <motion.div className="space-y-6" variants={textVariants}>
            <div className="space-y-4">
              <p className="text-primary text-base sm:text-lg leading-relaxed">
                I'm a tech-driven full-stack developer with a strong focus on Data Science, AI, and Web3.
                With over 3 years of hands-on experience, I've built responsive web apps that solve real-world problems —
                from SaaS products to smart contract integrations.
              </p>

              <p className="text-primary text-base sm:text-lg leading-relaxed">
                I specialize in building modern, scalable applications using technologies like React, Next.js, Node.js, TypeScript, and Supabase.
                I'm also diving deep into Machine Learning and LLMs, currently experimenting with AI agents and automation tools to push the limits of what software can do.
                Clean architecture, maintainable code, and staying ahead of tech trends are my top priorities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="/Resume_Nikolaus_Satria.pdf" download className="btn btn-outline">
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div className="flex justify-center md:justify-end" variants={imageVariants}>
            <div className="relative">
              {/* Decorative rotated frame */}
              <div className="absolute -inset-3 border-2 border-accent/20 rounded-2xl rotate-3 pointer-events-none" />
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80
                  border-2 border-accent/30 rounded-2xl overflow-hidden
                  shadow-[0_0_30px_rgba(255,107,53,0.15)]
                  hover:border-accent/60 hover:shadow-[0_0_40px_rgba(255,107,53,0.25)]
                  transition-all duration-500"
              >
                <img
                  src="/profile.jpeg"
                  alt="Nikolaus Satria"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={statVariants}>
              <GlassCard className="p-4 sm:p-6 text-center">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary mt-1">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
