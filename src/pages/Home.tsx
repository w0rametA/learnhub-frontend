import React from 'react'
import Banner from '../components/Banner'
import Container from '../components/Container'

const Home = () => {
  return (
    <div>
      <div className="m-0 p-0 text-indigo-300 bg-orange-100">
        <Banner />
      </div>
      <Container />
    </div>
  )
}

export default Home
