'use strict';
/**
 * profile.js
 * 
 * Handles all behaviour exhibited on the user's profile page
 */

import { getTokenCookie, deleteTokenCookie } from "./auth_handlers.js";
import { getData, sendSignal, startSpinner, stopSpinner } from "./util.js";
import { generateUserFileCard } from "./DOMhelpers.js";

async function logout() {
  const token = getTokenCookie();
  
  // sends a signal to /users/logout to logout the current
  // user. receives a response as it's return value
  const response = await sendSignal('users/logout', token);

  // Checks whether it's successful
  if (response.status === 200) {
    deleteTokenCookie();
    // Go back to the landing/home page
    location.href = '/index.html';
  }
}

async function copyToClipboard(event) {
  const button = event.currentTarget;
  
  // copies the value of clicked button to the clipboard
  try {
    await navigator.clipboard.writeText(button.value);
    // alert('Copied');
  } catch (err) {
    // alert('Failed to copy');
    // console.log(err);
  }

  // // Change the visual appearance of the button for 0.3ms
  button.classList.add('.button-clicked');
  setTimeout(() => {
    button.classList.remove('.button-clicked');
  }, 300);
}

window.addEventListener('load', async () => {
  const loaders = document.querySelectorAll('.loader');
  const nameSpan = document.getElementById('name');
  const emailSpan = document.getElementById('email');
  const regNoSpan = document.getElementById('regno');
  const phoneSpan = document.getElementById('phone');
  const userFileArea = document.getElementById('userFileArea');

  startSpinner(loaders); // starts display of loaders
  // Get user's data
  const token = getTokenCookie();
  const data = await getData('users/me', token);

  nameSpan.textContent = `${data.user.firstName} ${data.user.lastName}`;
  emailSpan.textContent = data.user.email;
  regNoSpan.textContent = data.user.regNumber;
  phoneSpan.textContent = data.user.phoneNumber;

  if (data.files.length !== 0) {
    for (let i = 0; i < data.files.length; i++) {
      const userFileCard = generateUserFileCard(data.files[i]);
      userFileArea.appendChild(userFileCard);
    }
  }
  stopSpinner(loaders); // stops display of loaders

  const logoutButton = document.getElementById('logoutBtn');
  // When this button is clicked, logout
  logoutButton.addEventListener('click', logout);

  // Implementing copy-to-clipboard functionality
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach((button) => {
    button.addEventListener('click', copyToClipboard);
  })
});
