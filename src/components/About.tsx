import { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, Code, Download } from 'lucide-react';

const About = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const yearsExp = new Date().getFullYear() - 2020;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
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
          animate(yearsExp, setCount1);
          animate(10, setCount2);
          animate(15, setCount3);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, yearsExp]);

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-16">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-3">
            About Me
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Building useful
            <br />
            <span className="text-muted">software systems</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Bio */}
          <div className="space-y-8">
            <div className="card">
              <div className="p-6 sm:p-8 space-y-5">
                <p className="font-sans text-base text-muted leading-relaxed">
                  I&apos;m a full-stack developer who enjoys building software end to end: product interfaces, backend logic, database flows, and the AI layer when the problem calls for it. With over {yearsExp} years of hands-on experience, I care most about making systems feel clear, fast, and useful.
                </p>
                <p className="font-sans text-base text-muted leading-relaxed">
                  My strongest lane is modern web product development with React, Next.js, Node.js, TypeScript, Python, and SQL-backed systems. On the AI side, I&apos;m actively building recommendation flows, automation experiments, and early-stage agent ideas that connect models to real product experiences.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <a href="#contact" className="btn-accent text-sm">
                    Discuss a Role
                  </a>
                  <a href="/Resume_Nikolaus_Satria.pdf" download className="btn-outline text-sm flex items-center gap-2">
                    <Download size={14} /> Download CV
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center p-5">
                <Calendar className="w-5 h-5 text-accent mx-auto mb-3" />
                <div className="font-sans text-3xl font-bold text-primary">{count1}+</div>
                <div className="font-sans text-xs text-muted mt-1">Years Building</div>
              </div>
              <div className="card text-center p-5">
                <Briefcase className="w-5 h-5 text-accent-secondary mx-auto mb-3" />
                <div className="font-sans text-3xl font-bold text-primary">{count2}+</div>
                <div className="font-sans text-xs text-muted mt-1">Projects Built</div>
              </div>
              <div className="card text-center p-5">
                <Code className="w-5 h-5 text-accent mx-auto mb-3" />
                <div className="font-sans text-3xl font-bold text-primary">{count3}+</div>
                <div className="font-sans text-xs text-muted mt-1">Core Tools</div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 bg-accent/10 rounded-3xl" />
              <div className="relative card p-1">
                <img
                  src="/profile.jpeg"
                  alt="Nikolaus Satria"
                  className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
