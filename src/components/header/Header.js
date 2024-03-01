import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.jpeg'
import HeaderSocials from './HeaderSocials'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

function Header() {
  const [header, setHeader] = useState([])
  useEffect(() => {
    async function getHeader() {
      try {
        const response = await axios.get("http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/api/header")
        console.log(header.data)
        setHeader(response.data.header[0])
      } catch (error) {
        console.log(error)
      }
    }
    getHeader()
  }, [])
  return (
    <header>
      <div className='container header__container'>
        <h5>Hello I'm</h5>
        <span id='first'>{header.fullName}</span><span id='second'> (sagar)</span>
        <h5 className='text-light'>{header.designation}</h5>
        <CTA></CTA>
        <HeaderSocials></HeaderSocials>

        <div className='me'>
          <img src={`http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/${header.photo}`} height="300" width="100" alt='me' />
        </div>

        <a href='#contact' className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header