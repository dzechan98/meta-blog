import Banner from '../../components/module/Banner'
import HeroPost from '../../components/module/HeroPost'
import PostNewest from '../../components/module/PostNewest'
import PostList from '../../components/module/PostList'
import { postData } from '../../data/postData'

const HomePage = () => {
    return (
        <div>
            <Banner />
            <HeroPost {...postData} />
            <PostNewest />
            <PostList heading='Featured Post' />
        </div>
    )
}

export default HomePage
