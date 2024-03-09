import React from 'react'
import './header.css'
import CTA from './CTA'
import HeaderSocials from './HeaderSocials'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import baseUrl from '../../config'

function Header() {
  const [header, setHeader] = useState([])
  useEffect(() => {
    async function getHeader() {
      try {
        const response = await axios.get(`${baseUrl}api/header`);
        // console.log(header.data);
        setHeader(response.data.header[0]);

        document.title = response.data.header[0].fullName;
        // fetching data for metadata 
        const facebookLink = response.data.header[0].facebookLink;
        const githubLink = response.data.header[0].githubLink;
        const instagramLink = response.data.header[0].instagramLink;
        const whatsappLink = response.data.header[0].whatsappLink;

        // showing metadata data in the head 
        document.querySelector('meta[name="facebook-link"]').content = facebookLink;
        document.querySelector('meta[name="github-link"]').content = githubLink;
        document.querySelector('meta[name="instagram-link"]').content = instagramLink;
        document.querySelector('meta[name="whatsapp-link"]').content = whatsappLink;

      } catch (error) {
        console.log(error);
      }
    }
    getHeader()
  }, [])
  return (
    <header>
      <div className='container header__container'>
        <h5>Hello I'm</h5>
        <span id='first'>{header.fullName}</span>
        <h5 className='text-light'>{header.designation}</h5>
        <CTA></CTA>
        <HeaderSocials></HeaderSocials>

        <div className='me'>
          <img src={`${baseUrl}${header.photo}`} alt='me' />
        </div>

        <a href='#contact' className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header