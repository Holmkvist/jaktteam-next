import Image from 'next/image';
import { $Enums, User } from '@/app/generated/prisma';
import { Button } from '@/components/Button';
import TeamRole = $Enums.TeamRole;

type Props = {
  user:
    | ({
        memberships: {
          id: string;
          createdAt: Date;
          role: TeamRole;
          userId: string;
          teamId: string;
        }[];
      } & User)
    | null;
};

export default function WelcomeBento({ user }: Props) {
  return (
    <div className="bg-background relative min-h-[calc(100vh-4rem)] w-full py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/3.jpg"
          alt="Skog i gryning"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </div>

      {/* Overlay för läsbarhet */}
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
          Välkommen{user?.name ? `, ${user.name}` : ''}!
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
          Du är inloggad och redo. Välj hur du vill komma igång:
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Skapa jaktlag
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                  Starta ett nytt jaktlag och bjud in dina lagkamrater. Du blir
                  automatiskt admin för laget.
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                  <li>Döp laget och lägg till beskrivning</li>
                  <li>Välj roller (Admin, Moderator, Användare)</li>
                  <li>Bjud in med e-post (engångslänk med giltighetstid)</li>
                </ul>
                <form action="/teams/new" method="GET" className="mt-5">
                  <Button variant={'primary'} size={'md'} className={'w-full'}>
                    Skapa jaktlag
                  </Button>
                </form>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/15" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Performance
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  maiores impedit.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  className="w-full max-lg:max-w-xs dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                  className="w-full not-dark:hidden max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl dark:outline-white/15" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Security
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover not-dark:hidden"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl dark:bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Har du fått en inbjudan via e-post?
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                  Har du fått en inbjudan via e-post? Klicka på länken i mailet.
                  Saknar du inbjudan? Be lagets admin att skicka en.
                </p>
                <div className="mt-4 rounded-xl bg-gray-700 p-4 text-sm text-gray-200">
                  <p className="font-semibold">Tips!</p>
                  <p className="mt-1">
                    Om du redan har en inbjudningslänk kan du klistra in den
                    här:
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
                      className="w-full rounded-lg border px-3 py-2 text-gray-200 placeholder:text-gray-400"
                    />
                    <Button size={'lg'}>Fortsätt</Button>
                  </form>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Obs: Om du registrerar dig med en annan e-post än den som
                  inbjudan skickades till så går det bra – vi kopplar ihop
                  inbjudan med ditt konto när du accepterar länken.
                </p>
              </div>
              {/*<div className="relative min-h-120 w-full grow">*/}
              {/*  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10 dark:bg-gray-900/60 dark:shadow-none">*/}
              {/*    <div className="flex bg-gray-900 outline outline-white/5">*/}
              {/*      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">*/}
              {/*        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">*/}
              {/*          NotificationSetting.jsx*/}
              {/*        </div>*/}
              {/*        <div className="border-r border-gray-600/10 px-4 py-2">*/}
              {/*          App.jsx*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div className="px-6 pt-6 pb-14">*/}
              {/*      /!* Your code example *!/*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:outline-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
