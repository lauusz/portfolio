import { NavLink, Project, Skill, SocialLink } from '../types';

export const navLinks: NavLink[] = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

export const skills: Skill[] = [
  { name: 'JavaScript', icon: 'FaJsSquare' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'React', icon: 'FaReact' },
  { name: 'Node.js', icon: 'FaNodeJs' },
  { name: 'CSS/SCSS', icon: 'FaCss3Alt' },
  { name: 'Next.js', icon: 'SiNextdotjs' },
  { name: 'Python', icon: 'FaPython' },
  { name: 'Docker', icon: 'FaDocker' },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sneakers Store Landing Page',
    description: 'High-converting landing page for a sneaker brand, crafted with modern UI, interactive animations, and responsive design to showcase products in style.',
    technologies: ['Framer', 'Figma'],
    image: '/images/d1Vault.png',
    category: 'Frontend',
  },
  {
    id: 2,
    title: 'Factory Management System',
    description: 'Tracks goods flow, delivery notes, and data storage in one real-time factory system.',
    technologies: ['Next.Js', 'MySQL', 'React', 'Tailwind CSS'],
    image: '/images/hakedo.png',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'Food Recommender System',
    description: 'Recommends Indonesian recipes based on ingredients you already have — powered by ML and Flask.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    image: '/images/foodRecommender.png',
    codeUrl: 'https://github.com/lauusz/Indonesian-Food-Recipes-Recommendation?tab=readme-ov-file',
    category: 'Machine Learning',
  },
  {
    id: 4,
    title: 'Eat & List',
    description: 'A web-based mobile app for real-time food ordering and restaurant menu management.',
    technologies: ['React', 'Next.Js', 'Supabase', 'PostgreSQL'],
    image: '/images/eatAndList.png',
    category: 'Full Stack',
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/lauusz', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/nikolaussatria', icon: 'Linkedin' },
  { name: 'Instagram', url: 'https://instagram.com/nikolaussatria', icon: 'Instagram' },
  { name: 'Email', url: 'mailto:nikolaussatria@gmail.com', icon: 'Mail' },
];

export const categories = [...new Set(projects.map(project => project.category))];