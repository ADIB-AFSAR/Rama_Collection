import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SlidingInfo.css';

const SlidingInfo = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchSlidingText = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/banner/slidingtext`);
        setText(res.data?.text || 'Welcome to our store!');
      } catch (err) {
        console.error('Error fetching sliding text:', err);
      }
    };

    fetchSlidingText();
  }, []);

  return (
    <div className="running-text-container glowing-text">
      <div className="running-text small fw-bold">
        {text}
      </div>
    </div>
  );
};

export default SlidingInfo;
