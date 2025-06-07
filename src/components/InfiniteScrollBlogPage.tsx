'use client'
import { useEffect, useRef, useState } from 'react'

const generateMockPosts = (page: number) => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i + 1,
    title: `테스트용 포스트 ${page * 10 + i + 1}`,
  }))
}

export default function InfiniteScrollBlogPage() {
  const [posts, setPosts] = useState(() => generateMockPosts(0))
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!observerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setIsFetching(true)
        }
      },
      { threshold: 1 }
    )

    observer.observe(observerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isFetching])

  useEffect(() => {
    if (!isFetching) return
    const timeout = setTimeout(() => {
      setPosts((prev) => [...prev, ...generateMockPosts(page)])
      setPage((p) => p + 1)
      setIsFetching(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isFetching, page])

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">🌀 무한 스크롤 테스트</h1>
      <p className="mb-8 text-gray-600">
        이 페이지는 무한 스크롤 기능을 실험하고, IntersectionObserver를 활용한 데이터 로딩 흐름을 시각적으로 검토하기 위한 데모입니다.
      </p>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-md bg-white shadow-sm">
            <h3>{post.title}</h3>
            <p className="text-sm text-gray-500">이 영역은 실제로 렌더링된 DOM 요소입니다.</p>
          </div>
        ))}
        <div ref={observerRef} className="h-8" />
        {isFetching && <p className="text-center text-sm text-gray-400">불러오는 중...</p>}
      </div>
    </div>
  )
}
