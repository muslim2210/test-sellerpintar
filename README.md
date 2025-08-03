# 📰 Article Management App

Website manajemen artikel dengan role User dan Admin, dilengkapi fitur autentikasi, otorisasi, manajemen kategori dan artikel, serta tampilan UI responsif.

## 🚀 Demo
Live Demo: https://test-sellerpintar-three.vercel.app

GitHub Repo: https://github.com/muslim2210/test-sellerpintar.git

## ✨ Fitur

Role: User
✅ Login & Register dengan validasi form

✅ Melihat daftar artikel

Filter berdasarkan kategori

Search (debounce 300–500ms)

Pagination (>9 item)

✅ Melihat detail artikel

Menampilkan artikel lain dari kategori yang sama

Role: Admin
✅ Login & Register dengan validasi

✅ CRUD Kategori

Search + Pagination (>10 item)

Validasi form

✅ CRUD Artikel

Filter, Search (debounce), Pagination (>10 item)

Form validasi + preview artikel sebelum submit

## 🧑‍💻 Teknologi

Next.js 14+ (App Router, SSR/CSR)

Tailwind CSS + Shadcn/ui

Axios untuk fetching API

Lucide Icons

Zod + React Hook Form untuk validasi form

Radix UI untuk dialog

Vercel untuk deployment

Git + GitHub dengan GitFlow

## 📦 Setup Project
Clone repo

bash
Copy
Edit
git clone https://github.com/yourusername/article-management.git
cd article-management
Install dependencies

## 🚀 Getting Started (Local)

1. **Install dependencies:**

```bash
npm install
npm run dev
Open http://localhost:3000

API = NEXT_PUBLIC_API_BASE_URL=https://test-fe.mysellerpintar.com/api
Jalankan project

```bash
npm run dev