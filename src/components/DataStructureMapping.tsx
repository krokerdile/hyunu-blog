"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const DATA = [
  { ds: "Stack", usage: "Call Stack, 실행 컨텍스트", desc: "함수 호출/복귀 관리" },
  { ds: "Queue", usage: "Task Queue, Microtask Queue", desc: "비동기 작업 대기열" },
  { ds: "Heap", usage: "GC, 우선순위 큐, React scheduler", desc: "동적 메모리/우선순위 관리" },
  { ds: "Deque", usage: "브라우저 히스토리, LRU 캐시", desc: "양방향 삽입/삭제" },
  { ds: "Thread", usage: "메인 스레드, Web Worker", desc: "동시성/병렬성" },
  { ds: "Process", usage: "탭 분리, 렌더링/네트워크 프로세스", desc: "자원 격리/보호" },
]

export default function DataStructureMapping() {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <Card>
      <CardHeader>
        <CardTitle>자료구조 ↔ 브라우저/JS 활용 매핑표</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {DATA.map((row, i) => (
            <div
              key={row.ds}
              className={`flex items-center gap-4 p-2 rounded cursor-pointer transition hover:bg-muted ${selected === i ? "bg-blue-50 dark:bg-blue-900" : ""}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <Badge variant="outline" className="min-w-[80px] justify-center">{row.ds}</Badge>
              <span className="font-medium">{row.usage}</span>
              {selected === i && (
                <span className="ml-auto text-xs text-muted-foreground">{row.desc}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 