import React from 'react';
import axios from 'axios';
import { JsonPlaceholderUrl } from '../config';

const ApiService = () => {
  let apiUrl = JsonPlaceholderUrl;

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          reject(error);
        });
    });
  };

  // Invoke fetchData and return the result
  return fetchData();
};

export default ApiService;
