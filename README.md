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

// Load account data
EE.Account.Load().then(function(resp) {
    console.log(resp);
});

const emailParams = {
    "subject": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    "to": 'example@foo.com',
    "from": 'example@bar.com',
    "replyTo": 'replyto@baz.com',
    "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    ' Curabitur in lectus id ipsum laoreet dignissim in ut odio. Duis volutpat arcu dolor, eu cursus mi vestibulum ut.' +
    ' Etiam eu ipsum orci. Vestibulum aliquam eros in massa dapibus malesuada. Proin sit amet blandit nulla, eu porttitor neque.' +
    ' Duis consequat erat est, sit amet condimentum turpis sagittis sit amet. Nam fringilla, tellus ac euismod elementum,' +
    ' ipsum ante consequat nisi, ut lobortis arcu sapien vel ex. Mauris sit amet magna a ipsum porttitor hendrerit.' +
    ' Nam elementum iaculis tellus, nec euismod ante. Suspendisse nec lobortis magna, at placerat augue.' +
    ' Quisque luctus scelerisque metus, ut facilisis mi consectetur vel. Ut augue diam, ornare dictum tincidunt a,' +
    ' volutpat nec arcu. Mauris iaculis bibendum pulvinar. Quisque vestibulum, magna quis aliquam tincidunt,' +
    ' leo eros luctus nibh, eu dictum nisl velit id mauris.',
    "fromName": 'John Doe',
    "bodyType": 'Plain'
};

// Send email
EE.Email.Send(emailParams)
.catch((err) => {
    throw new Error(err);
});
```	


## API ##
API documentation you can find on [Elastic Email website](https://api.elasticemail.com/public/help).

# About #
ElasticEmail.WebApiClient is guided and supported by the ElasticEmail Dev Team.

ElasticEmail.WebApiClient is maintained and funded by Elastic Email Inc. The names and logos for ElasticEmail.WebApiClient are trademarks of Elastic Email Inc.