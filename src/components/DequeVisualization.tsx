"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DequeVisualization() {
  const [deque, setDeque] = useState<number[]>([])
  const [input, setInput] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deque 시각화</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-2">
          <Input value={input} onChange={e => setInput(e.target.value)} className="max-w-24" />
          <Button onClick={() => { if (input) setDeque([Number(input), ...deque]); }}>앞에 추가</Button>
          <Button onClick={() => { if (input) setDeque([...deque, Number(input)]); }}>뒤에 추가</Button>
          <Button onClick={() => setDeque(deque.slice(1))} variant="outline">앞에서 제거</Button>
          <Button onClick={() => setDeque(deque.slice(0, -1))} variant="outline">뒤에서 제거</Button>
        </div>
        <div className="flex gap-2">
          {deque.map((v, i) => (
            <div key={i} className="w-10 h-10 bg-primary text-primary-foreground rounded flex items-center justify-center font-mono">{v}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 