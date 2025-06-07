import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "src/content/posts");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
}

export function getAllPosts(): BlogPostMeta[] {
  return fs
    .readdirSync(POSTS_PATH)
    .map((filename) => {
      const filePath = path.join(POSTS_PATH, filename);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        summary: data.summary,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
