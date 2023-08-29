import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import Loading from '../components/Loading'
import { useAuth } from '../contexts/AuthProvider'
import withGuard from '../guards/withGuard'
import useContent from '../hooks/useContent'
import classes from './Edit.module.css'

const Edit = () => {
  const { id } = useParams()
  const {
    status: { error, loading, ready },
    data,
    editPost,
  } = useContent(id || '')

  // Hint: we may need auth token to patch the upcoming content
  const { token, getAuthHeader } = useAuth()
  // ORrrrrr, if you decided to put logic in `editPost` function instead, like useAuth() under useContent(), we'd certainly don't need for this line

  const [rating, setRating] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    // TODO: What should happen if we later received current content's rating?
  }, [data])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    try {
      // TODO: Try patch new content to server
    } catch (err) {
      // TODO: Handling error
    } finally {
      setSubmitting(false)
    }
  }

  if (!ready) return <Loading />

  const { comment } = data!

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Edit content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input type="text" id="comment" defaultValue={comment} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars count={5} value={rating} size={42} half={false} color2="#ff731d" />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}

export default withGuard(Edit)
