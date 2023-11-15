import { NavLink } from 'react-router-dom'
import Button from '../../common/Button'
import Logo from '../../common/Logo'
import { useAuth } from '../../../contexts/auth-context'
import Avatar from '../../common/Avatar'
import SearchInput from '../../common/SearchInput'
import { getLastName } from '../../../utils/fn'
import Swal from 'sweetalert2'
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firebase'

const menuHeader = [
    { key: 0, title: 'Home', path: '/' },
    { key: 1, title: 'Blog', path: '/blog' },
    { key: 2, title: 'About', path: '/about' }
]

const active =
    'text-primary font-medium text-lg relative before:absolute before:w-full before:left-0 before:h-[3px] before:-bottom-1 before:bg-primary before:rounded-lg'
const notActive =
    'text-gray-500 hover:text-primary font-medium text-lg relative before:absolute before:w-0 before:-translate-x-1/2 before:left-1/2 before:h-[3px] before:-bottom-1 before:bg-primary before:transition-all before:rounded-lg hover:before:left-0 hover:before:translate-x-0 hover:before:w-full'

const Header = () => {
    const { userInfo } = useAuth()
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
            }
        })
    }

    return (
        <header className='w-full'>
            <div className='container'>
                <div className='h-[80px] flex justify-between items-center'>
                    <div className='flex items-center gap-5'>
                        <Logo to='/' />
                        <ul className='flex items-center gap-5'>
                            {menuHeader.map((item) => (
                                <li key={item.key}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => (isActive ? active : notActive)}
                                    >
                                        {item.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        <SearchInput placeholder='Search posts...' />
                        {userInfo && (
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-1'>
                                    <Avatar imageURL={userInfo?.photoURL as string} to='/dashboard/home' />
                                    <h2 className='font-semibold'>Mr.{getLastName(userInfo.displayName as string)}</h2>
                                </div>
                                <Button rounded='md' onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </div>
                        )}
                        {!userInfo && (
                            <Button to='/sign-in' rounded='md'>
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
