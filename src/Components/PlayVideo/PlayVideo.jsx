import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_conventer } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {


    const {videoId} = useParams()

const [apiData, setApiData] = useState(null)
const [channelData, setChannelData] = useState(null)
const [commentData, setCommentData] = useState([])

const fetchVideoData = async () =>{
        //Fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;  
    await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]))
}

const fetchOtherData = async () =>{
    //Fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&maxResults=50&key=${API_KEY}`
    await fetch(channelData_url).then(res => res.json()).then(data => setChannelData(data.items[0]))

}

const fetchComment = async () =>{
    //Fetching Coment Data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url).then(res => res.json()).then(data => setCommentData(data.items))
}

useEffect(()=>{
    fetchVideoData();
},[videoId])


useEffect(()=>{
    fetchOtherData();
},[apiData])



useEffect(()=>{
    fetchComment();
},[commentData])



  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}

        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Watch this Before 2023 | 5 Steps to Fix Your Life (Tamil) | almost everything" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p> {apiData?value_conventer(apiData.statistics.viewCount):"16k"} view &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
        <span><img src={like} />{apiData?value_conventer(apiData.statistics.likeCount):"122"}</span>
        <span><img src={dislike} /></span>
        <span><img src={share} />Share</span>
        <span><img src={save} />Save</span>
        </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:''}  />
            <div>
            <p>{apiData?apiData.snippet.channelTitle:"Channal"}</p>
            <span>{channelData?value_conventer(channelData.statistics.subscriberCount):"1M"} Subscriber</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
           <p>{apiData?apiData.snippet.description.slice(0,250):""}</p>
            <hr />
            <h4> {value_conventer(apiData?apiData.statistics.commentCount:150)} comments</h4>
          

          {commentData.map((item,index)=>{
            return(
                <div key={index}  className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} className='user'/>
                <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                    <img src={like}  />
                    <span>{value_conventer(item.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike}  />
                </div>
                </div>
            </div>
            )
          })}
               
             

          


        </div>
    </div>
    
  )
}

export default PlayVideo
