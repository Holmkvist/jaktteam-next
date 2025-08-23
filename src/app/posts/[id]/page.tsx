import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="mb-8 text-4xl font-bold text-gray-950">{post.title}</h1>
        <p className="text-center text-gray-600">by {post.author.name}</p>
        <div className="prose prose-gray mt-8 text-gray-950">
          {post.content || 'No content available.'}
        </div>
      </article>
    </div>
  )
}
