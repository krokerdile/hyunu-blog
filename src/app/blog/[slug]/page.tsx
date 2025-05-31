import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

interface Params {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Params) {
  const filePath = path.join(process.cwd(), "content/posts", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="prose dark:prose-invert p-6 max-w-2xl mx-auto">
      <h1>{frontmatter.title}</h1>
      <p className="text-gray-500 text-sm">{frontmatter.date}</p>
      {content}
    </article>
  );
}
