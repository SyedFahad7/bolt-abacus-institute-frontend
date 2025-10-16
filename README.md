# ⚡️ Bolt Abacus Student Frontend

**Version:** 1.0.0  
**Maintainer:** [Mohd Mujahed](mailto:dev.xunoia@gmail.com)  
**Organization:** [Xunoia](https://xunoia.com)  

A **production-grade React + TypeScript frontend** built with **Vite**, **TailwindCSS**, and a full-stack developer experience optimized for performance, scalability, and reliability in professional environments.

---

## 📦 Tech Stack

| Category | Tool | Purpose |
|-----------|------|----------|
| ⚡️ Build | [Vite](https://vitejs.dev/) | Blazing-fast development & bundling |
| 🧠 Language | [TypeScript](https://www.typescriptlang.org/) | Type-safe code for large-scale projects |
| 🎨 Styling | [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS framework |
| 🧹 Linting | [ESLint](https://eslint.org/) | Static analysis & consistent code quality |
| 🧾 Formatting | [Prettier](https://prettier.io/) | Automated code formatting |
| 🧩 Git Hooks | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged) | Enforce quality on commits/pushes |
| 🧪 Testing | [Vitest](https://vitest.dev/) + [RTL](https://testing-library.com/) | Unit & integration testing |
| 🚀 Deployment | CI-ready setup | Runs all checks before merge or deploy |

---

## 🧭 Folder Structure

bolt-abacus-client/
├── src/
│ ├── api/ # Axios/fetch services
│ ├── assets/ # Images, icons, fonts
│ ├── components/ # Shared UI components
│ ├── features/ # Feature-based modules (auth, dashboard, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Layout wrappers (admin, auth, etc.)
│ ├── lib/ # Utils, constants, helper functions
│ ├── routes/ # Router configs
│ ├── store/ # Zustand/Redux global state
│ ├── styles/ # Tailwind & global styles
│ ├── types/ # TypeScript types/interfaces
│ ├── tests/ # Unit/integration test files
│ ├── App.tsx
│ └── main.tsx
│
├── .husky/ # Git hooks
├── .eslintrc.cjs # ESLint config
├── .prettierrc # Prettier config
├── tsconfig.json # TypeScript config
├── vite.config.ts # Vite setup
├── package.json
└── README.md

yaml
Copy code

---

## ⚙️ Scripts

| Command | Description |
|----------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint across all files |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Validate formatting (used in CI) |
| `npm run type-check` | Run TypeScript without emit |
| `npm run test` | Run all tests with Vitest |
| `npm run test:watch` | Watch tests in dev mode |
| `npm run ci` | Run lint, type, format, test & build (for CI/push) |
| `npm run clean` | Remove build and cache directories |
| `npm run prepare` | Auto-install Husky hooks on npm install |

---

## 🧹 Code Quality Enforcement

This project enforces code standards through:

- **ESLint + Prettier** → Style & syntax validation  
- **Husky (pre-commit hook)** → Runs `lint-staged`  
- **Husky (pre-push hook)** → Runs `npm run ci`  
- **Vitest** → Unit & integration testing  
- **Strict TypeScript config** → Prevents unsafe patterns  

### 🧩 Example Workflow

| Step | Command | What Happens |
|------|----------|--------------|
| Stage files | `git add .` | Prepares staged files |
| Commit | `git commit -m "feat: add new button"` | Husky runs ESLint + Prettier on staged files |
| Push | `git push` | Husky runs full CI pipeline (lint, test, build) |

If any check fails, the commit/push is blocked until fixed ✅

---

## 🎨 Styling with TailwindCSS

Tailwind is integrated using the official Vite plugin `@tailwindcss/vite`.

**Custom theme setup (tailwind.config.js):**
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#022A65',
          secondary: '#FF2718',
          accent: '#352F44',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
Usage Example:

tsx
Copy code
<h1 className="text-3xl font-bold text-brand-primary">
  Welcome to Bolt Abacus ⚡️
</h1>
🧪 Testing Setup
Testing uses Vitest + React Testing Library.

Example: src/components/Button.test.tsx

tsx
Copy code
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders label', () => {
  render(<Button label="Click me" />)
  expect(screen.getByText(/click me/i)).toBeInTheDocument()
})
Run tests:

bash
Copy code
npm run test
🧰 Continuous Integration (CI)
For CI/CD pipelines (e.g., GitHub Actions):

yaml
Copy code
name: CI
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run ci
This ensures no broken or unformatted code reaches production.

🧑‍💻 Developer Guidelines
✅ Write components as pure functions
✅ Use feature-based folder organization
✅ Follow TypeScript strict mode
✅ Keep functions small & testable
✅ Always use ESLint & Prettier before commit
✅ Prefer Zustand or Redux Toolkit for global state
✅ Avoid absolute imports from outside /src

🤝 Contributing
Fork the repository

Create your feature branch

bash
Copy code
git checkout -b feature/your-feature
Make changes and test

bash
Copy code
npm run lint && npm run test
Commit and push

bash
Copy code
git commit -m "feat: add new feature"
git push origin feature/your-feature
Submit a Pull Request 🚀

🪪 License
XUNOIA TECHNOLOGIES PRIVATE LIMITED
CIN: U58201TS2025PTC194742

XUNOIA PRIVATE LICENSE v1.0
© 2025 Xunoia – Built and maintained by Mohd Mujahed

