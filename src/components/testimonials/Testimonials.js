import React from 'react'
import './testimonials.css'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

// import Swiper core and required modules
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


function Testimonials() {
  const [testimonial, setTestimonial] = useState([])
  useEffect(() => {
    async function getTestimonial() {
      try {
        const response = await axios.get("http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/api/testimonial")
        console.log(response.data)
        setTestimonial(response.data.testimonial)
      } catch (error) {
        console.log(error)
      }
    }
    getTestimonial()
  }, [])
  return (
    <section id='testimonials'>
      <h5>Review from clients</h5>
      <h2>Testimonials</h2>

      <Swiper className='container testimonials__container'
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}>
        {
          testimonial.map((testimonial, i) => {
            return (
              <SwiperSlide key={i} className='testimonial'>
                <div className='client__avatar'>
                  <img src={`http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/${testimonial.avatar}`} alt=''></img>
                </div>
                <h5 className='client__name'>{testimonial.name}</h5>
                <small className='client__review'>{testimonial.review}</small>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}

export default Testimonials