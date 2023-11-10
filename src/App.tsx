import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import DefaultLayout from './layout/DefaultLayout'
import SinglePostPage from './pages/SinglePostPage'

function App() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/post/:postId' element={<SinglePostPage />} />
            </Route>
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
        </Routes>
    )
}

export default App
