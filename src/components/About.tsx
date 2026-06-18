import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Briefcase, Code } from 'lucide-react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const startCount = () => {
    const animate = (target: number, setter: (n: number) => void, duration: number = 2000) => {
      let start: number | null = null;
      const tick = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setter(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate(3, setCount1);
    animate(10, setCount2);
    animate(15, setCount3);
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
  };

  return (
    <section id="about" className="section-padding relative" ref={containerRef}>
      <div className="section-container">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> cat about.txt
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            ABOUT <span className="text-primary">ME</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio as terminal output */}
          <div className="space-y-6">
            <div className="terminal-window">
              <div className="terminal-window-header">
                <div className="terminal-window-dot red" />
                <div className="terminal-window-dot yellow" />
                <div className="terminal-window-dot green" />
                <span className="font-mono text-xs text-muted ml-2">about.txt</span>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                <motion.p custom={0} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-mono text-sm text-muted leading-relaxed">
                  <span className="text-secondary">{'>'}</span> I'm a tech-driven full-stack developer with a strong focus on Data Science, AI, and Web3. With over 3 years of hands-on experience, I've built responsive web apps that solve real-world problems — from SaaS products to smart contract integrations.
                </motion.p>
                <motion.p custom={1} variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-mono text-sm text-muted leading-relaxed">
                  <span className="text-secondary">{'>'}</span> I specialize in building modern, scalable applications using technologies like React, Next.js, Node.js, TypeScript, and Supabase. I'm also diving deep into Machine Learning and LLMs, currently experimenting with AI agents and automation tools to push the limits of what software can do.
                </motion.p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a href="#contact" className="btn-terminal-primary text-sm">
                    <span className="text-primary/50">{'>'}</span> get_in_touch
                  </a>
                  <a href="/Resume_Nikolaus_Satria.pdf" download className="btn-terminal text-sm">
                    <span className="text-muted">$</span> download_cv
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onViewportEnter={startCount}
              className="grid grid-cols-3 gap-3"
            >
              <div className="terminal-window p-4 text-center">
                <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-sans text-2xl md:text-3xl font-bold text-text">{count1}+</div>
                <div className="font-mono text-xs text-muted mt-1">Years Exp</div>
              </div>
              <div className="terminal-window p-4 text-center">
                <Briefcase className="w-5 h-5 text-secondary mx-auto mb-2" />
                <div className="font-sans text-2xl md:text-3xl font-bold text-text">{count2}+</div>
                <div className="font-mono text-xs text-muted mt-1">Projects</div>
              </div>
              <div className="terminal-window p-4 text-center">
                <Code className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="font-sans text-2xl md:text-3xl font-bold text-text">{count3}+</div>
                <div className="font-mono text-xs text-muted mt-1">Tech Stack</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div style={{ y }} className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative terminal-window p-1">
                <img
                  src="/profile.jpeg"
                  alt="Nikolaus Satria"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
