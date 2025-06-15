import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { allMdxComponents } from "@/components/mdx-components";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "src/content/posts",
    `${slug}.mdx`,
  );
  const source = fs.readFileSync(filePath, "utf-8");

  const { frontmatter } = await compileMDX<{
    title: string;
    description?: string;
    summary?: string;
    date: string;
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description ?? frontmatter.summary,
  };
}

type PageProps = {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/content/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<{ title: string; date: string }>({
    source,
    components: allMdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <article className="prose dark:prose-invert p-6 max-w-2xl mx-auto">
      <h1>{frontmatter.title}</h1>
      <p className="text-gray-500 text-sm">{frontmatter.date}</p>
      {content}
    </article>
  );
}
