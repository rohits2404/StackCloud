# ☁️ StackCloud

<p align="center">
  <strong>A modern cloud file manager built for simple, fast and organized file storage.</strong>
</p>

<p align="center">
  Upload • Organize • Search • Share • Manage
</p>

---

## ✨ Overview

**StackCloud** is a full-stack cloud storage application inspired by modern file-management platforms.

It gives users a clean dashboard to upload and manage files, organize them by type, search and filter their storage, preview files, share files with other users, and perform everyday file actions — all backed by **Appwrite**.

### What you can do

- 📤 Upload files up to **50 MB**
- 🗂️ Organize files by **Documents, Images, Media & Others**
- 🔎 Search files by name
- ↕️ Sort by name, date or size
- 👀 Preview supported files
- ✏️ Rename files
- 🤝 Share files with other users
- 📥 Download files
- 🗑️ Delete files
- 📊 View storage and file information
- 🔐 Authenticate using **email OTP**
- 👤 Manage user profiles
- 📱 Use a responsive, modern interface

---

## 🎨 Interface

StackCloud focuses on a clean cloud-storage experience with:

- Responsive dashboard
- Sidebar navigation
- File cards & recent-files table
- Search and filtering
- Action menus
- File previews
- Upload progress feedback
- Toast notifications
- Mobile-friendly navigation

The UI is built with **Tailwind CSS, Radix UI and Lucide icons**.

---

## 🧠 How It Works

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Next.js App     │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
       Authentication                 File Operations
              │                             │
              ▼                             ▼
        Appwrite Account             Appwrite Storage
                                            │
                                            ▼
                                      Appwrite Tables
```

Files are stored in **Appwrite Storage**, while file metadata such as name, type, size, owner and sharing information is stored in **Appwrite Tables**.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **React 19** | UI |
| **TypeScript** | Type safety |
| **Appwrite** | Authentication, database & storage |
| **Tailwind CSS 4** | Styling |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Icons |
| **React Dropzone** | File uploads |
| **TanStack Query** | Client-side data management |
| **Sonner** | Notifications |

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Authentication routes
│   └── (root)/          # Dashboard & file routes
│
├── components/          # Reusable UI components
│   ├── FileUploader.tsx
│   ├── FilePreview.tsx
│   ├── FileCard.tsx
│   ├── FileDetails.tsx
│   ├── Share.tsx
│   ├── Filter.tsx
│   └── ...
│
├── modules/
│   └── dashboard/       # Dashboard module
│
├── lib/
│   ├── appwrite/        # Appwrite configuration & actions
│   ├── constants.ts     # App constants
│   └── utils.ts         # Utility functions
│
└── types.ts             # Shared TypeScript types
```

---

## 🔐 Authentication

StackCloud uses **Appwrite Account** with email-based OTP authentication.

```text
Enter Email
    ↓
Receive OTP
    ↓
Verify OTP
    ↓
Create / Login User
    ↓
Access Dashboard
```

User information is stored in the Appwrite users table and connected to their uploaded files.

---

## 📦 File Management

Each uploaded file has associated metadata:

```text
File
├── Name
├── Type
├── Extension
├── Size
├── Owner
├── Shared Users
├── Storage File ID
└── Created / Updated Time
```

The application keeps the actual file in **Appwrite Storage** and its metadata in the database.

If database creation fails after a successful upload, StackCloud also cleans up the uploaded storage object to avoid orphaned files.

---

## 🔎 Search & Filtering

The file browser supports:

- Search by filename
- File-type filtering
- Name sorting
- Creation-date sorting
- File-size sorting
- Owner/shared-user filtering

Example:

```text
Search: "resume"
        ↓
Documents
        ↓
Size: Highest → Lowest
        ↓
Matching files
```

---

## ⚙️ Getting Started

### 1. Clone

```bash
git clone <your-repository-url>
cd StackCloud-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=
APPWRITE_API_KEY=
```

> Keep `APPWRITE_API_KEY` private and never commit it to Git.

### 4. Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Production

```bash
npm run build
npm start
```

---

## ☁️ Appwrite Setup

Create an Appwrite project with:

```text
Project
├── Authentication
│   └── Email OTP
│
├── Database
│   ├── Users Collection
│   └── Files Collection
│
└── Storage
    └── Files Bucket
```

The application expects the corresponding IDs in the environment variables.

The file storage limit configured by the project is:

**50 MB per file**

and the application defines a maximum storage capacity of:

**6 GB per user**

---

## 🗺️ Main Routes

| Route | Purpose |
|---|---|
| `/` | Dashboard |
| `/auth` | Authentication |
| `/documents` | Documents |
| `/images` | Images |
| `/media` | Media files |
| `/others` | Other file types |

---

## 🚀 Why StackCloud?

StackCloud is designed around a simple idea:

> **Your files should be easy to store, find and share.**

Instead of overwhelming users with complicated storage features, the project focuses on the core cloud-storage experience with a clean interface and a straightforward backend architecture.

---

## 📌 Future Ideas

Some natural extensions for the project:

- 📁 Custom folders
- ⭐ Favorites
- 🗑️ Trash & file recovery
- 🔗 Public share links
- 📧 Share notifications
- 📈 Storage analytics
- 🧑‍🤝‍🧑 Team workspaces
- 🔒 More granular permissions
- 🖼️ Advanced media previews

---

<p align="center">
  <strong>☁️ StackCloud</strong><br/>
  <sub>Simple storage. Smarter organization.</sub>
</p>
