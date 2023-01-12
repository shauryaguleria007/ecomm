import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './home.css'
const Product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: 2.5,
    isHalf: false,
  }

  return (
    <Link className='productCard' to={Product.id}>
      <img src={product.images[0].url} alt='' />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>(256 Reviews)</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  )
}

export default Product
