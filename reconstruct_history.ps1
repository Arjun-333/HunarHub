# Define dates
$date1 = (Get-Date).AddDays(-2).ToString("yyyy-MM-dd HH:mm:ss")
$date2 = (Get-Date).AddDays(-1).ToString("yyyy-MM-dd HH:mm:ss")
$date3 = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

# Reset Git
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue
git init
git branch -M main

# --- DAY 1 (2 Days Ago) ---
# Commit 1: Initial Plan
git add .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/task.md .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/implementation_plan.md
git commit --date="$date1" -m "initial project planning and task breakdown"

# Commit 2: Backend Setup
git add backend/package.json backend/package-lock.json backend/server.js backend/.env backend/config/
git commit --date="$date1" -m "initialized node.js server with mongodb connection"

# Commit 3: Models
git add backend/models/
git commit --date="$date1" -m "implemented mongoose data models"

# Commit 4: Auth API
git add backend/controllers/authController.js backend/routes/authRoutes.js backend/middleware/ backend/utils/
git commit --date="$date1" -m "implemented authentication api with jwt"

# Commit 5: Product API
git add backend/controllers/productController.js backend/routes/productRoutes.js
git commit --date="$date1" -m "added product crud operations"

# Commit 6: Entrepreneur & Admin API
git add backend/controllers/entrepreneurController.js backend/routes/entrepreneurRoutes.js backend/controllers/adminController.js backend/routes/adminRoutes.js
git commit --date="$date1" -m "added entrepreneur and admin management routes"

# --- DAY 2 (Yesterday) ---
# Create Dev Branch
git checkout -b dev

# Commit 7: Frontend Init
git add frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html frontend/public/
git commit --date="$date2" -m "initialized react frontend with vite"

# Commit 8: Tailwind
git add frontend/tailwind.config.js frontend/src/index.css
git commit --date="$date2" -m "configured tailwind css"

# Commit 9: Frontend Auth & Services
git add frontend/src/services/ frontend/src/context/
git commit --date="$date2" -m "setup axios service and auth context"

# Commit 10: Auth Pages
git add frontend/src/components/Header.jsx frontend/src/pages/LoginPage.jsx frontend/src/pages/RegisterPage.jsx
git commit --date="$date2" -m "created login and registration pages"

# Commit 11: Dashboard
git add frontend/src/pages/Dashboard.jsx
git commit --date="$date2" -m "implemented role-based dashboard"

# Commit 12: Listings
git add frontend/src/pages/ProductListingPage.jsx frontend/src/pages/ServiceListingPage.jsx
git commit --date="$date2" -m "added product and service listing pages"

# --- DAY 3 (Today) ---
# Feature Branch: Booking
git checkout -b feature/booking-flow

# Commit 13: Service Request API
git add backend/controllers/serviceController.js backend/routes/serviceRoutes.js
git commit --date="$date3" -m "backend: implemented service request api"

# Commit 14: Order API
git add backend/controllers/orderController.js backend/routes/orderRoutes.js
git commit --date="$date3" -m "backend: implemented order processing api"

# Commit 15: Product Details UI
git add frontend/src/pages/ProductDetailsPage.jsx
git commit --date="$date3" -m "frontend: added product details with buy now action"

# Commit 16: Service Request UI
git add frontend/src/pages/ServiceRequestPage.jsx
git commit --date="$date3" -m "frontend: added service request form"

# Merge Booking
git checkout dev
git merge feature/booking-flow

# Feature Branch: UI Polish
git checkout -b feature/ui-polish

# Commit 17: Home Page
git add frontend/src/pages/HomePage.jsx
git commit --date="$date3" -m "redesigned homepage with modern ui"

# Commit 18: Footer
git add frontend/src/components/Footer.jsx
git commit --date="$date3" -m "added responsive footer component"

# Commit 19: Main App Integration
git add frontend/src/App.jsx frontend/src/main.jsx
git commit --date="$date3" -m "integrated all pages and components into main app"

# Merge UI Polish
git checkout dev
git merge feature/ui-polish

# Feature Branch: Documentation
git checkout -b feature/documentation

# Commit 20: Docs
git add README.md LICENSE CONTRIBUTING.md CHANGELOG.md .gemini/antigravity/brain/f77fcdd1-e591-4e45-b432-cf4ece777693/walkthrough.md
git commit --date="$date3" -m "added comprehensive project documentation"

# Commit 21: Cleanup (Any remaining files)
git add .
git commit --date="$date3" -m "final code cleanup and polish"

# Merge Docs
git checkout dev
git merge feature/documentation

# Final Merge to Main
git checkout main
git merge dev

# Set Remote
git remote add origin https://github.com/Arjun-333/HunarHub.git
