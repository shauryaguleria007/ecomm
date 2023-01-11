import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/Appstore.png'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='leftFooter'>
        <h4>downlod our app</h4>
        <p>Download our app on androis and app store</p>
        <img src={playstore} alt='playstore' />
        <img src={appstore} alt='appstore' />
      </div>
      <div className='midFooter'>
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href='http://instagram.com/meabhisingh'>Instagram</a>
        <a href='http://youtube.com/6packprogramemr'>Youtube</a>
        <a href='http://instagram.com/meabhisingh'>Facebook</a>
      </div>
    </footer>
  )
}

export default Footer
