'use strict';
/**
 * DOMhelpers.js
 * 
 * Contains all the functions we use to create DOM elements
 * dynamically from inputted data
 */


/**
 * Creates a DOM component with the following structure:
 * 
 * <div class="no-file-card">
        <span><i class="fa-solid fa-file-excel"></i></span>
        <span>No Files Available</span>
      </div>
 */

export const generateNoFileCard = () => {
  const noFileCard = document.createElement('div');
  const fileIconSpan = document.createElement('span');
  const fileIcon = document.createElement('i');
  const messageSpan = document.createElement('span');

  noFileCard.classList.add('no-file-card');
  fileIcon.classList.add(...['fa-solid', 'fa-file-excel']);
  fileIconSpan.appendChild(fileIcon);
  messageSpan.textContent = 'No Files Available';

  noFileCard.append(fileIconSpan, messageSpan);
  return noFileCard; // card completed
};

/**
 * Create a DOM component with the following structure:
 *  
 * <div class="file-card">
        <div class="file-card-header">
          <span>File 1</span>
          <a href="#"><i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="file-card-body">
          <object
            data="https://cabindacitizenship.files.wordpress.com/2019/01/imperialism-charter-concerning-third-world-countries.pdf"
            type="image/png"></object>
        </div>
      </div>
 */
export const generateFileCard = (dataObject) => {
  const fileCard = document.createElement('div');
  const fileCardHeader = document.createElement('div');
  const fileCardBody = document.createElement('div');

  // Card Header
  const fileNameSpan = document.createElement('span');
  fileNameSpan.textContent = dataObject.name;
  const linkAnchor = document.createElement('a');
  linkAnchor.setAttribute('href', `https://${dataObject.link}`);
  linkAnchor.setAttribute('target', '_blank');
  const linkAnchorIcon = document.createElement('i');
  linkAnchorIcon.classList.add(...['fa-solid', 'fa-arrow-right']);
  linkAnchor.appendChild(linkAnchorIcon);
  fileCardHeader.classList.add('file-card-header');
  fileCardHeader.append(fileNameSpan, linkAnchor);

  // Card Body
  const viewObject = document.createElement('object');
  viewObject.setAttribute('type', 'image/png');
  viewObject.setAttribute('data', `https://${dataObject.link}`);
  fileCardBody.classList.add('file-card-body');
  fileCardBody.appendChild(viewObject);

  // full Card
  fileCard.classList.add('file-card');
  fileCard.append(fileCardHeader, fileCardBody);
  return fileCard; // card completed
};

/** 
 * Creates a DOM component with the following structure
 * 
 * <div class="user-file-card">
        <span class="name">School_fees.pdf</span>
        <span class="copy"><button value="LINK HERE"><i class="fa-regular fa-copy"></i></button></span>
        <span class="goto"><a href="#" target="_blank"><i class="fa-regular fa-eye"></i></a></span>
      </div>
*/
export const generateUserFileCard = (dataObject) => {
  const userFileCard = document.createElement('div');

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('name');
  nameSpan.textContent = dataObject.name;

  const copySpan = document.createElement('span');
  copySpan.classList.add('copy');
  const copyButton = document.createElement('button');
  copyButton.classList.add('copy-button');
  copyButton.setAttribute('value', `https://${dataObject.link}`);
  const copyButtonIcon = document.createElement('i');
  copyButtonIcon.classList.add(...['fa-regular', 'fa-copy']);
  copyButton.appendChild(copyButtonIcon);
  copySpan.appendChild(copyButton);

  const gotoSpan = document.createElement('span');
  gotoSpan.classList.add('goto');
  const gotoAnchor = document.createElement('a');
  gotoAnchor.setAttribute('href', `https://${dataObject.link}`);
  gotoAnchor.setAttribute('target', '_blank');
  const gotoAnchorIcon = document.createElement('i');
  gotoAnchorIcon.classList.add(...['fa-regular', 'fa-eye']);
  gotoAnchor.appendChild(gotoAnchorIcon);
  gotoSpan.appendChild(gotoAnchor);

  userFileCard.classList.add('user-file-card')
  userFileCard.append(nameSpan, copySpan, gotoSpan);
  return userFileCard;
};
