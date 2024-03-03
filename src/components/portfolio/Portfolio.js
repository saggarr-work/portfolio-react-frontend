import React from 'react'
import './portfolio.css'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'


function Portfolio() {
  const [portfolio, setPortfolio] = useState([])
  useEffect(() => {
    async function getPortfolio() {
      try {
        const response = await axios.get("http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/api/portfolio")
        console.log(response.data);
        setPortfolio(response.data.portfolio);
        
        // Concatenate all languageOrTools values into a single string
        const portfolioTitle = response.data.portfolio.map(exp => exp.title).join(', ');
        const portfolioGithubLink = response.data.portfolio.map(exp => exp.githubLink).join(', ');
        const portfolioLiveDemo = response.data.portfolio.map(exp => exp.liveDemo).join(', ');
  
        // Set the concatenated string as the content of the meta tag
        const metaTagTitle = document.querySelector('meta[name="portfolio-title"]');
        if (metaTagTitle) {
          metaTagTitle.content = portfolioTitle;
        }
        const metaTagGithubLink = document.querySelector('meta[name="portfolio-github-link"]');
        if (metaTagGithubLink) {
          metaTagGithubLink.content = portfolioGithubLink;
        }
        const metaTagLiveDemo = document.querySelector('meta[name="portfolio-leve-demo"]');
        if (metaTagLiveDemo) {
          metaTagLiveDemo.content = portfolioLiveDemo;
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPortfolio()
  }, [])
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        {
          portfolio.map((portfolio, i) => {
            return (
              <article key={i} className='portfolio__item'>
                <div className='portfolio__item-image'>
                  <img src={`http://localhost/portfolio-app/backend/portfolio-admin-paenl/public/${portfolio.thumbnail}`} alt={portfolio.title}></img>
                </div>
                <h3>{portfolio.title}</h3>
                <div className='portfolio__item-cta'>
                  <a href={portfolio.githubLink} className='btn' target='blank'>Github</a>
                  <a href={portfolio.liveDemo} className='btn btn-primary' target='blank'>Live Demo</a>
                </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio