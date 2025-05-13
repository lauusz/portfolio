export interface Skill {
  name: string;
  icon: string; // Lucide icon name
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
  category: string;
}

export interface NavLink {
  name: string;
  path: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Lucide icon name
}