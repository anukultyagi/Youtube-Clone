import { useEffect, useState } from 'react'
import './recommended.css'
import thumbnail1 from './../../assets/thumbnail1.png'
import { valueConvertor } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

    const [recommendedData, setRecommended] = useState(null)

    const fetchRecommendedData = async () => {
        try {
            const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`

            const response = await fetch(apiUrl);
            const result = await response.json();
            setRecommended(result.items);
            console.log(result.items)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRecommendedData()
    }, [])

    return (
        <div className='recommended'>
            {
                recommendedData && recommendedData.map((item, i) => (
                    <Link key={i} to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list">
                        <img src={recommendedData ? item.snippet.thumbnails.default.url : thumbnail1} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{valueConvertor(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                ))
            }

        </div>
    )
}

export default Recommended