import React from 'react';

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#61DAFB' }}>About Us</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginTop: '0' }}>
        Welcome to our website! We're excited to share a little bit about who we are and what we do.
      </p>
      
      <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '10px', color: '#61DAFB' }}>Our Mission</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginBottom: '0' }}>
        At our company, we strive to provide high-quality software products and exceptional customer service. Our mission is to make your life easier by offering innovative solutions that meet vets needs.
      </p>
      
      <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '10px', color: '#61DAFB' }}>Our Team</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginBottom: '0' }}>
        We have a dedicated team of professionals who are passionate about what they do. From designers and developers to customer support specialists, everyone plays a vital role in our success.
      </p>
     
     
      <h2 style={{ fontSize: '2rem', marginTop: '40px', marginBottom: '10px', color: '#61DAFB' }}>Contact Us</h2>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginBottom: '0' }}>
        CFO/LEAD SE: Charles Arroyo: <a href="mailto:cfarroyo@iastate.edu">cfarroyo@iastate.edu</a>
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666', marginBottom: '0' }}>
       CEO/LEAD SE: Billy Dang: <a href="mailto:bpdang07@iastate.edu">bpdang07@iastate.edu</a>
      </p>
    </div>
  );
}

export default About;
