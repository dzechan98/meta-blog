import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const getLastName = (name: string): string => {
    const lastName = name.split(' ')
    return lastName[lastName.length - 1]
}

export const handleSignOut = (): void => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Sign out!!!'
    }).then((result) => {
        if (result.isConfirmed) {
            signOut(auth)
        }
    })
}

export const handleUploadImage = async (file: File): Promise<string | null> => {
    const storage = getStorage()
    const metadata = {
        contentType: 'image/jpeg'
    }

    return new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, 'images/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        reject(error.message)
                        break
                    case 'storage/canceled':
                        reject('Upload canceled')
                        break
                    case 'storage/unknown':
                        reject('Unknown error occurred')
                        break
                    default:
                        reject(error.message)
                }
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    console.log('File available at', downloadURL)
                    resolve(downloadURL)
                } catch (error) {
                    reject('Error getting download URL')
                }
            }
        )
    })
}
