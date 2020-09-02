# Avg block time calculator
This repository contains a simple example of how the average block time can be easily computed client-side. 

The block times are fetched by subscribing to a local GraphQL endpoint. This should be backed by [Hasura](https://hasura.io) setup to work with [BDJuno](https://github.com/forbole/bdjuno).

The only used libraries are:
 
 - [`apollo`](https://www.apollographql.com/) to subscribe to GraphQL endpoints
 - [`moment`](https://momentjs.com/) to compute the time difference easily
 
Some other libraries (like `babel` and others) are also used to make everything compatible with nodejs.  

## Running the example
To run the example make sure a Hasura endpoint is available at 

```
http://localhost:8080/v1/graphql
```

or change the `GRAPHQL_ENDPOINT` value inside the `main.js` file. 


Then just run 

```shell
npm install
node -r @babel/register main.js
```  
