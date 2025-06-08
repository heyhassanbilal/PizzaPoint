import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./firebase.js"
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider } from './utils/AuthContext.jsx'
// import {firebaseApp as app, auth} from './firebase' //Import app from firebase.js

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px', backgroundColor: '#ffebee', border: '1px solid #f44336' }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <pre style={{ fontSize: '12px', color: '#666' }}>{error.stack}</pre>
      <button onClick={resetErrorBoundary} style={{ marginTop: '10px', padding: '8px 16px' }}>
        Try again
      </button>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      <App />
    </ErrorBoundary>
    </AuthProvider>
  </StrictMode>,
)
