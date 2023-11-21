import Banner from '../../components/module/Banner'
import HeroPost from '../../components/module/HeroPost'
import PostNewest from '../../components/module/PostNewest'
import PostList from '../../components/module/PostList'
import { useEffect, useState } from 'react'
import { IPostProps } from '../../components/common/Post/Post'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'

const HomePage = () => {
    const [listPosts, setListPosts] = useState<IPostProps[]>([] as IPostProps[])
    useEffect(() => {
        const fetchPostFeatured = async () => {
            const q = query(collection(db, 'posts'), where('featured', '==', true))
            try {
                const querySnapshot = await getDocs(q)
                const data: IPostProps[] = []
                querySnapshot.forEach((doc) => {
                    data.push({ postId: doc.id, ...(doc.data() as IPostProps) })
                })
                setListPosts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPostFeatured()
    }, [])
    return (
        <>
            <Banner />
            <HeroPost />
            <PostNewest />
            <PostList heading='Featured Post' listPosts={listPosts} />
        </>
    )
}

export default HomePage
