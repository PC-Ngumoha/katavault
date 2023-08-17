'use strict';
/**
 * upload.js
 *
 * Contains a set of utility functions for uploading files
 */
const fs = require('fs');
const path = require('path');
const pinata = require('../config/pinata-config.js');

const uploadPath = path.join(__dirname, '..', 'uploads');

const uploadFileToServer = async (file) => {
  if (Array.isArray(file)) {
    throw new Error('Upload a single file');
  } else {
    await file.mv(uploadPath + `/${file.name}`);
  }
  return {name: file.name};
};

const uploadToIPFS = async (file) => {
  const filePath = uploadPath + `/${file.name}`;
  const fileStream = fs.createReadStream(filePath);
  const options = {
    pinataMetadata: {
      name: file.name
    },
    pinataOptions: {
      cidVersion: 0
    }
  };
  const {IpfsHash} = await pinata.pinFileToIPFS(fileStream, options);
  file.hash = IpfsHash;
  file.link = `gateway.pinata.cloud/ipfs/${IpfsHash}`;
  return file;
};

const removeUploadsDir = () => {
  fs.rm(uploadPath, {recursive: true}, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  uploadFileToServer,
  uploadToIPFS,
  removeUploadsDir
};
