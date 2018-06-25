const eeClient = require('../ElasticEmailClient').client;

const options = {
    apiKey: 'yourapikey',
    apiUri: 'https://api.elasticemail.com/',
    apiVersion: 'v2'
}

const EE = new eeClient(options);
EE.Account.Load().then(function(resp) {
    console.log(resp);
});