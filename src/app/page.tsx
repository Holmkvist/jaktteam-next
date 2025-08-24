import { auth0 } from '@/lib/auth0';
import HeroSection from '@/app/components/HeroSection';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  return <HeroSection />;
}
