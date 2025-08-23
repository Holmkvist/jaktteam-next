import prisma from '@/lib/prisma'
import { auth0 } from '@/lib/auth0'

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession()

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">
          <button>Sign up</button>
        </a>
        <a href="/auth/login">
          <button>Log in</button>
        </a>
      </main>
    )
  }

  const users = await prisma.user.findMany()

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
      <h1 className="mb-8 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-[#333333]">
        Superblog
      </h1>
      <ol className="list-inside list-decimal font-[family-name:var(--font-geist-sans)] text-gray-950">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
    </main>
  )
}
