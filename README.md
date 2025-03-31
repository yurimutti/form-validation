# 📝 Form Validation

Welcome to the **Form Validation Challenge**!

This project delivers a complete and functional registration form interface with custom validation logic, real-time feedback, success messaging, and enhanced user experience.

---

## 🚀 Getting Started

### Installation

To run this project locally:

```bash
pnpm install
pnpm start
```

### Building for Production

To build this application for production:

```bash
pnpm build
```

### Running Tests

This project uses **Vitest** for testing. Run tests with:

```bash
pnpm test
```

---

## 🌟 Features

- 👤 Registration form with essential fields
- ✅ **Custom validation logic** using React Hook Form + Yup
- ✏️ Real-time validation feedback
- ❌ Display error messages for invalid inputs
- 🔒 Password confirmation check
- 🔞 Age restriction validation (18+)
- 🔄 Reset form fields and errors
- 🎉 Success message on valid submission
- 🔔 Visual feedback with toast notifications
- 📱 Responsive design (Desktop & Mobile)
- 📂 Clean and scalable folder architecture

---

## 🛠️ Technologies Used

- **React 19** – UI Library
- **TypeScript** – Type Safety
- **Vite** – Fast development and build tool
- **Tailwind CSS** – Utility-first styling
- **React Hook Form** – Form management
- **Yup** – Validation schema
- **React Toastify** – Feedback and notifications
- **Vitest + Testing Library** – Unit and component testing

---

## 🌐 Live Demo

You can check the live project here:

[Form Validation – Live Demo](https://form-validation-two-green.vercel.app/)

---

## 📂 Project Structure

```
src/
├── components/           # Shared UI components (Form, Input, etc.)
│   └── form/
├── hooks/                # Custom React hooks
├── schemas/              # Yup validation schemas
├── types/                # TypeScript types
└── utils/                # Utility functions (toasts, helpers)
```

---

## 📄 Additional Notes

- Project uses **React Hook Form** with **Yup** for robust validation
- Real-time feedback and clear validation messages
- Form highlights invalid fields with red borders
- Includes a **Reset** button to clear form state
- Shows a success toast notification after valid submission
- **Clean folder-by-feature architecture** for scalability
