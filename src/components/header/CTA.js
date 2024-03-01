import React from 'react'
import CV from '../../assets/cv.pdf'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

function CTA() {
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
    <div className='cta'>
        <a href={`http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/${header.cv}`} download className='btn'>Download CV</a>
        <a href='#contact' className='btn btn-primary'>Let's Talk</a>
    </div>
  )
} 

export default CTA