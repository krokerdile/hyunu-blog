# ✅ Raspberry Pi는 ARM이므로 node:18-alpine 사용 (경량)
FROM node:18-alpine

# 앱 디렉토리 생성
WORKDIR /app

# 의존성 설치용 캐시
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# 소스 복사
COPY . .

# 빌드
RUN pnpm build

# 3000 포트 노출
EXPOSE 3000

# 실행
CMD ["pnpm", "start"]
