import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { auth0 } from '@/lib/auth0';
import WelcomeBento from '@/features/welcome/WelcomeBento';

export default async function WelcomePage() {
  const session = await auth0.getSession();

  if (!session) redirect('/auth/login');

  // Hämta användaren i din DB
  const user = await prisma.user.findUnique({
    where: { auth0UserId: session.user.sub },
    include: {
      memberships: true,
    },
  });

  // Om användaren redan gjort onboarding (t.ex. har activeTeamId eller memberships)
  if (user?.activeTeamId || (user?.memberships?.length ?? 0) > 0) {
    redirect('/dashboard');
  }

  return <WelcomeBento user={user} />;
  // return <Welcome user={user} />;
}
