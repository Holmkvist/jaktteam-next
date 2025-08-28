import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import SidebarLayout from '@/app/components/layouts/SidebarLayout';
import { auth0 } from '@/lib/auth0';
import prisma from '@/lib/prisma';
import CommandPaletteTheme from '@/app/components/CommandPaletteTheme';
import Providers from '@/app/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | JaktTeam',
    default: 'JaktTeam',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth0.getSession();

  // if (!session || !session.user || !session.user.sub) redirect('/auth/login');

  if (session?.user.sub) {
    const user = await prisma.user.findUnique({
      where: {
        auth0UserId: session.user.sub,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          name: session.user.name,
          auth0UserId: session.user.sub,
          email: session.user.email || '',
          createdAt: new Date(),
          firstLoginAt: new Date(),
        },
      });
    }
  }

  return (
    <html
      lang="en"
      className={'h-full bg-gray-100 dark:bg-gray-900'}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <Providers>
          {session ? (
            <SidebarLayout session={session}>
              <>
                <CommandPaletteTheme />
                {children}
              </>
            </SidebarLayout>
          ) : (
            children
          )}
        </Providers>
      </body>
    </html>
  );
}
