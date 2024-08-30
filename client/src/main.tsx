import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/Auth.tsx'
import AppWrapper from './components/AppWrapper.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <AppWrapper>
      <StrictMode>
        <App />
      </StrictMode>
    </AppWrapper>
  </AuthProvider>
)