import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import Projects from '../Projects';
import Contact from '../Contact';
import Hero from '../Hero';

describe('portfolio UI regressions', () => {
  test('footer does not include placeholder links', () => {
    render(<Footer />);

    const placeholderLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '#');

    expect(placeholderLinks).toHaveLength(0);
  });

  test('projects expose persistent action links for external destinations', () => {
    render(<Projects />);

    expect(screen.getByText('View Code')).toBeInTheDocument();
  });

  test('contact form fields are label-associated and explain the email draft behavior', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByText(/opens your email app/i)).toBeInTheDocument();
  });

  test('hero and contact position the portfolio for full-stack and ai collaboration', () => {
    render(
      <>
        <Hero />
        <Contact />
      </>
    );

    expect(screen.getByText(/full-stack developer \/ ai engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/production-ready web apps/i)).toBeInTheDocument();
    expect(screen.getAllByText(/collaboration/i).length).toBeGreaterThan(0);
  });
});
