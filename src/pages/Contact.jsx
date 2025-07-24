import React from 'react';
import emailjs from 'emailjs-com';
import './styles/Contact.css';

const SERVICE_ID = 'service_lgqqv46';
const TEMPLATE_ID = 'template_ckt5bd9';
const PUBLIC_KEY = 'aN022oSLkfd39bq1i';

function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    e.target,
    PUBLIC_KEY
  )
    .then((result) => {
      console.log('Email sent:', result.text);
      alert("Email sent successfully");
    }, (error) => {
      console.error('Error:', error.text);
      alert("Error sending email");
    });

  e.target.reset(); // Optional
}

export default function Contact() {
  return (
    <div className="contact-form-main-container">
      <form className="contact-form" onSubmit={sendEmail}>
        <div className="enter-portion">
          <div className="form-section">
            <input
              className="email-enter"
              type="email"
              name="user_email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="form-section">
            <input
              className="title-enter"
              type="text"
              name="user_title"
              placeholder="Message title"
              required
            />
          </div>
          <div className="form-section">
            <textarea
              className="message"
              name="message"
              placeholder="Type your message here..."
              required
            />
          </div>
        </div>
        <div className="form-section submit-section">
          <button className="submit-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
