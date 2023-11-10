import moment from 'moment'
import Avatar from '../Avatar'

interface IPostInfoProps {
    date: Date
    author: string
    avatar: string
    className?: string
}
const PostInfo = ({ avatar, date, author, className }: IPostInfoProps) => {
    return (
        <div className={`text-gray-500 text-sm flex items-center gap-2 ${className}`}>
            <Avatar imageURL={avatar} size='medium' />
            <span className='font-medium mr-1'>{author}</span>
            <span>{moment(date).format('MMMM DD, YYYY')}</span>
        </div>
    )
}

export default PostInfo
