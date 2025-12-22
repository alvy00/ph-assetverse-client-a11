# AssetVerse 🧩

**Corporate Asset Management System**

AssetVerse is a B2B (Business-to-Business) HR & Asset Management web application designed to help organizations efficiently track, assign, and manage company assets such as laptops, peripherals, and office equipment across multiple employees and companies.

---

## 🔗 Live URL

Example: `https://ph-assetverse-client-a11.netlify.app/`

---

## 🎯 Purpose

The primary goal of AssetVerse is to eliminate asset mismanagement within organizations by providing a centralized, transparent, and scalable system for HR managers and employees.

---

## 🚀 Key Features

### 👩‍💼 HR Manager Features

-   Company registration with default subscription (5 employees)
-   Asset inventory management (add, update, delete assets)
-   Assign assets to employees
-   Track returnable vs non-returnable assets
-   Monitor asset usage and availability
-   View analytics and reports (charts & PDFs)

### 👨‍💻 Employee Features

-   Independent user registration
-   Automatic company affiliation
-   Request company assets
-   Track assigned assets
-   Support for working with **multiple companies simultaneously**

### 📦 Asset Lifecycle Management

-   Inventory → Assignment → Return (optional)
-   Full asset tracking with status visibility
-   Accountability and loss prevention

### 📊 Reporting & UI Enhancements

-   Interactive charts using Recharts
-   Export reports as PDF
-   Print-friendly views
-   Toast notifications & alert modals
-   Smooth animations and modern UI

## 🛠️ Tech Stack

### Frontend

-   **React 19**
-   **Vite**
-   **React Router**
-   **Tailwind CSS + DaisyUI**
-   **TanStack React Query**

### Backend & Services

-   **Firebase** (Authentication)
-   **Stripe** (Payments & subscriptions)

---

## 📦 npm Packages Used

### Core Dependencies

-   `react`, `react-dom`
-   `react-router`
-   `@tanstack/react-query`
-   `axios`
-   `firebase`
-   `stripe`

### UI & Animations

-   `tailwindcss`
-   `daisyui`
-   `lucide-react`
-   `react-icons`
-   `motion`
-   `typewriter-effect`

### Forms, Notifications & UX

-   `react-hook-form`
-   `react-toastify`
-   `sweetalert2`

### Charts & Reports

-   `recharts`
-   `jspdf`
-   `jspdf-autotable`
-   `react-to-pdf`
-   `react-to-print`

### Utilities

-   `date-fns`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

````bash
git clone https://github.com/alvy00/ph-assetverse-client-a11
cd ph-assetverse-client-a11

2️⃣ Install Dependencies
```bash
npm install
```bash
3️⃣ Run the Development Server
```bash
npm run dev
```bash
4️⃣ Build for Production
```bash
npm run build
```bash

🔐 Environment Variables Configuration

Create a .env file in the root directory and add the following:
```bash
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_project.firebaseapp.com
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_project.firebasestorage.app
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_IMAGEHOST=your_image_host_key

```bash
````
