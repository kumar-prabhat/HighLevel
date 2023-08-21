# HighLevel

# Wallet System

Add your wallet and perform transaction, check all transactions and download them as CSV

# App deployed in heroku - https://wallet-system-high-level-ca2da79447b7.herokuapp.com/

# Stacks Used-

Database - Mongodb
Backend - NodeJs
Framework - ExpressJs
Frontend - ReactJs

# Steps to run in local -

1. Clone the project from github
2. cd to HighLevel folder
3. npm install
4. cd client
5. npm install
6. come back to Highlevel folder
7. npm run dev

# APIs:

1. Setup wallet

   POST - /setup

   Request - {
   "name": "Prabhat",
   "balance": "3000"
   }

   Response - {
   "statusCode": 200,
   "error": false,
   "errorCode": "",
   "message": "OK",
   "data": {
   "name": "Prabhat",
   "balance": 3000,
   "\_id": "64e301aa3cea14235709581b",
   "createdAt": "2023-08-21T06:18:18.579Z",
   "updatedAt": "2023-08-21T06:18:18.579Z",
   "\_\_v": 0
   }
   }

2. Fetch Wallet Details

   GET - /wallet/:walletId

   Params: walletId

   Response - {
   "statusCode": 200,
   "error": false,
   "errorCode": "",
   "message": "OK",
   "data": {
   "\_id": "64e301aa3cea14235709581b",
   "name": "Prabhat 3",
   "balance": 3000,
   "createdAt": "2023-08-21T06:18:18.579Z",
   "updatedAt": "2023-08-21T06:18:18.579Z",
   "\_\_v": 0
   }
   }

3. Create Transaction

   POST - /transact/:walletId

   Params: walletId

   Request - {
   "transactionType": "CREDIT",
   "amount": 3000,
   "description": "Loan"
   }

   Response - {
   "statusCode": 200,
   "error": false,
   "errorCode": "",
   "message": "OK",
   "data": {
   "walletId": "64e301aa3cea14235709581b",
   "transactionType": "CREDIT",
   "amount": 3000,
   "description": "Loan",
   "balance": 6000,
   "\_id": "64e3028c3cea14235709581f",
   "createdAt": "2023-08-21T06:22:04.572Z",
   "updatedAt": "2023-08-21T06:22:04.572Z",
   "\_\_v": 0
   }
   }

4. Fetch all transactions

   Pagination and Sorting also included in this api

   GET - /transactions/:walletId?filter={sort:null,limit:5,skip:5}

   Params: walletId

   Response - {
   "statusCode": 200,
   "error": false,
   "errorCode": "",
   "message": "OK",
   "data": {
   "transactions": [
   {
   "_id": "64e3028c3cea14235709581f",
   "walletId": "64e301aa3cea14235709581b",
   "transactionType": "CREDIT",
   "amount": 3000,
   "description": "Loan",
   "balance": 6000,
   "createdAt": "2023-08-21T06:22:04.572Z",
   "updatedAt": "2023-08-21T06:22:04.572Z",
   "__v": 0
   },{
   "_id": "64e3028c3cea14235709581g",
   "walletId": "64e301aa3cea14235709581b",
   "transactionType": "DEBIT",
   "amount": 1000,
   "description": "Loan return",
   "balance": 5000,
   "createdAt": "2023-08-21T06:22:04.572Z",
   "updatedAt": "2023-08-21T06:22:04.572Z",
   "__v": 0
   }
   ],
   "transactionsCount": 2
   }
   }

5. Download Trsanctions

   GET - /transaction/download/:walletId

   Params: walletId

   Response - CSV filw will be downloaded with all transactions data
