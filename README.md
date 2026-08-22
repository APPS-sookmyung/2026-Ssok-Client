# 2026-Ssok-Client

지능형 북마크 서비스 '쏙(Ssok)' Client 레포지토리

## 📌 Git Convention

### 🔵 Branch Strategy (GitHub-flow)

1인 개발 환경에 맞춰 단순하고 민첩한 배포가 가능한 **GitHub-flow** 전략을 기반으로 운용합니다.

- `main` : 상시 배포 가능한 상태를 유지하는 기본(Production) 브랜치
- `토픽 브랜치 (feat, fix 등)` : 기능 개발, 버그 수정 등 작업 단위로 생성하며, 작업 완료 후 PR(Pull Request)을 거쳐 `main`에 직접 merge하고 삭제합니다.

### 🔵 Commit Convention

- `Feat` : 새로운 기능 추가
- `Fix` : 버그 및 오류 해결
- `Design` : CSS, 레이아웃 등 UI 디자인 변경
- `Refactor` : 기능 변화 없이 코드 구조, 성능, 가독성 개선
- `Docs` : README 등 문서 작성 및 수정
- `Style` : 코드 포맷팅, 세미콜론 누락 등 (코드 동작 영향 X)
- `Chore` : 빌드 도구 설정, 패키지 설치/제거, 설정 파일 수정
- `Test` : 테스트 코드 추가, 수정, 삭제

### 커밋 예시

- git commit -m "#이슈번호 커밋 태그: 커밋 내용"
  - ex) `git commit -m "#198 Feat: Header 기능 구현"`

<br>

### 🔵 Branch Convention

- `main` : 최종 배포
- `feat` : 새로운 기능 개발
- `fix` : 버그 및 에러 수정
- `design` : CSS 및 UI/UX 스타일링 변경
- `refactor` : 기능 변경 없는 코드 구조 개선
- `docs` : README, 문서화 관련 작업
- `chore` : 빌드 설정, 의존성 패키지 관리, 환경 설정 등

### 브랜치 명 예시

- feat/#이슈번호-기능 이름
  - ex) `feat/#21-header`

<br>

### 🔵 Issue Convention

- [Feat] : 기능 추가
- [Fix] : 에러 및 버그 수정
- [Docs] : README 등 문서
- [Refactor] : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- [Chore] : 그 외 작업 내용

### 이슈 명 예시

- [이슈 항목] 개발 내용
  - `ex) [Feat] Header 구현`

<br>

## 💻 로컬 실행 방법

### 🔵 로컬 실행 방법

프로젝트를 로컬 환경에서 실행하기 위한 단계입니다.

1. **패키지 설치**
   최초 실행 시 또는 새로운 패키지가 추가되었을 때 의존성 패키지를 설치합니다.

   ```bash
   npm install
   ```

2. **개발 서버 실행**
   패키지 설치가 완료되면 로컬 개발 서버를 구동합니다.

   ```bash
   npm run dev
   ```

3. **결과 확인**
   브라우저를 열고 [http://localhost:3000] 주소로 접속하여 실행된 화면을 확인합니다.
