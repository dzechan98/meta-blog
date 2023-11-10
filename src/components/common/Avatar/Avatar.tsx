import { cva } from 'class-variance-authority'

interface IAvatarProps {
    imageURL: string
    size?: 'medium' | 'large'
}

const avatar = cva('cursor-pointer relative', {
    variants: {
        size: {
            medium: 'w-8 h-8',
            large: 'w-12 h-12'
        }
    }
})
const Avatar = ({ imageURL, size = 'large' }: IAvatarProps) => {
    return (
        <div className={avatar({ size })}>
            <img src={imageURL} alt='avatar' className=' w-full h-full object-cover rounded-[50%]' />
        </div>
    )
}

export default Avatar
