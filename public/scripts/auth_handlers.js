'use strict';
/**
 * auth_handlers.js
 * 
 * Contains all the functions which help to manage the token information
 * using cookies
 */

export const createTokenCookie = (token) => {
  document.cookie = `authToken=${token}; max-age=${2 * 24 * 60 * 60} ; path=/;`;
};

export const getTokenCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const items = cookies[i].split('=');
    if (items[0].trim() === 'authToken' ) {
      return items[1].trim();
    }
  }
  return null;
};

export const deleteTokenCookie = () => {
  // Sets the cookie at a time that has already elapsed
  document.cookie = `authToken=; expires=Fri, 29 Aug 2001 00:00:00 UTC; path=/;`;
};
