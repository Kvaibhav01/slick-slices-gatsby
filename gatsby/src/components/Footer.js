import React from 'react';

export default function Footer() {
  return (
    <footer className='center'>
      <p style={{ fontSize: '1.5rem', marginTop: '5rem' }}>
        &copy; Slick's Slices {new Date().getFullYear()}. Made by &nbsp;
        <a href='https://about.me/vaibhav_khulbe' target='_blank'>
          Vaibhav
        </a>
        &nbsp; While ordering a cheeseburst. 🧀
      </p>
    </footer>
  );
}
