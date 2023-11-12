import { ChangeEvent, useState } from 'react'
import upload_image from '../../../assets/img/upload_image.svg'

interface IUploadImageProps {
    handleUploadImage: (file: File) => Promise<string | null>
    setImageURL: React.Dispatch<React.SetStateAction<string | null>>
}

const UploadImage = ({ handleUploadImage, setImageURL }: IUploadImageProps) => {
    const [image, setImage] = useState<string | null>(null)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files && event.target.files[0]
        if (file) {
            try {
                const getImageURL: string | null = await handleUploadImage(file)
                setImageURL(getImageURL)
                setImage(getImageURL)
            } catch (error) {
                setImageURL(null)
                setImage(null)
            }
        }
    }

    return (
        <div
            className={`w-full flex justify-center items-center relative rounded-lg bg-light ${
                image ? '' : 'h-[200px]'
            }`}
        >
            <div className='w-full opacity-0 absolute inset-0'>
                <input type='file' className='w-full h-full cursor-pointer' onChange={handleFileChange} />
            </div>
            <div className='w-full flex items-center justify-center'>
                {image && <img src={image} className='w-full rounded-lg object-cover' alt='upload_image' />}
                {!image && <img src={upload_image} className='w-[160px] rounded-lg object-cover' alt='upload_image' />}
            </div>
        </div>
    )
}

export default UploadImage
