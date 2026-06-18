import { useState, useRef, useEffect } from 'react';
import { Send, X, Terminal, Minimize2 } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface ChatMessage {
  role: 'user' | 'system';
  text: string;
}

const COMMANDS: Record<string, string> = {
  help: 'Available commands:\n  about      - Show bio\n  skills     - List tech skills\n  projects   - List projects\n  contact    - Contact info\n  whoami     - About the developer\n  clear      - Clear chat\n  joke       - Random dev joke\n  sudo       - nice try, no admin access\n  exit       - Close chat',
  about: 'Nikolaus Satria is a Full-Stack Developer & AI Engineer based in Surabaya, Indonesia. 3+ years of experience building web apps, exploring AI/LLMs, and Web3.',
  skills: 'Core Skills:\n  JavaScript, TypeScript, React, Node.js\n  Next.js, Python, Docker, CSS/SCSS\n  Also: TensorFlow, PostgreSQL, MongoDB, AWS, Solidity',
  projects: 'Featured Projects:\n  1. Sneakers Store Landing Page (Frontend)\n  2. Factory Management System (Full Stack)\n  3. Food Recommender System (ML)\n  4. Eat & List (Full Stack)\n\nType a number (1-4) for details.',
  contact: 'Contact Info:\n  Email: nikolaussatria@gmail.com\n  Phone: +62 819-3435-2011\n  Location: Surabaya, Indonesia\n  GitHub: github.com/lauusz',
  whoami: 'nikolaus@satria:~$ Full-Stack Developer | AI Engineer | Problem Solver',
  joke: [
    'Why do programmers prefer dark mode? Because light attracts bugs.',
    'I would tell you a UDP joke, but you might not get it.',
    'There are 10 types of people: those who understand binary and those who don\'t.',
    'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
    'Why did the developer go broke? Because he used up all his cache.',
    'Git commit -m "fix bug" ... git push --force-with-lease ... everything is fine.',
  ][Math.floor(Math.random() * 6)],
  sudo: 'Permission denied. You are not in the sudoers file. This incident will be reported.',
  exit: 'Goodbye! Closing terminal...',
  '1': 'Sneakers Store Landing Page\nHigh-converting landing page for a sneaker brand with modern UI, interactive animations, and responsive design.\nTech: Framer, Figma',
  '2': 'Factory Management System\nTracks goods flow, delivery notes, and data storage in one real-time factory system.\nTech: Next.js, MySQL, React, Tailwind CSS',
  '3': 'Food Recommender System\nRecommends Indonesian recipes based on ingredients you already have — powered by ML and Flask.\nTech: Python, TensorFlow, Flask, React',
  '4': 'Eat & List\nA web-based mobile app for real-time food ordering and restaurant menu management.\nTech: React, Next.js, Supabase, PostgreSQL',
};

const TerminalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', text: 'Welcome to nikolaus@satria terminal v1.0\nType "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playClick, playBeep } = useSound();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
    playClick();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    playClick();

    const userText = input.trim().toLowerCase();
    setMessages((prev) => [...prev, { role: 'user', text: input.trim() }]);
    setInput('');

    setTimeout(() => {
      let response = COMMANDS[userText];
      if (!response) {
        response = `Command not found: "${userText}"\nType "help" for available commands.`;
      }
      if (userText === 'exit') {
        playBeep();
        setMessages((prev) => [...prev, { role: 'system', text: response }]);
        setTimeout(() => handleClose(), 1000);
        return;
      }
      if (userText === 'clear') {
        setMessages([]);
        return;
      }
      if (userText === 'joke') {
        playBeep();
      }
      setMessages((prev) => [...prev, { role: 'system', text: response }]);
    }, 300 + Math.random() * 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 border border-primary bg-void flex items-center justify-center text-primary hover:bg-primary hover:text-void transition-all duration-300"
          style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
          title="Terminal Chat"
        >
          <Terminal size={20} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 left-6 z-50 terminal-window flex flex-col transition-all duration-300 ${
            isClosing ? 'opacity-0 translate-y-5 scale-95' : 'opacity-100 translate-y-0 scale-100'
          } ${isMinimized ? 'w-64 h-12' : 'w-80 sm:w-96 h-96'}`}
          style={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)' }}
        >
          {/* Header */}
          <div className="terminal-window-header flex-shrink-0">
            <div className="terminal-window-dot red" />
            <div className="terminal-window-dot yellow" />
            <div className="terminal-window-dot green" />
            <span className="font-mono text-xs text-muted ml-2">chatbot.sh</span>
            <div className="flex-1" />
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-muted hover:text-primary transition-colors mr-2"
            >
              <Minimize2 size={12} />
            </button>
            <button
              onClick={() => { handleClose(); playClick(); }}
              className="text-muted hover:text-secondary transition-colors"
            >
              <X size={12} />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-2"
              >
                {messages.map((msg, i) => (
                  <div key={i}>
                    {msg.role === 'user' ? (
                      <div className="font-mono text-xs text-primary">
                        <span className="text-secondary">$</span> {msg.text}
                      </div>
                    ) : (
                      <div className="font-mono text-xs text-muted whitespace-pre-line">
                        <span className="text-primary">{'>'}</span> {msg.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex items-center gap-2">
                <span className="text-primary text-xs font-mono">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-mono text-xs text-text placeholder:text-muted focus:outline-none"
                  placeholder="type command..."
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  className="text-muted hover:text-primary transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TerminalChatbot;
