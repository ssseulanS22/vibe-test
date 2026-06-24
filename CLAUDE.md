# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **vibe coding practice workspace** — a collection of standalone, numbered HTML exercises built without any build tools or frameworks. Each exercise is self-contained.

## File Naming Convention

Each exercise uses a numeric prefix and shares a base name across its files:

```
NN.exerciseName.html
NN.exerciseName.css
NN.exerciseName.js
```

Example: `02.profile.html` links to `02.profile.css` and `02.profile.js`.

No bundler, package manager, or build step — open the `.html` file directly in a browser to run.

## Architecture

- **No framework, no dependencies.** Vanilla HTML/CSS/JS only.
- Each HTML file links its own dedicated CSS and JS files by the same numeric prefix.
- JS files export a single `initApp()` entry-point function (currently called implicitly on load; body is left for future logic).
- CSS uses a gradient-heavy, centered-card pattern (`flexbox` on `body`, white card on gradient background).

## Design Tokens (reused across exercises)

| Purpose | Value |
|---|---|
| Purple theme primary | `#667eea` |
| Purple theme secondary | `#764ba2` |
| Blue theme (01.helloWorld) | `#1a237e → #1565c0 → #42a5f5` |
| Card border-radius | `20px` |
| Card shadow | `0 20px 60px rgba(102,126,234,0.35)` |

## 주의
- 주석은 항상 한국어로 작성
- 파일 경로는 C:\Users\KICO\Documents\Claude\vibe 
- 파일 기본 구조: html에 css, script 모두 넣기
- 기본 모드는 ask before edits