---
name: commit
description: Run checks, commit with AI message, and push
---

1. Run quality checks:
   npm run lint
   npm run build
   Fix ALL errors before continuing. Use npm run format where formatting fixes are needed.

2. Review changes: run git status and git diff --staged and git diff

3. Stage relevant files with git add (specific files, not -A)

4. Generate a commit message: start with Add/Update/Fix/Remove/Refactor; be specific and concise, one line preferred

5. Commit and push: git commit -m "your generated message" && git push
