"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Minus, ArrowLeft, ArrowRight, Zap, Clock } from "lucide-react"

export default function ArrayVisualization() {
  const [jsArray, setJsArray] = useState([1, 2, 3, 4, 5])
  const [cArray] = useState([1, 2, 3, 4, 5])
  const [inputValue, setInputValue] = useState("")
  const [operationTime, setOperationTime] = useState<{ operation: string; time: number } | null>(null)
  const [tabValue, setTabValue] = useState("comparison")

  const measureTime = (operation: () => void, operationName: string) => {
    const start = performance.now()
    operation()
    const end = performance.now()
    setOperationTime({ operation: operationName, time: end - start })
  }

  const handlePush = () => {
    if (inputValue) {
      measureTime(() => {
        setJsArray((prev) => [...prev, Number.parseInt(inputValue)])
      }, "push")
      setInputValue("")
    }
  }

  const handlePop = () => {
    measureTime(() => {
      setJsArray((prev) => prev.slice(0, -1))
    }, "pop")
  }

  const handleUnshift = () => {
    if (inputValue) {
      measureTime(() => {
        setJsArray((prev) => [Number.parseInt(inputValue), ...prev])
      }, "unshift")
      setInputValue("")
    }
  }

  const handleShift = () => {
    measureTime(() => {
      setJsArray((prev) => prev.slice(1))
    }, "shift")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger triggerValue="comparison" currentValue={tabValue} setValue={setTabValue}>JS vs C 배열 비교</TabsTrigger>
          <TabsTrigger triggerValue="operations" currentValue={tabValue} setValue={setTabValue}>배열 연산 성능</TabsTrigger>
        </TabsList>

        <TabsContent contentValue="comparison" currentValue={tabValue} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">JavaScript 배열</CardTitle>
                <CardDescription>동적 배열 (객체 기반)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {jsArray.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700 rounded flex items-center justify-center font-mono">
                          {item}
                        </div>
                        <div className="text-xs text-center mt-1 text-muted-foreground">[{index}]</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• 메모리에 연속적으로 저장되지 않음</p>
                    <p>• 각 요소는 객체의 프로퍼티</p>
                    <p>• 동적 크기 조정 가능</p>
                    <p>• 다양한 타입 저장 가능</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">C 언어 배열</CardTitle>
                <CardDescription>정적 배열 (메모리 연속)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-0">
                    {cArray.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 flex items-center justify-center font-mono">
                          {item}
                        </div>
                        <div className="text-xs text-center mt-1 text-muted-foreground">[{index}]</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• 메모리에 연속적으로 저장</p>
                    <p>• 고정된 크기</p>
                    <p>• 빠른 인덱스 접근</p>
                    <p>• 단일 타입만 저장</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent contentValue="operations" currentValue={tabValue} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>배열 연산 성능 테스트</CardTitle>
              <CardDescription>push/pop vs shift/unshift의 성능 차이를 직접 확인해보세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="값 입력"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="max-w-32"
                />
                <Button onClick={handlePush} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Push (끝에 추가)
                </Button>
                <Button onClick={handlePop} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Minus className="w-4 h-4" />
                  Pop (끝에서 제거)
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="값 입력"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="max-w-32"
                />
                <Button onClick={handleUnshift} variant="secondary" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Unshift (앞에 추가)
                </Button>
                <Button onClick={handleShift} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowRight className="w-4 h-4" />
                  Shift (앞에서 제거)
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-muted rounded-lg">
                {jsArray.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="w-10 h-10 bg-primary text-primary-foreground rounded flex items-center justify-center font-mono text-sm animate-in slide-in-from-left-2 duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {operationTime && (
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{operationTime.operation}</span>
                      <Badge variant="secondary">{operationTime.time.toFixed(4)}ms</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {operationTime.operation.includes("push") || operationTime.operation.includes("pop")
                        ? "끝에서의 연산은 O(1) - 빠름"
                        : "앞에서의 연산은 O(n) - 모든 요소를 이동해야 함"}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-600" />
                      빠른 연산 (O(1))
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>
                      • <code>push()</code> - 배열 끝에 추가
                    </p>
                    <p>
                      • <code>pop()</code> - 배열 끝에서 제거
                    </p>
                    <p>
                      • <code>arr[index]</code> - 인덱스 접근
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      느린 연산 (O(n))
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>
                      • <code>unshift()</code> - 배열 앞에 추가
                    </p>
                    <p>
                      • <code>shift()</code> - 배열 앞에서 제거
                    </p>
                    <p>
                      • <code>splice()</code> - 중간 삽입/삭제
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 