import Footer from '../../components/module/Footer'
import Header from '../../components/module/Header'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </div>
    )
}

export default DefaultLayout
