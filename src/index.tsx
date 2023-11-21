import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/auth-context'
import CategoryProvider from './contexts/category-context'
import 'react-toastify/dist/ReactToastify.css'
import "react-quill/dist/quill.snow.css";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <CategoryProvider>
                    <App />
                </CategoryProvider>
            </AuthProvider>
        </Router>
        <ToastContainer />
    </React.StrictMode>
)
