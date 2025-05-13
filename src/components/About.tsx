import React from 'react';
import { Coffee, Code, BookOpen, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <h2 className="section-title">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-primary text-lg leading-relaxed">
              I'm a tech-driven full-stack developer with a strong focus on Data Science, AI, and Web3.
              With over 3 years of hands-on experience, I've built responsive web apps that solve real-world problems —
              from SaaS products to smart contract integrations.
            </p>

            <p className="text-primary text-lg leading-relaxed">
              I specialize in building modern, scalable applications using technologies like React, Next.js, Node.js, TypeScript, and Supabase.
              I'm also diving deep into Machine Learning and LLMs, currently experimenting with AI agents and automation tools to push the limits of what software can do.
              Clean architecture, maintainable code, and staying ahead of tech trends are my top priorities.
            </p>


            <div className="flex gap-4 pt-4">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
              <a href="/Resume_Nikolaus_Satria.pdf" download className="btn btn-outline">
                Download CV
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-[400px] h-[400px] border-4 border-primary/20 rounded-full overflow-hidden">
              <img
                src="/profile.jpeg"
                alt="Nikolaus Satria"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;