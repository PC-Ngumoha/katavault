'use strict';
/**
 * landing_page.js
 * 
 * Contains functions that alter the display of the home page
 * dynamically/programmatically
 */
import { getTokenCookie } from "./auth_handlers.js";

window.addEventListener('load', () => {
  const loginButtons = document.querySelectorAll('.btn-login');
  const dashboardButtons = document.querySelectorAll('.btn-dashboard');

  // console.log(loginButtons);
  // authToken does not yet exist or has expired
  if (!getTokenCookie()) {
    dashboardButtons.forEach((button) => {
      button.style.display = 'none';
    });
  } else {
    loginButtons.forEach((button) => {
      button.style.display = 'none';
    });
  }
})