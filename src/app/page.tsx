import { auth0 } from '@/lib/auth0';
import HeroView from '@/features/hero/HeroView';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  return <HeroView />;
}
