import { cva } from 'class-variance-authority'

interface IPostTitleProps {
    size?: 'base' | 'medium' | 'large'
    lineCamp?: 'base' | 'medium'
    className?: string
    children: React.ReactNode
}

const PostTitle = ({ size = 'medium', lineCamp = 'medium', className, children }: IPostTitleProps) => {
    const title = cva(`w-full font-semibold text-gray-dark break-words ${className}`, {
        variants: {
            size: {
                base: 'text-sm mb-2',
                medium: 'text-lg mb-2',
                large: 'text-2xl mb-4'
            },
            lineCamp: {
                base: 'line-clamp-2',
                medium: 'line-clamp-4'
            }
        }
    })

    return <h2 className={title({ size, lineCamp })}>{children}</h2>
}

export default PostTitle
