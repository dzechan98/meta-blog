import Category from '../Category'
import PostTitle from '../PostTitle'
import PostInfo from '../PostInfo'
import PostImage from '../PostImage'
import { cva } from 'class-variance-authority'

export interface IPostProps {
    imageURL: string
    category: string
    title: string
    avatar: string
    author: string
    date: Date
    isBorder?: boolean
    heightImage?: string
    widthImage?: string
    sizeTitle?: 'base' | 'medium' | 'large'
    direction?: 'row' | 'col'
    sizeCategory?: 'base' | 'medium'
    lineCamp?: 'base' | 'medium'
    hidePostInfo?: boolean
}

const post = cva('flex gap-4', {
    variants: {
        isBorder: {
            true: 'p-4 rounded-lg border border-dark-light'
        },
        direction: {
            row: 'flex-row',
            col: 'flex-col'
        }
    }
})

const Post = ({
    imageURL,
    category,
    title,
    avatar,
    author,
    date,
    heightImage = 'h-full',
    widthImage = 'w-full',
    isBorder = true,
    sizeTitle = 'medium',
    direction = 'col',
    sizeCategory = 'medium',
    lineCamp = 'medium',
    hidePostInfo = false
}: IPostProps) => {
    return (
        <div className={post({ isBorder, direction })}>
            <div className={`overflow-hidden flex-col rounded-md ${widthImage} ${heightImage}`}>
                <PostImage imageURL={imageURL} className='hover:scale-110' />
            </div>

            <div className='wrap'>
                <Category size={sizeCategory}>{category}</Category>
                <PostTitle size={sizeTitle} lineCamp={lineCamp}>
                    {title}
                </PostTitle>
                {!hidePostInfo && <PostInfo author={author} avatar={avatar} date={date} />}
            </div>
        </div>
    )
}

export default Post
