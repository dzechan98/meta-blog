import { IPostProps } from './../components/common/Post/Post'
import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore'
import { db } from '../config/firebase'

const useGetPostList = () => {
    const [postList, setPostList] = useState<IPostProps[]>([] as IPostProps[])
    const [loading, setLoading] = useState<boolean>(true)
    const [next, setNext] = useState<boolean>(false)
    const [lastVisible, setLastVisible] = useState<any>()
    const [index, setIndex] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3))
            if (next) {
                q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(3))
            }

            try {
                const querySnapshot = await getDocs(q)
                setLastVisible(querySnapshot?.docs[querySnapshot.docs.length - 1])
                const data: IPostProps[] = []
                querySnapshot?.forEach((doc) => {
                    data.push({
                        postId: doc.id,
                        ...(doc.data() as IPostProps)
                    })
                })
                setLoading(false)
                setPostList([...postList, ...data])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [index])

    useEffect(() => {
        if (next) {
            if (!lastVisible) {
                setDisable(true)
            }
        }
    }, [lastVisible])

    return { postList, loading, index, setIndex, setNext, disable }
}

export default useGetPostList
