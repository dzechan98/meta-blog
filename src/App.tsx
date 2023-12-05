import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import DefaultLayout from './layout/DefaultLayout'
import SinglePostPage from './pages/SinglePostPage'
import UserDashboardLayout from './layout/UserDashboardLayout'
import DashboardPage from './pages/DashboardPage'
import { useEffect } from 'react'
import AddPostPage from './pages/AddPostPage'
import { signOut } from 'firebase/auth'
import { auth } from './config/firebase'
import MyPostPage from './pages/MyPostPage'
import UpdatePostPage from './pages/UpdatePostPage'
import SearchPage from './pages/SearchPage'

function App() {
    useEffect(() => {
        const handleSignOutUnload = () => {
            signOut(auth)
        }
        window.addEventListener('unload', handleSignOutUnload)

        return () => {
            window.removeEventListener('unload', handleSignOutUnload)
        }
    }, [])

    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/post/:postId' element={<SinglePostPage />} />
                <Route path='/search' element={<SearchPage />} />
            </Route>
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/dashboard' element={<UserDashboardLayout />}>
                <Route path='home' element={<DashboardPage />} />
                <Route path='new-post' element={<AddPostPage />} />
                <Route path='my-post' element={<MyPostPage />} />
                <Route path='my-post/update/:postId' element={<UpdatePostPage />} />
            </Route>
        </Routes>
    )
}

export default App
