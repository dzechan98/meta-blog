import { cva } from 'class-variance-authority'
import { DocumentData, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../config/firebase'

interface ICategoryProps {
    size?: 'base' | 'medium'
    margin?: 'base' | 'medium'
    categoryId: string
}

const category = cva('capitalize p-1 inline-block rounded-md font-medium text-primary bg-tertiary', {
    variants: {
        size: {
            base: 'text-[12px] mb-2',
            medium: 'text-sm mb-2'
        },
        margin: {
            base: 'mb-2',
            medium: 'mb-4'
        }
    }
})

const Category = ({ margin = 'base', size = 'medium', categoryId }: ICategoryProps) => {
    const [value, setValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const getCategory = async () => {
            try {
                const docRef = doc(db, 'categories', categoryId)
                const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(docRef)
                setValue(docSnap.data()?.name)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getCategory()
    }, [])

    return (
        <>
            {loading && (
                <div role='status' className='max-w-sm animate-pulse'>
                    <div className={`h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-20 mb-4`} />
                    <span className='sr-only'>Loading...</span>
                </div>
            )}
            {!loading && <h2 className={category({ size, margin })}>{value}</h2>}
        </>
    )
}

export default Category
