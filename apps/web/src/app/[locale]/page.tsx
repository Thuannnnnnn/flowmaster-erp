import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher'; // Import component đổi ngữ
import { Button } from '@/components/ui/button'; // Import nút của Shadcn
import { Link } from '@/navigation';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-white pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          FlowMaster ERP &nbsp;
          <code className="font-mono font-bold">v1.0</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">

          <LanguageSwitcher />
        </div>
      </div>

      <div className="relative flex place-items-center flex-col gap-6 text-center mt-20">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-slate-900">
          {t('title')}
        </h1>
        <p className="max-w-[600px] text-lg text-slate-600">
          {t('description')}
        </p>
        
        <div className="flex gap-4 mt-4">
          <Button size="lg" className="bg-info hover:bg-info/90">
            {t('getStarted')}
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">{t('login')}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}