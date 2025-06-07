import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { allMdxComponents } from "@/components/mdx-components";
import remarkGfm from 'remark-gfm'

interface Params {
  params: { slug: string };
}

export default async function BlogPostPage(props: Params) {
  const params = await props.params;
  const filePath = path.join(process.cwd(), "src/content/posts", `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<{ title: string; date: string }>({
    source,
    components: allMdxComponents,
      options: {
          parseFrontmatter: true,
          mdxOptions: {
      remarkPlugins: [remarkGfm], // ✅ 추가!
    },},
  });

  return (
    <article className="prose dark:prose-invert p-6 max-w-2xl mx-auto">
      <h1>{frontmatter.title}</h1>
      <p className="text-gray-500 text-sm">{frontmatter.date}</p>
      {content}
    </article>
  );
}
