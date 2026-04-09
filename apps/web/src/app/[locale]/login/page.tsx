'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Notification } from '@/components/ui/notification';
import { useTranslations } from 'next-intl';
import { authService } from '@/services/auth.service';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();
  const t = useTranslations('LoginPage');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    try {
      const { access_token, refresh_token } = await authService.login({ code, password });
      Cookies.set('access_token', access_token, { expires: 1, path: '/' });
      if (refresh_token) {
        Cookies.set('refresh_token', refresh_token, { expires: 7, path: '/' });
      }
      
      setNotification({ message: t('loginSuccess'), type: 'success' });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || t('loginFailed');
      setNotification({ message: errorMessage, type: 'error' });
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">{t('title')}</h1>
          <p className="text-slate-600 mt-2">{t('description')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('codeLabel')}</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('codePlaceholder')}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('passwordLabel')}</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-6" size="lg">
            {t('signInButton')}
          </Button>
        </form>
      </div>
    </main>
  );
}
