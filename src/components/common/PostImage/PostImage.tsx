const PostImage = ({ imageURL, className = 'h-full' }: { imageURL: string; className?: string }) => {
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
