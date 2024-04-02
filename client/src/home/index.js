import React from 'react'
import './styles.css'
import logo from './assets/dashboard.png'
const home = () => {
  return (
    <div className='outerContainer'>
      <div>
        <h1 className='heading'>All your data in one place</h1>
            <p className='para'>Intuitive, feature-rich, and flexible. Cashflows Portal is your online tool, where you can manage your payments and access data from all channels via an easy-to-use interface.</p>
          </div>
          <div className='image'><img style={{borderRadius: '12px'}} height={450} width={650} src={logo} alt="logo"/></div>
    </div>
  )
}

export default home
