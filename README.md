# 📚 Book Management Dashboard

A responsive **React.js dashboard** for managing books with **CRUD operations, filters, search, and pagination**.  
Built with **Vite + React Query + Material UI + React Hook Form**.

---

Note:

I used environment variables (.env) for the API URL. Since CrudCrud keys expire every 24 hours, the repo includes a .env.example file with setup instructions.

Performance optimizations: React Query caching, skeleton loaders, and lazy loading for routes.

## 🚀 Features

- ✅ List books with title, author, genre, year, and status
- ✅ Search by title or author
- ✅ Filter by genre and status
- ✅ Pagination (10 books per page)
- ✅ Add / Edit books in a modal form with validation
- ✅ Delete books with confirmation dialog
- ✅ Toast notifications for feedback
- ✅ Loading skeletons, error states, and empty states for better UX
- ✅ Responsive UI with Material UI
- ✅ API state management with React Query
- ✅ Environment variables support (`.env` for API base URL)

---

## 🛠️ Tech Stack

- **React 19 + Vite**
- **Material UI (MUI)**
- **React Query (@tanstack/react-query)**
- **React Hook Form**
- **React Router v7**
- **React Toastify**
- **CrudCrud API** (mock backend)

---

## 📦 Installation & Setup

Clone the repo and install dependencies:

```sh
git clone https://github.com/your-username/book-management-app.git
cd book-management-app
npm install


Create a .env file in the root:

VITE_API_BASE=https://crudcrud.com/api/<YOUR-KEY>/books


Run locally:

npm run dev


Build for production:

npm run build
npm run preview

🌍 Deployment

This project is deployed on Vercel.

Environment variable used in Vercel:

VITE_API_BASE=https://crudcrud.com/api/<YOUR-KEY>/books

⚠️ Note: CrudCrud API keys expire every 24 hours. If data stops working, generate a new key from crudcrud.com
 and update the .env or Vercel environment variable.


📝 Notes

Built as part of a frontend developer assessment task.

Focused on clean code, UX best practices, and modular architecture.

Folder structure:

src/
  api/         → API clients (axios)
  hooks/       → Custom React Query hooks
  components/  → UI components (Table, Modal, Filters, etc.)
  pages/       → Page-level components (Dashboard)
  App.jsx

👤 Author

Ashish N M (@Ashish93-mrx)