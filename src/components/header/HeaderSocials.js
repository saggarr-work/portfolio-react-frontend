import React from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'
import { FaGithubSquare } from 'react-icons/fa'
import { FaWhatsappSquare } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import baseUrl from '../../config'

function HeaderSocials() {
  const [header, setHeader] = useState([])
  useEffect(() => {
    async function getHeader() {
      try {
        const response = await axios.get(`${baseUrl}api/header`)
        // console.log(header.data)
        setHeader(response.data.header[0])
      } catch (error) {
        console.log(error)
      }
    }
    getHeader()
  }, [])
  return (
    <div className='header__socials'>
      <a href={header.facebookLink} target='blank'><FaFacebookSquare /></a>
      <a href={header.instagramLink} target='blank'><FaInstagramSquare /></a>
      <a href={header.githubLink} target='blank'><FaGithubSquare /></a>
      <a href={header.whatsappLink} target='blank'><FaWhatsappSquare /></a>
    </div>
  )
}

export default HeaderSocials