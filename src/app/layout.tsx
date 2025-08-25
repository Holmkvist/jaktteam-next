import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import SidebarLayout from '@/app/components/layouts/SidebarLayout';
import { auth0 } from '@/lib/auth0';
import prisma from '@/lib/prisma';

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

  if (
    session &&
    session.user &&
    session.user.sub &&
    session.user.name &&
    session.user.email
  ) {
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
          email: session.user.email,
          createdAt: new Date(),
          firstLoginAt: new Date(),
        },
      });
    } else {
      console.log('user exist!');
    }
  }

  return (
    <html lang="en" className={'h-full bg-gray-100 dark:bg-gray-900'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        {session ? (
          <SidebarLayout session={session}>{children}</SidebarLayout>
        ) : (
          children
        )}
        {/*<StackedLayout>{children}</StackedLayout>*/}
      </body>
    </html>
  );
}
