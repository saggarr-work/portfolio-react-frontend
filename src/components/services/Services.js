import React, { useState, useEffect } from 'react';
import './services.css';
import { BsCheckLg } from 'react-icons/bs';
import axios from 'axios';
import baseUrl from '../../config';

function Services() {
  const [serviceDetails, setServiceDetails] = useState({ status: null, serviceDetails: [] });
  const [service, setService] = useState([]);

  useEffect(() => {
    async function getServiceDetails() {
      try {
        const response = await axios.get(`${baseUrl}api/details/service`);
        console.log("Service details:", response.data);
        setServiceDetails(response.data);
        // Concatenate all fieldOfService values into a single string
        const allserviceDetails = response.data.serviceDetails.map(exp => exp.description).join(', ');

        // Set the concatenated string as the content of the meta tag
        const metaTag = document.querySelector('meta[name="service-description"]');
        if (metaTag) {
          metaTag.content = allserviceDetails;
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    }
    getServiceDetails();
  }, []);

  useEffect(() => {
    async function getService() {
      try {
        const response = await axios.get(`${baseUrl}api/service`);
        console.log("Service:", response.data);
        setService(response.data.service);
        // Concatenate all fieldOfService values into a single string
        const allservices = response.data.service.map(exp => exp.fieldOfService).join(', ');

        // Set the concatenated string as the content of the meta tag
        const metaTag = document.querySelector('meta[name="service"]');
        if (metaTag) {
          metaTag.content = allservices;
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    }
    getService();
  }, []);

  // Function to get fieldOfService based on service_id
  const getFieldOfService = (serviceId) => {
    const matchingService = service.find(exp => exp.id === serviceId);
    return matchingService ? matchingService.fieldOfService : "Unknown";
  };

  // Group services by service_id
  const groupedServices = serviceDetails.serviceDetails.reduce((acc, exp) => {
    if (!acc[exp.service_id]) {
      acc[exp.service_id] = {
        name: getFieldOfService(exp.service_id) || "Unknown",
        services: [exp],
      };
    } else {
      acc[exp.service_id].services.push(exp);
    }
    return acc;
  }, {});

  console.log("Grouped Services:", groupedServices);

  return (
    <section id='services'>
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className='container services__container'>
        {Object.keys(groupedServices).map((serviceId, i) => (
          <article key={i} className='service'>
            <div className='service__head'>
              <h3>{groupedServices[serviceId].name}</h3>
            </div>
            <ul className='service__list'>
              {groupedServices[serviceId].services.map((exp, j) => (
                <li key={j}>
                  <BsCheckLg className='service__list-icon' />
                  <p><b>{exp.heading}:</b> {exp.description}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
