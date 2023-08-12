'use strict';
/**
 * contract.js
 *
 * Contains code that interacts with the smart contract we wrote,
 * compiled, deployed and verified on the ethereum blockchain
 */
const fileRegisterContract = require('../config/contract.js');

const retrieveFilesFromBlockchain = async (userId) => {
  console.log(`Retrieving the files of ${userId}...`);
  const fileList = await fileRegisterContract.returnFiles(userId);
  return fileList;
};

const addFileToBlockchain = async (userId, {name, hash, link}) => {
  console.log('Saving files to blockchain app...');
  const tx = await fileRegisterContract.addFile(userId, name, hash, link);
  await tx.wait();
};

module.exports = {
  retrieveFilesFromBlockchain,
  addFileToBlockchain
};
