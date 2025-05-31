import type { NextConfig } from "next";
import mdx from "@next/mdx"; // ✅ default import로 변경

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const baseConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"], // MDX 파일 인식
  transpilePackages: ["next-mdx-remote"],
};

export default withMDX(baseConfig);
