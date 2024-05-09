import React from 'react'
import AllProducts from '../components/products/AllProducts'
import MyNavbar from '../components/navbar/MyNavbar'
import Footer from '../components/footer/Footer'


const Home = () => {
  return (
    <div>
        <MyNavbar/>
        <AllProducts/>
        <Footer/>
    </div>
  )
}

export default Home