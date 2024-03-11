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
        // Log the fetched data
        console.log("Service Details Data:", response.data);

        setServiceDetails(response.data);
        const allserviceDetails = response.data.serviceDetails.map(exp => exp.description).join(', ');

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
        // Log the fetched data
        console.log("Service Data:", response.data);

        setService(response.data.service);
        const allservices = response.data.service.map(exp => exp.fieldOfService).join(', ');

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

  const getFieldOfService = (serviceId) => {
    const matchingService = service.find(exp => {
      return String(exp.id) === serviceId;
    });
    return matchingService ? matchingService.fieldOfService : "Unknown";
  };
  

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
                  <p><b>{exp.heading}:</b> <span dangerouslySetInnerHTML={{ __html: exp.description }} /></p>
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
