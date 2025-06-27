"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type QueueItem = { type: "microtask" | "task"; label: string }

export default function EventLoopVisualization() {
  const [callStack, setCallStack] = useState<string[]>([])
  const [microtasks, setMicrotasks] = useState<QueueItem[]>([])
  const [tasks, setTasks] = useState<QueueItem[]>([])
  const [log, setLog] = useState<string[]>([])

  const addTask = () => setTasks((q) => [...q, { type: "task", label: "setTimeout" }])
  const addMicrotask = () => setMicrotasks((q) => [...q, { type: "microtask", label: "Promise" }])

  const step = () => {
    if (callStack.length > 0) {
      setLog((l) => [...l, `Call Stack 실행: ${callStack[0]}`])
      setCallStack((s) => s.slice(1))
    } else if (microtasks.length > 0) {
      setLog((l) => [...l, `Microtask 실행: ${microtasks[0].label}`])
      setCallStack([microtasks[0].label])
      setMicrotasks((q) => q.slice(1))
    } else if (tasks.length > 0) {
      setLog((l) => [...l, `Task 실행: ${tasks[0].label}`])
      setCallStack([tasks[0].label])
      setTasks((q) => q.slice(1))
    } else {
      setLog((l) => [...l, "대기 상태 (모든 큐 비어있음)"])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>이벤트 루프 시각화</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-2">
            <div>
              <Button onClick={addTask} className="mr-2">setTimeout 추가</Button>
              <Button onClick={addMicrotask} variant="secondary">Promise 추가</Button>
            </div>
            <Button onClick={step} className="mt-2">1 Step 실행</Button>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-bold mb-1">Call Stack</div>
              <div className="min-h-[60px] flex flex-col-reverse gap-1">
                {callStack.map((item, i) => (
                  <Badge key={i} variant="default">{item}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold mb-1">Microtask Queue</div>
              <div className="min-h-[60px] flex flex-col gap-1">
                {microtasks.map((item, i) => (
                  <Badge key={i} variant="secondary">{item.label}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold mb-1">Task Queue</div>
              <div className="min-h-[60px] flex flex-col gap-1">
                {tasks.map((item, i) => (
                  <Badge key={i} variant="outline">{item.label}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          {log.slice(-5).map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </CardContent>
    </Card>
  )
} 