import React from 'react'
import './about.css'
import ME from '../../assets/me-about.jpg'
import { FaAward } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { VscFolderLibrary } from 'react-icons/vsc'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

function About() {
  const [about, setAbout] = useState([])
  useEffect(() => {
    async function getAbout() {
      try {
        const response = await axios.get("http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/api/about");
        console.log(response.data);
        setAbout(response.data.about[0]);

        // fetching data for metadata
        const description = response.data.about[0].description;
        // showing metadata in the head 
        document.querySelector('meta[name="description"]').content = description;
      } catch (error) {
        console.log(error);
      }
    }
    getAbout()
  }, [])
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className='container about__container'>
        <div className='about__me'>
          <div className='about__me-image'>
            <img src={`http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/${about.photo}`} alt='About_Image'></img>
          </div>
        </div>
        <div className='about__content'>
          <div className='about__cards'>
            <article className='about__card'>
              <FaAward className='about__icon' />
              <h5>Experience</h5>
              <small>{about.experience}+ Years Working</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon' />
              <h5>Clients</h5>
              <small>{about.client}+ Clients Worldwide</small>
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon' />
              <h5>Projects</h5>
              <small>{about.project}+ Completed Projects</small>
            </article>
          </div>

          <p>{about.description}</p>

          <a href='#contact' className='btn btn-primary'> Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About