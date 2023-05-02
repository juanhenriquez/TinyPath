import { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { ClerkProvider } from '@clerk/nextjs/app-beta';

import './../styles/global.css';

export const metadata: Metadata = {
  title: 'TinyPath',
  description: 'TinyPath is a link shortener app with a modern UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className="bg-white dark:bg-zinc-950">
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
