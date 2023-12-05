import { useEffect, useState } from 'react'
import Heading from '../../components/common/Heading'
import SearchInput from '../../components/common/SearchInput'
import { useSearchParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IPostProps } from '../../components/common/Post/Post'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const [posts, setPosts] = useState<IPostProps[]>([] as IPostProps[])

    useEffect(() => {
        const fetchPostByKeyword = async () => {
            if (keyword) {
                const q = query(collection(db, 'posts'), where('title', '>=', keyword.toLowerCase()))
                try {
                    const querySnapshot = await getDocs(q)
                    console.log(querySnapshot.docs)
                    const data: IPostProps[] = []
                    querySnapshot.forEach((doc) => {
                        data.push({ postId: doc.id, ...(doc.data() as IPostProps) })
                    })
                    setPosts(data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchPostByKeyword()
    }, [keyword])
    console.log(posts)
    return (
        <section className='container mb-10'>
            <div className='flex items-center gap-3 mb-10'>
                <SearchInput placeholder='Search posts...' position='right' className='w-[600px]' />
            </div>
        </section>
    )
}

export default SearchPage
