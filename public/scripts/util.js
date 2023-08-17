'use strict';
/**
 * util.js
 * 
 * Contains utility functions that we can use for handling file submits
 */

/**
 * handleSubmit function
 * 
 * Handles regular form submission
 * 
 * @param {*} event 
 * @returns 
 */
export const handleSubmit = async (event) => {
  event.preventDefault(); // stops the form from doing the default
  const form = event.currentTarget;
  const url = new URL(form.action);
  const formData = new FormData(form); // Gets all the form data passed
  // const searchParams = new URLSearchParams(formData);

  const options = {
    method: form.method,
    body: formData
  };

  const response = await fetch(url, options);
  return response;
};

/**
 * handleFileSubmit function
 * 
 * Handles file submission/upload to a specific route
 * 
 * @param {*} event 
 * @param {*} token 
 * @returns response
 */
export const handleFileSubmit = async (event, token) => {
  event.preventDefault();
  const form = event.currentTarget;
  const url = new URL(form.action);
  const formData = new FormData(form);
  const bearer = `Bearer ${token}`;

  const options = {
    method: form.method,
    headers: {
      'Authorization': bearer
    },
    body: formData
  }

  const response = await fetch(url, options);
  return response;
};

/**
 * getData function
 * 
 * Gets the data returned by a given endpoint
 * 
 * @param {*} url 
 * @param {*} token 
 * @returns data
 */
export const getData = async (url, token) => {
  // const url = new URL(endpoint);
  const bearer = `Bearer ${token}`;

  const options = {
    method: 'GET',
    headers: {
      'Authorization': bearer
    }
  };

  const response = await fetch(url, options);
  const data = response.json();
  return data;
};

/**
 * sendSignal function 
 * 
 * @param {*} url 
 * @param {*} token 
 * 
 * @returns response
 */
export const sendSignal = async (url, token) => {
  const bearer = `Bearer ${token}`;

  const options = {
    method: 'POST',
    headers: {
      'Authorization': bearer
    }
  };

  const response = await fetch(url, options);
  return response;
}; 

/**
 * startSpinner
 * 
 * starts all the spinner elements present on the current page
 * 
 * @param {*} loaders
 */
export const startSpinner = (loaders) => {
  loaders.forEach((loader) => loader.style.display = 'block');
};

/**
 * stopSpinner
 * 
 * stops all the spinner elements present on the current page
 * 
 * @param {*} loaders
 */
export const stopSpinner = (loaders) => {
  loaders.forEach((loader) => loader.style.display = 'none');
}
