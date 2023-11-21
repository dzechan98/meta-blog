import Category from '../Category'
import PostTitle from '../PostTitle'
import PostInfo from '../PostInfo'
import PostImage from '../PostImage'
import { cva } from 'class-variance-authority'
import { GoTrash, BsEyeSlash, BiPencil } from '../../../utils/icons'
import { useNavigate } from 'react-router-dom'

export interface IPostProps {
    imageURL: string
    categoryId: string
    title: string
    avatar: string
    author: string
    postId?: string
    isBorder?: boolean
    heightImage?: string
    widthImage?: string
    sizeTitle?: 'base' | 'medium' | 'large'
    direction?: 'row' | 'col'
    sizeCategory?: 'base' | 'medium'
    lineCamp?: 'base' | 'medium'
    hidePostInfo?: boolean
    backgroundColor?: 'dark' | 'light'
    action?: boolean
    createdAt: {
        seconds: number
    }
    hideButtonLike?: boolean
    content?: string
    featured?: boolean
    handleDeletePost?: (postId: string) => void
}

const post = cva('flex w-full h-full', {
    variants: {
        isBorder: {
            true: 'p-4 rounded-lg border border-dark-light'
        },
        direction: {
            row: 'flex-row',
            col: 'flex-col justify-between'
        },
        backgroundColor: {
            dark: 'p-4 rounded-lg bg-dark',
            light: 'p-4 rounde-lg bg-light'
        }
    }
})

const Post = ({
    imageURL,
    categoryId,
    title,
    avatar,
    author,
    heightImage = 'h-full',
    widthImage = 'w-full',
    isBorder = true,
    sizeTitle = 'medium',
    direction = 'col',
    sizeCategory = 'medium',
    lineCamp = 'medium',
    hidePostInfo = false,
    backgroundColor,
    action = false,
    postId,
    createdAt,
    hideButtonLike,
    handleDeletePost = () => {}
}: IPostProps) => {
    const navigate = useNavigate()
    return (
        <div className={post({ isBorder, direction, backgroundColor })}>
            <div className={direction === 'row' ? 'flex gap-2' : 'gap-2 flex flex-col'}>
                <div className={`overflow-hidden flex-shrink-0 rounded-md ${widthImage} ${heightImage}`}>
                    <PostImage imageURL={imageURL} className='hover:scale-110' to={`/post/${postId}`} />
                </div>
                <div className='w-full'>
                    <Category size={sizeCategory} categoryId={categoryId} />
                    <PostTitle size={sizeTitle} lineCamp={lineCamp}>
                        {title}
                    </PostTitle>
                    {direction === 'row' && (
                        <PostInfo
                            author={author}
                            avatar={avatar}
                            sizeAvatar='medium'
                            date={createdAt?.seconds}
                            hideButtonLike={hideButtonLike}
                        />
                    )}
                </div>
            </div>
            {!hidePostInfo && (
                <div className='wrap'>
                    <PostInfo
                        author={author}
                        avatar={avatar}
                        date={createdAt?.seconds}
                        hideButtonLike={hideButtonLike}
                    />
                    {action && (
                        <div className='flex items-center gap-2'>
                            <span
                                className='p-3 hover:bg-primary hover:text-light transition-all rounded-[50%] cursor-pointer'
                                onClick={() => navigate(`/post/${postId}`)}
                            >
                                <BsEyeSlash size={25} />
                            </span>
                            <span
                                className='p-3 hover:bg-primary hover:text-light transition-all rounded-[50%] cursor-pointer'
                                onClick={() => navigate(`/dashboard/my-post/update/${postId}`)}
                            >
                                <BiPencil size={25} />
                            </span>
                            <span
                                className='p-3 hover:bg-primary hover:text-light transition-all rounded-[50%] cursor-pointer'
                                onClick={() => {
                                    console.log(postId)
                                    handleDeletePost(String(postId))
                                }}
                            >
                                <GoTrash size={25} />
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Post
