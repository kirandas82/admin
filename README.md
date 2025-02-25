# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## to run the project
npm run dev

## update versions
- check the compactible node and npm versions
``` 
npm install react@latest react-dom@latest
npm install -g npm-check-updates
ncu -u 
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# folder structure
```
src/
│
├── modules/
│   ├── auth/                    # Module: Authentication
│   │   ├── components/          # Components specific to this module
│   │   │  ├──  Login.tsx		
│   │   │  ├──  TwoFactorAuth.tsx
│   │   ├── services/            # API calls related to authentication
│   │   │   ├── authService.tsx
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   │   ├── useAuth.tsx
│   │   ├── utils/                # Utility functions for auth (e.g., token management)
│   │   │   ├── authHelpers.tsx   # mock OTP generation or verification functions 
│   │   │   ├── localStorageUtils.tsx  # local storage
│   │   ├── state/
│   │   │   ├── AuthContext.tsx             
│   │
│   ├── company/                    # Module: Company Management
│   │   ├── components/             # Components specific to this module	
│   │   │   ├── Company.tsx
│   │   ├── services/            # API calls related to authentication
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   ├── utils/               # Utility functions for report (e.g., token management)
│   │   ├── state/               # State management for user operations (Redux, context, etc.)
│   ├── user/                    # Module: User Management
│   │   ├── components/          # Components specific to this module	
│   │   │   ├── UserList.tsx
│   │   ├── services/            # API calls related to authentication
│   │   │   ├── userService.tsx
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   │   ├── userFetch.tsx
│   │   ├── utils/               # Utility functions for report (e.g., token management)
│   │   │   ├── formatUtils.tsx
│   │   ├── state/               # State management for user operations (Redux, context, etc.)
│   │
│   ├── device/                   # Module: device Management
│   │   ├── components/          # Components specific to this module	
│   │   │   ├── DeviceList.tsx
│   │   ├── services/            # API calls related to authentication
│   │   │   ├──  deviceService.tsx
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   │   ├── deviceFetch.tsx
│   │   ├── utils/               # Utility functions for report (e.g., token management)
│   │   │   ├── tabPropUtils.tsx
│   │   ├── state/               # State management for user operations (Redux, context, etc.)
│   │
│   ├── ref/                     # Module: ref for making the module
│   │   ├── components/          # Components specific to this module	
│   │   ├── services/            # API calls related to authentication
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   ├── utils/               # Utility functions for report (e.g., token management)
│   │   ├── state/               # State management for user operations (Redux, context, etc.)
│   │
│   ├── │report/                 # Module: Reports
│   │   ├── components/          # Components specific to this module	
│   │   │   ├── Report.tsx
│   │   ├── services/            # API calls related to authentication
│   │   │   ├── reportService.tsx
│   │   ├── hooks/               # Redux slice, context, or hooks managing auth state
│   │   │   ├── reportFetch.tsx
│   │   ├── utils/               # Utility functions for report (e.g., token management)
│   │   │   ├── formatUtils.tsx
│   │   ├── state/               # State management for user operations (Redux, context, etc.)
│
├── shared/                      # Shared resources used across modules
│   ├── components/              # Reusable components (Button, Modal, Table, etc.)
│   │   ├── ErrorBoundary
│   │   │   ├── ErrorBoundary.tsx
│   ├── hooks/                   # Shared hooks (useFetch, useAuth, etc.)
│   |   ├── useInactivityLogout.tsx
│   ├── services/                # General services (API client, utility services)
│   |   ├── dataProvider.ts
│   ├── state/                   # Global state management (if necessary)
│   └── validation/              # form validation functions
│   |   ├── validationSchema.ts
│
├── layouts/                     # Shared layouts (Header, Footer, etc.)
│   ├── AppHeader.tsx            # Layout for main application pages
│   ├── SideNav.tsx              # Layout for authentication pages
│
├── routes/                  # Centralized app routing and navigation
│   ├── appRoutes.tsx              # All route definitions (React Router or similar)
│   └── ProtectedRoute.tsx        # HOC for private/protected routes
│
├── store/                       # Global Redux store (if using Redux)
│   ├── rootReducer.tsx         # Root reducer combining module slices
│   ├── store.tsx               # Store configuration (Redux)
│   └── middlewares.tsx         # Custom middlewares if needed
├── test/ 
│
├── assets/                      # Static assets (images, fonts, etc.)
│   ├── images
│        ├── logo.png
├── config
    ├── themeConfig.tsx
├──i18n
│    ├── i18n.tsx  
├── App.tsx                     # Main App component
├── main.tsx                    # Entry point for the React app
├── App.css
├── mui.d.ts                    # overwriting mui - custome createTheme palette
└── ...  
```