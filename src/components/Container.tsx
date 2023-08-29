import React from 'react'
import CardContent from './CardContent'
import useContentList from '../hooks/useContentList'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const Container = () => {
  const { isLoggedIn } = useAuth()
  const {
    data: contents,
    status: { loading },
  } = useContentList()

  console.log(contents)

  if (loading) return <h1>Loading...</h1>

  return (
    <div className="flex flex-col justify-center p-0 mx-32 my-8">
      {isLoggedIn ? (
        <Link to="/Create">
          <div className="flex justify-end ">
            <button className="px-4 py-3 bg-pink-400 rounded-lg">Create new content</button>
          </div>
        </Link>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-5 gap-8 items-stretch justify-items-stretch my-9">
        {contents &&
          contents.map((content) => {
            return <CardContent key={content.id} content={content} />
          })}
      </div>
    </div>
  )
}

export default Container
