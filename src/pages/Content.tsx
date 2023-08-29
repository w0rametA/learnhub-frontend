import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'
import useContent from '../hooks/useContent'
import classes from './Content.module.css'
import ReactStars from 'react-stars'
import Loading from '../components/Loading'
import ReactPlayer from 'react-player'

const Content = () => {
  const { id: postId } = useParams()
  const {
    status: { loading, error, ready },
    data,
  } = useContent(postId || '')

  const { id, isOwnPost } = useAuth()

  // TODO: Display differently given all possible loading, error, and ready state
  if (!ready) return <Loading />

  const { videoTitle, videoUrl, comment, rating, postedBy } = data!

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div>
          <ReactPlayer url={videoUrl} />
          <h4 className={classes.title}>{videoTitle}</h4>
        </div>

        <div>
          <p className={classes.commentText}>{comment}</p>

          <div className={classes.commentFooter}>
            <ReactStars count={rating} edit={false} color1={'gold'} />
            <p>
              <span className={classes.emdash}>&mdash;</span> {postedBy.name}
            </p>
            {
              /*
              TODO: update the conditional rendering here, if you chosen to work with isOwnPost function, please continue to work on AuthProvider.tsx, otherwise you can use `id` from useAuth()
               */ isOwnPost && isOwnPost(data!) && (
                <Link to={`/content/${postId}/Edit`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <p>Edit</p>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
