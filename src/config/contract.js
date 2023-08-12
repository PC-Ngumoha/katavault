'use strict';
/**
 * contract.js
 *
 * Creates a contract instance to enable us interact with our
 * smart contract from Node.js
 */
require('dotenv').config();
const ethers = require('ethers');

const {API_URL, SEPOLIA_PRIV_KEY, CONTRACT_ADDRESS} = process.env;

const {
  abi
} = require('../../artifacts/contracts/Register.sol/FileRegister.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(SEPOLIA_PRIV_KEY, provider);
const fileRegisterContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

module.exports = fileRegisterContract;
