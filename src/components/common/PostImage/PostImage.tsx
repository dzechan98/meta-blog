interface IPostImageProps {
    imageURL: string
    className?: string
}

const PostImage = ({ imageURL, className = '' }: IPostImageProps) => {
    return (
        <img
            src={imageURL}
            alt='image post'
            loading='lazy'
            className={`cursor-pointer w-full h-full object-cover rounded-md transition-all duration-300 ${className}`}
        />
    )
}

export default PostImage
