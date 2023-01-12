import React from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import Product from './Product'

const Home = () => {
  const product = {
    name: 'product',
    price: 3434,
    images: [
      {
        url: 'https://5.imimg.com/data5/BG/UM/MY-23375112/61-500x500.jpg',
      },
    ],
  }
  return (
    <>
      <div className='banner'>
        <p>Welcome to Ecommerce </p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href='#container'>
          <button>
            scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className='container' id='container'>
        <Product product={product} />
        <Product product={product} /> <Product product={product} />
        <Product product={product} /> <Product product={product} />
        <Product product={product} /> <Product product={product} />
        <Product product={product} />
      </div>
    </>
  )
}

export default Home
