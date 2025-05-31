import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export function getAllPosts() {
  return fs.readdirSync(POSTS_PATH).map((filename) => {
    const filePath = path.join(POSTS_PATH, filename);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);

    return {
      slug: filename.replace(".mdx", ""),
      ...data,
    };
  });
}
