import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { haffer } from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Kanbex - Visual Task Organizer',
    template: '%s | Kanbex',
  },
  description: 'A sleek Kanban-based task and project coordination workspace',
  keywords: [
    'workflow administration',
    'visual task board',
    'action items',
    'efficiency',
  ],
  authors: [{ name: 'Kanbex' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${haffer.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
