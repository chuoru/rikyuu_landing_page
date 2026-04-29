import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: '利休 Robotics - 本質から、未来をつくる。',
  description:
    '利休株式会社は、わびの精神を指針に、革新的なロボティクス技術で社会に新たな価値を創造します。Rikyu Robotics crafts the future from what matters most.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: '利休 Robotics',
    description: '本質から、未来をつくる。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${robotoMono.variable} font-mono bg-cream text-green-deep antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
