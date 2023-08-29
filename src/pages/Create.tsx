import * as React from 'react'
import { FormEvent, useState } from 'react'
import { host } from '../constant'
import ReactStars from 'react-stars'
import { useAuth } from '../contexts/AuthProvider'
import withGuard from '../guards/withGuard'
import classes from './Create.module.css'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [rating, setRating] = useState(0)
  const [videoUrl, setVideoUrl] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const { token } = useAuth() // Hint: we may need auth token for posting new content
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    try {
      // TODO: Try post new blog to server
      // fetch(`https://${host}/auth/me`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...getAuthHeader,
      //   },
      // })

      const res = await fetch(`http://${host}/content`, {
        method: 'POST',
        body: JSON.stringify({
          videoUrl: videoUrl,
          comment: comment,
          rating: rating,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data)
      alert(`Content Created`)
      navigate('/')
    } catch (err) {
      // TODO: Handling error
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Create new content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="video-url">Video URL</label>
          <input
            type="text"
            id="video-url"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideoUrl(e.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input
            type="text"
            id="comment"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
          />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars
              count={5}
              value={rating}
              size={42}
              half={false}
              color2="#ff731d"
              onChange={(newRating) => setRating(newRating)}
            />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default withGuard(Create)
