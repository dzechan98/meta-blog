import moment from 'moment'
import Avatar from '../Avatar'
import { AiFillLike, AiOutlineLike } from '../../../utils/icons'
import { useState } from 'react'

interface IPostInfoProps {
    date?: number
    author: string
    avatar: string
    hideButtonLike?: boolean
    className?: string
}

const PostInfo = ({ avatar, date = 0, author, hideButtonLike = false, className }: IPostInfoProps) => {
    const [toggleButtonLike, setToggleButtonLike] = useState<boolean>(false)
    const handleToggleButtonLike = () => {
        setToggleButtonLike(!toggleButtonLike)
    }
    return (
        <div className={`text-gray-500 text-sm flex items-center justify-between ${className}`}>
            <div className='flex items-center gap-2'>
                <Avatar imageURL={avatar} size='large' />
                <div className='flex flex-col'>
                    <span className='font-medium mr-1'>{author}</span>
                    <span>{moment(date * 1000).format('MMMM DD, YYYY')}</span>
                </div>
            </div>
            {!hideButtonLike && (
                <span className='cursor-pointer text-primary' onClick={handleToggleButtonLike}>
                    {!toggleButtonLike && <AiOutlineLike size={30} />}
                    {toggleButtonLike && <AiFillLike size={30} />}
                </span>
            )}
        </div>
    )
}

export default PostInfo
