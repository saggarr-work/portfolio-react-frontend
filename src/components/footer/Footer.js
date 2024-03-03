import React from 'react'
import './footer.css'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

function Footer() {
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
    <footer>
      <a href='#' className='footer__logo'><span id='first'>{header.fullName}</span></a>
      <ul className='permalinks'>
        <li><a href='#'>Home</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#experience'>Experience</a></li>
        <li><a href='#services'>Services</a></li>
        <li><a href='#portfolio'>Portfolio</a></li>
        <li><a href='#testimonials'>Testimonials</a></li>
        <li><a href='#contact'>Contact</a></li>
      </ul>

      <div className='footer__socials'>
        <a href={header.facebookLink} target="blank"><FaFacebookF /></a>
        <a href={header.instagramLink} target="blank"><FaInstagram /></a>
        <a href={header.whatsappLink} target="blank"><FaWhatsapp /></a>
      </div>

      {/* autometic copyright date genarator */}
      <div className='footer__copyright'>
        <small>&copy; Developed by <a className='footer__copyright__name' href='https://saggarr.com/' target='_blank'>Avijit Biswas (Sagar)</a> &#128530; . All rights reserved. 2022 - {new Date().getFullYear()}</small>
      </div>
    </footer>
  )
}

export default Footer