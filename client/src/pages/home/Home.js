import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/home')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the message from the backend', error);
      });
  }, []);


  
  return (
    <div>
      {message ? <h1>{message}</h1> : <h1>Loading...</h1>}

    </div>
  );
};

export default Home;
