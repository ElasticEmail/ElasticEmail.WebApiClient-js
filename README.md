**This library allows you to quickly and easily use the Elastic Email Web API v2 via JavaScript.**

API REFERENCE: https://api.elasticemail.com/public/help

# Quick start #

## Getting account info in node ##
	
const ee = require('elasticemail-webapiclient');

var eeClient = ee(
  {
    ApiKey: "Your ApiKey"
  }
);

eeClient.Account.Load(function (data) {

  console.log(data);
});

## Getting account info in HTML ##
**jQuery required!**

var clientEE = EEAPI(
  {
    ApiKey: "Your ApiKey"
  }
);

clientEE.Account.Load(function (data) {

  console.log(data);
})


# About #
elasticemail-webapiclient is guided and supported by the ElasticEmail Dev Team.

elasticemail-webapiclient is maintained and funded by Elastic Email Inc. The names and logos for elasticemail-webapiclient are trademarks of Elastic Email Inc.

![logo](https://elasticemail.com/files/ee_200x200.png )