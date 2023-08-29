import React from 'react'
import { ContentDto } from '../types/dto'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'

const CardContent = (props: { content: ContentDto }) => {
  const { content } = props
  return (
    <Link to={`/content/${content.id}`}>
      <div className="flex flex-col justify-between">
        <img src={content.thumbnailUrl} alt="thumnail" />
        <div>
          <div>
            <div>
              <h4>{content.videoTitle}</h4>
              <h5>{content.creatorName}</h5>
            </div>
            <h5>{content.comment}</h5>
          </div>
          <div>
            <p>{content.postedBy.name}</p>
            <div>
              <ReactStars count={content.rating} edit={false} color1={'gold'} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardContent
