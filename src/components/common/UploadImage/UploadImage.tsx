import { ChangeEvent } from 'react'
import upload_image from '../../../assets/img/upload_image.svg'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { GoTrash } from '../../../utils/icons'
import Loading from '../Loading'

interface IUploadImageProps {
    imageURL: string
    removeImage: boolean
    fileName?: string | undefined
    progress: boolean
    noDeleteImage?: boolean
    setImageURL: React.Dispatch<React.SetStateAction<string>>
    setRemoveImage: React.Dispatch<React.SetStateAction<boolean>>
    handleUploadImage: (file: File) => void
}

const UploadImage = ({
    imageURL,
    fileName,
    removeImage,
    progress,
    noDeleteImage = false,
    setImageURL,
    setRemoveImage,
    handleUploadImage
}: IUploadImageProps) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files && event.target.files[0]
        if (file) {
            handleUploadImage(file)
        }
    }

    const handleDeleteImage = (fileName: string | undefined) => {
        const storage = getStorage()
        const desertRef = ref(storage, 'images/' + fileName)
        if (!noDeleteImage) {
            deleteObject(desertRef)
                .then(() => {
                    // File deleted successfully
                    setImageURL('')
                    setRemoveImage(true)
                })
                .catch((error) => {
                    // Uh-oh, an error occurred!
                })
        } else {
            setImageURL('')
            setRemoveImage(true)
        }
    }

    return (
        <div
            className={`group w-full flex justify-center items-center relative rounded-lg bg-light ${
                imageURL && !removeImage ? '' : 'h-[160px]'
            }`}
        >
            {(!imageURL || removeImage) && (
                <div className='w-full opacity-0 absolute inset-0'>
                    <input type='file' className='w-full h-full cursor-pointer' onChange={handleFileChange} />
                </div>
            )}
            <div className='w-full flex items-center justify-center'>
                {imageURL && !removeImage && (
                    <>
                        <img src={imageURL} className='w-full rounded-lg object-cover' alt='upload_image' />
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div
                                className='bg-primary p-6 text-light rounded-full hidden group-hover:flex items-center justify-center cursor-pointer'
                                onClick={() => {
                                    handleDeleteImage(fileName)
                                }}
                            >
                                <GoTrash size={30} />
                            </div>
                        </div>
                    </>
                )}
                {!imageURL && progress && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <Loading border='primary' size='large' />
                    </div>
                )}
                {(!imageURL || removeImage) && !progress && (
                    <img src={upload_image} className='w-[160px] rounded-lg object-cover' alt='upload_image' />
                )}
            </div>
        </div>
    )
}

export default UploadImage
