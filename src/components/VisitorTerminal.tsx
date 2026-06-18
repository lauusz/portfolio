import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LOGS = [
  'GitHub activity detected',
  'New project loaded: Factory Management',
  'Visitor connected from Tokyo, JP',
  'Neural network training complete',
  'Docker container deployed successfully',
  'TypeScript compilation: 0 errors',
  'API endpoint /portfolio responding 200 OK',
  'WebSocket connection established',
  'Cache invalidated for projects section',
  'AI model updated to v2.1',
  'Build pipeline: PASSED',
  'New follower on GitHub',
  'Deploying to production...',
  'System health check: 100%',
  'React hydration complete',
];

interface VisitorLog {
  id: number;
  time: string;
  text: string;
  color: 'primary' | 'secondary' | 'accent' | 'muted';
}

const VisitorTerminal = () => {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [logId, setLogId] = useState(0);

  useEffect(() => {
    const addLog = () => {
      const text = LOGS[Math.floor(Math.random() * LOGS.length)];
      const colors: VisitorLog['color'][] = ['primary', 'secondary', 'accent', 'muted'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setLogId((prev) => prev + 1);
      setLogs((prev) => {
        const newLog = { id: logId, time, text, color };
        const updated = [...prev, newLog];
        return updated.slice(-5); // Keep last 5 logs
      });
    };

    // Initial logs
    addLog();
    addLog();

    const interval = setInterval(() => {
      if (Math.random() > 0.3) addLog();
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [logId]);

  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted',
  };

  return (
    <div className="mt-6 terminal-window p-4">
      <p className="font-mono text-xs text-muted mb-3">
        <span className="text-primary">$</span> tail -f /var/log/portfolio.log
      </p>
      <div className="space-y-1.5">
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-xs flex gap-2"
          >
            <span className="text-muted">[{log.time}]</span>
            <span className={colorMap[log.color]}>{log.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VisitorTerminal;
