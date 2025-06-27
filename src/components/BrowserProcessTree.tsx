"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BrowserProcessTree() {
  const [tabs, setTabs] = useState([1, 2])
  return (
    <Card>
      <CardHeader>
        <CardTitle>브라우저 프로세스 구조</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">브라우저 프로세스</div>
        <div className="ml-4">
          {tabs.map(tab => (
            <div key={tab} className="mb-1">
              └─ 탭 {tab} (렌더링 프로세스)
              <div className="ml-4 text-xs text-muted-foreground">
                ├─ 메인 스레드<br />
                └─ 워커 스레드
              </div>
            </div>
          ))}
        </div>
        <button className="mt-2 text-xs underline" onClick={() => setTabs(tabs => [...tabs, tabs.length + 1])}>탭 추가</button>
      </CardContent>
    </Card>
  )
} 