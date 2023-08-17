'use strict';
/**
 * dashboard.js
 * 
 * Handles all behaviour exhibited on the user's dashboard
 */

import { getTokenCookie } from "./auth_handlers.js";
import { getData, handleFileSubmit, startSpinner, stopSpinner } from "./util.js";
import { generateFileCard, generateNoFileCard } from "./DOMhelpers.js";


window.addEventListener('load', async () => {
  const loaders = document.querySelectorAll('.loader');
  const firstNameSpan = document.getElementById('firstName');
  const filesArea = document.getElementById('uploadedFilesArea');

  startSpinner(loaders);  // starts display of loaders
  // Get all the data pertaining to this specific user
  const token = getTokenCookie();
  const data = await getData('users/me', token);

  // Sets the firstNameSpan to contain the user's actual first name
  firstNameSpan.textContent = data.user.firstName;

  // Checking to see that the user has uploaded files in the
  // past
  if (data.files.length === 0) {
    const noFileCard = generateNoFileCard();
    filesArea.appendChild(noFileCard);
  } else {
    // Generate three file cards for the user dashboard
    for (let i = 0; i < 3; i++) {
      if (i >= data.files.length) break;
      const fileCard = generateFileCard(data.files[i]);
      filesArea.appendChild(fileCard);
    }
  }
  stopSpinner(loaders);  // stops display of loaders

  // Handling user file uploads
  const form = document.querySelector('form');
  
  //Listening for form submission event
  form.addEventListener('submit', async (event) => {
    const loaders = document.querySelectorAll('.loader');
    const errorTextField = document.getElementById('errorText');
  
    startSpinner(loaders);  // start spinners

    const token = getTokenCookie();
    // pass the file to the route
    const response = await handleFileSubmit(event, token);

    if (response.status !== 200) {
      errorTextField.style.display = 'block';
      errorTextField.textContent = 'An error occurred while uploading the file';
    }

    stopSpinner(loaders);

    // reload the page
    location.reload();  
  });
});