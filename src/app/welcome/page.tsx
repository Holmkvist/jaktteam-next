// src/app/welcome/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { auth0 } from '@/lib/auth0';

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

  return (
    <main className="bg-background relative min-h-screen w-full">
      {/* Bakgrundsbild (från public/images/2.jpg) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/2.jpg"
          alt="Skog i gryning"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </div>

      {/* Overlay för läsbarhet */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-4">
        <div className="w-full rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur md:p-10">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold md:text-5xl">
              Välkommen{user?.name ? `, ${user.name}` : ''}! 👋
            </h1>
            <p className="mt-3 text-base text-gray-700 md:text-lg">
              Du är inloggad och redo. Välj hur du vill komma igång:
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Skapa jaktlag */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Skapa ett jaktlag</h2>
              <p className="mt-2 text-gray-600">
                Starta ett nytt jaktlag och bjud in dina lagkamrater. Du blir
                automatiskt admin för laget.
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li>Döp laget och lägg till beskrivning</li>
                <li>Välj roller (Admin, Moderator, Användare)</li>
                <li>Bjud in med e-post (engångslänk med giltighetstid)</li>
              </ul>
              <form action="/api/teams/new" method="GET" className="mt-5">
                {/* GET leder till en sida/flow för att skapa lag (se punkt 2) */}
                <button className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white shadow hover:bg-green-800">
                  Skapa jaktlag
                </button>
              </form>
            </div>

            {/* Gå med via inbjudan */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Gå med via inbjudan</h2>
              <p className="mt-2 text-gray-600">
                Har du fått en inbjudan via e-post? Klicka på länken i mailet.
                Saknar du inbjudan? Be lagets admin att skicka en.
              </p>
              <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-semibold">Tips</p>
                <p className="mt-1">
                  Om du redan har en inbjudningslänk kan du klistra in den här:
                </p>
                <form
                  action="/invite/accept"
                  method="GET"
                  className="mt-3 flex items-center gap-2"
                >
                  <input
                    type="text"
                    name="token"
                    placeholder="Klistra in token/länk"
                    className="w-full rounded-lg border px-3 py-2"
                  />
                  <button className="rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-black">
                    Fortsätt
                  </button>
                </form>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Obs: Om du registrerar dig med en annan e-post än den som
                inbjudan skickades till så går det bra – vi kopplar ihop
                inbjudan med ditt konto när du accepterar länken.
              </p>
            </div>
          </div>

          {/* Liten checklista */}
          <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Så kommer du igång</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-700">
              <li>Verifiera din e-post (klart om du är här).</li>
              <li>
                Skapa ett nytt jaktlag{' '}
                <span className="text-gray-500">eller</span> gå med i ett
                befintligt via inbjudan.
              </li>
              <li>Välj roller och bjud in fler medlemmar.</li>
              <li>Ställ in ditt aktiva jaktlag – klart! 🎯</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
