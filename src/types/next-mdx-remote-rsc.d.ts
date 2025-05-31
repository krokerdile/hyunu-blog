// src/types/next-mdx-remote-rsc.d.ts
declare module "next-mdx-remote/rsc" {
  export function compileMDX<T = any>(options: {
    source: string;
    components?: Record<string, React.ComponentType<any>>;
    options?: {
      parseFrontmatter?: boolean;
    };
  }): Promise<{
    content: JSX.Element;
    frontmatter: T;
  }>;
}
