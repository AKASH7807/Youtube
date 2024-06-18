import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_conventer } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

const [apiData, setApiData] = useState([])

const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=30&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url).then(res => res.json()).then(data => setApiData(data.items));
}

useEffect(()=>{
  fetchData();
},[apiData])

  return (

    <div className='recommended'>
       {apiData.map((item,index)=>{
         return (

                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
                <img src={item.snippet.thumbnails.medium.url} />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{value_conventer(item.statistics.likeCount)} views</p>
                </div>
            </Link>
            )
          })}
       
    </div>
    
  )

  }


export default Recommended
