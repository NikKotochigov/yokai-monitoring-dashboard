import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import './styles/globals.scss';

export const metadata: Metadata = {
  title: 'Yokai Monitoring Dashboard',
  description: 'Real-time spirit detection and capture system for Tokyo regions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
