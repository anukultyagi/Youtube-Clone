import "./feed.css"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import moment from 'moment'
import { valueConvertor } from "../../data"


const Feed = ({ category }) => {
    const [data, setData] = useState([])



    const fetchData = async () => {
        try {
            const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
            const response = await fetch(videoListUrl);
            const result = await response.json();
            setData(result.items);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    useEffect(() => {
        fetchData()
    }, [category]);


    return (
        <div className="feed">
            {
                data.map((item, i) => (
                    <Link key={i} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}.</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{valueConvertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                    </Link>
                ))
            }
        </div>
    )
}

export default Feed