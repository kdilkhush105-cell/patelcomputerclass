# BCA Study Hub — No Firebase Demo

This version removes Firebase entirely. It has a responsive study-library UI, demo student/admin sign-up and login, and PDF upload/download stored in the current browser's localStorage.

## Important limitations
- This is **not secure authentication**. Anyone can choose “Admin (demo only)” or modify browser storage/code.
- User accounts and PDFs stay only in the same browser/device. They are not shared with friends or other students and may be erased by clearing browser data.
- Do not use real passwords or confidential files.
- GitHub Pages is static hosting; it cannot securely protect admin actions or store uploads for all visitors by itself.

## Upload to GitHub Pages
1. Extract this ZIP.
2. Upload/replace `index.html`, `style.css`, and `app.js` in the root of your repository.
3. Remove old Firebase references from any page scripts you continue using. You can leave old Firebase rules/config files unused, or delete them from the repo if nothing else depends on them.
4. Keep GitHub Pages set to `main` and `/(root)`.

## If you need real secure admin/student accounts
A server/backend or managed auth/database service is required. Without Firebase or another backend, this is only a local demo.
