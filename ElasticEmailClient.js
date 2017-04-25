(function ( root, factory ) {
    if ( typeof define === "function" && define.amd ) {
        define([ "jquery" ], factory );
    } else if ( typeof exports === "object" ) {
        module.exports = factory( false, require( 'request' ), require( 'querystring' ) );
    } else {
        root.EEAPI = factory( root.$ );
    }
}(this, function ( $, req, querystring ) {


return function EEAPI( options ) {

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
      },
      request,
      ajaxRequest = function request(target, query, callback, method) {
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
      },
      reqRequest = function request (target, query, callback, method) {

        if (method !== "POST") {
            method = "GET";
        }
        query.apikey = cfg.ApiKey;
        req({
          uri: cfg.ApiUri + 'v' + cfg.Version + target + "?" + querystring.stringify(query),
          method: method,
          //'content-type': 'application/json',
          data: JSON.stringify(query)
        }, function (error, response, body) {
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
        cfg = $.extend( cfg, options);
        request = ajaxRequest;
      }
        /* endregion Initialization */

        /* region Utilities */

      var that = {};

      //Method to upload file with get params
      var uploadPostFile = function uploadPostFile(target, fileObj, query, callback) {
          var fd = new FormData();
          var xhr = new XMLHttpRequest();
          query.apikey = cfg.ApiKey;
          var queryString = parameterize(query);
          fd.append('foobarfilename', fileObj);
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
       * @param {String} email - Proper email address.
       * @param {String} password - Current password.
       * @param {String} confirmPassword - Repeat new password.
       * @param {Boolean} requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
       * @param {Boolean} enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
       * @param {Boolean} requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
       * @param {Number} maxContacts - Maximum number of contacts the account can havelkd
       * @param {Boolean} enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
       * @param {Boolean} sendActivation - True, if you want to send activation email to this account. Otherwise, false
       * @param {String} returnUrl - URL to navigate to after account creation
       * @param {SendingPermission} sendingPermission - Sending permission setting for account
       * @param {Boolean} enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
       * @param {String} poolName - Private IP required. Name of the custom IP Pool which Sub Account should use to send its emails. Leave empty for the default one or if no Private IPs have been bought
       * @param {Function} callback
       * @return {String}
       */
      account.AddSubAccount = function (email, password, confirmPassword, requiresEmailCredits, enableLitmusTest, requiresLitmusCredits, maxContacts, enablePrivateIPRequest, sendActivation, returnUrl, sendingPermission, enableContactFeatures, poolName, callback) {
          requiresEmailCredits = typeof requiresEmailCredits !== 'undefined' ? requiresEmailCredits : false;
          enableLitmusTest = typeof enableLitmusTest !== 'undefined' ? enableLitmusTest : false;
          requiresLitmusCredits = typeof requiresLitmusCredits !== 'undefined' ? requiresLitmusCredits : false;
          maxContacts = typeof maxContacts !== 'undefined' ? maxContacts : 0;
          enablePrivateIPRequest = typeof enablePrivateIPRequest !== 'undefined' ? enablePrivateIPRequest : true;
          sendActivation = typeof sendActivation !== 'undefined' ? sendActivation : false;
          returnUrl = typeof returnUrl !== 'undefined' ? returnUrl : null;
          sendingPermission = typeof sendingPermission !== 'undefined' ? sendingPermission : null;
          enableContactFeatures = typeof enableContactFeatures !== 'undefined' ? enableContactFeatures : null;
          poolName = typeof poolName !== 'undefined' ? poolName : null;
          request('/account/addsubaccount', {email: email, password: password, confirmPassword: confirmPassword, requiresEmailCredits: requiresEmailCredits, enableLitmusTest: enableLitmusTest, requiresLitmusCredits: requiresLitmusCredits, maxContacts: maxContacts, enablePrivateIPRequest: enablePrivateIPRequest, sendActivation: sendActivation, returnUrl: returnUrl, sendingPermission: sendingPermission, enableContactFeatures: enableContactFeatures, poolName: poolName}, callback, 'POST');
      };

      /**
       * Add email, template or litmus credits to a sub-account
       * @param {Number} credits - Amount of credits to add
       * @param {String} notes - Specific notes about the transaction
       * @param {CreditType} creditType - Type of credits to add (Email or Litmus)
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to add credits to. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       */
      account.AddSubAccountCredits = function (credits, notes, creditType, subAccountEmail, publicAccountID, callback) {
          creditType = typeof creditType !== 'undefined' ? creditType : 'email';
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/addsubaccountcredits', {credits: credits, notes: notes, creditType: creditType, subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Change your email address. Remember, that your email address is used as login!
       * @param {String} sourceUrl - URL from which request was sent.
       * @param {String} newEmail - New email address.
       * @param {String} confirmEmail - New email address.
       * @param {Function} callback
       */
      account.ChangeEmail = function (sourceUrl, newEmail, confirmEmail, callback) {

          request('/account/changeemail', {sourceUrl: sourceUrl, newEmail: newEmail, confirmEmail: confirmEmail}, callback, 'POST');
      };

      /**
       * Create new password for your account. Password needs to be at least 6 characters long.
       * @param {String} currentPassword - Current password.
       * @param {String} newPassword - New password for account.
       * @param {String} confirmPassword - Repeat new password.
       * @param {Function} callback
       */
      account.ChangePassword = function (currentPassword, newPassword, confirmPassword, callback) {

          request('/account/changepassword', {currentPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword}, callback, 'POST');
      };

      /**
       * Deletes specified Subaccount
       * @param {Boolean} notify - True, if you want to send an email notification. Otherwise, false
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to delete. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       */
      account.DeleteSubAccount = function (notify, subAccountEmail, publicAccountID, callback) {
          notify = typeof notify !== 'undefined' ? notify : true;
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/deletesubaccount', {notify: notify, subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Returns API Key for the given Sub Account.
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to retrieve sub-account API Key. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       * @return {String}
       */
      account.GetSubAccountApiKey = function (subAccountEmail, publicAccountID, callback) {
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/getsubaccountapikey', {subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Lists all of your subaccounts

       * @param {Function} callback
       * @return {Array.<SubAccount>}
       */
      account.GetSubAccountList = function (callback) {

          request('/account/getsubaccountlist', {}, callback, 'POST');
      };

      /**
       * Loads your account. Returns detailed information about your account.

       * @param {Function} callback
       * @return {Account}
       */
      account.Load = function (callback) {

          request('/account/load', {}, callback, 'POST');
      };

      /**
       * Load advanced options of your account

       * @param {Function} callback
       * @return {AdvancedOptions}
       */
      account.LoadAdvancedOptions = function (callback) {

          request('/account/loadadvancedoptions', {}, callback, 'POST');
      };

      /**
       * Lists email credits history

       * @param {Function} callback
       * @return {Array.<EmailCredits>}
       */
      account.LoadEmailCreditsHistory = function (callback) {

          request('/account/loademailcreditshistory', {}, callback, 'POST');
      };

      /**
       * Lists litmus credits history

       * @param {Function} callback
       * @return {Array.<LitmusCredits>}
       */
      account.LoadLitmusCreditsHistory = function (callback) {

          request('/account/loadlitmuscreditshistory', {}, callback, 'POST');
      };

      /**
       * Shows queue of newest notifications - very useful when you want to check what happened with mails that were not received.

       * @param {Function} callback
       * @return {Array.<NotificationQueue>}
       */
      account.LoadNotificationQueue = function (callback) {

          request('/account/loadnotificationqueue', {}, callback, 'POST');
      };

      /**
       * Lists all payments
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Date} fromDate - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} toDate - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Function} callback
       * @return {Array.<Payment>}
       */
      account.LoadPaymentHistory = function (limit, offset, fromDate, toDate, callback) {

          request('/account/loadpaymenthistory', {limit: limit, offset: offset, fromDate: fromDate, toDate: toDate}, callback, 'POST');
      };

      /**
       * Lists all referral payout history

       * @param {Function} callback
       * @return {Array.<Payment>}
       */
      account.LoadPayoutHistory = function (callback) {

          request('/account/loadpayouthistory', {}, callback, 'POST');
      };

      /**
       * Shows information about your referral details

       * @param {Function} callback
       * @return {Referral}
       */
      account.LoadReferralDetails = function (callback) {

          request('/account/loadreferraldetails', {}, callback, 'POST');
      };

      /**
       * Shows latest changes in your sending reputation
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<ReputationHistory>}
       */
      account.LoadReputationHistory = function (limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 20;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/account/loadreputationhistory', {limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Shows detailed information about your actual reputation score

       * @param {Function} callback
       * @return {ReputationDetail}
       */
      account.LoadReputationImpact = function (callback) {

          request('/account/loadreputationimpact', {}, callback, 'POST');
      };

      /**
       * Returns detailed spam check.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<SpamCheck>}
       */
      account.LoadSpamCheck = function (limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 20;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/account/loadspamcheck', {limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Lists email credits history for sub-account
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       * @return {Array.<EmailCredits>}
       */
      account.LoadSubAccountsEmailCreditsHistory = function (subAccountEmail, publicAccountID, callback) {
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/loadsubaccountsemailcreditshistory', {subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Loads settings of subaccount
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to load settings for. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       * @return {SubAccountSettings}
       */
      account.LoadSubAccountSettings = function (subAccountEmail, publicAccountID, callback) {
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/loadsubaccountsettings', {subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Lists litmus credits history for sub-account
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
       * @param {Function} callback
       * @return {Array.<LitmusCredits>}
       */
      account.LoadSubAccountsLitmusCreditsHistory = function (subAccountEmail, publicAccountID, callback) {
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          request('/account/loadsubaccountslitmuscreditshistory', {subAccountEmail: subAccountEmail, publicAccountID: publicAccountID}, callback, 'POST');
      };

      /**
       * Shows usage of your account in given time.
       * @param {Date} from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Function} callback
       * @return {Array.<Usage>}
       */
      account.LoadUsage = function (from, to, callback) {

          request('/account/loadusage', {from: from, to: to}, callback, 'POST');
      };

      /**
       * Manages your apikeys.
       * @param {String} apiKey - APIKey you would like to manage.
       * @param {APIKeyAction} action - Specific action you would like to perform on the APIKey
       * @param {Function} callback
       * @return {Array.<String>}
       */
      account.ManageApiKeys = function (apiKey, action, callback) {

          request('/account/manageapikeys', {apiKey: apiKey, action: action}, callback, 'POST');
      };

      /**
       * Shows summary for your account.

       * @param {Function} callback
       * @return {AccountOverview}
       */
      account.Overview = function (callback) {

          request('/account/overview', {}, callback, 'POST');
      };

      /**
       * Shows you account's profile basic overview

       * @param {Function} callback
       * @return {Profile}
       */
      account.ProfileOverview = function (callback) {

          request('/account/profileoverview', {}, callback, 'POST');
      };

      /**
       * Remove email, template or litmus credits from a sub-account
       * @param {CreditType} creditType - Type of credits to add (Email or Litmus)
       * @param {String} notes - Specific notes about the transaction
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to remove credits from. Use subAccountEmail or publicAccountID not both.
       * @param {Number} credits - Amount of credits to remove
       * @param {Boolean} removeAll - Remove all credits of this type from sub-account (overrides credits if provided)
       * @param {Function} callback
       */
      account.RemoveSubAccountCredits = function (creditType, notes, subAccountEmail, publicAccountID, credits, removeAll, callback) {
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          credits = typeof credits !== 'undefined' ? credits : null;
          removeAll = typeof removeAll !== 'undefined' ? removeAll : false;
          request('/account/removesubaccountcredits', {creditType: creditType, notes: notes, subAccountEmail: subAccountEmail, publicAccountID: publicAccountID, credits: credits, removeAll: removeAll}, callback, 'POST');
      };

      /**
       * Request a private IP for your Account
       * @param {Number} count - Number of items.
       * @param {String} notes - Free form field of notes
       * @param {Function} callback
       */
      account.RequestPrivateIP = function (count, notes, callback) {

          request('/account/requestprivateip', {count: count, notes: notes}, callback, 'POST');
      };

      /**
       * Update sending and tracking options of your account.
       * @param {Boolean} enableClickTracking - True, if you want to track clicks. Otherwise, false
       * @param {Boolean} enableLinkClickTracking - True, if you want to track by link tracking. Otherwise, false
       * @param {Boolean} manageSubscriptions - True, if you want to display your labels on your unsubscribe form. Otherwise, false
       * @param {Boolean} manageSubscribedOnly - True, if you want to only display labels that the contact is subscribed to on your unsubscribe form. Otherwise, false
       * @param {Boolean} transactionalOnUnsubscribe - True, if you want to display an option for the contact to opt into transactional email only on your unsubscribe form. Otherwise, false
       * @param {Boolean} skipListUnsubscribe - True, if you do not want to use list-unsubscribe headers. Otherwise, false
       * @param {Boolean} autoTextFromHtml - True, if text BODY of message should be created automatically. Otherwise, false
       * @param {Boolean} allowCustomHeaders - True, if you want to apply custom headers to your emails. Otherwise, false
       * @param {String} bccEmail - Email address to send a copy of all email to.
       * @param {String} contentTransferEncoding - Type of content encoding
       * @param {Boolean} emailNotificationForError - True, if you want bounce notifications returned. Otherwise, false
       * @param {String} emailNotificationEmail - Specific email address to send bounce email notifications to.
       * @param {String} webNotificationUrl - URL address to receive web notifications to parse and process.
       * @param {Boolean} webNotificationForSent - True, if you want to send web notifications for sent email. Otherwise, false
       * @param {Boolean} webNotificationForOpened - True, if you want to send web notifications for opened email. Otherwise, false
       * @param {Boolean} webNotificationForClicked - True, if you want to send web notifications for clicked email. Otherwise, false
       * @param {Boolean} webNotificationForUnsubscribed - True, if you want to send web notifications for unsubscribed email. Otherwise, false
       * @param {Boolean} webNotificationForAbuseReport - True, if you want to send web notifications for complaint email. Otherwise, false
       * @param {Boolean} webNotificationForError - True, if you want to send web notifications for bounced email. Otherwise, false
       * @param {String} hubCallBackUrl - URL used for tracking action of inbound emails
       * @param {String} inboundDomain - Domain you use as your inbound domain
       * @param {Boolean} inboundContactsOnly - True, if you want inbound email to only process contacts from your account. Otherwise, false
       * @param {Boolean} lowCreditNotification - True, if you want to receive low credit email notifications. Otherwise, false
       * @param {Boolean} enableUITooltips - True, if account has tooltips active. Otherwise, false
       * @param {Boolean} enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
       * @param {String} notificationsEmails - Email addresses to send a copy of all notifications from our system. Separated by semicolon
       * @param {String} unsubscribeNotificationsEmails - Emails, separated by semicolon, to which the notification about contact unsubscribing should be sent to
       * @param {String} logoUrl - URL to your logo image.
       * @param {Boolean} enableTemplateScripting - True, if you want to use template scripting in your emails {{}}. Otherwise, false
       * @param {Function} callback
       * @return {AdvancedOptions}
       */
      account.UpdateAdvancedOptions = function (enableClickTracking, enableLinkClickTracking, manageSubscriptions, manageSubscribedOnly, transactionalOnUnsubscribe, skipListUnsubscribe, autoTextFromHtml, allowCustomHeaders, bccEmail, contentTransferEncoding, emailNotificationForError, emailNotificationEmail, webNotificationUrl, webNotificationForSent, webNotificationForOpened, webNotificationForClicked, webNotificationForUnsubscribed, webNotificationForAbuseReport, webNotificationForError, hubCallBackUrl, inboundDomain, inboundContactsOnly, lowCreditNotification, enableUITooltips, enableContactFeatures, notificationsEmails, unsubscribeNotificationsEmails, logoUrl, enableTemplateScripting, callback) {
          enableClickTracking = typeof enableClickTracking !== 'undefined' ? enableClickTracking : null;
          enableLinkClickTracking = typeof enableLinkClickTracking !== 'undefined' ? enableLinkClickTracking : null;
          manageSubscriptions = typeof manageSubscriptions !== 'undefined' ? manageSubscriptions : null;
          manageSubscribedOnly = typeof manageSubscribedOnly !== 'undefined' ? manageSubscribedOnly : null;
          transactionalOnUnsubscribe = typeof transactionalOnUnsubscribe !== 'undefined' ? transactionalOnUnsubscribe : null;
          skipListUnsubscribe = typeof skipListUnsubscribe !== 'undefined' ? skipListUnsubscribe : null;
          autoTextFromHtml = typeof autoTextFromHtml !== 'undefined' ? autoTextFromHtml : null;
          allowCustomHeaders = typeof allowCustomHeaders !== 'undefined' ? allowCustomHeaders : null;
          bccEmail = typeof bccEmail !== 'undefined' ? bccEmail : null;
          contentTransferEncoding = typeof contentTransferEncoding !== 'undefined' ? contentTransferEncoding : null;
          emailNotificationForError = typeof emailNotificationForError !== 'undefined' ? emailNotificationForError : null;
          emailNotificationEmail = typeof emailNotificationEmail !== 'undefined' ? emailNotificationEmail : null;
          webNotificationUrl = typeof webNotificationUrl !== 'undefined' ? webNotificationUrl : null;
          webNotificationForSent = typeof webNotificationForSent !== 'undefined' ? webNotificationForSent : null;
          webNotificationForOpened = typeof webNotificationForOpened !== 'undefined' ? webNotificationForOpened : null;
          webNotificationForClicked = typeof webNotificationForClicked !== 'undefined' ? webNotificationForClicked : null;
          webNotificationForUnsubscribed = typeof webNotificationForUnsubscribed !== 'undefined' ? webNotificationForUnsubscribed : null;
          webNotificationForAbuseReport = typeof webNotificationForAbuseReport !== 'undefined' ? webNotificationForAbuseReport : null;
          webNotificationForError = typeof webNotificationForError !== 'undefined' ? webNotificationForError : null;
          hubCallBackUrl = typeof hubCallBackUrl !== 'undefined' ? hubCallBackUrl : null;
          inboundDomain = typeof inboundDomain !== 'undefined' ? inboundDomain : null;
          inboundContactsOnly = typeof inboundContactsOnly !== 'undefined' ? inboundContactsOnly : null;
          lowCreditNotification = typeof lowCreditNotification !== 'undefined' ? lowCreditNotification : null;
          enableUITooltips = typeof enableUITooltips !== 'undefined' ? enableUITooltips : null;
          enableContactFeatures = typeof enableContactFeatures !== 'undefined' ? enableContactFeatures : null;
          notificationsEmails = typeof notificationsEmails !== 'undefined' ? notificationsEmails : null;
          unsubscribeNotificationsEmails = typeof unsubscribeNotificationsEmails !== 'undefined' ? unsubscribeNotificationsEmails : null;
          logoUrl = typeof logoUrl !== 'undefined' ? logoUrl : null;
          enableTemplateScripting = typeof enableTemplateScripting !== 'undefined' ? enableTemplateScripting : true;
          request('/account/updateadvancedoptions', {enableClickTracking: enableClickTracking, enableLinkClickTracking: enableLinkClickTracking, manageSubscriptions: manageSubscriptions, manageSubscribedOnly: manageSubscribedOnly, transactionalOnUnsubscribe: transactionalOnUnsubscribe, skipListUnsubscribe: skipListUnsubscribe, autoTextFromHtml: autoTextFromHtml, allowCustomHeaders: allowCustomHeaders, bccEmail: bccEmail, contentTransferEncoding: contentTransferEncoding, emailNotificationForError: emailNotificationForError, emailNotificationEmail: emailNotificationEmail, webNotificationUrl: webNotificationUrl, webNotificationForSent: webNotificationForSent, webNotificationForOpened: webNotificationForOpened, webNotificationForClicked: webNotificationForClicked, webNotificationForUnsubscribed: webNotificationForUnsubscribed, webNotificationForAbuseReport: webNotificationForAbuseReport, webNotificationForError: webNotificationForError, hubCallBackUrl: hubCallBackUrl, inboundDomain: inboundDomain, inboundContactsOnly: inboundContactsOnly, lowCreditNotification: lowCreditNotification, enableUITooltips: enableUITooltips, enableContactFeatures: enableContactFeatures, notificationsEmails: notificationsEmails, unsubscribeNotificationsEmails: unsubscribeNotificationsEmails, logoUrl: logoUrl, enableTemplateScripting: enableTemplateScripting}, callback, 'POST');
      };

      /**
       * Update settings of your private branding. These settings are needed, if you want to use Elastic Email under your brand.
       * @param {Boolean} enablePrivateBranding - True: Turn on or off ability to send mails under your brand. Otherwise, false
       * @param {String} logoUrl - URL to your logo image.
       * @param {String} supportLink - Address to your support.
       * @param {String} privateBrandingUrl - Subdomain for your rebranded service
       * @param {String} smtpAddress - Address of SMTP server.
       * @param {String} smtpAlternative - Address of alternative SMTP server.
       * @param {String} paymentUrl - URL for making payments.
       * @param {Function} callback
       */
      account.UpdateCustomBranding = function (enablePrivateBranding, logoUrl, supportLink, privateBrandingUrl, smtpAddress, smtpAlternative, paymentUrl, callback) {
          enablePrivateBranding = typeof enablePrivateBranding !== 'undefined' ? enablePrivateBranding : false;
          logoUrl = typeof logoUrl !== 'undefined' ? logoUrl : null;
          supportLink = typeof supportLink !== 'undefined' ? supportLink : null;
          privateBrandingUrl = typeof privateBrandingUrl !== 'undefined' ? privateBrandingUrl : null;
          smtpAddress = typeof smtpAddress !== 'undefined' ? smtpAddress : null;
          smtpAlternative = typeof smtpAlternative !== 'undefined' ? smtpAlternative : null;
          paymentUrl = typeof paymentUrl !== 'undefined' ? paymentUrl : null;
          request('/account/updatecustombranding', {enablePrivateBranding: enablePrivateBranding, logoUrl: logoUrl, supportLink: supportLink, privateBrandingUrl: privateBrandingUrl, smtpAddress: smtpAddress, smtpAlternative: smtpAlternative, paymentUrl: paymentUrl}, callback, 'POST');
      };

      /**
       * Update http notification URL.
       * @param {String} url - URL of notification.
       * @param {String} settings - Http notification settings serialized to JSON
       * @param {Function} callback
       */
      account.UpdateHttpNotification = function (url, settings, callback) {
          settings = typeof settings !== 'undefined' ? settings : null;
          request('/account/updatehttpnotification', {url: url, settings: settings}, callback, 'POST');
      };

      /**
       * Update your profile.
       * @param {String} firstName - First name.
       * @param {String} lastName - Last name.
       * @param {String} address1 - First line of address.
       * @param {String} city - City.
       * @param {String} state - State or province.
       * @param {String} zip - Zip/postal code.
       * @param {Number} countryID - Numeric ID of country. A file with the list of countries is available <a href="http://api.elasticemail.com/public/countries"><b>here</b></a>
       * @param {String} deliveryReason - Why your clients are receiving your emails.
       * @param {Boolean} marketingConsent - True if you want to receive newsletters from Elastic Email. Otherwise, false.
       * @param {String} address2 - Second line of address.
       * @param {String} company - Company name.
       * @param {String} website - HTTP address of your website.
       * @param {String} logoUrl - URL to your logo image.
       * @param {String} taxCode - Code used for tax purposes.
       * @param {String} phone - Phone number
       * @param {Function} callback
       */
      account.UpdateProfile = function (firstName, lastName, address1, city, state, zip, countryID, deliveryReason, marketingConsent, address2, company, website, logoUrl, taxCode, phone, callback) {
          deliveryReason = typeof deliveryReason !== 'undefined' ? deliveryReason : null;
          marketingConsent = typeof marketingConsent !== 'undefined' ? marketingConsent : false;
          address2 = typeof address2 !== 'undefined' ? address2 : null;
          company = typeof company !== 'undefined' ? company : null;
          website = typeof website !== 'undefined' ? website : null;
          logoUrl = typeof logoUrl !== 'undefined' ? logoUrl : null;
          taxCode = typeof taxCode !== 'undefined' ? taxCode : null;
          phone = typeof phone !== 'undefined' ? phone : null;
          request('/account/updateprofile', {firstName: firstName, lastName: lastName, address1: address1, city: city, state: state, zip: zip, countryID: countryID, deliveryReason: deliveryReason, marketingConsent: marketingConsent, address2: address2, company: company, website: website, logoUrl: logoUrl, taxCode: taxCode, phone: phone}, callback, 'POST');
      };

      /**
       * Updates settings of specified subaccount
       * @param {Boolean} requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
       * @param {Number} monthlyRefillCredits - Amount of credits added to account automatically
       * @param {Boolean} requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
       * @param {Boolean} enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
       * @param {Number} dailySendLimit - Amount of emails account can send daily
       * @param {Number} emailSizeLimit - Maximum size of email including attachments in MB's
       * @param {Boolean} enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
       * @param {Number} maxContacts - Maximum number of contacts the account can havelkd
       * @param {String} subAccountEmail - Email address of sub-account
       * @param {String} publicAccountID - Public key of sub-account to update. Use subAccountEmail or publicAccountID not both.
       * @param {SendingPermission} sendingPermission - Sending permission setting for account
       * @param {Boolean} enableContactFeatures - True, if you want to use Advanced Tools.  Otherwise, false
       * @param {String} poolName - Name of your custom IP Pool to be used in the sending process
       * @param {Function} callback
       */
      account.UpdateSubAccountSettings = function (requiresEmailCredits, monthlyRefillCredits, requiresLitmusCredits, enableLitmusTest, dailySendLimit, emailSizeLimit, enablePrivateIPRequest, maxContacts, subAccountEmail, publicAccountID, sendingPermission, enableContactFeatures, poolName, callback) {
          requiresEmailCredits = typeof requiresEmailCredits !== 'undefined' ? requiresEmailCredits : false;
          monthlyRefillCredits = typeof monthlyRefillCredits !== 'undefined' ? monthlyRefillCredits : 0;
          requiresLitmusCredits = typeof requiresLitmusCredits !== 'undefined' ? requiresLitmusCredits : false;
          enableLitmusTest = typeof enableLitmusTest !== 'undefined' ? enableLitmusTest : false;
          dailySendLimit = typeof dailySendLimit !== 'undefined' ? dailySendLimit : 50;
          emailSizeLimit = typeof emailSizeLimit !== 'undefined' ? emailSizeLimit : 10;
          enablePrivateIPRequest = typeof enablePrivateIPRequest !== 'undefined' ? enablePrivateIPRequest : false;
          maxContacts = typeof maxContacts !== 'undefined' ? maxContacts : 0;
          subAccountEmail = typeof subAccountEmail !== 'undefined' ? subAccountEmail : null;
          publicAccountID = typeof publicAccountID !== 'undefined' ? publicAccountID : null;
          sendingPermission = typeof sendingPermission !== 'undefined' ? sendingPermission : null;
          enableContactFeatures = typeof enableContactFeatures !== 'undefined' ? enableContactFeatures : null;
          poolName = typeof poolName !== 'undefined' ? poolName : null;
          request('/account/updatesubaccountsettings', {requiresEmailCredits: requiresEmailCredits, monthlyRefillCredits: monthlyRefillCredits, requiresLitmusCredits: requiresLitmusCredits, enableLitmusTest: enableLitmusTest, dailySendLimit: dailySendLimit, emailSizeLimit: emailSizeLimit, enablePrivateIPRequest: enablePrivateIPRequest, maxContacts: maxContacts, subAccountEmail: subAccountEmail, publicAccountID: publicAccountID, sendingPermission: sendingPermission, enableContactFeatures: enableContactFeatures, poolName: poolName}, callback, 'POST');
      };

      /* endregion Account */

      /* region Attachment */
      /**
       *Managing attachments uploaded to your account.
       */
      var attachment = {};

      /**
       * Permanently deletes attachment file from your account
       * @param {Number} attachmentID - ID number of your attachment.
       * @param {Function} callback
       */
      attachment.Delete = function (attachmentID, callback) {

          request('/attachment/delete', {attachmentID: attachmentID}, callback, 'POST');
      };

      /**
       * Gets address of chosen Attachment
       * @param {String} fileName - Name of your file.
       * @param {Number} attachmentID - ID number of your attachment.
       * @param {Function} callback
       * @return {{content: Object, filename: String}}
       */
      attachment.Get = function (fileName, attachmentID, callback) {

          request('/attachment/get', {fileName: fileName, attachmentID: attachmentID}, callback, 'POST');
      };

      /**
       * Lists your available Attachments in the given email
       * @param {String} msgID - ID number of selected message.
       * @param {Function} callback
       * @return {Array.<Attachment>}
       */
      attachment.List = function (msgID, callback) {

          request('/attachment/list', {msgID: msgID}, callback, 'POST');
      };

      /**
       * Lists all your available attachments

       * @param {Function} callback
       * @return {Array.<Attachment>}
       */
      attachment.ListAll = function (callback) {

          request('/attachment/listall', {}, callback, 'POST');
      };

      /**
       * Permanently removes attachment file from your account
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       */
      attachment.Remove = function (fileName, callback) {

          request('/attachment/remove', {fileName: fileName}, callback, 'POST');
      };

      /**
       * Uploads selected file to the server using http form upload format (MIME multipart/form-data) or PUT method. The attachments expire after 30 days.
       * @param {{content: Object, filename: String}} attachmentFile - Content of your attachment.
       * @param {Function} callback
       * @return {Attachment}
       */
      attachment.Upload = function (attachmentFile, callback) {

          uploadPostFile('/attachment/upload', attachmentFile, {}, callback);
      };

      /* endregion Attachment */

      /* region Campaign */
      /**
       *Sending and monitoring progress of your Campaigns
       */
      var campaign = {};

      /**
       * Adds a campaign to the queue for processing based on the configuration
       * @param {Campaign} campaign - Json representation of a campaign
       * @param {Function} callback
       * @return {Number}
       */
      campaign.Add = function (campaign, callback) {

          request('/campaign/add', {campaign: campaign}, callback, 'POST');
      };

      /**
       * Copy selected campaign
       * @param {Number} channelID - ID number of selected Channel.
       * @param {Function} callback
       */
      campaign.Copy = function (channelID, callback) {

          request('/campaign/copy', {channelID: channelID}, callback, 'POST');
      };

      /**
       * Delete selected campaign
       * @param {Number} channelID - ID number of selected Channel.
       * @param {Function} callback
       */
      campaign.Delete = function (channelID, callback) {

          request('/campaign/delete', {channelID: channelID}, callback, 'POST');
      };

      /**
       * Export selected campaigns to chosen file format.
       * @param {Array.<Number>} channelIDs - List of campaign IDs used for processing
       * @param {ExportFileFormats} fileFormat -
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {ExportLink}
       */
      campaign.Export = function (channelIDs, fileFormat, compressionFormat, fileName, callback) {
          channelIDs = typeof channelIDs !== 'undefined' ? channelIDs : null;
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/campaign/export', {channelIDs: channelIDs, fileFormat: fileFormat, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * List all of your campaigns
       * @param {String} search - Text fragment used for searching.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Function} callback
       * @return {Array.<CampaignChannel>}
       */
      campaign.List = function (search, offset, limit, callback) {
          search = typeof search !== 'undefined' ? search : null;
          offset = typeof offset !== 'undefined' ? offset : 0;
          limit = typeof limit !== 'undefined' ? limit : 0;
          request('/campaign/list', {search: search, offset: offset, limit: limit}, callback, 'POST');
      };

      /**
       * Updates a previously added campaign.  Only Active and Paused campaigns can be updated.
       * @param {Campaign} campaign - Json representation of a campaign
       * @param {Function} callback
       * @return {Number}
       */
      campaign.Update = function (campaign, callback) {

          request('/campaign/update', {campaign: campaign}, callback, 'POST');
      };

      /* endregion Campaign */

      /* region Channel */
      /**
       *SMTP and HTTP API channels for grouping email delivery.
       */
      var channel = {};

      /**
       * Manually add a channel to your account to group email
       * @param {String} name - Descriptive name of the channel
       * @param {Function} callback
       * @return {String}
       */
      channel.Add = function (name, callback) {

          request('/channel/add', {name: name}, callback, 'POST');
      };

      /**
       * Delete the channel.
       * @param {String} name - The name of the channel to delete.
       * @param {Function} callback
       */
      channel.Delete = function (name, callback) {

          request('/channel/delete', {name: name}, callback, 'POST');
      };

      /**
       * Export channels in CSV file format.
       * @param {Array.<String>} channelNames - List of channel names used for processing
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {{content: Object, filename: String}}
       */
      channel.ExportCsv = function (channelNames, compressionFormat, fileName, callback) {
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/channel/exportcsv', {channelNames: channelNames, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Export channels in JSON file format.
       * @param {Array.<String>} channelNames - List of channel names used for processing
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {{content: Object, filename: String}}
       */
      channel.ExportJson = function (channelNames, compressionFormat, fileName, callback) {
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/channel/exportjson', {channelNames: channelNames, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Export channels in XML file format.
       * @param {Array.<String>} channelNames - List of channel names used for processing
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {{content: Object, filename: String}}
       */
      channel.ExportXml = function (channelNames, compressionFormat, fileName, callback) {
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/channel/exportxml', {channelNames: channelNames, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * List all of your channels

       * @param {Function} callback
       * @return {Array.<Channel>}
       */
      channel.List = function (callback) {

          request('/channel/list', {}, callback, 'POST');
      };

      /**
       * Rename an existing channel.
       * @param {String} name - The name of the channel to update.
       * @param {String} newName - The new name for the channel.
       * @param {Function} callback
       * @return {String}
       */
      channel.Update = function (name, newName, callback) {

          request('/channel/update', {name: name, newName: newName}, callback, 'POST');
      };

      /* endregion Channel */

      /* region Contact */
      /**
       *Methods used to manage your Contacts.
       */
      var contact = {};

      /**
       * Activate contacts that are currently blocked.
       * @param {Boolean} activateAllBlocked - Activate all your blocked contacts.  Passing True will override email list and activate all your blocked contacts.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Function} callback
       */
      contact.ActivateBlocked = function (activateAllBlocked, emails, callback) {
          activateAllBlocked = typeof activateAllBlocked !== 'undefined' ? activateAllBlocked : false;
          emails = typeof emails !== 'undefined' ? emails : null;
          request('/contact/activateblocked', {activateAllBlocked: activateAllBlocked, emails: emails}, callback, 'POST');
      };

      /**
       * Add a new contact and optionally to one of your lists.  Note that your API KEY is not required for this call.
       * @param {String} publicAccountID - Public key for limited access to your account such as contact/add so you can use it safely on public websites.
       * @param {String} email - Proper email address.
       * @param {StringArray.<String>} publicListID - ID code of list
       * @param {StringArray.<String>} listName - Name of your list.
       * @param {String} title - Title
       * @param {String} firstName - First name.
       * @param {String} lastName - Last name.
       * @param {String} phone - Phone number
       * @param {String} mobileNumber - Mobile phone number
       * @param {String} notes - Free form field of notes
       * @param {String} gender - Your gender
       * @param {Date} birthDate - Date of birth in YYYY-MM-DD format
       * @param {String} city - City.
       * @param {String} state - State or province.
       * @param {String} postalCode - Zip/postal code.
       * @param {String} country - Name of country.
       * @param {String} organizationName - Name of organization
       * @param {String} website - HTTP address of your website.
       * @param {Number} annualRevenue - Annual revenue of contact
       * @param {String} industry - Industry contact works in
       * @param {Number} numberOfEmployees - Number of employees
       * @param {ContactSource} source - Specifies the way of uploading the contact
       * @param {String} returnUrl - URL to navigate to after account creation
       * @param {String} sourceUrl - URL from which request was sent.
       * @param {String} activationReturnUrl - The url to return the contact to after activation.
       * @param {String} activationTemplate -
       * @param {Boolean} sendActivation - True, if you want to send activation email to this account. Otherwise, false
       * @param {Date} consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
       * @param {String} consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
       * @param {String,String} field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname
       * @param {String} notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
       * @param {Function} callback
       * @return {String}
       */
      contact.Add = function (publicAccountID, email, publicListID, listName, title, firstName, lastName, phone, mobileNumber, notes, gender, birthDate, city, state, postalCode, country, organizationName, website, annualRevenue, industry, numberOfEmployees, source, returnUrl, sourceUrl, activationReturnUrl, activationTemplate, sendActivation, consentDate, consentIP, field, notifyEmail, callback) {
          publicListID = typeof publicListID !== 'undefined' ? publicListID : null;
          listName = typeof listName !== 'undefined' ? listName : null;
          title = typeof title !== 'undefined' ? title : null;
          firstName = typeof firstName !== 'undefined' ? firstName : null;
          lastName = typeof lastName !== 'undefined' ? lastName : null;
          phone = typeof phone !== 'undefined' ? phone : null;
          mobileNumber = typeof mobileNumber !== 'undefined' ? mobileNumber : null;
          notes = typeof notes !== 'undefined' ? notes : null;
          gender = typeof gender !== 'undefined' ? gender : null;
          birthDate = typeof birthDate !== 'undefined' ? birthDate : null;
          city = typeof city !== 'undefined' ? city : null;
          state = typeof state !== 'undefined' ? state : null;
          postalCode = typeof postalCode !== 'undefined' ? postalCode : null;
          country = typeof country !== 'undefined' ? country : null;
          organizationName = typeof organizationName !== 'undefined' ? organizationName : null;
          website = typeof website !== 'undefined' ? website : null;
          annualRevenue = typeof annualRevenue !== 'undefined' ? annualRevenue : 0;
          industry = typeof industry !== 'undefined' ? industry : null;
          numberOfEmployees = typeof numberOfEmployees !== 'undefined' ? numberOfEmployees : 0;
          source = typeof source !== 'undefined' ? source : 'contactapi';
          returnUrl = typeof returnUrl !== 'undefined' ? returnUrl : null;
          sourceUrl = typeof sourceUrl !== 'undefined' ? sourceUrl : null;
          activationReturnUrl = typeof activationReturnUrl !== 'undefined' ? activationReturnUrl : null;
          activationTemplate = typeof activationTemplate !== 'undefined' ? activationTemplate : null;
          sendActivation = typeof sendActivation !== 'undefined' ? sendActivation : true;
          consentDate = typeof consentDate !== 'undefined' ? consentDate : null;
          consentIP = typeof consentIP !== 'undefined' ? consentIP : null;
          field = typeof field !== 'undefined' ? field : null;
          notifyEmail = typeof notifyEmail !== 'undefined' ? notifyEmail : null;
          request('/contact/add', {publicAccountID: publicAccountID, email: email, publicListID: publicListID, listName: listName, title: title, firstName: firstName, lastName: lastName, phone: phone, mobileNumber: mobileNumber, notes: notes, gender: gender, birthDate: birthDate, city: city, state: state, postalCode: postalCode, country: country, organizationName: organizationName, website: website, annualRevenue: annualRevenue, industry: industry, numberOfEmployees: numberOfEmployees, source: source, returnUrl: returnUrl, sourceUrl: sourceUrl, activationReturnUrl: activationReturnUrl, activationTemplate: activationTemplate, sendActivation: sendActivation, consentDate: consentDate, consentIP: consentIP, field: field, notifyEmail: notifyEmail}, callback, 'POST');
      };

      /**
       * Manually add or update a contacts status to Abuse, Bounced or Unsubscribed status (blocked).
       * @param {String} email - Proper email address.
       * @param {ContactStatus} status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
       * @param {Function} callback
       */
      contact.AddBlocked = function (email, status, callback) {

          request('/contact/addblocked', {email: email, status: status}, callback, 'POST');
      };

      /**
       * Change any property on the contact record.
       * @param {String} email - Proper email address.
       * @param {String} name - Name of the contact property you want to change.
       * @param {String} value - Value you would like to change the contact property to.
       * @param {Function} callback
       */
      contact.ChangeProperty = function (email, name, value, callback) {

          request('/contact/changeproperty', {email: email, name: name, value: value}, callback, 'POST');
      };

      /**
       * Changes status of selected Contacts. You may provide RULE for selection or specify list of Contact IDs.
       * @param {ContactStatus} status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       */
      contact.ChangeStatus = function (status, rule, emails, allContacts, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/contact/changestatus', {status: status, rule: rule, emails: emails, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Returns number of Contacts, RULE specifies contact Status.
       * @param {String} rule - Query used for filtering.
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       * @return {ContactStatusCounts}
       */
      contact.CountByStatus = function (rule, allContacts, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/contact/countbystatus', {rule: rule, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Permanantly deletes the contacts provided.  You can provide either a qualified rule or a list of emails (comma separated string).
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       */
      contact.Delete = function (rule, emails, allContacts, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/contact/delete', {rule: rule, emails: emails, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Export selected Contacts to JSON.
       * @param {ExportFileFormats} fileFormat -
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {ExportLink}
       */
      contact.Export = function (fileFormat, rule, emails, allContacts, compressionFormat, fileName, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/contact/export', {fileFormat: fileFormat, rule: rule, emails: emails, allContacts: allContacts, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Finds all Lists and Segments this email belongs to.
       * @param {String} email - Proper email address.
       * @param {Function} callback
       * @return {ContactCollection}
       */
      contact.FindContact = function (email, callback) {

          request('/contact/findcontact', {email: email}, callback, 'POST');
      };

      /**
       * List of Contacts for provided List
       * @param {String} listName - Name of your list.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<Contact>}
       */
      contact.GetContactsByList = function (listName, limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 20;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/contact/getcontactsbylist', {listName: listName, limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * List of Contacts for provided Segment
       * @param {String} segmentName - Name of your segment.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<Contact>}
       */
      contact.GetContactsBySegment = function (segmentName, limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 20;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/contact/getcontactsbysegment', {segmentName: segmentName, limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * List of all contacts. If you have not specified RULE, all Contacts will be listed.
       * @param {String} rule - Query used for filtering.
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<Contact>}
       */
      contact.List = function (rule, allContacts, limit, offset, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          limit = typeof limit !== 'undefined' ? limit : 20;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/contact/list', {rule: rule, allContacts: allContacts, limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Load blocked contacts
       * @param {Array.<ContactStatus>} statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
       * @param {String} search - List of blocked statuses: Abuse, Bounced or Unsubscribed
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<BlockedContact>}
       */
      contact.LoadBlocked = function (statuses, search, limit, offset, callback) {
          search = typeof search !== 'undefined' ? search : null;
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/contact/loadblocked', {statuses: statuses, search: search, limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Load detailed contact information
       * @param {String} email - Proper email address.
       * @param {Function} callback
       * @return {Contact}
       */
      contact.LoadContact = function (email, callback) {

          request('/contact/loadcontact', {email: email}, callback, 'POST');
      };

      /**
       * Shows detailed history of chosen Contact.
       * @param {String} email - Proper email address.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<ContactHistory>}
       */
      contact.LoadHistory = function (email, limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/contact/loadhistory', {email: email, limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Add new Contact to one of your Lists.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {String} firstName - First name.
       * @param {String} lastName - Last name.
       * @param {String} title - Title
       * @param {String} organization - Name of organization
       * @param {String} industry - Industry contact works in
       * @param {String} city - City.
       * @param {String} country - Name of country.
       * @param {String} state - State or province.
       * @param {String} zip - Zip/postal code.
       * @param {String} publicListID - ID code of list
       * @param {String} listName - Name of your list.
       * @param {ContactStatus} status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
       * @param {String} notes - Free form field of notes
       * @param {Date} consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
       * @param {String} consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
       * @param {String} notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
       * @param {Function} callback
       */
      contact.QuickAdd = function (emails, firstName, lastName, title, organization, industry, city, country, state, zip, publicListID, listName, status, notes, consentDate, consentIP, notifyEmail, callback) {
          firstName = typeof firstName !== 'undefined' ? firstName : null;
          lastName = typeof lastName !== 'undefined' ? lastName : null;
          title = typeof title !== 'undefined' ? title : null;
          organization = typeof organization !== 'undefined' ? organization : null;
          industry = typeof industry !== 'undefined' ? industry : null;
          city = typeof city !== 'undefined' ? city : null;
          country = typeof country !== 'undefined' ? country : null;
          state = typeof state !== 'undefined' ? state : null;
          zip = typeof zip !== 'undefined' ? zip : null;
          publicListID = typeof publicListID !== 'undefined' ? publicListID : null;
          listName = typeof listName !== 'undefined' ? listName : null;
          status = typeof status !== 'undefined' ? status : 'active';
          notes = typeof notes !== 'undefined' ? notes : null;
          consentDate = typeof consentDate !== 'undefined' ? consentDate : null;
          consentIP = typeof consentIP !== 'undefined' ? consentIP : null;
          notifyEmail = typeof notifyEmail !== 'undefined' ? notifyEmail : null;
          request('/contact/quickadd', {emails: emails, firstName: firstName, lastName: lastName, title: title, organization: organization, industry: industry, city: city, country: country, state: state, zip: zip, publicListID: publicListID, listName: listName, status: status, notes: notes, consentDate: consentDate, consentIP: consentIP, notifyEmail: notifyEmail}, callback, 'POST');
      };

      /**
       * Update selected contact. Omitted contact's fields will be reset by default (see the clearRestOfFields parameter)
       * @param {String} email - Proper email address.
       * @param {String} firstName - First name.
       * @param {String} lastName - Last name.
       * @param {String} organizationName - Name of organization
       * @param {String} title - Title
       * @param {String} city - City.
       * @param {String} state - State or province.
       * @param {String} country - Name of country.
       * @param {String} zip - Zip/postal code.
       * @param {String} birthDate - Date of birth in YYYY-MM-DD format
       * @param {String} gender - Your gender
       * @param {String} phone - Phone number
       * @param {Boolean} activate - True, if Contact should be activated. Otherwise, false
       * @param {String} industry - Industry contact works in
       * @param {Number} numberOfEmployees - Number of employees
       * @param {String} annualRevenue - Annual revenue of contact
       * @param {Number} purchaseCount - Number of purchases contact has made
       * @param {String} firstPurchase - Date of first purchase in YYYY-MM-DD format
       * @param {String} lastPurchase - Date of last purchase in YYYY-MM-DD format
       * @param {String} notes - Free form field of notes
       * @param {String} websiteUrl - Website of contact
       * @param {String} mobileNumber - Mobile phone number
       * @param {String} faxNumber - Fax number
       * @param {String} linkedInBio - Biography for Linked-In
       * @param {Number} linkedInConnections - Number of Linked-In connections
       * @param {String} twitterBio - Biography for Twitter
       * @param {String} twitterUsername - User name for Twitter
       * @param {String} twitterProfilePhoto - URL for Twitter photo
       * @param {Number} twitterFollowerCount - Number of Twitter followers
       * @param {Number} pageViews - Number of page views
       * @param {Number} visits - Number of website visits
       * @param {Boolean} clearRestOfFields - States if the fields that were omitted in this request are to be reset or should they be left with their current value
       * @param {String,String} field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname
       * @param {Function} callback
       * @return {Contact}
       */
      contact.Update = function (email, firstName, lastName, organizationName, title, city, state, country, zip, birthDate, gender, phone, activate, industry, numberOfEmployees, annualRevenue, purchaseCount, firstPurchase, lastPurchase, notes, websiteUrl, mobileNumber, faxNumber, linkedInBio, linkedInConnections, twitterBio, twitterUsername, twitterProfilePhoto, twitterFollowerCount, pageViews, visits, clearRestOfFields, field, callback) {
          firstName = typeof firstName !== 'undefined' ? firstName : null;
          lastName = typeof lastName !== 'undefined' ? lastName : null;
          organizationName = typeof organizationName !== 'undefined' ? organizationName : null;
          title = typeof title !== 'undefined' ? title : null;
          city = typeof city !== 'undefined' ? city : null;
          state = typeof state !== 'undefined' ? state : null;
          country = typeof country !== 'undefined' ? country : null;
          zip = typeof zip !== 'undefined' ? zip : null;
          birthDate = typeof birthDate !== 'undefined' ? birthDate : null;
          gender = typeof gender !== 'undefined' ? gender : null;
          phone = typeof phone !== 'undefined' ? phone : null;
          activate = typeof activate !== 'undefined' ? activate : null;
          industry = typeof industry !== 'undefined' ? industry : null;
          numberOfEmployees = typeof numberOfEmployees !== 'undefined' ? numberOfEmployees : 0;
          annualRevenue = typeof annualRevenue !== 'undefined' ? annualRevenue : null;
          purchaseCount = typeof purchaseCount !== 'undefined' ? purchaseCount : 0;
          firstPurchase = typeof firstPurchase !== 'undefined' ? firstPurchase : null;
          lastPurchase = typeof lastPurchase !== 'undefined' ? lastPurchase : null;
          notes = typeof notes !== 'undefined' ? notes : null;
          websiteUrl = typeof websiteUrl !== 'undefined' ? websiteUrl : null;
          mobileNumber = typeof mobileNumber !== 'undefined' ? mobileNumber : null;
          faxNumber = typeof faxNumber !== 'undefined' ? faxNumber : null;
          linkedInBio = typeof linkedInBio !== 'undefined' ? linkedInBio : null;
          linkedInConnections = typeof linkedInConnections !== 'undefined' ? linkedInConnections : 0;
          twitterBio = typeof twitterBio !== 'undefined' ? twitterBio : null;
          twitterUsername = typeof twitterUsername !== 'undefined' ? twitterUsername : null;
          twitterProfilePhoto = typeof twitterProfilePhoto !== 'undefined' ? twitterProfilePhoto : null;
          twitterFollowerCount = typeof twitterFollowerCount !== 'undefined' ? twitterFollowerCount : 0;
          pageViews = typeof pageViews !== 'undefined' ? pageViews : 0;
          visits = typeof visits !== 'undefined' ? visits : 0;
          clearRestOfFields = typeof clearRestOfFields !== 'undefined' ? clearRestOfFields : true;
          field = typeof field !== 'undefined' ? field : null;
          request('/contact/update', {email: email, firstName: firstName, lastName: lastName, organizationName: organizationName, title: title, city: city, state: state, country: country, zip: zip, birthDate: birthDate, gender: gender, phone: phone, activate: activate, industry: industry, numberOfEmployees: numberOfEmployees, annualRevenue: annualRevenue, purchaseCount: purchaseCount, firstPurchase: firstPurchase, lastPurchase: lastPurchase, notes: notes, websiteUrl: websiteUrl, mobileNumber: mobileNumber, faxNumber: faxNumber, linkedInBio: linkedInBio, linkedInConnections: linkedInConnections, twitterBio: twitterBio, twitterUsername: twitterUsername, twitterProfilePhoto: twitterProfilePhoto, twitterFollowerCount: twitterFollowerCount, pageViews: pageViews, visits: visits, clearRestOfFields: clearRestOfFields, field: field}, callback, 'POST');
      };

      /**
       * Upload contacts in CSV file.
       * @param {Number} listID - ID number of selected list.
       * @param {{content: Object, filename: String}} contactFile - Name of CSV file with Contacts.
       * @param {ContactStatus} status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
       * @param {Date} consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
       * @param {String} consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
       * @param {Function} callback
       * @return {Number}
       */
      contact.Upload = function (listID, contactFile, status, consentDate, consentIP, callback) {
          status = typeof status !== 'undefined' ? status : 'active';
          consentDate = typeof consentDate !== 'undefined' ? consentDate : null;
          consentIP = typeof consentIP !== 'undefined' ? consentIP : null;
          uploadPostFile('/contact/upload', contactFile, {listID: listID, status: status, consentDate: consentDate, consentIP: consentIP}, callback);
      };

      /* endregion Contact */

      /* region Domain */
      /**
       *Managing sender domains. Creating new entries and validating domain records.
       */
      var domain = {};

      /**
       * Add new domain to account
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.Add = function (domain, callback) {

          request('/domain/add', {domain: domain}, callback, 'POST');
      };

      /**
       * Deletes configured domain from account
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.Delete = function (domain, callback) {

          request('/domain/delete', {domain: domain}, callback, 'POST');
      };

      /**
       * Lists all domains configured for this account.

       * @param {Function} callback
       * @return {Array.<DomainDetail>}
       */
      domain.List = function (callback) {

          request('/domain/list', {}, callback, 'POST');
      };

      /**
       * Verification of email addres set for domain.
       * @param {String} domain - Default email sender, example: mail@yourdomain.com
       * @param {Function} callback
       */
      domain.SetDefault = function (domain, callback) {

          request('/domain/setdefault', {domain: domain}, callback, 'POST');
      };

      /**
       * Verification of DKIM record for domain
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.VerifyDkim = function (domain, callback) {

          request('/domain/verifydkim', {domain: domain}, callback, 'POST');
      };

      /**
       * Verification of MX record for domain
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.VerifyMX = function (domain, callback) {

          request('/domain/verifymx', {domain: domain}, callback, 'POST');
      };

      /**
       * Verification of SPF record for domain
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.VerifySpf = function (domain, callback) {

          request('/domain/verifyspf', {domain: domain}, callback, 'POST');
      };

      /**
       * Verification of tracking CNAME record for domain
       * @param {String} domain - Name of selected domain.
       * @param {Function} callback
       */
      domain.VerifyTracking = function (domain, callback) {

          request('/domain/verifytracking', {domain: domain}, callback, 'POST');
      };

      /* endregion Domain */

      /* region Email */
      /**
       *
       */
      var email = {};

      /**
       * Get email batch status
       * @param {String} transactionID - Transaction identifier
       * @param {Boolean} showFailed - Include Bounced email addresses.
       * @param {Boolean} showDelivered - Include Sent email addresses.
       * @param {Boolean} showPending - Include Ready to send email addresses.
       * @param {Boolean} showOpened - Include Opened email addresses.
       * @param {Boolean} showClicked - Include Clicked email addresses.
       * @param {Boolean} showAbuse - Include Reported as abuse email addresses.
       * @param {Boolean} showUnsubscribed - Include Unsubscribed email addresses.
       * @param {Boolean} showErrors - Include error messages for bounced emails.
       * @param {Boolean} showMessageIDs - Include all MessageIDs for this transaction
       * @param {Function} callback
       * @return {EmailJobStatus}
       */
      email.GetStatus = function (transactionID, showFailed, showDelivered, showPending, showOpened, showClicked, showAbuse, showUnsubscribed, showErrors, showMessageIDs, callback) {
          showFailed = typeof showFailed !== 'undefined' ? showFailed : false;
          showDelivered = typeof showDelivered !== 'undefined' ? showDelivered : false;
          showPending = typeof showPending !== 'undefined' ? showPending : false;
          showOpened = typeof showOpened !== 'undefined' ? showOpened : false;
          showClicked = typeof showClicked !== 'undefined' ? showClicked : false;
          showAbuse = typeof showAbuse !== 'undefined' ? showAbuse : false;
          showUnsubscribed = typeof showUnsubscribed !== 'undefined' ? showUnsubscribed : false;
          showErrors = typeof showErrors !== 'undefined' ? showErrors : false;
          showMessageIDs = typeof showMessageIDs !== 'undefined' ? showMessageIDs : false;
          request('/email/getstatus', {transactionID: transactionID, showFailed: showFailed, showDelivered: showDelivered, showPending: showPending, showOpened: showOpened, showClicked: showClicked, showAbuse: showAbuse, showUnsubscribed: showUnsubscribed, showErrors: showErrors, showMessageIDs: showMessageIDs}, callback, 'POST');
      };

      /**
       * Submit emails. The HTTP POST request is suggested. The default, maximum (accepted by us) size of an email is 10 MB in total, with or without attachments included. For suggested implementations please refer to https://elasticemail.com/support/http-api/
       * @param {String} subject - Email subject
       * @param {String} from - From email address
       * @param {String} fromName - Display name for from email address
       * @param {String} sender - Email address of the sender
       * @param {String} senderName - Display name sender
       * @param {String} msgFrom - Optional parameter. Sets FROM MIME header.
       * @param {String} msgFromName - Optional parameter. Sets FROM name of MIME header.
       * @param {String} replyTo - Email address to reply to
       * @param {String} replyToName - Display name of the reply to address
       * @param {Array.<String>} to - List of email recipients (each email is treated separately, like a BCC). Separated by comma or semicolon. We suggest using the "msgTo" parameter if backward compatibility with API version 1 is not a must.
       * @param {StringArray.<String>} msgTo - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as TO MIME header). Separated by comma or semicolon.
       * @param {StringArray.<String>} msgCC - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as CC MIME header). Separated by comma or semicolon.
       * @param {StringArray.<String>} msgBcc - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (each email is treated seperately). Separated by comma or semicolon.
       * @param {Array.<String>} lists - The name of a contact list you would like to send to. Separate multiple contact lists by commas or semicolons.
       * @param {Array.<String>} segments - The name of a segment you would like to send to. Separate multiple segments by comma or semicolon. Insert "0" for all Active contacts.
       * @param {String} mergeSourceFilename - File name one of attachments which is a CSV list of Recipients.
       * @param {String} channel - An ID field (max 191 chars) that can be used for reporting [will default to HTTP API or SMTP API]
       * @param {String} bodyHtml - Html email body
       * @param {String} bodyText - Text email body
       * @param {String} charset - Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more…
       * @param {String} charsetBodyHtml - Sets charset for body html MIME part (overrides default value from charset parameter)
       * @param {String} charsetBodyText - Sets charset for body text MIME part (overrides default value from charset parameter)
       * @param {EncodingType} encodingType - 0 for None, 1 for Raw7Bit, 2 for Raw8Bit, 3 for QuotedPrintable, 4 for Base64 (Default), 5 for Uue  note that you can also provide the text version such as "Raw7Bit" for value 1.  NOTE: Base64 or QuotedPrintable is recommended if you are validating your domain(s) with DKIM.
       * @param {String} template - The name of an email template you have created in your account.
       * @param {{content: Object, filename: String}} attachmentFiles - Attachment files. These files should be provided with the POST multipart file upload, not directly in the request's URL. Should also include merge CSV file
       * @param {String,String} headers - Optional Custom Headers. Request parameters prefixed by headers_ like headers_customheader1, headers_customheader2. Note: a space is required after the colon before the custom header value. headers_xmailer=xmailer: header-value1
       * @param {String} postBack - Optional header returned in notifications.
       * @param {String,String} merge - Request parameters prefixed by merge_ like merge_firstname, merge_lastname. If sending to a template you can send merge_ fields to merge data with the template. Template fields are entered with {firstname}, {lastname} etc.
       * @param {String} timeOffSetMinutes - Number of minutes in the future this email should be sent
       * @param {String} poolName - Name of your custom IP Pool to be used in the sending process
       * @param {Boolean} isTransactional - True, if email is transactional (non-bulk, non-marketing, non-commercial). Otherwise, false
       * @param {Function} callback
       * @return {EmailSend}
       */
      email.Send = function (subject, from, fromName, sender, senderName, msgFrom, msgFromName, replyTo, replyToName, to, msgTo, msgCC, msgBcc, lists, segments, mergeSourceFilename, channel, bodyHtml, bodyText, charset, charsetBodyHtml, charsetBodyText, encodingType, template, attachmentFiles, headers, postBack, merge, timeOffSetMinutes, poolName, isTransactional, callback) {
          subject = typeof subject !== 'undefined' ? subject : null;
          from = typeof from !== 'undefined' ? from : null;
          fromName = typeof fromName !== 'undefined' ? fromName : null;
          sender = typeof sender !== 'undefined' ? sender : null;
          senderName = typeof senderName !== 'undefined' ? senderName : null;
          msgFrom = typeof msgFrom !== 'undefined' ? msgFrom : null;
          msgFromName = typeof msgFromName !== 'undefined' ? msgFromName : null;
          replyTo = typeof replyTo !== 'undefined' ? replyTo : null;
          replyToName = typeof replyToName !== 'undefined' ? replyToName : null;
          to = typeof to !== 'undefined' ? to : null;
          msgTo = typeof msgTo !== 'undefined' ? msgTo : null;
          msgCC = typeof msgCC !== 'undefined' ? msgCC : null;
          msgBcc = typeof msgBcc !== 'undefined' ? msgBcc : null;
          lists = typeof lists !== 'undefined' ? lists : null;
          segments = typeof segments !== 'undefined' ? segments : null;
          mergeSourceFilename = typeof mergeSourceFilename !== 'undefined' ? mergeSourceFilename : null;
          channel = typeof channel !== 'undefined' ? channel : null;
          bodyHtml = typeof bodyHtml !== 'undefined' ? bodyHtml : null;
          bodyText = typeof bodyText !== 'undefined' ? bodyText : null;
          charset = typeof charset !== 'undefined' ? charset : null;
          charsetBodyHtml = typeof charsetBodyHtml !== 'undefined' ? charsetBodyHtml : null;
          charsetBodyText = typeof charsetBodyText !== 'undefined' ? charsetBodyText : null;
          encodingType = typeof encodingType !== 'undefined' ? encodingType : 'none';
          template = typeof template !== 'undefined' ? template : null;
          attachmentFiles = typeof attachmentFiles !== 'undefined' ? attachmentFiles : null;
          headers = typeof headers !== 'undefined' ? headers : null;
          postBack = typeof postBack !== 'undefined' ? postBack : null;
          merge = typeof merge !== 'undefined' ? merge : null;
          timeOffSetMinutes = typeof timeOffSetMinutes !== 'undefined' ? timeOffSetMinutes : null;
          poolName = typeof poolName !== 'undefined' ? poolName : null;
          isTransactional = typeof isTransactional !== 'undefined' ? isTransactional : false;
          uploadPostFile('/email/send', attachmentFiles, {subject: subject, from: from, fromName: fromName, sender: sender, senderName: senderName, msgFrom: msgFrom, msgFromName: msgFromName, replyTo: replyTo, replyToName: replyToName, to: to, msgTo: msgTo, msgCC: msgCC, msgBcc: msgBcc, lists: lists, segments: segments, mergeSourceFilename: mergeSourceFilename, channel: channel, bodyHtml: bodyHtml, bodyText: bodyText, charset: charset, charsetBodyHtml: charsetBodyHtml, charsetBodyText: charsetBodyText, encodingType: encodingType, template: template, headers: headers, postBack: postBack, merge: merge, timeOffSetMinutes: timeOffSetMinutes, poolName: poolName, isTransactional: isTransactional}, callback);
      };

      /**
       * Detailed status of a unique email sent through your account. Returns a 'Email has expired and the status is unknown.' error, if the email has not been fully processed yet.
       * @param {String} messageID - Unique identifier for this email.
       * @param {Function} callback
       * @return {EmailStatus}
       */
      email.Status = function (messageID, callback) {

          request('/email/status', {messageID: messageID}, callback, 'POST');
      };

      /**
       * View email
       * @param {String} messageID - Message identifier
       * @param {Function} callback
       * @return {EmailView}
       */
      email.View = function (messageID, callback) {

          request('/email/view', {messageID: messageID}, callback, 'POST');
      };

      /* endregion Email */

      /* region Export */
      /**
       *
       */
      var Export = {};

      /**
       * Check the current status of the export.
       * @param {String} publicExportID -
       * @param {Function} callback
       * @return {ExportStatus}
       */
      Export.CheckStatus = function (publicExportID, callback) {

          request('/export/checkstatus', {publicExportID: publicExportID}, callback, 'POST');
      };

      /**
       * Summary of export type counts.

       * @param {Function} callback
       * @return {ExportTypeCounts}
       */
      Export.CountByType = function (callback) {

          request('/export/countbytype', {}, callback, 'POST');
      };

      /**
       * Delete the specified export.
       * @param {String} publicExportID -
       * @param {Function} callback
       */
      Export.Delete = function (publicExportID, callback) {

          request('/export/delete', {publicExportID: publicExportID}, callback, 'POST');
      };

      /**
       * Returns a list of all exported data.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {Array.<Export>}
       */
      Export.List = function (limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/export/list', {limit: limit, offset: offset}, callback, 'POST');
      };

      /* endregion Export */

      /* region List */
      /**
       *API methods for managing your Lists
       */
      var list = {};

      /**
       * Create new list, based on filtering rule or list of IDs
       * @param {String} listName - Name of your list.
       * @param {Boolean} createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
       * @param {Boolean} allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       * @return {Number}
       */
      list.Add = function (listName, createEmptyList, allowUnsubscribe, rule, emails, allContacts, callback) {
          createEmptyList = typeof createEmptyList !== 'undefined' ? createEmptyList : false;
          allowUnsubscribe = typeof allowUnsubscribe !== 'undefined' ? allowUnsubscribe : false;
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/list/add', {listName: listName, createEmptyList: createEmptyList, allowUnsubscribe: allowUnsubscribe, rule: rule, emails: emails, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Add Contacts to chosen list
       * @param {String} listName - Name of your list.
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       */
      list.AddContacts = function (listName, rule, emails, allContacts, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/list/addcontacts', {listName: listName, rule: rule, emails: emails, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Copy your existing List with the option to provide new settings to it. Some fields, when left empty, default to the source list's settings
       * @param {String} sourceListName - The name of the list you want to copy
       * @param {String} newlistName - Name of your list if you want to change it.
       * @param {Boolean} createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
       * @param {Boolean} allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
       * @param {String} rule - Query used for filtering.
       * @param {Function} callback
       * @return {Number}
       */
      list.Copy = function (sourceListName, newlistName, createEmptyList, allowUnsubscribe, rule, callback) {
          newlistName = typeof newlistName !== 'undefined' ? newlistName : null;
          createEmptyList = typeof createEmptyList !== 'undefined' ? createEmptyList : null;
          allowUnsubscribe = typeof allowUnsubscribe !== 'undefined' ? allowUnsubscribe : null;
          rule = typeof rule !== 'undefined' ? rule : null;
          request('/list/copy', {sourceListName: sourceListName, newlistName: newlistName, createEmptyList: createEmptyList, allowUnsubscribe: allowUnsubscribe, rule: rule}, callback, 'POST');
      };

      /**
       * Create a new list from the recipients of the given campaign, using the given statuses of Messages
       * @param {Number} campaignID - ID of the campaign which recipients you want to copy
       * @param {String} listName - Name of your list.
       * @param {Array.<LogJobStatus>} statuses - Statuses of a campaign's emails you want to include in the new list (but NOT the contacts' statuses)
       * @param {Function} callback
       * @return {Number}
       */
      list.CreateFromCampaign = function (campaignID, listName, statuses, callback) {
          statuses = typeof statuses !== 'undefined' ? statuses : null;
          request('/list/createfromcampaign', {campaignID: campaignID, listName: listName, statuses: statuses}, callback, 'POST');
      };

      /**
       * Create a series of nth selection lists from an existing list or segment
       * @param {String} listName - Name of your list.
       * @param {Number} numberOfLists - The number of evenly distributed lists to create.
       * @param {Boolean} excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
       * @param {Boolean} allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
       * @param {String} rule - Query used for filtering.
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       */
      list.CreateNthSelectionLists = function (listName, numberOfLists, excludeBlocked, allowUnsubscribe, rule, allContacts, callback) {
          excludeBlocked = typeof excludeBlocked !== 'undefined' ? excludeBlocked : true;
          allowUnsubscribe = typeof allowUnsubscribe !== 'undefined' ? allowUnsubscribe : false;
          rule = typeof rule !== 'undefined' ? rule : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/list/createnthselectionlists', {listName: listName, numberOfLists: numberOfLists, excludeBlocked: excludeBlocked, allowUnsubscribe: allowUnsubscribe, rule: rule, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Create a new list with randomized contacts from an existing list or segment
       * @param {String} listName - Name of your list.
       * @param {Number} count - Number of items.
       * @param {Boolean} excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
       * @param {Boolean} allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
       * @param {String} rule - Query used for filtering.
       * @param {Boolean} allContacts - True: Include every Contact in your Account. Otherwise, false
       * @param {Function} callback
       * @return {Number}
       */
      list.CreateRandomList = function (listName, count, excludeBlocked, allowUnsubscribe, rule, allContacts, callback) {
          excludeBlocked = typeof excludeBlocked !== 'undefined' ? excludeBlocked : true;
          allowUnsubscribe = typeof allowUnsubscribe !== 'undefined' ? allowUnsubscribe : false;
          rule = typeof rule !== 'undefined' ? rule : null;
          allContacts = typeof allContacts !== 'undefined' ? allContacts : false;
          request('/list/createrandomlist', {listName: listName, count: count, excludeBlocked: excludeBlocked, allowUnsubscribe: allowUnsubscribe, rule: rule, allContacts: allContacts}, callback, 'POST');
      };

      /**
       * Deletes List and removes all the Contacts from it (does not delete Contacts).
       * @param {String} listName - Name of your list.
       * @param {Function} callback
       */
      list.Delete = function (listName, callback) {

          request('/list/delete', {listName: listName}, callback, 'POST');
      };

      /**
       * Exports all the contacts from the provided list
       * @param {String} listName - Name of your list.
       * @param {ExportFileFormats} fileFormat -
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {ExportLink}
       */
      list.Export = function (listName, fileFormat, compressionFormat, fileName, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/list/export', {listName: listName, fileFormat: fileFormat, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Shows all your existing lists
       * @param {Date} from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Function} callback
       * @return {Array.<List>}
       */
      list.list = function (from, to, callback) {
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          request('/list/list', {from: from, to: to}, callback, 'POST');
      };

      /**
       * Returns detailed information about specific list.
       * @param {String} listName - Name of your list.
       * @param {Function} callback
       * @return {List}
       */
      list.Load = function (listName, callback) {

          request('/list/load', {listName: listName}, callback, 'POST');
      };

      /**
       * Move selected contacts from one List to another
       * @param {String} oldListName - The name of the list from which the contacts will be copied from
       * @param {String} newListName - The name of the list to copy the contacts to
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Boolean} moveAll - TRUE - moves all contacts; FALSE - moves contacts provided in the 'emails' parameter. This is ignored if the 'statuses' parameter has been provided
       * @param {Array.<ContactStatus>} statuses - List of contact statuses which are eligible to move. This ignores the 'moveAll' parameter
       * @param {Function} callback
       */
      list.MoveContacts = function (oldListName, newListName, emails, moveAll, statuses, callback) {
          emails = typeof emails !== 'undefined' ? emails : null;
          moveAll = typeof moveAll !== 'undefined' ? moveAll : null;
          statuses = typeof statuses !== 'undefined' ? statuses : null;
          request('/list/movecontacts', {oldListName: oldListName, newListName: newListName, emails: emails, moveAll: moveAll, statuses: statuses}, callback, 'POST');
      };

      /**
       * Remove selected Contacts from your list
       * @param {String} listName - Name of your list.
       * @param {String} rule - Query used for filtering.
       * @param {Array.<String>} emails - Comma delimited list of contact emails
       * @param {Function} callback
       */
      list.RemoveContacts = function (listName, rule, emails, callback) {
          rule = typeof rule !== 'undefined' ? rule : null;
          emails = typeof emails !== 'undefined' ? emails : null;
          request('/list/removecontacts', {listName: listName, rule: rule, emails: emails}, callback, 'POST');
      };

      /**
       * Update existing list
       * @param {String} listName - Name of your list.
       * @param {String} newListName - Name of your list if you want to change it.
       * @param {Boolean} allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
       * @param {Function} callback
       */
      list.Update = function (listName, newListName, allowUnsubscribe, callback) {

          request('/list/update', {listName: listName, newListName: newListName, allowUnsubscribe: allowUnsubscribe}, callback, 'POST');
      };

      /* endregion List */

      /* region Log */
      /**
       *Methods to check logs of your campaigns
       */
      var log = {};

      /**
       * Cancels emails that are waiting to be sent.
       * @param {String} channelName - Name of selected channel.
       * @param {String} transactionID - ID number of transaction
       * @param {Function} callback
       */
      log.CancelInProgress = function (channelName, transactionID, callback) {
          channelName = typeof channelName !== 'undefined' ? channelName : null;
          transactionID = typeof transactionID !== 'undefined' ? transactionID : null;
          request('/log/cancelinprogress', {channelName: channelName, transactionID: transactionID}, callback, 'POST');
      };

      /**
       * Export email log information to the specified file format.
       * @param {Array.<LogJobStatus>} statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
       * @param {ExportFileFormats} fileFormat -
       * @param {Date} from - Start date.
       * @param {Date} to - End date.
       * @param {Number} channelID - ID number of selected Channel.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Boolean} includeEmail - True: Search includes emails. Otherwise, false.
       * @param {Boolean} includeSms - True: Search includes SMS. Otherwise, false.
       * @param {Array.<MessageCategory>} messageCategory - ID of message category
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {String} email - Proper email address.
       * @param {Function} callback
       * @return {ExportLink}
       */
      log.Export = function (statuses, fileFormat, from, to, channelID, limit, offset, includeEmail, includeSms, messageCategory, compressionFormat, fileName, email, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          channelID = typeof channelID !== 'undefined' ? channelID : 0;
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          includeEmail = typeof includeEmail !== 'undefined' ? includeEmail : true;
          includeSms = typeof includeSms !== 'undefined' ? includeSms : true;
          messageCategory = typeof messageCategory !== 'undefined' ? messageCategory : null;
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          email = typeof email !== 'undefined' ? email : null;
          request('/log/export', {statuses: statuses, fileFormat: fileFormat, from: from, to: to, channelID: channelID, limit: limit, offset: offset, includeEmail: includeEmail, includeSms: includeSms, messageCategory: messageCategory, compressionFormat: compressionFormat, fileName: fileName, email: email}, callback, 'POST');
      };

      /**
       * Export detailed link tracking information to the specified file format.
       * @param {Number} channelID - ID number of selected Channel.
       * @param {Date} from - Start date.
       * @param {Date} to - End Date.
       * @param {ExportFileFormats} fileFormat -
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {ExportLink}
       */
      log.ExportLinkTracking = function (channelID, from, to, fileFormat, limit, offset, compressionFormat, fileName, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/log/exportlinktracking', {channelID: channelID, from: from, to: to, fileFormat: fileFormat, limit: limit, offset: offset, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Track link clicks
       * @param {Date} from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {String} channelName - Name of selected channel.
       * @param {Function} callback
       * @return {LinkTrackingDetails}
       */
      log.LinkTracking = function (from, to, limit, offset, channelName, callback) {
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          channelName = typeof channelName !== 'undefined' ? channelName : null;
          request('/log/linktracking', {from: from, to: to, limit: limit, offset: offset, channelName: channelName}, callback, 'POST');
      };

      /**
       * Returns logs filtered by specified parameters.
       * @param {Array.<LogJobStatus>} statuses - List of comma separated message statuses: 0 or all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
       * @param {Date} from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {String} channelName - Name of selected channel.
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Boolean} includeEmail - True: Search includes emails. Otherwise, false.
       * @param {Boolean} includeSms - True: Search includes SMS. Otherwise, false.
       * @param {Array.<MessageCategory>} messageCategory - ID of message category
       * @param {String} email - Proper email address.
       * @param {Function} callback
       * @return {Log}
       */
      log.Load = function (statuses, from, to, channelName, limit, offset, includeEmail, includeSms, messageCategory, email, callback) {
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          channelName = typeof channelName !== 'undefined' ? channelName : null;
          limit = typeof limit !== 'undefined' ? limit : 0;
          offset = typeof offset !== 'undefined' ? offset : 0;
          includeEmail = typeof includeEmail !== 'undefined' ? includeEmail : true;
          includeSms = typeof includeSms !== 'undefined' ? includeSms : true;
          messageCategory = typeof messageCategory !== 'undefined' ? messageCategory : null;
          email = typeof email !== 'undefined' ? email : null;
          request('/log/load', {statuses: statuses, from: from, to: to, channelName: channelName, limit: limit, offset: offset, includeEmail: includeEmail, includeSms: includeSms, messageCategory: messageCategory, email: email}, callback, 'POST');
      };

      /**
       * Retry sending of temporarily not delivered message.
       * @param {String} msgID - ID number of selected message.
       * @param {Function} callback
       */
      log.RetryNow = function (msgID, callback) {

          request('/log/retrynow', {msgID: msgID}, callback, 'POST');
      };

      /**
       * Loads summary information about activity in chosen date range.
       * @param {Date} from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {Date} to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
       * @param {String} channelName - Name of selected channel.
       * @param {String} interval - 'Hourly' for detailed information, 'summary' for daily overview
       * @param {String} transactionID - ID number of transaction
       * @param {Function} callback
       * @return {LogSummary}
       */
      log.Summary = function (from, to, channelName, interval, transactionID, callback) {
          channelName = typeof channelName !== 'undefined' ? channelName : null;
          interval = typeof interval !== 'undefined' ? interval : 'summary';
          transactionID = typeof transactionID !== 'undefined' ? transactionID : null;
          request('/log/summary', {from: from, to: to, channelName: channelName, interval: interval, transactionID: transactionID}, callback, 'POST');
      };

      /* endregion Log */

      /* region Segment */
      /**
       *Manages your segments - dynamically created lists of contacts
       */
      var segment = {};

      /**
       * Create new segment, based on specified RULE.
       * @param {String} segmentName - Name of your segment.
       * @param {String} rule - Query used for filtering.
       * @param {Function} callback
       * @return {Segment}
       */
      segment.Add = function (segmentName, rule, callback) {

          request('/segment/add', {segmentName: segmentName, rule: rule}, callback, 'POST');
      };

      /**
       * Copy your existing Segment with the optional new rule and custom name
       * @param {String} sourceSegmentName - The name of the segment you want to copy
       * @param {String} newSegmentName - New name of your segment if you want to change it.
       * @param {String} rule - Query used for filtering.
       * @param {Function} callback
       * @return {Segment}
       */
      segment.Copy = function (sourceSegmentName, newSegmentName, rule, callback) {
          newSegmentName = typeof newSegmentName !== 'undefined' ? newSegmentName : null;
          rule = typeof rule !== 'undefined' ? rule : null;
          request('/segment/copy', {sourceSegmentName: sourceSegmentName, newSegmentName: newSegmentName, rule: rule}, callback, 'POST');
      };

      /**
       * Delete existing segment.
       * @param {String} segmentName - Name of your segment.
       * @param {Function} callback
       */
      segment.Delete = function (segmentName, callback) {

          request('/segment/delete', {segmentName: segmentName}, callback, 'POST');
      };

      /**
       * Exports all the contacts from the provided segment
       * @param {String} segmentName - Name of your segment.
       * @param {ExportFileFormats} fileFormat -
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {String} fileName - Name of your file.
       * @param {Function} callback
       * @return {ExportLink}
       */
      segment.Export = function (segmentName, fileFormat, compressionFormat, fileName, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          fileName = typeof fileName !== 'undefined' ? fileName : null;
          request('/segment/export', {segmentName: segmentName, fileFormat: fileFormat, compressionFormat: compressionFormat, fileName: fileName}, callback, 'POST');
      };

      /**
       * Lists all your available Segments
       * @param {Boolean} includeHistory - True: Include history of last 30 days. Otherwise, false.
       * @param {Date} from - From what date should the segment history be shown
       * @param {Date} to - To what date should the segment history be shown
       * @param {Function} callback
       * @return {Array.<Segment>}
       */
      segment.List = function (includeHistory, from, to, callback) {
          includeHistory = typeof includeHistory !== 'undefined' ? includeHistory : false;
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          request('/segment/list', {includeHistory: includeHistory, from: from, to: to}, callback, 'POST');
      };

      /**
       * Lists your available Segments using the provided names
       * @param {Array.<String>} segmentNames - Names of segments you want to load. Will load all contacts if left empty or the 'All Contacts' name has been provided
       * @param {Boolean} includeHistory - True: Include history of last 30 days. Otherwise, false.
       * @param {Date} from - From what date should the segment history be shown
       * @param {Date} to - To what date should the segment history be shown
       * @param {Function} callback
       * @return {Array.<Segment>}
       */
      segment.LoadByName = function (segmentNames, includeHistory, from, to, callback) {
          includeHistory = typeof includeHistory !== 'undefined' ? includeHistory : false;
          from = typeof from !== 'undefined' ? from : null;
          to = typeof to !== 'undefined' ? to : null;
          request('/segment/loadbyname', {segmentNames: segmentNames, includeHistory: includeHistory, from: from, to: to}, callback, 'POST');
      };

      /**
       * Rename or change RULE for your segment
       * @param {String} segmentName - Name of your segment.
       * @param {String} newSegmentName - New name of your segment if you want to change it.
       * @param {String} rule - Query used for filtering.
       * @param {Function} callback
       * @return {Segment}
       */
      segment.Update = function (segmentName, newSegmentName, rule, callback) {
          newSegmentName = typeof newSegmentName !== 'undefined' ? newSegmentName : null;
          rule = typeof rule !== 'undefined' ? rule : null;
          request('/segment/update', {segmentName: segmentName, newSegmentName: newSegmentName, rule: rule}, callback, 'POST');
      };

      /* endregion Segment */

      /* region SMS */
      /**
       *Managing texting to your clients.
       */
      var sms = {};

      /**
       * Send a short SMS Message (maximum of 1600 characters) to any mobile phone.
       * @param {String} to - Mobile number you want to message. Can be any valid mobile number in E.164 format. To provide the country code you need to provide "+" before the number.  If your URL is not encoded then you need to replace the "+" with "%2B" instead.
       * @param {String} body - Body of your message. The maximum body length is 160 characters.  If the message body is greater than 160 characters it is split into multiple messages and you are charged per message for the number of message required to send your length
       * @param {Function} callback
       */
      sms.Send = function (to, body, callback) {

          request('/sms/send', {to: to, body: body}, callback, 'POST');
      };

      /* endregion SMS */

      /* region Survey */
      /**
       *Methods to organize and get results of your surveys
       */
      var survey = {};

      /**
       * Adds a new survey
       * @param {Survey} survey - Json representation of a survey
       * @param {Function} callback
       * @return {Survey}
       */
      survey.Add = function (survey, callback) {

          request('/survey/add', {survey: survey}, callback, 'POST');
      };

      /**
       * Deletes the survey
       * @param {String} publicSurveyID - Survey identifier
       * @param {Function} callback
       */
      survey.Delete = function (publicSurveyID, callback) {

          request('/survey/delete', {publicSurveyID: publicSurveyID}, callback, 'POST');
      };

      /**
       * Export given survey's data to provided format
       * @param {String} publicSurveyID - Survey identifier
       * @param {String} fileName - Name of your file.
       * @param {ExportFileFormats} fileFormat -
       * @param {CompressionFormat} compressionFormat - FileResponse compression format. None or Zip.
       * @param {Function} callback
       * @return {ExportLink}
       */
      survey.Export = function (publicSurveyID, fileName, fileFormat, compressionFormat, callback) {
          fileFormat = typeof fileFormat !== 'undefined' ? fileFormat : 'csv';
          compressionFormat = typeof compressionFormat !== 'undefined' ? compressionFormat : 'none';
          request('/survey/export', {publicSurveyID: publicSurveyID, fileName: fileName, fileFormat: fileFormat, compressionFormat: compressionFormat}, callback, 'POST');
      };

      /**
       * Shows all your existing surveys

       * @param {Function} callback
       * @return {Array.<Survey>}
       */
      survey.List = function (callback) {

          request('/survey/list', {}, callback, 'POST');
      };

      /**
       * Get list of personal answers for the specific survey
       * @param {String} publicSurveyID - Survey identifier
       * @param {Function} callback
       * @return {Array.<SurveyResultInfo>}
       */
      survey.LoadResponseList = function (publicSurveyID, callback) {

          request('/survey/loadresponselist', {publicSurveyID: publicSurveyID}, callback, 'POST');
      };

      /**
       * Get general results of the specific survey
       * @param {String} publicSurveyID - Survey identifier
       * @param {Function} callback
       * @return {SurveyResultsSummaryInfo}
       */
      survey.LoadResults = function (publicSurveyID, callback) {

          request('/survey/loadresults', {publicSurveyID: publicSurveyID}, callback, 'POST');
      };

      /**
       * Update the survey information
       * @param {Survey} survey - Json representation of a survey
       * @param {Function} callback
       * @return {Survey}
       */
      survey.Update = function (survey, callback) {

          request('/survey/update', {survey: survey}, callback, 'POST');
      };

      /* endregion Survey */

      /* region Template */
      /**
       *Managing and editing templates of your emails
       */
      var template = {};

      /**
       * Create new Template. Needs to be sent using POST method
       * @param {TemplateType} templateType - 0 for API connections
       * @param {String} templateName - Name of template.
       * @param {String} subject - Default subject of email.
       * @param {String} fromEmail - Default From: email address.
       * @param {String} fromName - Default From: name.
       * @param {TemplateScope} templateScope - Enum: 0 - private, 1 - public, 2 - mockup
       * @param {String} bodyHtml - HTML code of email (needs escaping).
       * @param {String} bodyText - Text body of email.
       * @param {String} css - CSS style
       * @param {Number} originalTemplateID - ID number of original template.
       * @param {Function} callback
       * @return {Number}
       */
      template.Add = function (templateType, templateName, subject, fromEmail, fromName, templateScope, bodyHtml, bodyText, css, originalTemplateID, callback) {
          templateScope = typeof templateScope !== 'undefined' ? templateScope : 'private';
          bodyHtml = typeof bodyHtml !== 'undefined' ? bodyHtml : null;
          bodyText = typeof bodyText !== 'undefined' ? bodyText : null;
          css = typeof css !== 'undefined' ? css : null;
          originalTemplateID = typeof originalTemplateID !== 'undefined' ? originalTemplateID : 0;
          request('/template/add', {templateType: templateType, templateName: templateName, subject: subject, fromEmail: fromEmail, fromName: fromName, templateScope: templateScope, bodyHtml: bodyHtml, bodyText: bodyText, css: css, originalTemplateID: originalTemplateID}, callback, 'POST');
      };

      /**
       * Check if template is used by campaign.
       * @param {Number} templateID - ID number of template.
       * @param {Function} callback
       * @return {Boolean}
       */
      template.CheckUsage = function (templateID, callback) {

          request('/template/checkusage', {templateID: templateID}, callback, 'POST');
      };

      /**
       * Copy Selected Template
       * @param {Number} templateID - ID number of template.
       * @param {String} templateName - Name of template.
       * @param {String} subject - Default subject of email.
       * @param {String} fromEmail - Default From: email address.
       * @param {String} fromName - Default From: name.
       * @param {Function} callback
       * @return {Template}
       */
      template.Copy = function (templateID, templateName, subject, fromEmail, fromName, callback) {

          request('/template/copy', {templateID: templateID, templateName: templateName, subject: subject, fromEmail: fromEmail, fromName: fromName}, callback, 'POST');
      };

      /**
       * Delete template with the specified ID
       * @param {Number} templateID - ID number of template.
       * @param {Function} callback
       */
      template.Delete = function (templateID, callback) {

          request('/template/delete', {templateID: templateID}, callback, 'POST');
      };

      /**
       * Search for references to images and replaces them with base64 code.
       * @param {Number} templateID - ID number of template.
       * @param {Function} callback
       * @return {String}
       */
      template.GetEmbeddedHtml = function (templateID, callback) {

          request('/template/getembeddedhtml', {templateID: templateID}, callback, 'POST');
      };

      /**
       * Lists your templates
       * @param {Number} limit - Maximum of loaded items.
       * @param {Number} offset - How many items should be loaded ahead.
       * @param {Function} callback
       * @return {TemplateList}
       */
      template.GetList = function (limit, offset, callback) {
          limit = typeof limit !== 'undefined' ? limit : 500;
          offset = typeof offset !== 'undefined' ? offset : 0;
          request('/template/getlist', {limit: limit, offset: offset}, callback, 'POST');
      };

      /**
       * Load template with content
       * @param {Number} templateID - ID number of template.
       * @param {Boolean} ispublic -
       * @param {Function} callback
       * @return {Template}
       */
      template.LoadTemplate = function (templateID, ispublic, callback) {
          ispublic = typeof ispublic !== 'undefined' ? ispublic : false;
          request('/template/loadtemplate', {templateID: templateID, ispublic: ispublic}, callback, 'POST');
      };

      /**
       * Removes previously generated screenshot of template
       * @param {Number} templateID - ID number of template.
       * @param {Function} callback
       */
      template.RemoveScreenshot = function (templateID, callback) {

          request('/template/removescreenshot', {templateID: templateID}, callback, 'POST');
      };

      /**
       * Saves screenshot of chosen Template
       * @param {String} base64Image - Image, base64 coded.
       * @param {Number} templateID - ID number of template.
       * @param {Function} callback
       * @return {String}
       */
      template.SaveScreenshot = function (base64Image, templateID, callback) {

          request('/template/savescreenshot', {base64Image: base64Image, templateID: templateID}, callback, 'POST');
      };

      /**
       * Update existing template, overwriting existing data. Needs to be sent using POST method.
       * @param {Number} templateID - ID number of template.
       * @param {TemplateScope} templateScope - Enum: 0 - private, 1 - public, 2 - mockup
       * @param {String} templateName - Name of template.
       * @param {String} subject - Default subject of email.
       * @param {String} fromEmail - Default From: email address.
       * @param {String} fromName - Default From: name.
       * @param {String} bodyHtml - HTML code of email (needs escaping).
       * @param {String} bodyText - Text body of email.
       * @param {String} css - CSS style
       * @param {Boolean} removeScreenshot -
       * @param {Function} callback
       */
      template.Update = function (templateID, templateScope, templateName, subject, fromEmail, fromName, bodyHtml, bodyText, css, removeScreenshot, callback) {
          templateScope = typeof templateScope !== 'undefined' ? templateScope : 'private';
          templateName = typeof templateName !== 'undefined' ? templateName : null;
          subject = typeof subject !== 'undefined' ? subject : null;
          fromEmail = typeof fromEmail !== 'undefined' ? fromEmail : null;
          fromName = typeof fromName !== 'undefined' ? fromName : null;
          bodyHtml = typeof bodyHtml !== 'undefined' ? bodyHtml : null;
          bodyText = typeof bodyText !== 'undefined' ? bodyText : null;
          css = typeof css !== 'undefined' ? css : null;
          removeScreenshot = typeof removeScreenshot !== 'undefined' ? removeScreenshot : true;
          request('/template/update', {templateID: templateID, templateScope: templateScope, templateName: templateName, subject: subject, fromEmail: fromEmail, fromName: fromName, bodyHtml: bodyHtml, bodyText: bodyText, css: css, removeScreenshot: removeScreenshot}, callback, 'POST');
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
      that.Email = email;
      that.Export = Export;
      that.List = list;
      that.Log = log;
      that.Segment = segment;
      that.Sms = sms;
      that.Survey = survey;
      that.Template = template;
      return that;

  };
}));
