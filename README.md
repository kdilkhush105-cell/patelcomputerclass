# BCA Student Hub

A bilingual (English/Hindi) front-end learning project built with HTML, CSS and JavaScript.

## Pages
- `index.html` — home page
- `dashboard.html` — student dashboard, editable display name, self-set weekly goal and local quiz stats
- `notes.html` — searchable BCA revision notes
- `quiz.html` — five-question interactive quiz with feedback and locally saved scores
- `admin.html` — add/delete notices, add learning resources and reset demo data
- `style.css` — responsive design
- `script.js` — interactions and browser-local storage

## Run locally
1. Download or extract the project.
2. Open `index.html` in a modern browser.
3. For development, use VS Code with the Live Server extension if available.

## Publish with GitHub Pages
1. Open your repository on GitHub.
2. Upload/replace the project files in the repository root. Keep `logo.png` if you want to use it later.
3. Click **Commit changes**.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for the deployment status, then open the published URL shown in Settings → Pages. It usually resembles `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Important demo limitations
This project uses `localStorage`. Changes are saved only in the current browser on the current device; they are not shared with other students. The admin page has no authentication and is not secure. Do not store passwords, private student data, or real attendance records. A real multi-user app needs a backend/database and secure authentication.

## Suggested next improvements
- Add a real backend and database.
- Add secure student/teacher accounts.
- Add semester-wise resources and downloadable notes.
- Add a proper logo and accessibility review.
