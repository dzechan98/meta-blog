interface IAvatarProps {
    imageURL: string
}
const Avatar = ({ imageURL }: IAvatarProps) => {
    return (
        <div className='w-12 h-12 cursor-pointer relative'>
            <img src={imageURL} alt='avatar' className=' w-full h-full object-cover rounded-[50%]' />
        </div>
    )
}

export default Avatar
