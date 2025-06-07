import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 블로그 글 목록</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
            {post.summary && <p className="text-sm mt-1">{post.summary}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
