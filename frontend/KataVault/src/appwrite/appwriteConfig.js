import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
   .setEndpoint('https://cloud.appwrite.io/v1')
   .setProject('6479826f099baef129a1');

export const account = new Account(client);

//Database

export const databases = new Databases(client, "647a149e8b85d32173ad");
