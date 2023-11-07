import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
        </div>
    )
}

export default DefaultLayout
