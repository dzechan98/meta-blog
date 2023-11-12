import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import { AiOutlineFileText, AiOutlinePlusCircle, GoHome, RiContactsLine, TbLogout } from '../../../utils/icons'
import { handleSignOut } from '../../../utils/fn'

const menuSidebar = [
    { key: 0, title: 'Dashboard', icons: <GoHome size={25} />, path: '/dashboard/home' },
    { key: 1, title: 'New post', icons: <AiOutlinePlusCircle size={25} />, path: '/dashboard/new-post' },
    { key: 2, title: 'My post', icons: <AiOutlineFileText size={25} />, path: '/dashboard/post' },
    { key: 3, title: 'Profile', icons: <RiContactsLine size={25} />, path: '/dashboard/profile' },
    { key: 4, title: 'Logout', icons: <TbLogout size={25} />, path: '/', onClick: handleSignOut }
]

const active =
    'shadow-sm shadow-primary flex items-center gap-x-1 px-4 py-2 rounded-lg bg-primary text-light font-medium transition-all'
const notActive =
    'flex items-cetner gap-x-1 px-4 py-2 rounded-lg text-gray-dark font-medium hover:bg-primary hover:text-light transition-all'

const Sidebar = () => {
    return (
        <div className='w-full h-screen px-4 py-6'>
            <Logo to='/' className='mb-10' />
            <ul className='flex flex-col gap-y-4'>
                {menuSidebar.map((item) => (
                    <li className='text-lg' key={item.key}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? active : notActive)}
                            onClick={item?.onClick}
                        >
                            {item.icons}
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
