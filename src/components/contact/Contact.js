import React from 'react'
import './contact.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { TbBrandWhatsapp } from 'react-icons/tb'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import baseUrl from '../../config'

function Contact() {
  const [contact, setContact] = useState([])
  useEffect(() => {
    async function getContact() {
      try {
        const response = await axios.get(`${baseUrl}api/contact`)
        // console.log(response.data);
        setContact(response.data.contact[0]);

        // fetching data for metadata 
        const emailUsername = response.data.contact[0].emailUsername;
        const directEmailLink = response.data.contact[0].directEmailLink;
        const messengerUsername = response.data.contact[0].messengerUsername;
        const directMessengerLink = response.data.contact[0].directMessengerLink;
        const whatsappUsername = response.data.contact[0].whatsappUsername;
        const directWhatsappLink = response.data.contact[0].directWhatsappLink;

        // showing metadata data in the head 
        document.querySelector('meta[name="contact-email"]').content = emailUsername;
        document.querySelector('meta[name="contact-email-link"]').content = directEmailLink;
        document.querySelector('meta[name="contact-messenger"]').content = messengerUsername;
        document.querySelector('meta[name="contact-messenger-link"]').content = directMessengerLink;
        document.querySelector('meta[name="contact-whatsapp"]').content = whatsappUsername;
        document.querySelector('meta[name="contact-whatsapp-link"]').content = directWhatsappLink;
      } catch (error) {
        console.log(error);
      }
    }
    getContact()
  }, [])

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_v0hpdrw', 'template_cn6o1sx', form.current, '1jRVLPIhoTx_-5vWS')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          <article className='contact__option'>
            <AiOutlineMail className='contact__option-icon' />
            <h4>Email</h4>
            <h5>{contact.emailUsername}</h5>
            <a href={contact.directEmailLink} target="_blank">Send a message</a>
          </article>

          <article className='contact__option'>
            <RiMessengerLine className='contact__option-icon' />
            <h4>Messenger</h4>
            <h5>{contact.messengerUsername}</h5>
            <a href={contact.directMessengerLink} target="_blank">Send a message</a>
          </article>

          <article className='contact__option'>
            <TbBrandWhatsapp className='contact__option-icon' />
            <h4>Whatsapp</h4>
            <h5>{contact.whatsappUsername}</h5>
            <a href={contact.directWhatsappLink} target="_blank">Send a message</a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}

        <form ref={form} onSubmit={sendEmail}>
          <input type='text' name='name' placeholder='Your Full Name' required></input>
          <input type='email' name='email' placeholder='Your Email' required></input>
          <textarea name='message' rows={7} placeholder='Your Message' required></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact