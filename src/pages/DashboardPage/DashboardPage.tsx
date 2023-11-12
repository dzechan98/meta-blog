import Button from '../../components/common/Button'
import Heading from '../../components/common/Heading'
import Post from '../../components/common/Post'
import { postData } from '../../data/postData'

const DashboardPage = () => {
    return (
        <section className='mb-10'>
            <Heading className='mb-5'>All post</Heading>
            <div className='grid grid-cols-4 gap-4 mb-10'>
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
                <Post {...postData} backgroundColor='light' />
            </div>
            <div className='flex items-center justify-center'>
                <Button intent='outline'>Load more</Button>
            </div>
        </section>
    )
}

export default DashboardPage
