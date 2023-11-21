import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useCallback, useRef, memo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ITextEditorProps {
    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
}

const TextEditor = ({ content, setContent }: ITextEditorProps) => {
    const reactQuillRef = useRef<ReactQuill>(null)
    console.log(content)

    const handleUploadImage = async (file: File): Promise<string> => {
        try {
            const storage = getStorage()
            const metadata = {
                contentType: 'image/jpeg'
            }
            const storageRef = ref(storage, 'images/' + file.name)

            const uploadTask = uploadBytesResumable(storageRef, file, metadata)

            await new Promise<void>((resolve, reject) => {
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
                            case 'storage/canceled':
                            case 'storage/unknown':
                                reject(error)
                                break
                            default:
                                reject(error)
                                break
                        }
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                            console.log('File available at', downloadURL)
                            resolve()
                        } catch (error) {
                            reject(error)
                        }
                    }
                )
            })

            return getDownloadURL(uploadTask.snapshot.ref)
        } catch (error: any) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // Xử lý lỗi không được phép
                    break
                case 'storage/canceled':
                    // Xử lý lỗi đã hủy
                    break
                case 'storage/unknown':
                    // Xử lý lỗi không xác định
                    break
                default:
                    // Xử lý lỗi khác
                    break
            }
            throw error
        }
    }

    const imageHandler = useCallback(() => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0]
                const url = await handleUploadImage(file)
                const quill = reactQuillRef.current
                if (quill) {
                    const range = quill.getEditorSelection()
                    range && quill.getEditor().insertEmbed(range.index, 'image', url)
                }
            }
        }
    }, [])

    return (
        <ReactQuill
            ref={reactQuillRef}
            theme='snow'
            value={content}
            onChange={setContent}
            modules={{
                toolbar: {
                    container: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image', 'video'],
                        ['code-block'],
                        ['clean']
                    ],
                    handlers: {
                        image: imageHandler // <-
                    }
                },
                clipboard: {
                    matchVisual: false
                }
            }}
            formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'video',
                'code-block'
            ]}
        />
    )
}

export default memo(TextEditor)
