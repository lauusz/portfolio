import { Mail, MapPin, CheckCircle } from 'lucide-react';

export function getContactIcon(key: string) {
  switch (key) {
    case 'email': return <Mail size={18} />;
    case 'location': return <MapPin size={18} />;
    case 'status': return <CheckCircle size={18} />;
    default: return null;
  }
}
