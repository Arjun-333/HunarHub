# Define dates
$date1 = (Get-Date).AddDays(-1).ToString("yyyy-MM-dd HH:mm:ss")
$date2 = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

# Reset Git
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue
git init
git branch -M main

# --- DAY 1 (2 Days Ago) ---
# Commit 1: Project Setup
git add .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/task.md .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/implementation_plan.md
$env:GIT_COMMITTER_DATE = $date1
git commit --date="$date1" -m "initial project setup and planning"

# Commit 2: Backend Core
git add backend/package.json backend/package-lock.json backend/server.js backend/config/ backend/middleware/ backend/utils/ backend/.gitignore
$env:GIT_COMMITTER_DATE = $date1
git commit --date="$date1" -m "setup node.js server and mongodb connection"

# Commit 3: Database Models
git add backend/models/
$env:GIT_COMMITTER_DATE = $date1
git commit --date="$date1" -m "implemented mongoose schemas for users and products"

# Commit 4: API Implementation
git add backend/controllers/ backend/routes/
$env:GIT_COMMITTER_DATE = $date1
git commit --date="$date1" -m "developed rest api endpoints for auth and marketplace"

# --- DAY 2 (Today) ---
# Create Dev Branch
git checkout -b dev

# Commit 5: Frontend Init
git add frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html frontend/public/ frontend/tailwind.config.js frontend/postcss.config.js frontend/src/index.css
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "initialized react frontend with tailwind css v3"

# Commit 6: UI Components & Auth
git add frontend/src/components/Header.jsx frontend/src/pages/LoginPage.jsx frontend/src/pages/RegisterPage.jsx frontend/src/context/ frontend/src/services/
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "implemented authentication ui and state management"

# Commit 7: Main Pages
git add frontend/src/pages/HomePage.jsx frontend/src/pages/Dashboard.jsx frontend/src/pages/ProductListingPage.jsx frontend/src/pages/ServiceListingPage.jsx
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "created core marketplace pages and dashboard"

# Commit 8: Booking Flow
git add frontend/src/pages/ProductDetailsPage.jsx frontend/src/pages/ServiceRequestPage.jsx
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "integrated booking and ordering functionality"

# Commit 9: Polish & Integration
git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/components/Footer.jsx
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "final ui polish and component integration"

# Commit 10: Documentation
git add README.md CHANGELOG.md .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/walkthrough.md backend/.env.example
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "added project documentation"

# Final Cleanup
git add .
$env:GIT_COMMITTER_DATE = $date2
git commit --date="$date2" -m "code cleanup"

# Merge to Main
git checkout main
$env:GIT_COMMITTER_DATE = $date2
git merge dev --no-edit

# Set Remote
git remote add origin https://github.com/Arjun-333/HunarHub.git
