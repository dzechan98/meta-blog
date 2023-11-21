import { useNavigate } from 'react-router-dom'

interface IPostImageProps {
    imageURL: string
    width?: string
    height?: string
    to?: string
    className?: string
}

const PostImage = ({ imageURL, width = 'w-full', height = 'h-full', to, className = '' }: IPostImageProps) => {
    const navigate = useNavigate()

    return (
        <img
            src={imageURL}
            alt='image post'
            loading='lazy'
            className={`cursor-pointer object-cover rounded-md transition-all duration-300 ${width} ${height} ${className}`}
            onClick={() => {
                if (to) {
                    navigate(to)
                }
            }}
        />
    )
}

export default PostImage
