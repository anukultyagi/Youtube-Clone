import './playvideo.css'

import like from './../../assets/like.png'
import dislike from './../../assets/dislike.png'
import share from './../../assets/share.png'
import save from './../../assets/save.png'
import jack from './../../assets/jack.png'
import user_profile from './../../assets/user_profile.jpg'

import { useEffect, useState } from 'react'
import moment from 'moment'
import { valueConvertor } from '../../data'


const Playvideo = ({ videoId }) => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const fetchVideoData = async () => {
        //fetching Videos Data
        try {
            const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
            const response = await fetch(apiUrl);
            const result = await response.json();
            setApiData(result.items[0]);

        } catch (error) {
            console.log("error", error)
        }

    }
    const fetchChannelData = async () => {
        //fetching channel Data
        try {
            const apiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData ? apiData.snippet.channelId : ''}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
            const response = await fetch(apiUrl);
            const result = await response.json();
            setChannelData(result.items[0]);

        } catch (error) {
            console.log("error", error)
        }

    }
    const fetchCommentData = async () => {
        //fetching comment Data
        try {
            const apiUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
            const response = await fetch(apiUrl);
            const result = await response.json();
            setCommentData(result.items);

        } catch (error) {
            console.log("error", error)
        }

    }

    useEffect(() => {
        fetchVideoData()

    }, [videoId])
    useEffect(() => {
        fetchChannelData()
    }, [apiData])
    useEffect(() => {
        fetchCommentData()
    }, [apiData])

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe width="490" height="480" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <h3>{apiData ? apiData.snippet.title : 'Title Here'} </h3>
            <div className="play-video-info">
                <p>{valueConvertor(apiData ? apiData.statistics.viewCount : 16000)} views &bull; {moment(apiData ? apiData.snippet.publishedAt : 10).fromNow()} </p>
                <div>
                    <span>
                        <img src={like} alt='' />{valueConvertor(apiData ? apiData.statistics.likeCount : 150)}
                    </span>
                    <span>
                        <img src={dislike} alt='' />
                    </span>
                    <span>
                        <img src={share} alt='' />Share
                    </span>
                    <span>
                        <img src={save} alt='' />Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : jack} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : 'Channel Title'}</p>
                    <span>{valueConvertor(channelData ? channelData.statistics.subscriberCount : 100)} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) + "..." : 'lol'}</p>

                <hr />
                <h4>{valueConvertor(apiData ? apiData.statistics.commentCount : 1000)} Comments</h4>
                {
                    commentData && commentData.map((item, i) => (
                        <div key={i} className="comment">
                            <img src={commentData ? item.snippet.topLevelComment.snippet.authorProfileImageUrl : user_profile} alt="" />
                            <div>
                                <h3>{commentData ? item.snippet.topLevelComment.snippet.authorDisplayName : ''} <span>{moment(commentData ? item.snippet.topLevelComment.snippet.publishedAt : 10).fromNow()}</span></h3>
                                <p>{commentData ? item.snippet.topLevelComment.snippet.textDisplay : ''}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{commentData ? item.snippet.topLevelComment.snippet.likeCount : 10}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default Playvideo