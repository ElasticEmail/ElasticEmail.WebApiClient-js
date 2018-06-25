import includes from 'lodash.includes';
import isObject from 'lodash.isobject';
import request from 'request-promise';

/**
* @class EEAPI
*/
class EEAPI {
    /**
    * @constructs EEAPI
    * @param {Object} options - options object.
    * @param {String} options.apiUri - elastic email api url.
    * @param {String} options.apiVersion - elastic email api version
    * @param {String} options.apiKey - elastic email api key
    */
    constructor(options) {
        if (!options.apiUri || !options.apiVersion || !options.apiKey) {
            console.error('Missing mandatory options!');
            return;
        }
        this.Accesstoken = new Accesstoken(options);
        this.Account = new Account(options);
        this.Campaign = new Campaign(options);
        this.Channel = new Channel(options);
        this.Contact = new Contact(options);
        this.Domain = new Domain(options);
        this.Email = new Email(options);
        this.Export = new Export(options);
        this.File = new File(options);
        this.List = new List(options);
        this.Log = new Log(options);
        this.Segment = new Segment(options);
        this.Sms = new Sms(options);
        this.Survey = new Survey(options);
        this.Template = new Template(options);

    }

}

/**
 * @module EEAPI
 */
export const client = EEAPI;

/**
* @class ApiCallAbstarct
*/
class ApiCallAbstarct {
    /**
    * @constructs ApiCallAbstarct
    * @param {Object} options - options object.
    * @param {String} options.apiUri - elastic email api url.
    * @param {String} options.apiVersion - elastic email api version
    * @param {String} options.apiKey - elastic email api key
    */
    constructor(options) {
        this._makeCall = (method, data, methodType) => {
            if (!includes(['POST', 'GET'], methodType.toUpperCase())) {
                console.error('makeCall: unsupported method type: ' + methodType);
                return;
            }

            if (!isObject(data)) {
                data = {};
            }

            data.apikey = options.apiKey;

            const params = {
                url: options.apiUri + options.apiVersion + method,
                method: methodType,
                formData: data,
                json: true
            };
    
            return request(params)
            .then((resp) => {
                if(!resp.success) { throw(resp.error); }   
                return resp;
            });
        };
    }
}

/**
* @class Accesstoken
* @extends ApiCallAbstarct
*/
class Accesstoken extends ApiCallAbstarct {
     /**
     * @constructs Accesstoken
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Add new AccessToken
     * @name Add
     * @method Accesstoken#Add
     * @param {Object} data - data object.
     * @param {String} data.tokenName - 
     * @param {AccessLevel} data.accessLevel - 
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/accesstoken/add', data, 'POST');
    }

    /**
     * Permanently delete AccessToken.
     * @name Delete
     * @method Accesstoken#Delete
     * @param {Object} data - data object.
     * @param {String} data.tokenName - 
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/accesstoken/delete', data, 'POST');
    }

    /**
     * Get AccessToken list.
     * @name List
     * @method Accesstoken#List
     * @param {Object} data - data object.

     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/accesstoken/list', data, 'POST');
    }

    /**
     * Edit AccessToken.
     * @name Update
     * @method Accesstoken#Update
     * @param {Object} data - data object.
     * @param {String} data.tokenName - 
     * @param {AccessLevel} data.accessLevel - 
     * @param {String} data.tokenNameNew - 
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/accesstoken/update', data, 'POST');
    }
}

/**
* @class Account
* @extends ApiCallAbstarct
*/
class Account extends ApiCallAbstarct {
     /**
     * @constructs Account
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Create new subaccount and provide most important data about it.
     * @name AddSubAccount
     * @method Account#AddSubAccount
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @param {String} data.password - Current password.
     * @param {String} data.confirmPassword - Repeat new password.
     * @param {Boolean} data.requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Boolean} data.enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
     * @param {Boolean} data.requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Number} data.maxContacts - Maximum number of contacts the account can have
     * @param {Boolean} data.enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
     * @param {Boolean} data.sendActivation - True, if you want to send activation email to this account. Otherwise, false
     * @param {String} data.returnUrl - URL to navigate to after account creation
     * @param {SendingPermission} data.sendingPermission - Sending permission setting for account
     * @param {Boolean} data.enableContactFeatures - True, if you want to use Contact Delivery Tools.  Otherwise, false
     * @param {String} data.poolName - Private IP required. Name of the custom IP Pool which Sub Account should use to send its emails. Leave empty for the default one or if no Private IPs have been bought
     * @param {Number} data.emailSizeLimit - Maximum size of email including attachments in MB's
     * @param {Number} data.dailySendLimit - Amount of emails account can send daily
     * @return {Promise}
     */
     AddSubAccount(data) {
        return this._makeCall('/account/addsubaccount', data, 'POST');
    }

    /**
     * Add email, template or litmus credits to a sub-account
     * @name AddSubAccountCredits
     * @method Account#AddSubAccountCredits
     * @param {Object} data - data object.
     * @param {Number} data.credits - Amount of credits to add
     * @param {String} data.notes - Specific notes about the transaction
     * @param {CreditType} data.creditType - Type of credits to add (Email or Litmus)
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to add credits to. Use subAccountEmail or publicAccountID not both.
     * @return {Promise}
     */
     AddSubAccountCredits(data) {
        return this._makeCall('/account/addsubaccountcredits', data, 'POST');
    }

    /**
     * Change your email address. Remember, that your email address is used as login!
     * @name ChangeEmail
     * @method Account#ChangeEmail
     * @param {Object} data - data object.
     * @param {String} data.newEmail - New email address.
     * @param {String} data.confirmEmail - New email address.
     * @param {String} data.sourceUrl - URL from which request was sent.
     * @return {Promise}
     */
     ChangeEmail(data) {
        return this._makeCall('/account/changeemail', data, 'POST');
    }

    /**
     * Create new password for your account. Password needs to be at least 6 characters long.
     * @name ChangePassword
     * @method Account#ChangePassword
     * @param {Object} data - data object.
     * @param {String} data.currentPassword - Current password.
     * @param {String} data.newPassword - New password for account.
     * @param {String} data.confirmPassword - Repeat new password.
     * @return {Promise}
     */
     ChangePassword(data) {
        return this._makeCall('/account/changepassword', data, 'POST');
    }

    /**
     * Deletes specified Subaccount
     * @name DeleteSubAccount
     * @method Account#DeleteSubAccount
     * @param {Object} data - data object.
     * @param {Boolean} data.notify - True, if you want to send an email notification. Otherwise, false
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to delete. Use subAccountEmail or publicAccountID not both.
     * @param {Boolean} data.deleteDomains - 
     * @return {Promise}
     */
     DeleteSubAccount(data) {
        return this._makeCall('/account/deletesubaccount', data, 'POST');
    }

    /**
     * Validate account's ability to send e-mail
     * @name GetAccountAbilityToSendEmail
     * @method Account#GetAccountAbilityToSendEmail
     * @param {Object} data - data object.

     * @return {Promise}
     */
     GetAccountAbilityToSendEmail(data) {
        return this._makeCall('/account/getaccountabilitytosendemail', data, 'POST');
    }

    /**
     * Returns API Key for the given Sub Account.
     * @name GetSubAccountApiKey
     * @method Account#GetSubAccountApiKey
     * @param {Object} data - data object.
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to retrieve sub-account API Key. Use subAccountEmail or publicAccountID not both.
     * @return {Promise}
     */
     GetSubAccountApiKey(data) {
        return this._makeCall('/account/getsubaccountapikey', data, 'POST');
    }

    /**
     * Lists all of your subaccounts
     * @name GetSubAccountList
     * @method Account#GetSubAccountList
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     GetSubAccountList(data) {
        return this._makeCall('/account/getsubaccountlist', data, 'POST');
    }

    /**
     * Loads your account. Returns detailed information about your account.
     * @name Load
     * @method Account#Load
     * @param {Object} data - data object.

     * @return {Promise}
     */
     Load(data) {
        return this._makeCall('/account/load', data, 'POST');
    }

    /**
     * Load advanced options of your account
     * @name LoadAdvancedOptions
     * @method Account#LoadAdvancedOptions
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadAdvancedOptions(data) {
        return this._makeCall('/account/loadadvancedoptions', data, 'POST');
    }

    /**
     * Lists email credits history
     * @name LoadEmailCreditsHistory
     * @method Account#LoadEmailCreditsHistory
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadEmailCreditsHistory(data) {
        return this._makeCall('/account/loademailcreditshistory', data, 'POST');
    }

    /**
     * Loads your account. Returns detailed information about your account.
     * @name LoadInfo
     * @method Account#LoadInfo
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadInfo(data) {
        return this._makeCall('/account/loadinfo', data, 'POST');
    }

    /**
     * Lists litmus credits history
     * @name LoadLitmusCreditsHistory
     * @method Account#LoadLitmusCreditsHistory
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadLitmusCreditsHistory(data) {
        return this._makeCall('/account/loadlitmuscreditshistory', data, 'POST');
    }

    /**
     * Shows queue of newest notifications - very useful when you want to check what happened with mails that were not received.
     * @name LoadNotificationQueue
     * @method Account#LoadNotificationQueue
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadNotificationQueue(data) {
        return this._makeCall('/account/loadnotificationqueue', data, 'POST');
    }

    /**
     * Lists all payments
     * @name LoadPaymentHistory
     * @method Account#LoadPaymentHistory
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {Date} data.fromDate - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.toDate - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     LoadPaymentHistory(data) {
        return this._makeCall('/account/loadpaymenthistory', data, 'POST');
    }

    /**
     * Lists all referral payout history
     * @name LoadPayoutHistory
     * @method Account#LoadPayoutHistory
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadPayoutHistory(data) {
        return this._makeCall('/account/loadpayouthistory', data, 'POST');
    }

    /**
     * Shows information about your referral details
     * @name LoadReferralDetails
     * @method Account#LoadReferralDetails
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadReferralDetails(data) {
        return this._makeCall('/account/loadreferraldetails', data, 'POST');
    }

    /**
     * Shows latest changes in your sending reputation
     * @name LoadReputationHistory
     * @method Account#LoadReputationHistory
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     LoadReputationHistory(data) {
        return this._makeCall('/account/loadreputationhistory', data, 'POST');
    }

    /**
     * Shows detailed information about your actual reputation score
     * @name LoadReputationImpact
     * @method Account#LoadReputationImpact
     * @param {Object} data - data object.

     * @return {Promise}
     */
     LoadReputationImpact(data) {
        return this._makeCall('/account/loadreputationimpact', data, 'POST');
    }

    /**
     * Returns detailed spam check.
     * @name LoadSpamCheck
     * @method Account#LoadSpamCheck
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     LoadSpamCheck(data) {
        return this._makeCall('/account/loadspamcheck', data, 'POST');
    }

    /**
     * Lists email credits history for sub-account
     * @name LoadSubAccountsEmailCreditsHistory
     * @method Account#LoadSubAccountsEmailCreditsHistory
     * @param {Object} data - data object.
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
     * @return {Promise}
     */
     LoadSubAccountsEmailCreditsHistory(data) {
        return this._makeCall('/account/loadsubaccountsemailcreditshistory', data, 'POST');
    }

    /**
     * Loads settings of subaccount
     * @name LoadSubAccountSettings
     * @method Account#LoadSubAccountSettings
     * @param {Object} data - data object.
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to load settings for. Use subAccountEmail or publicAccountID not both.
     * @return {Promise}
     */
     LoadSubAccountSettings(data) {
        return this._makeCall('/account/loadsubaccountsettings', data, 'POST');
    }

    /**
     * Lists litmus credits history for sub-account
     * @name LoadSubAccountsLitmusCreditsHistory
     * @method Account#LoadSubAccountsLitmusCreditsHistory
     * @param {Object} data - data object.
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to list history for. Use subAccountEmail or publicAccountID not both.
     * @return {Promise}
     */
     LoadSubAccountsLitmusCreditsHistory(data) {
        return this._makeCall('/account/loadsubaccountslitmuscreditshistory', data, 'POST');
    }

    /**
     * Shows usage of your account in given time.
     * @name LoadUsage
     * @method Account#LoadUsage
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     LoadUsage(data) {
        return this._makeCall('/account/loadusage', data, 'POST');
    }

    /**
     * Shows summary for your account.
     * @name Overview
     * @method Account#Overview
     * @param {Object} data - data object.

     * @return {Promise}
     */
     Overview(data) {
        return this._makeCall('/account/overview', data, 'POST');
    }

    /**
     * Shows you account's profile basic overview
     * @name ProfileOverview
     * @method Account#ProfileOverview
     * @param {Object} data - data object.

     * @return {Promise}
     */
     ProfileOverview(data) {
        return this._makeCall('/account/profileoverview', data, 'POST');
    }

    /**
     * Remove email, template or litmus credits from a sub-account
     * @name RemoveSubAccountCredits
     * @method Account#RemoveSubAccountCredits
     * @param {Object} data - data object.
     * @param {CreditType} data.creditType - Type of credits to add (Email or Litmus)
     * @param {String} data.notes - Specific notes about the transaction
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to remove credits from. Use subAccountEmail or publicAccountID not both.
     * @param {Number} data.credits - Amount of credits to remove
     * @param {Boolean} data.removeAll - Remove all credits of this type from sub-account (overrides credits if provided)
     * @return {Promise}
     */
     RemoveSubAccountCredits(data) {
        return this._makeCall('/account/removesubaccountcredits', data, 'POST');
    }

    /**
     * Request a new default APIKey.
     * @name RequestNewApiKey
     * @method Account#RequestNewApiKey
     * @param {Object} data - data object.

     * @return {Promise}
     */
     RequestNewApiKey(data) {
        return this._makeCall('/account/requestnewapikey', data, 'POST');
    }

    /**
     * Request premium support for your account
     * @name RequestPremiumSupport
     * @method Account#RequestPremiumSupport
     * @param {Object} data - data object.

     * @return {Promise}
     */
     RequestPremiumSupport(data) {
        return this._makeCall('/account/requestpremiumsupport', data, 'POST');
    }

    /**
     * Request a private IP for your Account
     * @name RequestPrivateIP
     * @method Account#RequestPrivateIP
     * @param {Object} data - data object.
     * @param {Number} data.count - Number of items.
     * @param {String} data.notes - Free form field of notes
     * @return {Promise}
     */
     RequestPrivateIP(data) {
        return this._makeCall('/account/requestprivateip', data, 'POST');
    }

    /**
     * Update sending and tracking options of your account.
     * @name UpdateAdvancedOptions
     * @method Account#UpdateAdvancedOptions
     * @param {Object} data - data object.
     * @param {Boolean} data.enableClickTracking - True, if you want to track clicks. Otherwise, false
     * @param {Boolean} data.enableLinkClickTracking - True, if you want to track by link tracking. Otherwise, false
     * @param {Boolean} data.manageSubscriptions - True, if you want to display your labels on your unsubscribe form. Otherwise, false
     * @param {Boolean} data.manageSubscribedOnly - True, if you want to only display labels that the contact is subscribed to on your unsubscribe form. Otherwise, false
     * @param {Boolean} data.transactionalOnUnsubscribe - True, if you want to display an option for the contact to opt into transactional email only on your unsubscribe form. Otherwise, false
     * @param {Boolean} data.skipListUnsubscribe - True, if you do not want to use list-unsubscribe headers. Otherwise, false
     * @param {Boolean} data.autoTextFromHtml - True, if text BODY of message should be created automatically. Otherwise, false
     * @param {Boolean} data.allowCustomHeaders - True, if you want to apply custom headers to your emails. Otherwise, false
     * @param {String} data.bccEmail - Email address to send a copy of all email to.
     * @param {String} data.contentTransferEncoding - Type of content encoding
     * @param {Boolean} data.emailNotificationForError - True, if you want bounce notifications returned. Otherwise, false
     * @param {String} data.emailNotificationEmail - Specific email address to send bounce email notifications to.
     * @param {String} data.webNotificationUrl - URL address to receive web notifications to parse and process.
     * @param {Boolean} data.webNotificationNotifyOncePerEmail - True, if you want to receive notifications for each type only once per email. Otherwise, false
     * @param {Boolean} data.webNotificationForSent - True, if you want to send web notifications for sent email. Otherwise, false
     * @param {Boolean} data.webNotificationForOpened - True, if you want to send web notifications for opened email. Otherwise, false
     * @param {Boolean} data.webNotificationForClicked - True, if you want to send web notifications for clicked email. Otherwise, false
     * @param {Boolean} data.webNotificationForUnsubscribed - True, if you want to send web notifications for unsubscribed email. Otherwise, false
     * @param {Boolean} data.webNotificationForAbuseReport - True, if you want to send web notifications for complaint email. Otherwise, false
     * @param {Boolean} data.webNotificationForError - True, if you want to send web notifications for bounced email. Otherwise, false
     * @param {String} data.hubCallBackUrl - URL used for tracking action of inbound emails
     * @param {String} data.inboundDomain - Domain you use as your inbound domain
     * @param {Boolean} data.inboundContactsOnly - True, if you want inbound email to only process contacts from your account. Otherwise, false
     * @param {Boolean} data.lowCreditNotification - True, if you want to receive low credit email notifications. Otherwise, false
     * @param {Boolean} data.enableUITooltips - True, if account has tooltips active. Otherwise, false
     * @param {Boolean} data.enableContactFeatures - True, if you want to use Contact Delivery Tools.  Otherwise, false
     * @param {String} data.notificationsEmails - Email addresses to send a copy of all notifications from our system. Separated by semicolon
     * @param {String} data.unsubscribeNotificationsEmails - Emails, separated by semicolon, to which the notification about contact unsubscribing should be sent to
     * @param {String} data.logoUrl - URL to your logo image.
     * @param {Boolean} data.enableTemplateScripting - True, if you want to use template scripting in your emails {{}}. Otherwise, false
     * @param {Number} data.staleContactScore - (0 means this functionality is NOT enabled) Score, depending on the number of times you have sent to a recipient, at which the given recipient should be moved to the Stale status
     * @param {Number} data.staleContactInactiveDays - (0 means this functionality is NOT enabled) Number of days of inactivity for a contact after which the given recipient should be moved to the Stale status
     * @param {String} data.deliveryReason - Why your clients are receiving your emails.
     * @param {Boolean} data.tutorialsEnabled - True, if you want to enable Dashboard Tutotials
     * @param {Boolean} data.enableOpenTracking - True, if you want to track opens. Otherwise, false
     * @param {Boolean} data.consentTrackingOnUnsubscribe - 
     * @return {Promise}
     */
     UpdateAdvancedOptions(data) {
        return this._makeCall('/account/updateadvancedoptions', data, 'POST');
    }

    /**
     * Update settings of your private branding. These settings are needed, if you want to use Elastic Email under your brand.
     * @name UpdateCustomBranding
     * @method Account#UpdateCustomBranding
     * @param {Object} data - data object.
     * @param {Boolean} data.enablePrivateBranding - True: Turn on or off ability to send mails under your brand. Otherwise, false
     * @param {String} data.logoUrl - URL to your logo image.
     * @param {String} data.supportLink - Address to your support.
     * @param {String} data.privateBrandingUrl - Subdomain for your rebranded service
     * @param {String} data.smtpAddress - Address of SMTP server.
     * @param {String} data.smtpAlternative - Address of alternative SMTP server.
     * @param {String} data.paymentUrl - URL for making payments.
     * @return {Promise}
     */
     UpdateCustomBranding(data) {
        return this._makeCall('/account/updatecustombranding', data, 'POST');
    }

    /**
     * Update http notification URL.
     * @name UpdateHttpNotification
     * @method Account#UpdateHttpNotification
     * @param {Object} data - data object.
     * @param {String} data.url - URL of notification.
     * @param {Boolean} data.notifyOncePerEmail - True, if you want to receive notifications for each type only once per email. Otherwise, false
     * @param {String} data.settings - Http notification settings serialized to JSON 
     * @return {Promise}
     */
     UpdateHttpNotification(data) {
        return this._makeCall('/account/updatehttpnotification', data, 'POST');
    }

    /**
     * Update your profile.
     * @name UpdateProfile
     * @method Account#UpdateProfile
     * @param {Object} data - data object.
     * @param {String} data.firstName - First name.
     * @param {String} data.lastName - Last name.
     * @param {String} data.address1 - First line of address.
     * @param {String} data.city - City.
     * @param {String} data.state - State or province.
     * @param {String} data.zip - Zip/postal code.
     * @param {Number} data.countryID - Numeric ID of country. A file with the list of countries is available <a href="http://api.elasticemail.com/public/countries"><b>here</b></a>
     * @param {Boolean} data.marketingConsent - True if you want to receive newsletters from Elastic Email. Otherwise, false. Empty to leave the current value.
     * @param {String} data.address2 - Second line of address.
     * @param {String} data.company - Company name.
     * @param {String} data.website - HTTP address of your website.
     * @param {String} data.logoUrl - URL to your logo image.
     * @param {String} data.taxCode - Code used for tax purposes.
     * @param {String} data.phone - Phone number
     * @return {Promise}
     */
     UpdateProfile(data) {
        return this._makeCall('/account/updateprofile', data, 'POST');
    }

    /**
     * Updates settings of specified subaccount
     * @name UpdateSubAccountSettings
     * @method Account#UpdateSubAccountSettings
     * @param {Object} data - data object.
     * @param {Boolean} data.requiresEmailCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Number} data.monthlyRefillCredits - Amount of credits added to account automatically
     * @param {Boolean} data.requiresLitmusCredits - True, if account needs credits to send emails. Otherwise, false
     * @param {Boolean} data.enableLitmusTest - True, if account is able to send template tests to Litmus. Otherwise, false
     * @param {Number} data.dailySendLimit - Amount of emails account can send daily
     * @param {Number} data.emailSizeLimit - Maximum size of email including attachments in MB's
     * @param {Boolean} data.enablePrivateIPRequest - True, if account can request for private IP on its own. Otherwise, false
     * @param {Number} data.maxContacts - Maximum number of contacts the account can have
     * @param {String} data.subAccountEmail - Email address of sub-account
     * @param {String} data.publicAccountID - Public key of sub-account to update. Use subAccountEmail or publicAccountID not both.
     * @param {SendingPermission} data.sendingPermission - Sending permission setting for account
     * @param {Boolean} data.enableContactFeatures - True, if you want to use Contact Delivery Tools.  Otherwise, false
     * @param {String} data.poolName - Name of your custom IP Pool to be used in the sending process
     * @return {Promise}
     */
     UpdateSubAccountSettings(data) {
        return this._makeCall('/account/updatesubaccountsettings', data, 'POST');
    }
}

/**
* @class Campaign
* @extends ApiCallAbstarct
*/
class Campaign extends ApiCallAbstarct {
     /**
     * @constructs Campaign
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Adds a campaign to the queue for processing based on the configuration
     * @name Add
     * @method Campaign#Add
     * @param {Object} data - data object.
     * @param {Campaign} data.campaign - Json representation of a campaign
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/campaign/add', data, 'POST');
    }

    /**
     * Copy selected campaign
     * @name Copy
     * @method Campaign#Copy
     * @param {Object} data - data object.
     * @param {Number} data.channelID - ID number of selected Channel.
     * @return {Promise}
     */
     Copy(data) {
        return this._makeCall('/campaign/copy', data, 'POST');
    }

    /**
     * Delete selected campaign
     * @name Delete
     * @method Campaign#Delete
     * @param {Object} data - data object.
     * @param {Number} data.channelID - ID number of selected Channel.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/campaign/delete', data, 'POST');
    }

    /**
     * Export selected campaigns to chosen file format.
     * @name Export
     * @method Campaign#Export
     * @param {Object} data - data object.
     * @param {Object} data.channelIDs - List of campaign IDs used for processing
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/campaign/export', data, 'POST');
    }

    /**
     * List all of your campaigns
     * @name List
     * @method Campaign#List
     * @param {Object} data - data object.
     * @param {String} data.search - Text fragment used for searching.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {Number} data.limit - Maximum of loaded items.
     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/campaign/list', data, 'POST');
    }

    /**
     * Updates a previously added campaign.  Only Active and Paused campaigns can be updated.
     * @name Update
     * @method Campaign#Update
     * @param {Object} data - data object.
     * @param {Campaign} data.campaign - Json representation of a campaign
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/campaign/update', data, 'POST');
    }
}

/**
* @class Channel
* @extends ApiCallAbstarct
*/
class Channel extends ApiCallAbstarct {
     /**
     * @constructs Channel
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Manually add a channel to your account to group email
     * @name Add
     * @method Channel#Add
     * @param {Object} data - data object.
     * @param {String} data.name - Descriptive name of the channel
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/channel/add', data, 'POST');
    }

    /**
     * Delete the channel.
     * @name Delete
     * @method Channel#Delete
     * @param {Object} data - data object.
     * @param {String} data.name - The name of the channel to delete.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/channel/delete', data, 'POST');
    }

    /**
     * Export channels in CSV file format.
     * @name ExportCsv
     * @method Channel#ExportCsv
     * @param {Object} data - data object.
     * @param {Object} data.channelNames - List of channel names used for processing
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     ExportCsv(data) {
        return this._makeCall('/channel/exportcsv', data, 'POST');
    }

    /**
     * Export channels in JSON file format.
     * @name ExportJson
     * @method Channel#ExportJson
     * @param {Object} data - data object.
     * @param {Object} data.channelNames - List of channel names used for processing
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     ExportJson(data) {
        return this._makeCall('/channel/exportjson', data, 'POST');
    }

    /**
     * Export channels in XML file format.
     * @name ExportXml
     * @method Channel#ExportXml
     * @param {Object} data - data object.
     * @param {Object} data.channelNames - List of channel names used for processing
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     ExportXml(data) {
        return this._makeCall('/channel/exportxml', data, 'POST');
    }

    /**
     * List all of your channels
     * @name List
     * @method Channel#List
     * @param {Object} data - data object.

     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/channel/list', data, 'POST');
    }

    /**
     * Rename an existing channel.
     * @name Update
     * @method Channel#Update
     * @param {Object} data - data object.
     * @param {String} data.name - The name of the channel to update.
     * @param {String} data.newName - The new name for the channel.
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/channel/update', data, 'POST');
    }
}

/**
* @class Contact
* @extends ApiCallAbstarct
*/
class Contact extends ApiCallAbstarct {
     /**
     * @constructs Contact
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Add a new contact and optionally to one of your lists.  Note that your API KEY is not required for this call.
     * @name Add
     * @method Contact#Add
     * @param {Object} data - data object.
     * @param {String} data.publicAccountID - Public key for limited access to your account such as contact/add so you can use it safely on public websites.
     * @param {String} data.email - Proper email address.
     * @param {Object} data.publicListID - ID code of list
     * @param {StringArray} data.listName - Name of your list.
     * @param {String} data.firstName - First name.
     * @param {String} data.lastName - Last name.
     * @param {ContactSource} data.source - Specifies the way of uploading the contact
     * @param {String} data.returnUrl - URL to navigate to after account creation
     * @param {String} data.sourceUrl - URL from which request was sent.
     * @param {String} data.activationReturnUrl - The url to return the contact to after activation.
     * @param {String} data.activationTemplate - 
     * @param {Boolean} data.sendActivation - True, if you want to send activation email to this account. Otherwise, false
     * @param {Date} data.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} data.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {Object} data.field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname 
     * @param {String} data.notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
     * @param {String} data.alreadyActiveUrl - 
     * @param {ConsentTracking} data.consentTracking - 
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/contact/add', data, 'POST');
    }

    /**
     * Manually add or update a contacts status to Abuse or Unsubscribed status (blocked).
     * @name AddBlocked
     * @method Contact#AddBlocked
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @param {ContactStatus} data.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @return {Promise}
     */
     AddBlocked(data) {
        return this._makeCall('/contact/addblocked', data, 'POST');
    }

    /**
     * Change any property on the contact record.
     * @name ChangeProperty
     * @method Contact#ChangeProperty
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @param {String} data.name - Name of the contact property you want to change.
     * @param {String} data.value - Value you would like to change the contact property to.
     * @return {Promise}
     */
     ChangeProperty(data) {
        return this._makeCall('/contact/changeproperty', data, 'POST');
    }

    /**
     * Changes status of selected Contacts. You may provide RULE for selection or specify list of Contact IDs.
     * @name ChangeStatus
     * @method Contact#ChangeStatus
     * @param {Object} data - data object.
     * @param {ContactStatus} data.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @return {Promise}
     */
     ChangeStatus(data) {
        return this._makeCall('/contact/changestatus', data, 'POST');
    }

    /**
     * Returns number of Contacts, RULE specifies contact Status.
     * @name CountByStatus
     * @method Contact#CountByStatus
     * @param {Object} data - data object.
     * @param {String} data.rule - Query used for filtering.
     * @param {Boolean} data.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @return {Promise}
     */
     CountByStatus(data) {
        return this._makeCall('/contact/countbystatus', data, 'POST');
    }

    /**
     * Returns count of unsubscribe reasons for unsubscribed and complaint contacts.
     * @name CountByUnsubscribeReason
     * @method Contact#CountByUnsubscribeReason
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     CountByUnsubscribeReason(data) {
        return this._makeCall('/contact/countbyunsubscribereason', data, 'POST');
    }

    /**
     * Permanantly deletes the contacts provided.  You can provide either a qualified rule or a list of emails (comma separated string).
     * @name Delete
     * @method Contact#Delete
     * @param {Object} data - data object.
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/contact/delete', data, 'POST');
    }

    /**
     * Export selected Contacts to file.
     * @name Export
     * @method Contact#Export
     * @param {Object} data - data object.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/contact/export', data, 'POST');
    }

    /**
     * Export contacts' unsubscribe reasons count to file.
     * @name ExportUnsubscribeReasonCount
     * @method Contact#ExportUnsubscribeReasonCount
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     ExportUnsubscribeReasonCount(data) {
        return this._makeCall('/contact/exportunsubscribereasoncount', data, 'POST');
    }

    /**
     * Finds all Lists and Segments this email belongs to.
     * @name FindContact
     * @method Contact#FindContact
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @return {Promise}
     */
     FindContact(data) {
        return this._makeCall('/contact/findcontact', data, 'POST');
    }

    /**
     * List of Contacts for provided List
     * @name GetContactsByList
     * @method Contact#GetContactsByList
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     GetContactsByList(data) {
        return this._makeCall('/contact/getcontactsbylist', data, 'POST');
    }

    /**
     * List of Contacts for provided Segment
     * @name GetContactsBySegment
     * @method Contact#GetContactsBySegment
     * @param {Object} data - data object.
     * @param {String} data.segmentName - Name of your segment.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     GetContactsBySegment(data) {
        return this._makeCall('/contact/getcontactsbysegment', data, 'POST');
    }

    /**
     * List of all contacts. If you have not specified RULE, all Contacts will be listed.
     * @name List
     * @method Contact#List
     * @param {Object} data - data object.
     * @param {String} data.rule - Query used for filtering.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/contact/list', data, 'POST');
    }

    /**
     * Load blocked contacts
     * @name LoadBlocked
     * @method Contact#LoadBlocked
     * @param {Object} data - data object.
     * @param {Object} data.statuses - List of blocked statuses: Abuse, Bounced or Unsubscribed
     * @param {String} data.search - Text fragment used for searching.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     LoadBlocked(data) {
        return this._makeCall('/contact/loadblocked', data, 'POST');
    }

    /**
     * Load detailed contact information
     * @name LoadContact
     * @method Contact#LoadContact
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @return {Promise}
     */
     LoadContact(data) {
        return this._makeCall('/contact/loadcontact', data, 'POST');
    }

    /**
     * Shows detailed history of chosen Contact.
     * @name LoadHistory
     * @method Contact#LoadHistory
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     LoadHistory(data) {
        return this._makeCall('/contact/loadhistory', data, 'POST');
    }

    /**
     * Add new Contact to one of your Lists.
     * @name QuickAdd
     * @method Contact#QuickAdd
     * @param {Object} data - data object.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @param {String} data.firstName - First name.
     * @param {String} data.lastName - Last name.
     * @param {String} data.publicListID - ID code of list
     * @param {String} data.listName - Name of your list.
     * @param {ContactStatus} data.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {String} data.notes - Free form field of notes
     * @param {Date} data.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} data.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {Object} data.field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname 
     * @param {String} data.notifyEmail - Emails, separated by semicolon, to which the notification about contact subscribing should be sent to
     * @param {ConsentTracking} data.consentTracking - 
     * @return {Promise}
     */
     QuickAdd(data) {
        return this._makeCall('/contact/quickadd', data, 'POST');
    }

    /**
     * Basic double opt-in email subscribe form for your account.  This can be used for contacts that need to re-subscribe as well.
     * @name Subscribe
     * @method Contact#Subscribe
     * @param {Object} data - data object.
     * @param {String} data.publicAccountID - Public key for limited access to your account such as contact/add so you can use it safely on public websites.
     * @return {Promise}
     */
     Subscribe(data) {
        return this._makeCall('/contact/subscribe', data, 'POST');
    }

    /**
     * Update selected contact. Omitted contact's fields will be reset by default (see the clearRestOfFields parameter)
     * @name Update
     * @method Contact#Update
     * @param {Object} data - data object.
     * @param {String} data.email - Proper email address.
     * @param {String} data.firstName - First name.
     * @param {String} data.lastName - Last name.
     * @param {Boolean} data.clearRestOfFields - States if the fields that were omitted in this request are to be reset or should they be left with their current value
     * @param {Object} data.field - Custom contact field like firstname, lastname, city etc. Request parameters prefixed by field_ like field_firstname, field_lastname 
     * @param {String} data.customFields - Custom contact field like firstname, lastname, city etc. JSON serialized text like { "city":"london" } 
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/contact/update', data, 'POST');
    }

    /**
     * Upload contacts in CSV file.
     * @name Upload
     * @method Contact#Upload
     * @param {Object} data - data object.
     * @param {{content: {Object}, filename: {String}}} data.contactFile - Name of CSV file with Contacts.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this (optional) newly created list. Otherwise, false
     * @param {Number} data.listID - ID number of selected list.
     * @param {String} data.listName - Name of your list to upload contacts to, or how the new, automatically created list should be named
     * @param {ContactStatus} data.status - Name of status: Active, Engaged, Inactive, Abuse, Bounced, Unsubscribed.
     * @param {Date} data.consentDate - Date of consent to send this contact(s) your email. If not provided current date is used for consent.
     * @param {String} data.consentIP - IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
     * @param {ConsentTracking} data.consentTracking - 
     * @return {Promise}
     */
     Upload(data) {
        return this._makeCall('/contact/upload', data, 'POST');
    }
}

/**
* @class Domain
* @extends ApiCallAbstarct
*/
class Domain extends ApiCallAbstarct {
     /**
     * @constructs Domain
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Add new domain to account
     * @name Add
     * @method Domain#Add
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @param {TrackingType} data.trackingType - 
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/domain/add', data, 'POST');
    }

    /**
     * Deletes configured domain from account
     * @name Delete
     * @method Domain#Delete
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/domain/delete', data, 'POST');
    }

    /**
     * Lists all domains configured for this account.
     * @name List
     * @method Domain#List
     * @param {Object} data - data object.

     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/domain/list', data, 'POST');
    }

    /**
     * Verification of email addres set for domain.
     * @name SetDefault
     * @method Domain#SetDefault
     * @param {Object} data - data object.
     * @param {String} data.domain - Default email sender, example: mail@yourdomain.com
     * @return {Promise}
     */
     SetDefault(data) {
        return this._makeCall('/domain/setdefault', data, 'POST');
    }

    /**
     * Verification of DKIM record for domain
     * @name VerifyDkim
     * @method Domain#VerifyDkim
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @return {Promise}
     */
     VerifyDkim(data) {
        return this._makeCall('/domain/verifydkim', data, 'POST');
    }

    /**
     * Verification of MX record for domain
     * @name VerifyMX
     * @method Domain#VerifyMX
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @return {Promise}
     */
     VerifyMX(data) {
        return this._makeCall('/domain/verifymx', data, 'POST');
    }

    /**
     * Verification of SPF record for domain
     * @name VerifySpf
     * @method Domain#VerifySpf
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @return {Promise}
     */
     VerifySpf(data) {
        return this._makeCall('/domain/verifyspf', data, 'POST');
    }

    /**
     * Verification of tracking CNAME record for domain
     * @name VerifyTracking
     * @method Domain#VerifyTracking
     * @param {Object} data - data object.
     * @param {String} data.domain - Name of selected domain.
     * @param {TrackingType} data.trackingType - 
     * @return {Promise}
     */
     VerifyTracking(data) {
        return this._makeCall('/domain/verifytracking', data, 'POST');
    }
}

/**
* @class Email
* @extends ApiCallAbstarct
*/
class Email extends ApiCallAbstarct {
     /**
     * @constructs Email
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Get email batch status
     * @name GetStatus
     * @method Email#GetStatus
     * @param {Object} data - data object.
     * @param {String} data.transactionID - Transaction identifier
     * @param {Boolean} data.showFailed - Include Bounced email addresses.
     * @param {Boolean} data.showSent - Include Sent email addresses.
     * @param {Boolean} data.showDelivered - Include all delivered email addresses.
     * @param {Boolean} data.showPending - Include Ready to send email addresses.
     * @param {Boolean} data.showOpened - Include Opened email addresses.
     * @param {Boolean} data.showClicked - Include Clicked email addresses.
     * @param {Boolean} data.showAbuse - Include Reported as abuse email addresses.
     * @param {Boolean} data.showUnsubscribed - Include Unsubscribed email addresses.
     * @param {Boolean} data.showErrors - Include error messages for bounced emails.
     * @param {Boolean} data.showMessageIDs - Include all MessageIDs for this transaction
     * @return {Promise}
     */
     GetStatus(data) {
        return this._makeCall('/email/getstatus', data, 'POST');
    }

    /**
     * Submit emails. The HTTP POST request is suggested. The default, maximum (accepted by us) size of an email is 10 MB in total, with or without attachments included. For suggested implementations please refer to https://elasticemail.com/support/http-api/
     * @name Send
     * @method Email#Send
     * @param {Object} data - data object.
     * @param {String} data.subject - Email subject
     * @param {String} data.from - From email address
     * @param {String} data.fromName - Display name for from email address
     * @param {String} data.sender - Email address of the sender
     * @param {String} data.senderName - Display name sender
     * @param {String} data.msgFrom - Optional parameter. Sets FROM MIME header.
     * @param {String} data.msgFromName - Optional parameter. Sets FROM name of MIME header.
     * @param {String} data.replyTo - Email address to reply to
     * @param {String} data.replyToName - Display name of the reply to address
     * @param {Object} data.to - List of email recipients (each email is treated separately, like a BCC). Separated by comma or semicolon. We suggest using the "msgTo" parameter if backward compatibility with API version 1 is not a must.
     * @param {Object} data.msgTo - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as TO MIME header). Separated by comma or semicolon.
     * @param {Object} data.msgCC - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as CC MIME header). Separated by comma or semicolon.
     * @param {Object} data.msgBcc - Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (each email is treated seperately). Separated by comma or semicolon.
     * @param {Object} data.lists - The name of a contact list you would like to send to. Separate multiple contact lists by commas or semicolons.
     * @param {Object} data.segments - The name of a segment you would like to send to. Separate multiple segments by comma or semicolon. Insert "0" for all Active contacts.
     * @param {String} data.mergeSourceFilename - File name one of attachments which is a CSV list of Recipients.
     * @param {String} data.dataSource - Name or ID of the previously uploaded file which should be a CSV list of Recipients.
     * @param {String} data.channel - An ID field (max 191 chars) that can be used for reporting [will default to HTTP API or SMTP API]
     * @param {String} data.bodyHtml - Html email body
     * @param {String} data.bodyText - Text email body
     * @param {String} data.charset - Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more…
     * @param {String} data.charsetBodyHtml - Sets charset for body html MIME part (overrides default value from charset parameter)
     * @param {String} data.charsetBodyText - Sets charset for body text MIME part (overrides default value from charset parameter)
     * @param {EncodingType} data.encodingType - 0 for None, 1 for Raw7Bit, 2 for Raw8Bit, 3 for QuotedPrintable, 4 for Base64 (Default), 5 for Uue  note that you can also provide the text version such as "Raw7Bit" for value 1.  NOTE: Base64 or QuotedPrintable is recommended if you are validating your domain(s) with DKIM.
     * @param {String} data.template - The ID of an email template you have created in your account.
     * @param {{content: {Object}, filename: {String}}} data.attachmentFiles - Attachment files. These files should be provided with the POST multipart file upload, not directly in the request's URL. Can also include merge CSV file
     * @param {Object} data.headers - Optional Custom Headers. Request parameters prefixed by headers_ like headers_customheader1, headers_customheader2. Note: a space is required after the colon before the custom header value. headers_xmailer=xmailer: header-value1
     * @param {String} data.postBack - Optional header returned in notifications.
     * @param {Object} data.merge - Request parameters prefixed by merge_ like merge_firstname, merge_lastname. If sending to a template you can send merge_ fields to merge data with the template. Template fields are entered with {firstname}, {lastname} etc.
     * @param {String} data.timeOffSetMinutes - Number of minutes in the future this email should be sent up to a maximum of 1 year (524160 minutes)
     * @param {String} data.poolName - Name of your custom IP Pool to be used in the sending process
     * @param {Boolean} data.isTransactional - True, if email is transactional (non-bulk, non-marketing, non-commercial). Otherwise, false
     * @param {Object} data.attachments - Names or IDs of attachments previously uploaded to your account that should be sent with this e-mail.
     * @param {Boolean} data.trackOpens - Should the opens be tracked? If no value has been provided, account's default setting will be used.
     * @param {Boolean} data.trackClicks - Should the clicks be tracked? If no value has been provided, account's default setting will be used.
     * @return {Promise}
     */
     Send(data) {
        return this._makeCall('/email/send', data, 'POST');
    }

    /**
     * Detailed status of a unique email sent through your account. Returns a 'Email has expired and the status is unknown.' error, if the email has not been fully processed yet.
     * @name Status
     * @method Email#Status
     * @param {Object} data - data object.
     * @param {String} data.messageID - Unique identifier for this email.
     * @return {Promise}
     */
     Status(data) {
        return this._makeCall('/email/status', data, 'POST');
    }

    /**
     * View email
     * @name View
     * @method Email#View
     * @param {Object} data - data object.
     * @param {String} data.messageID - Message identifier
     * @return {Promise}
     */
     View(data) {
        return this._makeCall('/email/view', data, 'POST');
    }
}

/**
* @class Export
* @extends ApiCallAbstarct
*/
class Export extends ApiCallAbstarct {
     /**
     * @constructs Export
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Check the current status of the export.
     * @name CheckStatus
     * @method Export#CheckStatus
     * @param {Object} data - data object.
     * @param {String} data.publicExportID - 
     * @return {Promise}
     */
     CheckStatus(data) {
        return this._makeCall('/export/checkstatus', data, 'POST');
    }

    /**
     * Summary of export type counts.
     * @name CountByType
     * @method Export#CountByType
     * @param {Object} data - data object.

     * @return {Promise}
     */
     CountByType(data) {
        return this._makeCall('/export/countbytype', data, 'POST');
    }

    /**
     * Delete the specified export.
     * @name Delete
     * @method Export#Delete
     * @param {Object} data - data object.
     * @param {String} data.publicExportID - 
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/export/delete', data, 'POST');
    }

    /**
     * Returns a list of all exported data.
     * @name List
     * @method Export#List
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/export/list', data, 'POST');
    }
}

/**
* @class File
* @extends ApiCallAbstarct
*/
class File extends ApiCallAbstarct {
     /**
     * @constructs File
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Permanently deletes the file from your account
     * @name Delete
     * @method File#Delete
     * @param {Object} data - data object.
     * @param {Number} data.fileID - 
     * @param {String} data.filename - Name of your file.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/file/delete', data, 'POST');
    }

    /**
     * Gets content of the chosen File
     * @name Download
     * @method File#Download
     * @param {Object} data - data object.
     * @param {String} data.filename - Name of your file.
     * @param {Number} data.fileID - 
     * @return {Promise}
     */
     Download(data) {
        return this._makeCall('/file/download', data, 'POST');
    }

    /**
     * Lists your available Attachments in the given email
     * @name List
     * @method File#List
     * @param {Object} data - data object.
     * @param {String} data.msgID - ID number of selected message.
     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/file/list', data, 'POST');
    }

    /**
     * Lists all your available files
     * @name ListAll
     * @method File#ListAll
     * @param {Object} data - data object.

     * @return {Promise}
     */
     ListAll(data) {
        return this._makeCall('/file/listall', data, 'POST');
    }

    /**
     * Gets chosen File
     * @name Load
     * @method File#Load
     * @param {Object} data - data object.
     * @param {String} data.filename - Name of your file.
     * @return {Promise}
     */
     Load(data) {
        return this._makeCall('/file/load', data, 'POST');
    }

    /**
     * Uploads selected file to the server using http form upload format (MIME multipart/form-data) or PUT method.
     * @name Upload
     * @method File#Upload
     * @param {Object} data - data object.
     * @param {{content: {Object}, filename: {String}}} data.file - 
     * @param {String} data.name - Filename
     * @param {Number} data.expiresAfterDays - After how many days should the file be deleted.
     * @return {Promise}
     */
     Upload(data) {
        return this._makeCall('/file/upload', data, 'POST');
    }
}

/**
* @class List
* @extends ApiCallAbstarct
*/
class List extends ApiCallAbstarct {
     /**
     * @constructs List
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Create new list, based on filtering rule or list of IDs
     * @name Add
     * @method List#Add
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {Boolean} data.createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @param {Boolean} data.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/list/add', data, 'POST');
    }

    /**
     * Add existing Contacts to chosen list
     * @name AddContacts
     * @method List#AddContacts
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @param {Boolean} data.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @return {Promise}
     */
     AddContacts(data) {
        return this._makeCall('/list/addcontacts', data, 'POST');
    }

    /**
     * Copy your existing List with the option to provide new settings to it. Some fields, when left empty, default to the source list's settings
     * @name Copy
     * @method List#Copy
     * @param {Object} data - data object.
     * @param {String} data.sourceListName - The name of the list you want to copy
     * @param {String} data.newlistName - Name of your list if you want to change it.
     * @param {Boolean} data.createEmptyList - True to create an empty list, otherwise false. Ignores rule and emails parameters if provided.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} data.rule - Query used for filtering.
     * @return {Promise}
     */
     Copy(data) {
        return this._makeCall('/list/copy', data, 'POST');
    }

    /**
     * Create a new list from the recipients of the given campaign, using the given statuses of Messages
     * @name CreateFromCampaign
     * @method List#CreateFromCampaign
     * @param {Object} data - data object.
     * @param {Number} data.campaignID - ID of the campaign which recipients you want to copy
     * @param {String} data.listName - Name of your list.
     * @param {Object} data.statuses - Statuses of a campaign's emails you want to include in the new list (but NOT the contacts' statuses)
     * @return {Promise}
     */
     CreateFromCampaign(data) {
        return this._makeCall('/list/createfromcampaign', data, 'POST');
    }

    /**
     * Create a series of nth selection lists from an existing list or segment
     * @name CreateNthSelectionLists
     * @method List#CreateNthSelectionLists
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {Number} data.numberOfLists - The number of evenly distributed lists to create.
     * @param {Boolean} data.excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} data.rule - Query used for filtering.
     * @param {Boolean} data.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @return {Promise}
     */
     CreateNthSelectionLists(data) {
        return this._makeCall('/list/createnthselectionlists', data, 'POST');
    }

    /**
     * Create a new list with randomized contacts from an existing list or segment
     * @name CreateRandomList
     * @method List#CreateRandomList
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {Number} data.count - Number of items.
     * @param {Boolean} data.excludeBlocked - True if you want to exclude contacts that are currently in a blocked status of either unsubscribe, complaint or bounce. Otherwise, false.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @param {String} data.rule - Query used for filtering.
     * @param {Boolean} data.allContacts - True: Include every Contact in your Account. Otherwise, false
     * @return {Promise}
     */
     CreateRandomList(data) {
        return this._makeCall('/list/createrandomlist', data, 'POST');
    }

    /**
     * Deletes List and removes all the Contacts from it (does not delete Contacts).
     * @name Delete
     * @method List#Delete
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/list/delete', data, 'POST');
    }

    /**
     * Exports all the contacts from the provided list
     * @name Export
     * @method List#Export
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/list/export', data, 'POST');
    }

    /**
     * Shows all your existing lists
     * @name list
     * @method List#list
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     list(data) {
        return this._makeCall('/list/list', data, 'POST');
    }

    /**
     * Returns detailed information about specific list.
     * @name Load
     * @method List#Load
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @return {Promise}
     */
     Load(data) {
        return this._makeCall('/list/load', data, 'POST');
    }

    /**
     * Move selected contacts from one List to another
     * @name MoveContacts
     * @method List#MoveContacts
     * @param {Object} data - data object.
     * @param {String} data.oldListName - The name of the list from which the contacts will be copied from
     * @param {String} data.newListName - The name of the list to copy the contacts to
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @param {Boolean} data.moveAll - TRUE - moves all contacts; FALSE - moves contacts provided in the 'emails' parameter. This is ignored if the 'statuses' parameter has been provided
     * @param {Object} data.statuses - List of contact statuses which are eligible to move. This ignores the 'moveAll' parameter
     * @param {String} data.rule - Query used for filtering.
     * @return {Promise}
     */
     MoveContacts(data) {
        return this._makeCall('/list/movecontacts', data, 'POST');
    }

    /**
     * Remove selected Contacts from your list
     * @name RemoveContacts
     * @method List#RemoveContacts
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {String} data.rule - Query used for filtering.
     * @param {Object} data.emails - Comma delimited list of contact emails
     * @return {Promise}
     */
     RemoveContacts(data) {
        return this._makeCall('/list/removecontacts', data, 'POST');
    }

    /**
     * Update existing list
     * @name Update
     * @method List#Update
     * @param {Object} data - data object.
     * @param {String} data.listName - Name of your list.
     * @param {String} data.newListName - Name of your list if you want to change it.
     * @param {Boolean} data.allowUnsubscribe - True: Allow unsubscribing from this list. Otherwise, false
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/list/update', data, 'POST');
    }
}

/**
* @class Log
* @extends ApiCallAbstarct
*/
class Log extends ApiCallAbstarct {
     /**
     * @constructs Log
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Cancels emails that are waiting to be sent.
     * @name CancelInProgress
     * @method Log#CancelInProgress
     * @param {Object} data - data object.
     * @param {String} data.channelName - Name of selected channel.
     * @param {String} data.transactionID - ID number of transaction
     * @return {Promise}
     */
     CancelInProgress(data) {
        return this._makeCall('/log/cancelinprogress', data, 'POST');
    }

    /**
     * Export email log information to the specified file format.
     * @name Export
     * @method Log#Export
     * @param {Object} data - data object.
     * @param {Object} data.statuses - List of comma separated message statuses: 0 for all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {Date} data.from - Start date.
     * @param {Date} data.to - End date.
     * @param {String} data.channelName - Name of selected channel.
     * @param {Boolean} data.includeEmail - True: Search includes emails. Otherwise, false.
     * @param {Boolean} data.includeSms - True: Search includes SMS. Otherwise, false.
     * @param {Object} data.messageCategory - ID of message category
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @param {String} data.email - Proper email address.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/log/export', data, 'POST');
    }

    /**
     * Export detailed link tracking information to the specified file format.
     * @name ExportLinkTracking
     * @method Log#ExportLinkTracking
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {String} data.channelName - Name of selected channel.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     ExportLinkTracking(data) {
        return this._makeCall('/log/exportlinktracking', data, 'POST');
    }

    /**
     * Track link clicks
     * @name LinkTracking
     * @method Log#LinkTracking
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {String} data.channelName - Name of selected channel.
     * @return {Promise}
     */
     LinkTracking(data) {
        return this._makeCall('/log/linktracking', data, 'POST');
    }

    /**
     * Returns logs filtered by specified parameters.
     * @name Load
     * @method Log#Load
     * @param {Object} data - data object.
     * @param {Object} data.statuses - List of comma separated message statuses: 0 for all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {String} data.channelName - Name of selected channel.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {Boolean} data.includeEmail - True: Search includes emails. Otherwise, false.
     * @param {Boolean} data.includeSms - True: Search includes SMS. Otherwise, false.
     * @param {Object} data.messageCategory - ID of message category
     * @param {String} data.email - Proper email address.
     * @param {Boolean} data.useStatusChangeDate - True, if 'from' and 'to' parameters should resolve to the Status Change date. To resolve to the creation date - false
     * @return {Promise}
     */
     Load(data) {
        return this._makeCall('/log/load', data, 'POST');
    }

    /**
     * Returns notification logs filtered by specified parameters.
     * @name LoadNotifications
     * @method Log#LoadNotifications
     * @param {Object} data - data object.
     * @param {Object} data.statuses - List of comma separated message statuses: 0 for all, 1 for ReadyToSend, 2 for InProgress, 4 for Bounced, 5 for Sent, 6 for Opened, 7 for Clicked, 8 for Unsubscribed, 9 for Abuse Report
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @param {Object} data.messageCategory - ID of message category
     * @param {Boolean} data.useStatusChangeDate - True, if 'from' and 'to' parameters should resolve to the Status Change date. To resolve to the creation date - false
     * @param {NotificationType} data.notificationType - 
     * @return {Promise}
     */
     LoadNotifications(data) {
        return this._makeCall('/log/loadnotifications', data, 'POST');
    }

    /**
     * Retry sending of temporarily not delivered message.
     * @name RetryNow
     * @method Log#RetryNow
     * @param {Object} data - data object.
     * @param {String} data.msgID - ID number of selected message.
     * @return {Promise}
     */
     RetryNow(data) {
        return this._makeCall('/log/retrynow', data, 'POST');
    }

    /**
     * Loads summary information about activity in chosen date range.
     * @name Summary
     * @method Log#Summary
     * @param {Object} data - data object.
     * @param {Date} data.from - Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {String} data.channelName - Name of selected channel.
     * @param {IntervalType} data.interval - 'Hourly' for detailed information, 'summary' for daily overview
     * @param {String} data.transactionID - ID number of transaction
     * @return {Promise}
     */
     Summary(data) {
        return this._makeCall('/log/summary', data, 'POST');
    }
}

/**
* @class Segment
* @extends ApiCallAbstarct
*/
class Segment extends ApiCallAbstarct {
     /**
     * @constructs Segment
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Create new segment, based on specified RULE.
     * @name Add
     * @method Segment#Add
     * @param {Object} data - data object.
     * @param {String} data.segmentName - Name of your segment.
     * @param {String} data.rule - Query used for filtering.
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/segment/add', data, 'POST');
    }

    /**
     * Copy your existing Segment with the optional new rule and custom name
     * @name Copy
     * @method Segment#Copy
     * @param {Object} data - data object.
     * @param {String} data.sourceSegmentName - The name of the segment you want to copy
     * @param {String} data.newSegmentName - New name of your segment if you want to change it.
     * @param {String} data.rule - Query used for filtering.
     * @return {Promise}
     */
     Copy(data) {
        return this._makeCall('/segment/copy', data, 'POST');
    }

    /**
     * Delete existing segment.
     * @name Delete
     * @method Segment#Delete
     * @param {Object} data - data object.
     * @param {String} data.segmentName - Name of your segment.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/segment/delete', data, 'POST');
    }

    /**
     * Exports all the contacts from the provided segment
     * @name Export
     * @method Segment#Export
     * @param {Object} data - data object.
     * @param {String} data.segmentName - Name of your segment.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @param {String} data.fileName - Name of your file.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/segment/export', data, 'POST');
    }

    /**
     * Lists all your available Segments
     * @name List
     * @method Segment#List
     * @param {Object} data - data object.
     * @param {Boolean} data.includeHistory - True: Include history of last 30 days. Otherwise, false.
     * @param {Date} data.from - From what date should the segment history be shown. In YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - To what date should the segment history be shown. In YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/segment/list', data, 'POST');
    }

    /**
     * Lists your available Segments using the provided names
     * @name LoadByName
     * @method Segment#LoadByName
     * @param {Object} data - data object.
     * @param {Object} data.segmentNames - Names of segments you want to load. Will load all contacts if left empty or the 'All Contacts' name has been provided
     * @param {Boolean} data.includeHistory - True: Include history of last 30 days. Otherwise, false.
     * @param {Date} data.from - From what date should the segment history be shown. In YYYY-MM-DDThh:mm:ss format.
     * @param {Date} data.to - To what date should the segment history be shown. In YYYY-MM-DDThh:mm:ss format.
     * @return {Promise}
     */
     LoadByName(data) {
        return this._makeCall('/segment/loadbyname', data, 'POST');
    }

    /**
     * Rename or change RULE for your segment
     * @name Update
     * @method Segment#Update
     * @param {Object} data - data object.
     * @param {String} data.segmentName - Name of your segment.
     * @param {String} data.newSegmentName - New name of your segment if you want to change it.
     * @param {String} data.rule - Query used for filtering.
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/segment/update', data, 'POST');
    }
}

/**
* @class Sms
* @extends ApiCallAbstarct
*/
class Sms extends ApiCallAbstarct {
     /**
     * @constructs Sms
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Send a short SMS Message (maximum of 1600 characters) to any mobile phone.
     * @name Send
     * @method Sms#Send
     * @param {Object} data - data object.
     * @param {String} data.to - Mobile number you want to message. Can be any valid mobile number in E.164 format. To provide the country code you need to provide "+" before the number.  If your URL is not encoded then you need to replace the "+" with "%2B" instead.
     * @param {String} data.body - Body of your message. The maximum body length is 160 characters.  If the message body is greater than 160 characters it is split into multiple messages and you are charged per message for the number of message required to send your length
     * @return {Promise}
     */
     Send(data) {
        return this._makeCall('/sms/send', data, 'POST');
    }
}

/**
* @class Survey
* @extends ApiCallAbstarct
*/
class Survey extends ApiCallAbstarct {
     /**
     * @constructs Survey
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Adds a new survey
     * @name Add
     * @method Survey#Add
     * @param {Object} data - data object.
     * @param {Survey} data.survey - Json representation of a survey
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/survey/add', data, 'POST');
    }

    /**
     * Deletes the survey
     * @name Delete
     * @method Survey#Delete
     * @param {Object} data - data object.
     * @param {String} data.publicSurveyID - Survey identifier
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/survey/delete', data, 'POST');
    }

    /**
     * Export given survey's data to provided format
     * @name Export
     * @method Survey#Export
     * @param {Object} data - data object.
     * @param {String} data.publicSurveyID - Survey identifier
     * @param {String} data.fileName - Name of your file.
     * @param {ExportFileFormats} data.fileFormat - Format of the exported file
     * @param {CompressionFormat} data.compressionFormat - FileResponse compression format. None or Zip.
     * @return {Promise}
     */
     Export(data) {
        return this._makeCall('/survey/export', data, 'POST');
    }

    /**
     * Shows all your existing surveys
     * @name List
     * @method Survey#List
     * @param {Object} data - data object.

     * @return {Promise}
     */
     List(data) {
        return this._makeCall('/survey/list', data, 'POST');
    }

    /**
     * Get list of personal answers for the specific survey
     * @name LoadResponseList
     * @method Survey#LoadResponseList
     * @param {Object} data - data object.
     * @param {String} data.publicSurveyID - Survey identifier
     * @return {Promise}
     */
     LoadResponseList(data) {
        return this._makeCall('/survey/loadresponselist', data, 'POST');
    }

    /**
     * Get general results of the specific survey
     * @name LoadResults
     * @method Survey#LoadResults
     * @param {Object} data - data object.
     * @param {String} data.publicSurveyID - Survey identifier
     * @return {Promise}
     */
     LoadResults(data) {
        return this._makeCall('/survey/loadresults', data, 'POST');
    }

    /**
     * Update the survey information
     * @name Update
     * @method Survey#Update
     * @param {Object} data - data object.
     * @param {Survey} data.survey - Json representation of a survey
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/survey/update', data, 'POST');
    }
}

/**
* @class Template
* @extends ApiCallAbstarct
*/
class Template extends ApiCallAbstarct {
     /**
     * @constructs Template
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Create new Template. Needs to be sent using POST method
     * @name Add
     * @method Template#Add
     * @param {Object} data - data object.
     * @param {String} data.name - Filename
     * @param {String} data.subject - Default subject of email.
     * @param {String} data.fromEmail - Default From: email address.
     * @param {String} data.fromName - Default From: name.
     * @param {TemplateType} data.templateType - 0 for API connections
     * @param {TemplateScope} data.templateScope - Enum: 0 - private, 1 - public, 2 - mockup
     * @param {String} data.bodyHtml - HTML code of email (needs escaping).
     * @param {String} data.bodyText - Text body of email.
     * @param {String} data.css - CSS style
     * @param {Number} data.originalTemplateID - ID number of original template.
     * @return {Promise}
     */
     Add(data) {
        return this._makeCall('/template/add', data, 'POST');
    }

    /**
     * Check if template is used by campaign.
     * @name CheckUsage
     * @method Template#CheckUsage
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @return {Promise}
     */
     CheckUsage(data) {
        return this._makeCall('/template/checkusage', data, 'POST');
    }

    /**
     * Copy Selected Template
     * @name Copy
     * @method Template#Copy
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @param {String} data.name - Filename
     * @param {String} data.subject - Default subject of email.
     * @param {String} data.fromEmail - Default From: email address.
     * @param {String} data.fromName - Default From: name.
     * @return {Promise}
     */
     Copy(data) {
        return this._makeCall('/template/copy', data, 'POST');
    }

    /**
     * Delete template with the specified ID
     * @name Delete
     * @method Template#Delete
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @return {Promise}
     */
     Delete(data) {
        return this._makeCall('/template/delete', data, 'POST');
    }

    /**
     * Search for references to images and replaces them with base64 code.
     * @name GetEmbeddedHtml
     * @method Template#GetEmbeddedHtml
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @return {Promise}
     */
     GetEmbeddedHtml(data) {
        return this._makeCall('/template/getembeddedhtml', data, 'POST');
    }

    /**
     * Lists your templates
     * @name GetList
     * @method Template#GetList
     * @param {Object} data - data object.
     * @param {Number} data.limit - Maximum of loaded items.
     * @param {Number} data.offset - How many items should be loaded ahead.
     * @return {Promise}
     */
     GetList(data) {
        return this._makeCall('/template/getlist', data, 'POST');
    }

    /**
     * Load template with content
     * @name LoadTemplate
     * @method Template#LoadTemplate
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @param {Boolean} data.ispublic - 
     * @return {Promise}
     */
     LoadTemplate(data) {
        return this._makeCall('/template/loadtemplate', data, 'POST');
    }

    /**
     * Removes previously generated screenshot of template
     * @name RemoveScreenshot
     * @method Template#RemoveScreenshot
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @return {Promise}
     */
     RemoveScreenshot(data) {
        return this._makeCall('/template/removescreenshot', data, 'POST');
    }

    /**
     * Saves screenshot of chosen Template
     * @name SaveScreenshot
     * @method Template#SaveScreenshot
     * @param {Object} data - data object.
     * @param {String} data.base64Image - Image, base64 coded.
     * @param {Number} data.templateID - ID number of template.
     * @return {Promise}
     */
     SaveScreenshot(data) {
        return this._makeCall('/template/savescreenshot', data, 'POST');
    }

    /**
     * Update existing template, overwriting existing data. Needs to be sent using POST method.
     * @name Update
     * @method Template#Update
     * @param {Object} data - data object.
     * @param {Number} data.templateID - ID number of template.
     * @param {TemplateScope} data.templateScope - Enum: 0 - private, 1 - public, 2 - mockup
     * @param {String} data.name - Filename
     * @param {String} data.subject - Default subject of email.
     * @param {String} data.fromEmail - Default From: email address.
     * @param {String} data.fromName - Default From: name.
     * @param {String} data.bodyHtml - HTML code of email (needs escaping).
     * @param {String} data.bodyText - Text body of email.
     * @param {String} data.css - CSS style
     * @param {Boolean} data.removeScreenshot - 
     * @return {Promise}
     */
     Update(data) {
        return this._makeCall('/template/update', data, 'POST');
    }
}
