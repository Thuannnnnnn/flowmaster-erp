
'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = 'text-white';

  return (
    <div className={`fixed top-5 right-5 p-4 rounded-md shadow-lg ${bgColor} ${textColor} flex items-center z-50`}>
      <p className="mr-4">{message}</p>
      <button onClick={onClose} className="text-white">
        <X size={20} />
      </button>
    </div>
  );
}
