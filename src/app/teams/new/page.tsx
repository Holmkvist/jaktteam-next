// src/app/(protected)/teams/new/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import prisma from '@/lib/prisma';

export default async function NewTeamPage() {
  const session = await auth0.getSession();

  if (!session) redirect('/auth/login');

  async function createTeam(formData: FormData) {
    'use server';
    const name = (formData.get('name') as string)?.trim();
    if (!name) return;

    const user = await prisma.user.findUnique({
      where: { auth0UserId: session?.user.sub },
    });
    if (!user) throw new Error('User not found');

    const team = await prisma.$transaction(async (tx) => {
      const t = await tx.team.create({
        data: { name, createdById: user.id },
      });
      await tx.teamMember.create({
        data: { teamId: t.id, userId: user.id, role: 'OWNER' },
      });
      await tx.user.update({
        where: { id: user.id },
        data: {
          activeTeamId: t.id,
          firstLoginAt: user.firstLoginAt ?? new Date(),
        },
      });
      return t;
    });

    redirect(`/dashboard?team=${team.id}`);
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold">Skapa jaktlag</h1>
      <p className="mt-2 text-gray-600">
        Döp ditt jaktlag och lägg till fler inställningar senare.
      </p>

      <form action={createTeam} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Namn</label>
          <input
            name="name"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Ex. Älgpassarna Nordanstig"
          />
        </div>
        <button className="rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800">
          Skapa
        </button>
      </form>
    </main>
  );
}
