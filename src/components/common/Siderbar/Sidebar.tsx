import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import { AiOutlineFileText, AiOutlinePlusCircle, GoHome, RiContactsLine, TbLogout } from '../../../utils/icons'
import Swal from 'sweetalert2'
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firebase'

const menuSidebar = [
    { key: 0, title: 'Dashboard', icons: <GoHome size={25} />, path: '/dashboard/home' },
    { key: 1, title: 'New post', icons: <AiOutlinePlusCircle size={25} />, path: '/dashboard/new-post' },
    { key: 2, title: 'My post', icons: <AiOutlineFileText size={25} />, path: '/dashboard/my-post' },
    { key: 3, title: 'Profile', icons: <RiContactsLine size={25} />, path: '/dashboard/profile' }
]

const active =
    'cursor-pointer shadow-sm shadow-primary flex items-center gap-x-1 px-4 py-2 rounded-lg bg-primary text-light font-medium transition-all'
const notActive =
    'cursor-pointer flex items-cetner gap-x-1 px-4 py-2 rounded-lg text-gray-dark font-medium hover:bg-primary hover:text-light transition-all'

const Sidebar = () => {
    const navigate = useNavigate()
    const handleSignOut = (): void => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sign out!!!'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                navigate('/')
            }
        })
    }
    
    return (
        <div className='w-full h-screen px-4 py-6'>
            <Logo to='/' className='mb-10' />
            <ul className='flex flex-col gap-y-4'>
                {menuSidebar.map((item) => (
                    <li className='text-lg' key={item.key}>
                        <NavLink to={item.path} className={({ isActive }) => (isActive ? active : notActive)}>
                            {item.icons}
                            {item.title}
                        </NavLink>
                    </li>
                ))}
                <li className='text-lg'>
                    <div className={notActive} onClick={handleSignOut}>
                        <TbLogout size={25} />
                        Logout
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
