# Elasticemail-webapiclient

[![N|ElasticEmail](https://elasticemail.com/wp-content/uploads/2018/05/100x100.png)](https://elasticemail.com)

# Prerequisites #
* [An Elastic Email account](https://elasticemail.com/account/)

## Getting account info in Node ##
```js	
npm install elasticemail-webapiclient
```

```js
const eeClient = require('elasticemail-webapiclient').client;

const options = {
    apiKey: 'YourApiKey',
    apiUri: 'https://api.elasticemail.com/',
    apiVersion: 'v2'
}

const EE = new eeClient(options);
EE.Account.Load().then(function(resp) {
    console.log(resp);
});
```	


## API ##
API documentation you can find on [Elastic Email website](https://api.elasticemail.com/public/help).

# About #
ElasticEmail.WebApiClient is guided and supported by the ElasticEmail Dev Team.

ElasticEmail.WebApiClient is maintained and funded by Elastic Email Inc. The names and logos for ElasticEmail.WebApiClient are trademarks of Elastic Email Inc.