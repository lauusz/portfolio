import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';

const scrollToMock = vi.fn();

vi.mock('lenis/react', () => ({
  useLenis: () => ({
    scrollTo: scrollToMock,
  }),
}));

describe('header navigation', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
    document.body.innerHTML = '';

    const home = document.createElement('section');
    home.id = 'home';
    Object.defineProperty(home, 'offsetTop', { configurable: true, value: 0 });

    const about = document.createElement('section');
    about.id = 'about';
    Object.defineProperty(about, 'offsetTop', { configurable: true, value: 600 });

    const skills = document.createElement('section');
    skills.id = 'skills';
    Object.defineProperty(skills, 'offsetTop', { configurable: true, value: 1200 });

    const projects = document.createElement('section');
    projects.id = 'projects';
    Object.defineProperty(projects, 'offsetTop', { configurable: true, value: 1800 });

    document.body.append(home, about, skills, projects);
  });

  test('clicking a nav link updates the active pill immediately and triggers smooth scrolling', () => {
    render(<Header />);

    const aboutLink = screen.getAllByRole('link', { name: 'About' })[0];

    fireEvent.click(aboutLink);

    expect(scrollToMock).toHaveBeenCalledWith('#about', expect.objectContaining({
      duration: expect.any(Number),
      lock: true,
    }));
    expect(aboutLink.className).toContain('bg-surface-elevated');
  });
});
