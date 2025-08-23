import prisma from '@/lib/prisma'

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  })

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-8 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-[#333333]">
        Posts
      </h1>
      <ul className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        {posts.map((post) => (
          <li key={post.id}>
            <span className="font-semibold text-gray-950">{post.title}</span>
            <span className="ml-2 text-sm text-gray-600">
              by {post.author.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
