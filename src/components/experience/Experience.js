import React, { useState, useEffect } from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';
import axios from 'axios';
import baseUrl from '../../config';

function Experience() {
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    async function getExperienceDetails() {
      try {
        const response = await axios.get(`${baseUrl}api/details/experience`);
        // console.log("Experience Details:", response.data);
        setExperienceDetails(response.data.experienceDetails);

        // Concatenate all languageOrTools values into a single string
        const allExperienceDetails = response.data.experienceDetails.map(exp => exp.languageOrTools).join(', ');
  
        // Set the concatenated string as the content of the meta tag
        const metaTag = document.querySelector('meta[name="experience-details"]');
        if (metaTag) {
          metaTag.content = allExperienceDetails;
        }
      } catch (error) {
        console.error("Error fetching experience details:", error);
      }
    }
    getExperienceDetails();
  }, []);

  useEffect(() => {
    async function getExperience() {
      try {
        const response = await axios.get(`${baseUrl}api/experience`);
        // console.log("Experience:", response.data);
        setExperience(response.data.experience);
  
        // Concatenate all fieldOfExperience values into a single string
        const allExperiences = response.data.experience.map(exp => exp.fieldOfExperience).join(', ');
  
        // Set the concatenated string as the content of the meta tag
        const metaTag = document.querySelector('meta[name="experience"]');
        if (metaTag) {
          metaTag.content = allExperiences;
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    }
    getExperience();
  }, []);

  const getFieldOfExperience = (experienceId) => {
    const matchingExperience = experience.find(exp => {
      return String(exp.id) === experienceId;
    });
    return matchingExperience ? matchingExperience.fieldOfExperience : "Unknown";
  };
  
  

  // Group experiences by experience_id
  const groupedExperiences = experienceDetails.reduce((acc, exp) => {
    if (!acc[exp.experience_id]) {
      acc[exp.experience_id] = {
        name: getFieldOfExperience(exp.experience_id) || "Unknown",
        experiences: [exp],
      };
    } else {
      acc[exp.experience_id].experiences.push(exp);
    }
    return acc;
  }, {});

  // console.log("Grouped Experiences:", groupedExperiences);

  return (
    <section id='experience'>
      <h5>What Skills I Have</h5>
      <h2>My Experience</h2>

      <div className='container experience__container'>
        {Object.keys(groupedExperiences).map((experienceId, i) => (
          <div key={i} className='experience__frontend'>
            <h3>{groupedExperiences[experienceId].name}</h3>
            <div className='experience__content'>
              {groupedExperiences[experienceId].experiences.map((exp, j) => (
                <article key={j} className='experience__details'>
                  <BsPatchCheckFill className='experience__details-icon' />
                  <div>
                    <h4>{exp.languageOrTools}</h4>
                    <small className='text-light'>{exp.levelOfExperience}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
