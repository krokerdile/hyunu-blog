# Agents.md – OpenAI Codex Guide with Toss Frontend Design Principles

This file provides Codex agents with explicit guidance on navigating, generating, and maintaining this codebase effectively. Toss-inspired frontend best practices have been integrated for consistency, readability, and maintainability.

---

## Project Structure for Codex Navigation

```
/src
  /components     - Functional React components (PascalCase.tsx)
  /pages          - Next.js routes Codex may generate
  /styles         - Tailwind CSS usage only; avoid custom CSS unless necessary
  /utils          - Utility logic; Codex must document complex logic
/tests            - Jest test files to be extended and updated
/public           - Static assets (do not modify)
```

---

## Coding Conventions for OpenAI Codex

### General Rules

* Language: TypeScript only
* Style: Follow local code style
* Naming: Use meaningful, self-documenting identifiers
* Comments: Required for non-obvious logic

### React Components

* Functional components only, with Hooks
* Use PascalCase.tsx for filenames
* Add prop typing via interface or type
* Keep components small and single-purpose

### Styling

* Tailwind CSS (utility-first)
* Avoid custom CSS unless unavoidable

---

## Branching Strategy

### Branch Naming Convention

* Branch hierarchy: `main` → `develop` → `feature/*`
* Feature branches follow this format:

  * `feature/{작업 내용 영어로}`
  * 예시: `feature/components-fix`, `feature/add-login-api`

### Commit Message Convention (Airbnb Style)

* 제목은 다음 형식 사용: `<type>: 커밋 내용 (한글)`
* 커밋 본문은 개조식으로 작성

#### 예시

```
feat: 로그인 버튼 스타일 수정

- Tailwind 클래스를 통일함
- 불필요한 margin 제거
```

사용 가능한 type 목록:

* feat: 새로운 기능
* fix: 버그 수정
* docs: 문서 수정
* style: 코드 스타일, 포맷팅 등 (로직 변경 없음)
* refactor: 리팩토링
* chore: 기타 변경사항 (빌드 설정, 패키지 등)
* test: 테스트 코드 추가/수정

---

## Testing Requirements

```
# All tests
npm test

# Specific test file
npm test -- path/to/file.test.ts

# With coverage
npm test -- --coverage
```

---

## Pull Request Guidelines

### PR 작성 방식

PR을 작성할 때 아래 양식을 따라 작성해주세요. 이 양식은 PR의 목적과 맥락을 명확히 전달하고, 리뷰어가 빠르게 파악할 수 있도록 돕습니다.

#### PR 템플릿

```
## 🔍️ 이 PR을 통해 해결하려는 문제가 무엇인가요?

> 어떤 기능을 구현한 것인지, 어떤 이슈를 해결하는 PR인지 구체적으로 적어주세요.
> PR이 열리게 된 배경과 목적을 Reviewer가 쉽게 이해할 수 있도록 설명해주세요.
> 관련된 백로그/이슈/디자인(피그마, 다이어그램 등) 링크도 첨부해주세요.


## ✨ 이 PR에서 핵심적으로 변경된 사항은 무엇일까요?

> 문제 해결을 위해 어떤 주요 변경 사항이 있었는지 간단히 요약해주세요.
> 여러 개라면 리스트 형태로 정리해 주세요.


## ✅ 리뷰어가 집중해서 봐야 할 부분은 어디인가요?

> 특히 검토가 필요한 부분이나 리뷰어가 확인해야 할 주요 포인트를 작성해주세요.


## 📸 UI 변경사항이 있다면 스크린샷을 첨부해주세요

> 가능하면 전/후 비교를 포함해주세요. 반응형/다크모드 여부도 함께 고려해 주세요.


## 🧪 테스트 결과는 어떤가요?

> 해당 변경 사항에 대해 어떤 테스트가 수행되었고, 결과가 어땠는지 적어주세요.
> 테스트가 부족하거나 추가 예정인 부분이 있다면 그 계획도 포함해주세요.
```

### Codex PR 작성 시 주의사항

1. 제목과 내용 모두 명확하고 구체적으로 작성할 것
2. 코드 변경 이유와 맥락을 Reviewer가 이해할 수 있도록 설명할 것
3. UI 변경 시 스크린샷 필수
4. 모든 테스트 통과 확인 (`npm run test`, `lint`, `build`, `type-check`)
5. PR은 하나의 목적(기능 구현, 리팩토링, 스타일 수정 등)에 집중할 것

When Codex generates a PR:

1. Provide a clear, structured description
2. Reference any related issues
3. Ensure `npm run test`, `lint`, `build`, and `type-check` pass
4. Include screenshots for any UI-related changes
5. Keep changes scoped to one concern (SRP)

---

## Programmatic Checks

```
npm run lint        # ESLint check
npm run type-check  # TS type check
npm run build       # Ensure build passes
```

All must pass before merge.

---

## Toss Frontend Design Guidelines

### Readability

#### Naming Magic Numbers

```ts
const ANIMATION_DELAY_MS = 300;
await delay(ANIMATION_DELAY_MS);
```

#### Abstracting Logic into Dedicated Components

```tsx
<AuthGuard><LoginStartPage /></AuthGuard>
```

#### Conditional Logic → Separate Components

```tsx
return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
```

#### Simplify Complex Ternaries

```ts
const status = (() => {
  if (a && b) return "BOTH";
  if (a) return "A";
  return "NONE";
})();
```

#### Colocate Logic to Reduce Eye Movement

```ts
const policy = { admin: ..., viewer: ... }[user.role];
```

#### Name Complex Conditions

```ts
const isSameCategory = ...;
const isPriceInRange = ...;
return isSameCategory && isPriceInRange;
```

### Predictability

#### Consistent Hook Return Types

```ts
function useUser(): UseQueryResult<User, Error> { ... }
```

#### Validation with Discriminated Union

```ts
type ValidationResult = { ok: true } | { ok: false; reason: string };
```

#### No Hidden Side Effects

```ts
// fetchBalance only fetches
debug explicitly logs
```

#### Use Descriptive Function Names

```ts
httpService.getWithAuth → explicitly includes auth
```

### Cohesion

#### Field-Level vs Form-Level Validation

```tsx
// Field-level with validate per field
// Form-level with zod schema via zodResolver
```

#### Feature-Oriented File Structure

```
src/domains/user/components/UserCard.tsx
```

#### Relate Constants to Logic

```ts
const ANIMATION_DELAY_MS near animation logic
```

### Coupling

#### Avoid Premature Abstraction

Avoid abstracting if logic may diverge

#### Minimize State Scope

```ts
useCardIdQueryParam(): only manages one URL param
```

#### Avoid Props Drilling with Composition

```tsx
<Modal><ItemEditList keyword={keyword} ... /></Modal>
```

---

This Agents.md aims to enhance codebase navigation, consistency, and contribution quality for Codex and other AI agents by combining project-specific rules with industry-proven frontend design patterns.
