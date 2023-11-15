import Button from '../../components/common/Button'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import LoadingPost from '../../components/module/LoadingPost'
import useGetPostList from '../../hooks/useGetPostList'

const DashboardPage = () => {
    const { postList, loading } = useGetPostList()
    return (
        <section className='mb-10'>
            <Heading className='mb-5'>All post</Heading>
            {!loading && postList.length > 0 && (
                <>
                    <div className='grid grid-cols-3 gap-4 mb-10'>
                        {postList?.map((post) => (
                            <Post {...post} key={post.postId} backgroundColor='light' heightImage='h-[260px]' />
                        ))}
                    </div>
                    <div className='flex items-c enter justify-center'>
                        <Button intent='outline'>Load more</Button>
                    </div>
                </>
            )}
            {loading && <LoadingPost />}
            {!loading && postList.length === 0 && (
                <>
                    <h2 className='text-4xl text-primary font-bold text-center'>No posts</h2>
                </>
            )}
        </section>
    )
}

export default DashboardPage
