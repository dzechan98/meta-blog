import { IPostProps } from './../components/common/Post/Post'
import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../config/firebase'

const useGetPostList = () => {
    const [postList, setPostList] = useState<IPostProps[]>([] as IPostProps[])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
            try {
                const querySnapshot = await getDocs(q)
                const data: IPostProps[] = []
                querySnapshot.forEach((doc) => {
                    data.push({
                        postId: doc.id,
                        ...(doc.data() as IPostProps)
                    })
                })
                setLoading(false)
                setPostList(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return { postList, loading }
}

export default useGetPostList
