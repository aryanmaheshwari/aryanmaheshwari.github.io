import emailjs from 'emailjs-com';
import './styles/Contact.css';

// function sendEmail(e) {
//   e.preventDefault();

//   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
//     .then((result) => {
//       console.log('Email sent:', result.text);
//     }, (error) => {
//       console.error('Error:', error.text);
//     });
// }

import React from 'react';

export default function Contact() {
  return (
    <div className="contact-form-main-container">
      <form className="contact-form">
        <div className="enter-portion">
          <div className="form-section">
            <input
              className="email-enter"
              type="email"
              name="user_email"
              placeholder="Type your email here..."
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
