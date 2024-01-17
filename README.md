# GiaLog

GiaLog은 Next.js로 프론트엔드와 서버를 구현한 블로그 프로젝트입니다.

1. 마크다운 파일 기반 CRUD
  - 파일 시스템의 마크다운 파일을 활용하여 조회, 추가, 수정, 삭제 등의 서비스로직을 구현했습니다.
2. API 구현
  - Next.js의 route handler를 활용하여 효율적이고 간결한 API를 구현했습니다.
3. 상태 관리
  - 리덕스를 사용하여 상태를 효과적으로 관리했습니다.

## 작업기간

2023.11.03 ~ 2023.11.27

## 기능

- **Home**
  - 고정 게시글 3개
  - 전체 게시글 캐러설
- **About**
  - 소개 페이지
- **Posts**
  - 게시글 목록
    - 고정 게시글 추가 및 삭제 기능
  - 게시글 작성
  - 상세페이지
    - 수정 및 삭제 기능
- **Contact**
  - 연락처 정보
    - 이메일 전송 기능

## 사용 스택 및 라이브러리

- Next.js 13
- Tailwind
- React-icon
- React-slick
- React-markdown, gray-matter
- Axios
- Redux & RTK
- React-hook-form
- nodemailer
