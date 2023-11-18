import Button from '../../components/common/Button'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import LoadingPostCol from '../../components/module/LoadingPostCol'
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
                            <Post
                                {...post}
                                key={post.postId}
                                backgroundColor='light'
                                heightImage='h-[260px]'
                                lineCamp='base'
                            />
                        ))}
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button intent='outline'>Load more</Button>
                    </div>
                </>
            )}

            {loading && (
                <div className='grid grid-cols-3 gap-4 mb-10'>
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                    <LoadingPostCol />
                </div>
            )}
            {!loading && postList.length === 0 && (
                <>
                    <h2 className='text-4xl text-primary font-bold text-center'>No posts</h2>
                </>
            )}
        </section>
    )
}

export default DashboardPage
