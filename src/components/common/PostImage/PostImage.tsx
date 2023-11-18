interface IPostImageProps {
    imageURL: string
    width?: string
    height?: string
    className?: string
}

const PostImage = ({ imageURL, width = 'w-full', height = 'h-full', className = '' }: IPostImageProps) => {
    return (
        <img
            src={imageURL}
            alt='image post'
            loading='lazy'
            className={`cursor-pointer object-cover rounded-md transition-all duration-300 ${width} ${height} ${className}`}
        />
    )
}

export default PostImage
