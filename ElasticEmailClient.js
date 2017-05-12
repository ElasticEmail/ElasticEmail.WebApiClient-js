(function ( root, factory ) {
    if ( typeof define === "function" && define.amd ) {
        define(["jquery"], factory);
            } else if ( typeof exports === "object" ) {
        module.exports = factory( false, require( 'request' ), require( 'querystring' ) );
    } else {
        root.EEAPI = factory(root.$ );
    }
}(this, function ( $, req, querystring ) {
    return function EEAPI(options) {

    
    var that = {};
    var cfg = {
        ApiUri: "https://api.elasticemail.com/",
        ApiKey: "",
        Version: 2,
        TimeOut: 30000,
        beforeSend: function () {
        },
        fail: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + "" + ((jqXHR.status > 0) ? jqXHR.status + ": " : " ") + errorThrown + ((jqXHR.responseText.length > 0) ? "\r\n" + jqXHR.responseText : ""));
        },
        error: function (error) {
            console.log("Error: " + error);
        },
        always: function () {
        }
    };
    /* endregion Initialization */

    /* region Utilities */
   
    //Main request method
    var ajaxRequest = function request(target, query, callback, method) {
        if (method !== "POST") {
            method = "GET";
        }
        query.apikey = cfg.ApiKey;
        $.ajax({
            type: method,
            dataType: 'json',
            url: cfg.ApiUri + 'v' + cfg.Version + target,
            cache: false,
            data: query,
            timeout: cfg.timeout,
            beforeSend: cfg.beforeSend
        }).done(function (response) {
            if (response.success === false) {
                cfg.error(response.error);
            }
            callback(response.data || false);
        }).fail(cfg.fail).always(cfg.always);
    };
var request;
var reqRequest = function request (target, query, callback, method) {

        if (method !== "POST") {
            method = "GET";
            }
            query.apikey = cfg.ApiKey;
        req({
                uri: cfg.ApiUri + 'v' + cfg.Version + target + "?" + querystring.stringify(query),
          method: method,
          //'content-type': 'application/json',
          data: JSON.stringify(query)
        }, function(error, response, body)
            {
                if (error) return callback(error);
                var res = JSON.parse(body);
                if (!res.success) return callback(res.error);
                callback(res.data);
            })
        };

      if ($ === false && req && querystring) {
        Object.assign(cfg, options);
        request = reqRequest;
      } else {
        cfg = $.extend(cfg, options);
    request = ajaxRequest;
      }

//Method to upload file with get params
var uploadPostFile = function uploadPostFile(target, query, callback) {
        var fd = new FormData();
        var xhr = new XMLHttpRequest();
        query.apikey = cfg.ApiKey;
        var queryString = parameterize(query);
        fd.append('foobarfilename', query.file);
        xhr.open('POST', cfg.ApiUri + 'v' + cfg.Version + target + queryString, true);
        xhr.onload = function (e) {
            var result = e.target.responseText;
            callback(JSON.parse(result));
        };
        xhr.send(fd);
    };

    //Parametrize array params to url string
    var parameterize = function parameterize(obj) {
        var params = "";
        if ($.isEmptyObject(obj))
            return params;
        for (var id in obj) {
            var val = obj[id] + "";
            params += "&" + encodeURIComponent(id) + "=" + encodeURIComponent(val);
        }
        return "?" + params.substring(1);
    };

    var setApiKey = function (apikey) {
        cfg.ApiKey = apikey;
    };
    /* endregion Utilities */

    /* region Account */
    /**
     *Methods for managing your account and subaccounts.
     */
    var account = {};

    /**
     * Create new subaccount and provide most important data about it.
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {String} query.password - Current password.
     * @param {String} query.confirmPassword - Repeat new password.
     * @param {Boolean} query.requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Boolean} query.enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
     * @param {Boolean} query.requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Number} query.maxContacts - Maximum number of contacts the account can have
     * @param {Boolean} query.enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
     * @param {Boolean} query.sendActivation - True, if you want to send activation email to this account. Otherwise, false
     * @param {String} query.returnUrl - URL to navigate to after account creation
     * @param {SendingPermission} query.sendingPermission - Sending permission setting for account
     * @param {Boolean} query.enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
     * @param {String} query.poolName - Private IP required. Name of the custom IP Pool which Sub Account should use to send its emails. Leave empty for the default one or if no Private IPs have been bought
     * @param {Number} query.emailSizeLimit - Maximum size of email including attachments in MB's
     * @param {Function} callback
     * @return {String}
     */
    account.AddSubAccount = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/addsubaccount', query, callback, 'POST');
    };

    /**
     * Add email, template or litmus credits to a sub-account
     * @param {Object} query - Query object.
     * @param {Number} query.credits - Amount of credits to add
     * @param {String} query.notes - Specific notes about the transaction
     * @param {CreditType} query.creditType - Type of credits to add (Email or Litmus)
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to add credits to. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     */
    account.AddSubAccountCredits = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/addsubaccountcredits', query, callback, 'POST');
    };

    /**
     * Change your email address. Remember, that your email address is used as login!
     * @param {Object} query - Query object.
     * @param {String} query.sourceUrl - URL from which request was sent.
     * @param {String} query.newEmail - New email address.
     * @param {String} query.confirmEmail - New email address.
     * @param {Function} callback
     */
    account.ChangeEmail = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/changeemail', query, callback, 'POST');
    };

    /**
     * Create new password for your account. Password needs to be at least 6 characters long.
     * @param {Object} query - Query object.
     * @param {String} query.currentPassword - Current password.
     * @param {String} query.newPassword - New password for account.
     * @param {String} query.confirmPassword - Repeat new password.
     * @param {Function} callback
     */
    account.ChangePassword = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/changepassword', query, callback, 'POST');
    };

    /**
     * Deletes specified Subaccount
     * @param {Object} query - Query object.
     * @param {Boolean} query.notify - True, if you want to send an email notification. Otherwise, false
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to delete. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     */
    account.DeleteSubAccount = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/deletesubaccount', query, callback, 'POST');
    };

    /**
     * Returns API Key for the given Sub Account.
     * @param {Object} query - Query object.
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to retrieve sub-account API Key. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     * @return {String}
     */
    account.GetSubAccountApiKey = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/getsubaccountapikey', query, callback, 'POST');
    };

    /**
     * Lists all of your subaccounts
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<SubAccount>}
     */
    account.GetSubAccountList = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/getsubaccountlist', query, callback, 'POST');
    };

    /**
     * Loads your account. Returns detailed information about your account.
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Account}
     */
    account.Load = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/load', query, callback, 'POST');
    };

    /**
     * Load advanced options of your account
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {AdvancedOptions}
     */
    account.LoadAdvancedOptions = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadadvancedoptions', query, callback, 'POST');
    };

    /**
     * Lists email credits history
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<EmailCredits>}
     */
    account.LoadEmailCreditsHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loademailcreditshistory', query, callback, 'POST');
    };

    /**
     * Lists litmus credits history
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<LitmusCredits>}
     */
    account.LoadLitmusCreditsHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadlitmuscreditshistory', query, callback, 'POST');
    };

    /**
     * Shows queue of newest notifications - very useful when you want to check what happened with mails that were not received.
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<NotificationQueue>}
     */
    account.LoadNotificationQueue = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadnotificationqueue', query, callback, 'POST');
    };

    /**
     * Lists all payments
     * @param {Object} query - Query object.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Date} query.fromDate - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.toDate - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Function} callback
     * @return {Array.<Payment>}
     */
    account.LoadPaymentHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadpaymenthistory', query, callback, 'POST');
    };

    /**
     * Lists all referral payout history
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<Payment>}
     */
    account.LoadPayoutHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadpayouthistory', query, callback, 'POST');
    };

    /**
     * Shows information about your referral details
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Referral}
     */
    account.LoadReferralDetails = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadreferraldetails', query, callback, 'POST');
    };

    /**
     * Shows latest changes in your sending reputation
     * @param {Object} query - Query object.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<ReputationHistory>}
     */
    account.LoadReputationHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadreputationhistory', query, callback, 'POST');
    };

    /**
     * Shows detailed information about your actual reputation score
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {ReputationDetail}
     */
    account.LoadReputationImpact = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadreputationimpact', query, callback, 'POST');
    };

    /**
     * Returns detailed spam check.
     * @param {Object} query - Query object.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<SpamCheck>}
     */
    account.LoadSpamCheck = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadspamcheck', query, callback, 'POST');
    };

    /**
     * Lists email credits history for sub-account
     * @param {Object} query - Query object.
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     * @return {Array.<EmailCredits>}
     */
    account.LoadSubAccountsEmailCreditsHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadsubaccountsemailcreditshistory', query, callback, 'POST');
    };

    /**
     * Loads settings of subaccount
     * @param {Object} query - Query object.
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to load settings for. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     * @return {SubAccountSettings}
     */
    account.LoadSubAccountSettings = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadsubaccountsettings', query, callback, 'POST');
    };

    /**
     * Lists litmus credits history for sub-account
     * @param {Object} query - Query object.
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
     * @param {Function} callback
     * @return {Array.<LitmusCredits>}
     */
    account.LoadSubAccountsLitmusCreditsHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadsubaccountslitmuscreditshistory', query, callback, 'POST');
    };

    /**
     * Shows usage of your account in given time.
     * @param {Object} query - Query object.
     * @param {Date} query.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Function} callback
     * @return {Array.<Usage>}
     */
    account.LoadUsage = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/loadusage', query, callback, 'POST');
    };

    /**
     * Manages your apikeys.
     * @param {Object} query - Query object.
     * @param {String} query.apiKey - APIKey you would like to manage.
     * @param {APIKeyAction} query.action - Specific action you would like to perform on the APIKey
     * @param {Function} callback
     * @return {Array.<String>}
     */
    account.ManageApiKeys = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/manageapikeys', query, callback, 'POST');
    };

    /**
     * Shows summary for your account.
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {AccountOverview}
     */
    account.Overview = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/overview', query, callback, 'POST');
    };

    /**
     * Shows you account's profile basic overview
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Profile}
     */
    account.ProfileOverview = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/profileoverview', query, callback, 'POST');
    };

    /**
     * Remove email, template or litmus credits from a sub-account
     * @param {Object} query - Query object.
     * @param {CreditType} query.creditType - Type of credits to add (Email or Litmus)
     * @param {String} query.notes - Specific notes about the transaction
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to remove credits from. Use subAccountEmail or publicAccountID not both.
     * @param {Number} query.credits - Amount of credits to remove
     * @param {Boolean} query.removeAll - Remove all credits of this type from sub-account (overrides credits if provided)
     * @param {Function} callback
     */
    account.RemoveSubAccountCredits = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/removesubaccountcredits', query, callback, 'POST');
    };

    /**
     * Request a private IP for your Account
     * @param {Object} query - Query object.
     * @param {Number} query.count - Number of items.
     * @param {String} query.notes - Free form field of notes
     * @param {Function} callback
     */
    account.RequestPrivateIP = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/requestprivateip', query, callback, 'POST');
    };

    /**
     * Update sending and tracking options of your account.
     * @param {Object} query - Query object.
     * @param {Boolean} query.enableClickTracking - True, if you want to track clicks. Otherwise, false
     * @param {Boolean} query.enableLinkClickTracking - True, if you want to track by link tracking. Otherwise, false
     * @param {Boolean} query.manageSubscriptions - True, if you want to display your labels on your unsubscribe form. Otherwise, false
     * @param {Boolean} query.manageSubscribedOnly - True, if you want to only display labels that the contact is subscribed to on your unsubscribe form. Otherwise, false
     * @param {Boolean} query.transactionalOnUnsubscribe - True, if you want to display an option for the contact to opt into transactional email only on your unsubscribe form. Otherwise, false
     * @param {Boolean} query.skipListUnsubscribe - True, if you do not want to use list-unsubscribe headers. Otherwise, false
     * @param {Boolean} query.autoTextFromHtml - True, if text BODY of message should be created automatically. Otherwise, false
     * @param {Boolean} query.allowCustomHeaders - True, if you want to apply custom headers to your emails. Otherwise, false
     * @param {String} query.bccEmail - Email address to send a copy of all email to.
     * @param {String} query.contentTransferEncoding - Type of content encoding
     * @param {Boolean} query.emailNotificationForError - True, if you want bounce notifications returned. Otherwise, false
     * @param {String} query.emailNotificationEmail - Specific email address to send bounce email notifications to.
     * @param {String} query.webNotificationUrl - URL address to receive web notifications to parse and process.
     * @param {Boolean} query.webNotificationNotifyOncePerEmail - True, if you want to receive notifications for each type only once per email. Otherwise, false
     * @param {Boolean} query.webNotificationForSent - True, if you want to send web notifications for sent email. Otherwise, false
     * @param {Boolean} query.webNotificationForOpened - True, if you want to send web notifications for opened email. Otherwise, false
     * @param {Boolean} query.webNotificationForClicked - True, if you want to send web notifications for clicked email. Otherwise, false
     * @param {Boolean} query.webNotificationForUnsubscribed - True, if you want to send web notifications for unsubscribed email. Otherwise, false
     * @param {Boolean} query.webNotificationForAbuseReport - True, if you want to send web notifications for complaint email. Otherwise, false
     * @param {Boolean} query.webNotificationForError - True, if you want to send web notifications for bounced email. Otherwise, false
     * @param {String} query.hubCallBackUrl - URL used for tracking action of inbound emails
     * @param {String} query.inboundDomain - Domain you use as your inbound domain
     * @param {Boolean} query.inboundContactsOnly - True, if you want inbound email to only process contacts from your account. Otherwise, false
     * @param {Boolean} query.lowCreditNotification - True, if you want to receive low credit email notifications. Otherwise, false
     * @param {Boolean} query.enableUITooltips - True, if account has tooltips active. Otherwise, false
     * @param {Boolean} query.enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
     * @param {String} query.notificationsEmails - Email addresses to send a copy of all notifications from our system. Separated by semicolon
     * @param {String} query.unsubscribeNotificationsEmails - Emails, separated by semicolon, to which the notification about contact unsubscribing should be sent to
     * @param {String} query.logoUrl - URL to your logo image.
     * @param {Boolean} query.enableTemplateScripting - True, if you want to use template scripting in your emails {{}}. Otherwise, false
     * @param {Number} query.staleContactScore - (0 means this functionality is NOT enabled) Score, depending on the number of times you have sent to a recipient, at which the given recipient should be moved to the Stale status
     * @param {Number} query.staleContactInactiveDays - (0 means this functionality is NOT enabled) Number of days of inactivity for a contact after which the given recipient should be moved to the Stale status
     * @param {Function} callback
     * @return {AdvancedOptions}
     */
    account.UpdateAdvancedOptions = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/updateadvancedoptions', query, callback, 'POST');
    };

    /**
     * Update settings of your private branding. These settings are needed, if you want to use Elastic Email under your brand.
     * @param {Object} query - Query object.
     * @param {Boolean} query.enablePrivateBranding - True: Turn on or off ability to send mails under your brand. Otherwise, false
     * @param {String} query.logoUrl - URL to your logo image.
     * @param {String} query.supportLink - Address to your support.
     * @param {String} query.privateBrandingUrl - Subdomain for your rebranded service
     * @param {String} query.smtpAddress - Address of SMTP server.
     * @param {String} query.smtpAlternative - Address of alternative SMTP server.
     * @param {String} query.paymentUrl - URL for making payments.
     * @param {Function} callback
     */
    account.UpdateCustomBranding = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/updatecustombranding', query, callback, 'POST');
    };

    /**
     * Update http notification URL.
     * @param {Object} query - Query object.
     * @param {String} query.url - URL of notification.
     * @param {Boolean} query.notifyOncePerEmail - True, if you want to receive notifications for each type only once per email. Otherwise, false
     * @param {String} query.settings - Http notification settings serialized to JSON 
     * @param {Function} callback
     */
    account.UpdateHttpNotification = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/updatehttpnotification', query, callback, 'POST');
    };

    /**
     * Update your profile.
     * @param {Object} query - Query object.
     * @param {String} query.firstName - First name.
     * @param {String} query.lastName - Last name.
     * @param {String} query.address1 - First line of address.
     * @param {String} query.city - City.
     * @param {String} query.state - State or province.
     * @param {String} query.zip - Zip/postal code.
     * @param {Number} query.countryID - Numeric ID of country. A file with the list of countries is available <a href="http://api.elasticemail.com/public/countries"><b>here</b></a>
     * @param {String} query.deliveryReason - Why your clients are receiving your emails.
     * @param {Boolean} query.marketingConsent - True if you want to receive newsletters from Elastic Email. Otherwise, false.
     * @param {String} query.address2 - Second line of address.
     * @param {String} query.company - Company name.
     * @param {String} query.website - HTTP address of your website.
     * @param {String} query.logoUrl - URL to your logo image.
     * @param {String} query.taxCode - Code used for tax purposes.
     * @param {String} query.phone - Phone number
     * @param {Function} callback
     */
    account.UpdateProfile = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/updateprofile', query, callback, 'POST');
    };

    /**
     * Updates settings of specified subaccount
     * @param {Object} query - Query object.
     * @param {Boolean} query.requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Number} query.monthlyRefillCredits - Amount of credits added to account automatically
     * @param {Boolean} query.requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Boolean} query.enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
     * @param {Number} query.dailySendLimit - Amount of emails account can send daily
     * @param {Number} query.emailSizeLimit - Maximum size of email including attachments in MB's
     * @param {Boolean} query.enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
     * @param {Number} query.maxContacts - Maximum number of contacts the account can have
     * @param {String} query.subAccountEmail - Email address of sub-account
     * @param {String} query.publicAccountID - Public key of sub-account to update. Use subAccountEmail or publicAccountID not both.
     * @param {SendingPermission} query.sendingPermission - Sending permission setting for account
     * @param {Boolean} query.enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
     * @param {String} query.poolName - Name of your custom IP Pool to be used in the sending process
     * @param {Function} callback
     */
    account.UpdateSubAccountSettings = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/account/updatesubaccountsettings', query, callback, 'POST');
    };

    /* endregion Account */

    /* region Attachment */
    /**
     *Managing attachments uploaded to your account.
     */
    var attachment = {};

    /**
     * Permanently deletes attachment file from your account
     * @param {Object} query - Query object.
     * @param {Number} query.attachmentID - ID number of your attachment.
     * @param {Function} callback
     */
    attachment.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/attachment/delete', query, callback, 'POST');
    };

    /**
     * Gets address of chosen Attachment
     * @param {Object} query - Query object.
     * @param {String} query.fileName - Name of your file.
     * @param {Number} query.attachmentID - ID number of your attachment.
     * @param {Function} callback
     * @return {{content: Object, filename: String}}
     */
    attachment.Get = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/attachment/get', query, callback, 'POST');
    };

    /**
     * Lists your available Attachments in the given email
     * @param {Object} query - Query object.
     * @param {String} query.msgID - ID number of selected message.
     * @param {Function} callback
     * @return {Array.<Attachment>}
     */
    attachment.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/attachment/list', query, callback, 'POST');
    };

    /**
     * Lists all your available attachments
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<Attachment>}
     */
    attachment.ListAll = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/attachment/listall', query, callback, 'POST');
    };

    /**
     * Permanently removes attachment file from your account
     * @param {Object} query - Query object.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     */
    attachment.Remove = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/attachment/remove', query, callback, 'POST');
    };

    /**
     * Uploads selected file to the server using http form upload format (MIME multipart/form-data) or PUT method. The attachments expire after 30 days.
     * @param {Object} query - Query object.
     * @param {{content: Object, filename: String}} query.attachmentFile - Content of your attachment.
     * @param {Function} callback
     * @return {Attachment}
     */
    attachment.Upload = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         uploadPostFile('/attachment/upload', query, callback);
    };

    /* endregion Attachment */

    /* region Campaign */
    /**
     *Sending and monitoring progress of your Campaigns
     */
    var campaign = {};

    /**
     * Adds a campaign to the queue for processing based on the configuration
     * @param {Object} query - Query object.
     * @param {Campaign} query.campaign - Json representation of a campaign
     * @param {Function} callback
     * @return {Number}
     */
    campaign.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/add', query, callback, 'POST');
    };

    /**
     * Copy selected campaign
     * @param {Object} query - Query object.
     * @param {Number} query.channelID - ID number of selected Channel.
     * @param {Function} callback
     */
    campaign.Copy = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/copy', query, callback, 'POST');
    };

    /**
     * Delete selected campaign
     * @param {Object} query - Query object.
     * @param {Number} query.channelID - ID number of selected Channel.
     * @param {Function} callback
     */
    campaign.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/delete', query, callback, 'POST');
    };

    /**
     * Export selected campaigns to chosen file format.
     * @param {Object} query - Query object.
     * @param {Array.<Number>} query.channelIDs - List of campaign IDs used for processing
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {ExportLink}
     */
    campaign.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/export', query, callback, 'POST');
    };

    /**
     * List all of your campaigns
     * @param {Object} query - Query object.
     * @param {String} query.search - Text fragment used for searching.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Function} callback
     * @return {Array.<CampaignChannel>}
     */
    campaign.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/list', query, callback, 'POST');
    };

    /**
     * Updates a previously added campaign.  Only Active and Paused campaigns can be updated.
     * @param {Object} query - Query object.
     * @param {Campaign} query.campaign - Json representation of a campaign
     * @param {Function} callback
     * @return {Number}
     */
    campaign.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/campaign/update', query, callback, 'POST');
    };

    /* endregion Campaign */

    /* region Channel */
    /**
     *SMTP and HTTP API channels for grouping email delivery.
     */
    var channel = {};

    /**
     * Manually add a channel to your account to group email
     * @param {Object} query - Query object.
     * @param {String} query.name - Descriptive name of the channel
     * @param {Function} callback
     * @return {String}
     */
    channel.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/add', query, callback, 'POST');
    };

    /**
     * Delete the channel.
     * @param {Object} query - Query object.
     * @param {String} query.name - The name of the channel to delete.
     * @param {Function} callback
     */
    channel.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/delete', query, callback, 'POST');
    };

    /**
     * Export channels in CSV file format.
     * @param {Object} query - Query object.
     * @param {Array.<String>} query.channelNames - List of channel names used for processing
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {{content: Object, filename: String}}
     */
    channel.ExportCsv = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/exportcsv', query, callback, 'POST');
    };

    /**
     * Export channels in JSON file format.
     * @param {Object} query - Query object.
     * @param {Array.<String>} query.channelNames - List of channel names used for processing
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {{content: Object, filename: String}}
     */
    channel.ExportJson = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/exportjson', query, callback, 'POST');
    };

    /**
     * Export channels in XML file format.
     * @param {Object} query - Query object.
     * @param {Array.<String>} query.channelNames - List of channel names used for processing
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {{content: Object, filename: String}}
     */
    channel.ExportXml = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/exportxml', query, callback, 'POST');
    };

    /**
     * List all of your channels
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<Channel>}
     */
    channel.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/list', query, callback, 'POST');
    };

    /**
     * Rename an existing channel.
     * @param {Object} query - Query object.
     * @param {String} query.name - The name of the channel to update.
     * @param {String} query.newName - The new name for the channel.
     * @param {Function} callback
     * @return {String}
     */
    channel.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/channel/update', query, callback, 'POST');
    };

    /* endregion Channel */

    /* region Contact */
    /**
     *Methods used to manage your Contacts.
     */
    var contact = {};

    /**
     * Activate contacts that are currently blocked.
     * @param {Object} query - Query object.
     * @param {Boolean} query.activateAllBlocked - Activate all your blocked contacts.  Passing True will override email list and activate all your blocked contacts.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Function} callback
     */
    contact.ActivateBlocked = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/activateblocked', query, callback, 'POST');
    };

    /**
     * Add a new contact and optionally to one of your lists.  Note that your API KEY is not required for this call.
     * @param {Object} query - Query object.
     * @param {String} query.publicAccountID - Public key for limited access to your account such as contact/add so you can use it safely on public websites.
     * @param {String} query.email - Proper email address.
     * @param {StringArray.<String>} query.publicListID - ID code of list
     * @param {StringArray.<String>} query.listName - Name of your list.
     * @param {String} query.title - Title
     * @param {String} query.firstName - First name.
     * @param {String} query.lastName - Last name.
     * @param {String} query.phone - Phone number
     * @param {String} query.mobileNumber - Mobile phone number
     * @param {String} query.notes - Free form field of notes
     * @param {String} query.gender - Your gender
     * @param {Date} query.birthDate - Date of birth in YYYY-MM-DD format
     * @param {String} query.city - City.
     * @param {String} query.state - State or province.
     * @param {String} query.postalCode - Zip/postal code.
     * @param {String} query.country - Name of country.
     * @param {String} query.organizationName - Name of organization
     * @param {String} query.website - HTTP address of your website.
     * @param {Number} query.annualRevenue - Annual revenue of contact
     * @param {String} query.industry - Industry contact works in
     * @param {Number} query.numberOfEmployees - Number of employees
     * @param {ContactSource} query.source - Specifies the way of uploading the contact
     * @param {String} query.returnUrl - URL to navigate to after account creation
     * @param {String} query.sourceUrl - URL from which request was sent.
     * @param {String} query.activationReturnUrl - The url to return the contact to after activation.
     * @param {String} query.activationTemplate - 
     * @param {Boolean} query.sendActivation - True, if you want to send activation email to this account. Otherwise, false
     * @param {Date} query.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} query.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {String,String} query.field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname 
     * @param {String} query.notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
     * @param {Function} callback
     * @return {String}
     */
    contact.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/add', query, callback, 'POST');
    };

    /**
     * Manually add or update a contacts status to Abuse, Bounced or Unsubscribed status (blocked).
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {ContactStatus} query.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {Function} callback
     */
    contact.AddBlocked = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/addblocked', query, callback, 'POST');
    };

    /**
     * Change any property on the contact record.
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {String} query.name - Name of the contact property you want to change.
     * @param {String} query.value - Value you would like to change the contact property to.
     * @param {Function} callback
     */
    contact.ChangeProperty = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/changeproperty', query, callback, 'POST');
    };

    /**
     * Changes status of selected Contacts. You may provide RULE for selection or specify list of Contact IDs.
     * @param {Object} query - Query object.
     * @param {ContactStatus} query.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     */
    contact.ChangeStatus = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/changestatus', query, callback, 'POST');
    };

    /**
     * Returns number of Contacts, RULE specifies contact Status.
     * @param {Object} query - Query object.
     * @param {String} query.rule - Query used for filtering.
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     * @return {ContactStatusCounts}
     */
    contact.CountByStatus = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/countbystatus', query, callback, 'POST');
    };

    /**
     * Permanantly deletes the contacts provided.  You can provide either a qualified rule or a list of emails (comma separated string).
     * @param {Object} query - Query object.
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     */
    contact.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/delete', query, callback, 'POST');
    };

    /**
     * Export selected Contacts to JSON.
     * @param {Object} query - Query object.
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {ExportLink}
     */
    contact.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/export', query, callback, 'POST');
    };

    /**
     * Finds all Lists and Segments this email belongs to.
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {Function} callback
     * @return {ContactCollection}
     */
    contact.FindContact = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/findcontact', query, callback, 'POST');
    };

    /**
     * List of Contacts for provided List
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<Contact>}
     */
    contact.GetContactsByList = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/getcontactsbylist', query, callback, 'POST');
    };

    /**
     * List of Contacts for provided Segment
     * @param {Object} query - Query object.
     * @param {String} query.segmentName - Name of your segment.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<Contact>}
     */
    contact.GetContactsBySegment = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/getcontactsbysegment', query, callback, 'POST');
    };

    /**
     * List of all contacts. If you have not specified RULE, all Contacts will be listed.
     * @param {Object} query - Query object.
     * @param {String} query.rule - Query used for filtering.
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<Contact>}
     */
    contact.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/list', query, callback, 'POST');
    };

    /**
     * Load blocked contacts
     * @param {Object} query - Query object.
     * @param {Array.<ContactStatus>} query.statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {String} query.search - List of blocked statuses: Abuse, Bounced or Unsubscribed
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<BlockedContact>}
     */
    contact.LoadBlocked = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/loadblocked', query, callback, 'POST');
    };

    /**
     * Load detailed contact information
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {Function} callback
     * @return {Contact}
     */
    contact.LoadContact = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/loadcontact', query, callback, 'POST');
    };

    /**
     * Shows detailed history of chosen Contact.
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<ContactHistory>}
     */
    contact.LoadHistory = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/loadhistory', query, callback, 'POST');
    };

    /**
     * Add new Contact to one of your Lists.
     * @param {Object} query - Query object.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {String} query.firstName - First name.
     * @param {String} query.lastName - Last name.
     * @param {String} query.title - Title
     * @param {String} query.organization - Name of organization
     * @param {String} query.industry - Industry contact works in
     * @param {String} query.city - City.
     * @param {String} query.country - Name of country.
     * @param {String} query.state - State or province.
     * @param {String} query.zip - Zip/postal code.
     * @param {String} query.publicListID - ID code of list
     * @param {String} query.listName - Name of your list.
     * @param {ContactStatus} query.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {String} query.notes - Free form field of notes
     * @param {Date} query.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} query.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {String} query.notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
     * @param {Function} callback
     */
    contact.QuickAdd = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/quickadd', query, callback, 'POST');
    };

    /**
     * Update selected contact. Omitted contact's fields will be reset by default (see the clearRestOfFields parameter)
     * @param {Object} query - Query object.
     * @param {String} query.email - Proper email address.
     * @param {String} query.firstName - First name.
     * @param {String} query.lastName - Last name.
     * @param {String} query.organizationName - Name of organization
     * @param {String} query.title - Title
     * @param {String} query.city - City.
     * @param {String} query.state - State or province.
     * @param {String} query.country - Name of country.
     * @param {String} query.zip - Zip/postal code.
     * @param {String} query.birthDate - Date of birth in YYYY-MM-DD format
     * @param {String} query.gender - Your gender
     * @param {String} query.phone - Phone number
     * @param {Boolean} query.activate - True, if Contact should be activated. Otherwise, false
     * @param {String} query.industry - Industry contact works in
     * @param {Number} query.numberOfEmployees - Number of employees
     * @param {String} query.annualRevenue - Annual revenue of contact
     * @param {Number} query.purchaseCount - Number of purchases contact has made
     * @param {String} query.firstPurchase - Date of first purchase in YYYY-MM-DD format
     * @param {String} query.lastPurchase - Date of last purchase in YYYY-MM-DD format
     * @param {String} query.notes - Free form field of notes
     * @param {String} query.websiteUrl - Website of contact
     * @param {String} query.mobileNumber - Mobile phone number
     * @param {String} query.faxNumber - Fax number
     * @param {String} query.linkedInBio - Biography for Linked-In
     * @param {Number} query.linkedInConnections - Number of Linked-In connections
     * @param {String} query.twitterBio - Biography for Twitter
     * @param {String} query.twitterUsername - User name for Twitter
     * @param {String} query.twitterProfilePhoto - URL for Twitter photo
     * @param {Number} query.twitterFollowerCount - Number of Twitter followers
     * @param {Number} query.pageViews - Number of page views
     * @param {Number} query.visits - Number of website visits
     * @param {Boolean} query.clearRestOfFields - States if the fields that were omitted in this request are to be reset or should they be left with their current value
     * @param {String,String} query.field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname 
     * @param {Function} callback
     * @return {Contact}
     */
    contact.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/contact/update', query, callback, 'POST');
    };

    /**
     * Upload contacts in CSV file.
     * @param {Object} query - Query object.
     * @param {{content: Object, filename: String}} query.contactFile - Name of CSV file with Contacts.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this (optional) newly created list. Otherwise, false
     * @param {Number} query.listID - ID number of selected list.
     * @param {String} query.listName - Name of your list to upload contacts to, or how the new, automatically created list should be named
     * @param {ContactStatus} query.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {Date} query.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} query.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {Function} callback
     * @return {Number}
     */
    contact.Upload = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         uploadPostFile('/contact/upload', query, callback);
    };

    /* endregion Contact */

    /* region Domain */
    /**
     *Managing sender domains. Creating new entries and validating domain records.
     */
    var domain = {};

    /**
     * Add new domain to account
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {TrackingType} query.trackingType - 
     * @param {Function} callback
     */
    domain.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/add', query, callback, 'POST');
    };

    /**
     * Deletes configured domain from account
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {Function} callback
     */
    domain.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/delete', query, callback, 'POST');
    };

    /**
     * Lists all domains configured for this account.
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<DomainDetail>}
     */
    domain.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/list', query, callback, 'POST');
    };

    /**
     * Verification of email addres set for domain.
     * @param {Object} query - Query object.
     * @param {String} query.domain - Default email sender, example: mail@yourdomain.com
     * @param {Function} callback
     */
    domain.SetDefault = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/setdefault', query, callback, 'POST');
    };

    /**
     * Verification of DKIM record for domain
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {Function} callback
     */
    domain.VerifyDkim = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/verifydkim', query, callback, 'POST');
    };

    /**
     * Verification of MX record for domain
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {Function} callback
     */
    domain.VerifyMX = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/verifymx', query, callback, 'POST');
    };

    /**
     * Verification of SPF record for domain
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {Function} callback
     */
    domain.VerifySpf = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/verifyspf', query, callback, 'POST');
    };

    /**
     * Verification of tracking CNAME record for domain
     * @param {Object} query - Query object.
     * @param {String} query.domain - Name of selected domain.
     * @param {TrackingType} query.trackingType - 
     * @param {Function} callback
     */
    domain.VerifyTracking = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/domain/verifytracking', query, callback, 'POST');
    };

    /* endregion Domain */

    /* region Eksport */
    /**
     *
     */
    var eksport = {};

    /**
     * Check the current status of the export.
     * @param {Object} query - Query object.
     * @param {String} query.publicExportID - 
     * @param {Function} callback
     * @return {ExportStatus}
     */
    eksport.CheckStatus = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/export/checkstatus', query, callback, 'POST');
    };

    /**
     * Summary of export type counts.
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {ExportTypeCounts}
     */
    eksport.CountByType = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/export/countbytype', query, callback, 'POST');
    };

    /**
     * Delete the specified export.
     * @param {Object} query - Query object.
     * @param {String} query.publicExportID - 
     * @param {Function} callback
     */
    eksport.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/export/delete', query, callback, 'POST');
    };

    /**
     * Returns a list of all exported data.
     * @param {Object} query - Query object.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {Array.<Export>}
     */
    eksport.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/export/list', query, callback, 'POST');
    };

    /* endregion Eksport */

    /* region Email */
    /**
     *
     */
    var email = {};

    /**
     * Get email batch status
     * @param {Object} query - Query object.
     * @param {String} query.transactionID - Transaction identifier
     * @param {Boolean} query.showFailed - Include Bounced email addresses.
     * @param {Boolean} query.showDelivered - Include Sent email addresses.
     * @param {Boolean} query.showPending - Include Ready to send email addresses.
     * @param {Boolean} query.showOpened - Include Opened email addresses.
     * @param {Boolean} query.showClicked - Include Clicked email addresses.
     * @param {Boolean} query.showAbuse - Include Reported as abuse email addresses.
     * @param {Boolean} query.showUnsubscribed - Include Unsubscribed email addresses.
     * @param {Boolean} query.showErrors - Include error messages for bounced emails.
     * @param {Boolean} query.showMessageIDs - Include all MessageIDs for this transaction
     * @param {Function} callback
     * @return {EmailJobStatus}
     */
    email.GetStatus = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/email/getstatus', query, callback, 'POST');
    };

    /**
     * Submit emails. The HTTP POST request is suggested. The default, maximum (accepted by us) size of an email is 10 MB in total, with or without attachments included. For suggested implementations please refer to https://elasticemail.com/support/http-api/
     * @param {Object} query - Query object.
     * @param {String} query.subject - Email subject
     * @param {String} query.from - From email address
     * @param {String} query.fromName - Display name for from email address
     * @param {String} query.sender - Email address of the sender
     * @param {String} query.senderName - Display name sender
     * @param {String} query.msgFrom - Optional parameter. Sets FROM MIME header.
     * @param {String} query.msgFromName - Optional parameter. Sets FROM name of MIME header.
     * @param {String} query.replyTo - Email address to reply to
     * @param {String} query.replyToName - Display name of the reply to address
     * @param {Array.<String>} query.to - List of email recipients (each email is treated separately, like a BCC). Separated by comma or semicolon. We suggest using the "msgTo" parameter if backward compatibility with API version 1 is not a must.
     * @param {StringArray.<String>} query.msgTo - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as TO MIME header). Separated by comma or semicolon.
     * @param {StringArray.<String>} query.msgCC - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as CC MIME header). Separated by comma or semicolon.
     * @param {StringArray.<String>} query.msgBcc - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (each email is treated seperately). Separated by comma or semicolon.
     * @param {Array.<String>} query.lists - The name of a contact list you would like to send to. Separate multiple contact lists by commas or semicolons.
     * @param {Array.<String>} query.segments - The name of a segment you would like to send to. Separate multiple segments by comma or semicolon. Insert "0" for all Active contacts.
     * @param {String} query.mergeSourceFilename - File name one of attachments which is a CSV list of Recipients.
     * @param {String} query.channel - An ID field (max 191 chars) that can be used for reporting [will default to HTTP API or SMTP API]
     * @param {String} query.bodyHtml - Html email body
     * @param {String} query.bodyText - Text email body
     * @param {String} query.charset - Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more…
     * @param {String} query.charsetBodyHtml - Sets charset for body html MIME part (overrides default value from charset parameter)
     * @param {String} query.charsetBodyText - Sets charset for body text MIME part (overrides default value from charset parameter)
     * @param {EncodingType} query.encodingType - 0 for None, 1 for Raw7Bit, 2 for Raw8Bit, 3 for QuotedPrintable, 4 for Base64 (Default), 5 for Uue  note that you can also provide the text version such as "Raw7Bit" for value 1.  NOTE: Base64 or QuotedPrintable is recommended if you are validating your domain(s) with DKIM.
     * @param {String} query.template - The name of an email template you have created in your account.
     * @param {{content: Object, filename: String}} query.attachmentFiles - Attachment files. These files should be provided with the POST multipart file upload, not directly in the request's URL. Should also include merge CSV file
     * @param {String,String} query.headers - Optional Custom Headers. Request parameters prefixed by headers_ like headers_customheader1, headers_customheader2. Note: a space is required after the colon before the custom header value. headers_xmailer=xmailer: header-value1
     * @param {String} query.postBack - Optional header returned in notifications.
     * @param {String,String} query.merge - Request parameters prefixed by merge_ like merge_firstname, merge_lastname. If sending to a template you can send merge_ fields to merge data with the template. Template fields are entered with {firstname}, {lastname} etc.
     * @param {String} query.timeOffSetMinutes - Number of minutes in the future this email should be sent
     * @param {String} query.poolName - Name of your custom IP Pool to be used in the sending process
     * @param {Boolean} query.isTransactional - True, if email is transactional (non-bulk, non-marketing, non-commercial). Otherwise, false
     * @param {Function} callback
     * @return {EmailSend}
     */
    email.Send = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         uploadPostFile('/email/send', query, callback);
    };

    /**
     * Detailed status of a unique email sent through your account. Returns a 'Email has expired and the status is unknown.' error, if the email has not been fully processed yet.
     * @param {Object} query - Query object.
     * @param {String} query.messageID - Unique identifier for this email.
     * @param {Function} callback
     * @return {EmailStatus}
     */
    email.Status = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/email/status', query, callback, 'POST');
    };

    /**
     * View email
     * @param {Object} query - Query object.
     * @param {String} query.messageID - Message identifier
     * @param {Function} callback
     * @return {EmailView}
     */
    email.View = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/email/view', query, callback, 'POST');
    };

    /* endregion Email */

    /* region List */
    /**
     *API methods for managing your Lists
     */
    var list = {};

    /**
     * Create new list, based on filtering rule or list of IDs
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Boolean} query.createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     * @return {Number}
     */
    list.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/add', query, callback, 'POST');
    };

    /**
     * Add Contacts to chosen list
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     */
    list.AddContacts = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/addcontacts', query, callback, 'POST');
    };

    /**
     * Copy your existing List with the option to provide new settings to it. Some fields, when left empty, default to the source list's settings
     * @param {Object} query - Query object.
     * @param {String} query.sourceListName - The name of the list you want to copy
     * @param {String} query.newlistName - Name of your list if you want to change it.
     * @param {Boolean} query.createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} query.rule - Query used for filtering.
     * @param {Function} callback
     * @return {Number}
     */
    list.Copy = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/copy', query, callback, 'POST');
    };

    /**
     * Create a new list from the recipients of the given campaign, using the given statuses of Messages
     * @param {Object} query - Query object.
     * @param {Number} query.campaignID - ID of the campaign which recipients you want to copy
     * @param {String} query.listName - Name of your list.
     * @param {Array.<LogJobStatus>} query.statuses - Statuses of a campaign's emails you want to include in the new list (but NOT the contacts' statuses)
     * @param {Function} callback
     * @return {Number}
     */
    list.CreateFromCampaign = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/createfromcampaign', query, callback, 'POST');
    };

    /**
     * Create a series of nth selection lists from an existing list or segment
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Number} query.numberOfLists - The number of evenly distributed lists to create.
     * @param {Boolean} query.excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} query.rule - Query used for filtering.
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     */
    list.CreateNthSelectionLists = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/createnthselectionlists', query, callback, 'POST');
    };

    /**
     * Create a new list with randomized contacts from an existing list or segment
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Number} query.count - Number of items.
     * @param {Boolean} query.excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} query.rule - Query used for filtering.
     * @param {Boolean} query.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @param {Function} callback
     * @return {Number}
     */
    list.CreateRandomList = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/createrandomlist', query, callback, 'POST');
    };

    /**
     * Deletes List and removes all the Contacts from it (does not delete Contacts).
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Function} callback
     */
    list.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/delete', query, callback, 'POST');
    };

    /**
     * Exports all the contacts from the provided list
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {ExportLink}
     */
    list.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/export', query, callback, 'POST');
    };

    /**
     * Shows all your existing lists
     * @param {Object} query - Query object.
     * @param {Date} query.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Function} callback
     * @return {Array.<List>}
     */
    list.list = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/list', query, callback, 'POST');
    };

    /**
     * Returns detailed information about specific list.
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {Function} callback
     * @return {List}
     */
    list.Load = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/load', query, callback, 'POST');
    };

    /**
     * Move selected contacts from one List to another
     * @param {Object} query - Query object.
     * @param {String} query.oldListName - The name of the list from which the contacts will be copied from
     * @param {String} query.newListName - The name of the list to copy the contacts to
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Boolean} query.moveAll - TRUE - moves all contacts; FALSE - moves contacts provided in the 'emails' parameter. This is ignored if the 'statuses' parameter has been provided
     * @param {Array.<ContactStatus>} query.statuses - List of contact statuses which are eligible to move. This ignores the 'moveAll' parameter
     * @param {Function} callback
     */
    list.MoveContacts = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/movecontacts', query, callback, 'POST');
    };

    /**
     * Remove selected Contacts from your list
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {String} query.rule - Query used for filtering.
     * @param {Array.<String>} query.emails - Comma delimited list of contact emails
     * @param {Function} callback
     */
    list.RemoveContacts = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/removecontacts', query, callback, 'POST');
    };

    /**
     * Update existing list
     * @param {Object} query - Query object.
     * @param {String} query.listName - Name of your list.
     * @param {String} query.newListName - Name of your list if you want to change it.
     * @param {Boolean} query.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {Function} callback
     */
    list.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/list/update', query, callback, 'POST');
    };

    /* endregion List */

    /* region Log */
    /**
     *Methods to check logs of your campaigns
     */
    var log = {};

    /**
     * Cancels emails that are waiting to be sent.
     * @param {Object} query - Query object.
     * @param {String} query.channelName - Name of selected channel.
     * @param {String} query.transactionID - ID number of transaction
     * @param {Function} callback
     */
    log.CancelInProgress = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/cancelinprogress', query, callback, 'POST');
    };

    /**
     * Export email log information to the specified file format.
     * @param {Object} query - Query object.
     * @param {Array.<LogJobStatus>} query.statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {Date} query.from - Start date.
     * @param {Date} query.to - End date.
     * @param {Number} query.channelID - ID number of selected Channel.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Boolean} query.includeEmail - True: Search includes emails. Otherwise, false.
     * @param {Boolean} query.includeSms - True: Search includes SMS. Otherwise, false.
     * @param {Array.<MessageCategory>} query.messageCategory - ID of message category
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {String} query.email - Proper email address.
     * @param {Function} callback
     * @return {ExportLink}
     */
    log.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/export', query, callback, 'POST');
    };

    /**
     * Export detailed link tracking information to the specified file format.
     * @param {Object} query - Query object.
     * @param {Number} query.channelID - ID number of selected Channel.
     * @param {Date} query.from - Start date.
     * @param {Date} query.to - End Date.
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {ExportLink}
     */
    log.ExportLinkTracking = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/exportlinktracking', query, callback, 'POST');
    };

    /**
     * Track link clicks
     * @param {Object} query - Query object.
     * @param {Date} query.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {String} query.channelName - Name of selected channel.
     * @param {Function} callback
     * @return {LinkTrackingDetails}
     */
    log.LinkTracking = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/linktracking', query, callback, 'POST');
    };

    /**
     * Returns logs filtered by specified parameters.
     * @param {Object} query - Query object.
     * @param {Array.<LogJobStatus>} query.statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {Date} query.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {String} query.channelName - Name of selected channel.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Boolean} query.includeEmail - True: Search includes emails. Otherwise, false.
     * @param {Boolean} query.includeSms - True: Search includes SMS. Otherwise, false.
     * @param {Array.<MessageCategory>} query.messageCategory - ID of message category
     * @param {String} query.email - Proper email address.
     * @param {Boolean} query.useStatusChangeDate - True, if 'from' and 'to' parameters should resolve to the Status Change date. To resolve to the creation date - false
     * @param {Function} callback
     * @return {Log}
     */
    log.Load = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/load', query, callback, 'POST');
    };

    /**
     * Retry sending of temporarily not delivered message.
     * @param {Object} query - Query object.
     * @param {String} query.msgID - ID number of selected message.
     * @param {Function} callback
     */
    log.RetryNow = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/retrynow', query, callback, 'POST');
    };

    /**
     * Loads summary information about activity in chosen date range.
     * @param {Object} query - Query object.
     * @param {Date} query.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} query.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {String} query.channelName - Name of selected channel.
     * @param {String} query.interval - 'Hourly' for detailed information, 'summary' for daily overview
     * @param {String} query.transactionID - ID number of transaction
     * @param {Function} callback
     * @return {LogSummary}
     */
    log.Summary = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/log/summary', query, callback, 'POST');
    };

    /* endregion Log */

    /* region Segment */
    /**
     *Manages your segments - dynamically created lists of contacts
     */
    var segment = {};

    /**
     * Create new segment, based on specified RULE.
     * @param {Object} query - Query object.
     * @param {String} query.segmentName - Name of your segment.
     * @param {String} query.rule - Query used for filtering.
     * @param {Function} callback
     * @return {Segment}
     */
    segment.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/add', query, callback, 'POST');
    };

    /**
     * Copy your existing Segment with the optional new rule and custom name
     * @param {Object} query - Query object.
     * @param {String} query.sourceSegmentName - The name of the segment you want to copy
     * @param {String} query.newSegmentName - New name of your segment if you want to change it.
     * @param {String} query.rule - Query used for filtering.
     * @param {Function} callback
     * @return {Segment}
     */
    segment.Copy = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/copy', query, callback, 'POST');
    };

    /**
     * Delete existing segment.
     * @param {Object} query - Query object.
     * @param {String} query.segmentName - Name of your segment.
     * @param {Function} callback
     */
    segment.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/delete', query, callback, 'POST');
    };

    /**
     * Exports all the contacts from the provided segment
     * @param {Object} query - Query object.
     * @param {String} query.segmentName - Name of your segment.
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} query.fileName - Name of your file.
     * @param {Function} callback
     * @return {ExportLink}
     */
    segment.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/export', query, callback, 'POST');
    };

    /**
     * Lists all your available Segments
     * @param {Object} query - Query object.
     * @param {Boolean} query.includeHistory - True: Include history of last 30 days. Otherwise, false.
     * @param {Date} query.from - From what date should the segment history be shown
     * @param {Date} query.to - To what date should the segment history be shown
     * @param {Function} callback
     * @return {Array.<Segment>}
     */
    segment.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/list', query, callback, 'POST');
    };

    /**
     * Lists your available Segments using the provided names
     * @param {Object} query - Query object.
     * @param {Array.<String>} query.segmentNames - Names of segments you want to load. Will load all contacts if left empty or the 'All Contacts' name has been provided
     * @param {Boolean} query.includeHistory - True: Include history of last 30 days. Otherwise, false.
     * @param {Date} query.from - From what date should the segment history be shown
     * @param {Date} query.to - To what date should the segment history be shown
     * @param {Function} callback
     * @return {Array.<Segment>}
     */
    segment.LoadByName = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/loadbyname', query, callback, 'POST');
    };

    /**
     * Rename or change RULE for your segment
     * @param {Object} query - Query object.
     * @param {String} query.segmentName - Name of your segment.
     * @param {String} query.newSegmentName - New name of your segment if you want to change it.
     * @param {String} query.rule - Query used for filtering.
     * @param {Function} callback
     * @return {Segment}
     */
    segment.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/segment/update', query, callback, 'POST');
    };

    /* endregion Segment */

    /* region SMS */
    /**
     *Managing texting to your clients.
     */
    var sms = {};

    /**
     * Send a short SMS Message (maximum of 1600 characters) to any mobile phone.
     * @param {Object} query - Query object.
     * @param {String} query.to - Mobile number you want to message. Can be any valid mobile number in E.164 format. To provide the country code you need to provide "+" before the number.  If your URL is not encoded then you need to replace the "+" with "%2B" instead.
     * @param {String} query.body - Body of your message. The maximum body length is 160 characters.  If the message body is greater than 160 characters it is split into multiple messages and you are charged per message for the number of message required to send your length
     * @param {Function} callback
     */
    sms.Send = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/sms/send', query, callback, 'POST');
    };

    /* endregion SMS */

    /* region Survey */
    /**
     *Methods to organize and get results of your surveys
     */
    var survey = {};

    /**
     * Adds a new survey
     * @param {Object} query - Query object.
     * @param {Survey} query.survey - Json representation of a survey
     * @param {Function} callback
     * @return {Survey}
     */
    survey.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/add', query, callback, 'POST');
    };

    /**
     * Deletes the survey
     * @param {Object} query - Query object.
     * @param {String} query.publicSurveyID - Survey identifier
     * @param {Function} callback
     */
    survey.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/delete', query, callback, 'POST');
    };

    /**
     * Export given survey's data to provided format
     * @param {Object} query - Query object.
     * @param {String} query.publicSurveyID - Survey identifier
     * @param {String} query.fileName - Name of your file.
     * @param {ExportFileFormats} query.fileFormat - 
     * @param {CompressionFormat} query.compressionFormat - FileResponse compression format. None or Zip.
     * @param {Function} callback
     * @return {ExportLink}
     */
    survey.Export = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/export', query, callback, 'POST');
    };

    /**
     * Shows all your existing surveys
     * @param {Object} query - Query object.

     * @param {Function} callback
     * @return {Array.<Survey>}
     */
    survey.List = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/list', query, callback, 'POST');
    };

    /**
     * Get list of personal answers for the specific survey
     * @param {Object} query - Query object.
     * @param {String} query.publicSurveyID - Survey identifier
     * @param {Function} callback
     * @return {Array.<SurveyResultInfo>}
     */
    survey.LoadResponseList = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/loadresponselist', query, callback, 'POST');
    };

    /**
     * Get general results of the specific survey
     * @param {Object} query - Query object.
     * @param {String} query.publicSurveyID - Survey identifier
     * @param {Function} callback
     * @return {SurveyResultsSummaryInfo}
     */
    survey.LoadResults = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/loadresults', query, callback, 'POST');
    };

    /**
     * Update the survey information
     * @param {Object} query - Query object.
     * @param {Survey} query.survey - Json representation of a survey
     * @param {Function} callback
     * @return {Survey}
     */
    survey.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/survey/update', query, callback, 'POST');
    };

    /* endregion Survey */

    /* region Template */
    /**
     *Managing and editing templates of your emails
     */
    var template = {};

    /**
     * Create new Template. Needs to be sent using POST method
     * @param {Object} query - Query object.
     * @param {TemplateType} query.templateType - 0 for API connections
     * @param {String} query.templateName - Name of template.
     * @param {String} query.subject - Default subject of email.
     * @param {String} query.fromEmail - Default From: email address.
     * @param {String} query.fromName - Default From: name.
     * @param {TemplateScope} query.templateScope - Enum: 0 - private, 1 - public, 2 - mockup
     * @param {String} query.bodyHtml - HTML code of email (needs escaping).
     * @param {String} query.bodyText - Text body of email.
     * @param {String} query.css - CSS style
     * @param {Number} query.originalTemplateID - ID number of original template.
     * @param {Function} callback
     * @return {Number}
     */
    template.Add = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/add', query, callback, 'POST');
    };

    /**
     * Check if template is used by campaign.
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {Function} callback
     * @return {Boolean}
     */
    template.CheckUsage = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/checkusage', query, callback, 'POST');
    };

    /**
     * Copy Selected Template
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {String} query.templateName - Name of template.
     * @param {String} query.subject - Default subject of email.
     * @param {String} query.fromEmail - Default From: email address.
     * @param {String} query.fromName - Default From: name.
     * @param {Function} callback
     * @return {Template}
     */
    template.Copy = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/copy', query, callback, 'POST');
    };

    /**
     * Delete template with the specified ID
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {Function} callback
     */
    template.Delete = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/delete', query, callback, 'POST');
    };

    /**
     * Search for references to images and replaces them with base64 code.
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {Function} callback
     * @return {String}
     */
    template.GetEmbeddedHtml = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/getembeddedhtml', query, callback, 'POST');
    };

    /**
     * Lists your templates
     * @param {Object} query - Query object.
     * @param {Number} query.limit - Maximum of loaded items.
     * @param {Number} query.offset - How many items should be loaded ahead.
     * @param {Function} callback
     * @return {TemplateList}
     */
    template.GetList = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/getlist', query, callback, 'POST');
    };

    /**
     * Load template with content
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {Boolean} query.ispublic - 
     * @param {Function} callback
     * @return {Template}
     */
    template.LoadTemplate = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/loadtemplate', query, callback, 'POST');
    };

    /**
     * Removes previously generated screenshot of template
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {Function} callback
     */
    template.RemoveScreenshot = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/removescreenshot', query, callback, 'POST');
    };

    /**
     * Saves screenshot of chosen Template
     * @param {Object} query - Query object.
     * @param {String} query.base64Image - Image, base64 coded.
     * @param {Number} query.templateID - ID number of template.
     * @param {Function} callback
     * @return {String}
     */
    template.SaveScreenshot = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/savescreenshot', query, callback, 'POST');
    };

    /**
     * Update existing template, overwriting existing data. Needs to be sent using POST method.
     * @param {Object} query - Query object.
     * @param {Number} query.templateID - ID number of template.
     * @param {TemplateScope} query.templateScope - Enum: 0 - private, 1 - public, 2 - mockup
     * @param {String} query.templateName - Name of template.
     * @param {String} query.subject - Default subject of email.
     * @param {String} query.fromEmail - Default From: email address.
     * @param {String} query.fromName - Default From: name.
     * @param {String} query.bodyHtml - HTML code of email (needs escaping).
     * @param {String} query.bodyText - Text body of email.
     * @param {String} query.css - CSS style
     * @param {Boolean} query.removeScreenshot - 
     * @param {Function} callback
     */
    template.Update = function (query, callback) {
        if (typeof query === 'function' && callback === undefined ) {
            callback = query;
            query = {};
        };
         request('/template/update', query, callback, 'POST');
    };

    /* endregion Template */

    /*-- PUBLIC METHODS --*/
    that.setApiKey = setApiKey;
    that.Account = account;
    that.Attachment = attachment;
    that.Campaign = campaign;
    that.Channel = channel;
    that.Contact = contact;
    that.Domain = domain;
    that.Export = eksport;
    that.Email = email;
    that.List = list;
    that.Log = log;
    that.Segment = segment;
    that.SMS = sms;
    that.Survey = survey;
    that.Template = template;
    return that;

}}));
