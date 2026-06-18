import { NavLink, Project, Skill, SocialLink } from '../types';

export const navLinks: NavLink[] = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
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
    description: 'Motion-led product landing page built to present a sneaker brand with a cleaner story, stronger hierarchy, and polished mobile responsiveness.',
    role: 'Frontend build and interaction design',
    outcome: 'Created a sharper product showcase experience with clear sections, modern transitions, and a retail-first visual flow.',
    highlights: ['Responsive landing page structure', 'Animation-driven product storytelling'],
    technologies: ['Framer', 'Figma'],
    image: '/images/d1Vault.png',
    category: 'Frontend',
  },
  {
    id: 2,
    title: 'Factory Management System',
    description: 'Operations-focused internal tool for tracking goods flow, delivery notes, and factory data inside one connected workflow.',
    role: 'Full-stack product development',
    outcome: 'Centralized admin tasks into a single dashboard flow so factory processes are easier to monitor and update.',
    highlights: ['Goods and delivery-note tracking', 'Data-focused internal workflow'],
    technologies: ['Next.Js', 'MySQL', 'React', 'Tailwind CSS'],
    image: '/images/hakedo.png',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'Food Recommender System',
    description: 'AI/ML web app that recommends Indonesian recipes based on available ingredients and wraps the model in a practical user-facing interface.',
    role: 'ML prototyping and app integration',
    outcome: 'Turned a recommendation model into an accessible web experience that connects ingredient input to useful recipe suggestions.',
    highlights: ['Ingredient-based recommendation flow', 'ML model served through a web app'],
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    image: '/images/foodRecommender.png',
    codeUrl: 'https://github.com/lauusz/Indonesian-Food-Recipes-Recommendation?tab=readme-ov-file',
    category: 'AI / ML',
  },
  {
    id: 4,
    title: 'Eat & List',
    description: 'Mobile-first restaurant app for real-time food ordering and menu management across the customer and admin sides.',
    role: 'Full-stack feature implementation',
    outcome: 'Combined ordering, menu editing, and restaurant operations into one streamlined product flow.',
    highlights: ['Ordering flow and menu management', 'Supabase-backed full-stack app'],
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

export const contactInfo = {
  email: 'nikolaussatria@gmail.com',
  location: 'Surabaya, Indonesia',
  status: 'Collaboration',
};

export const mailtoLink = 'mailto:nikolaussatria@gmail.com';

export const categories = [...new Set(projects.map(project => project.category))];
