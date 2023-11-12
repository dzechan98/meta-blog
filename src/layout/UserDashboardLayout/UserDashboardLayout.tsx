import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from '../../components/common/Siderbar'
import { useAuth } from '../../contexts/auth-context'
import SearchInput from '../../components/common/SearchInput'
import Button from '../../components/common/Button'
import Avatar from '../../components/common/Avatar'
import { getLastName } from '../../utils/fn'

const UserDashboardLayout = () => {
    const { userInfo } = useAuth()
    const navigate = useNavigate()
    console.log(userInfo)
    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [])

    return (
        <div className='w-full'>
            <div className='fixed w-[200px] z-[99]'>
                <Sidebar />
            </div>
            <div className='relative min-h-screen max-w-[calc(100%-200px)] left-[200px] py-6 px-4 flex-auto bg-gray-400'>
                <div className='w-full flex items-center justify-between mb-10'>
                    <SearchInput placeholder='Search posts...' position='left' className='w-[300px]' />
                    {userInfo && (
                        <div className='flex items-center gap-4'>
                            <Button to='/dashboard/new-post'>Write new post</Button>
                            <div className='flex items-center gap-1'>
                                <Avatar imageURL={userInfo?.photoURL as string} />
                                <h2 className='font-semibold'>Mr.{getLastName(userInfo.displayName as string)}</h2>
                            </div>
                        </div>
                    )}
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default UserDashboardLayout
