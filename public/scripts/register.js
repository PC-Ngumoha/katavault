'use strict';
/**
 * register.js
 * 
 * Contains the code that handles registration
 */
import { handleSubmit } from "./util.js";
import { createTokenCookie } from "./auth_handlers.js";
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  const response = await handleSubmit(event);

  if (response.status !== 201) {
    // Return a message to the user informing them that their account
    // does not exist
    const errorTextField = document.getElementById('errorText');
    errorTextField.style.display = 'block';
    errorTextField.textContent = 'An error occurred, Be sure to fill all the fields and try again';
  } else {
    const data = await response.json();
    createTokenCookie(data.token);
    location.href = '/index.html';
  }
});
