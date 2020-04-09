'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EEAPI = function EEAPI(options) {
    _classCallCheck(this, EEAPI);

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
    this.Template = new Template(options);
    this.Validemail = new Validemail(options);
};

var client = exports.client = EEAPI;
exports.default = EEAPI;

var ApiCallAbstarct = function ApiCallAbstarct(options) {
    _classCallCheck(this, ApiCallAbstarct);

    this._makeCall = function (method, data, methodType) {
        if (!(0, _lodash.includes)(['POST', 'GET'], methodType.toUpperCase())) {
            console.error('makeCall: unsupported method type: ' + methodType);
            return;
        }

        if (!(0, _lodash.isObject)(data)) {
            data = {};
        }

        data.apikey = options.apiKey;

        var form = new _formData2.default();
        var headers = form.getHeaders();

        (0, _lodash.forEach)(data, function (val, index) {
            form.append(index, val);
        });

        return (0, _axios2.default)({
            method: methodType,
            url: options.apiUri + options.apiVersion + method,
            data: form,
            headers: headers
        }).then(function (resp) {
            if (!resp.data.success) {
                throw resp.error;
            }
            return resp.data;
        });
    };
};

var Accesstoken = function (_ApiCallAbstarct) {
    _inherits(Accesstoken, _ApiCallAbstarct);

    function Accesstoken(opt) {
        _classCallCheck(this, Accesstoken);

        return _possibleConstructorReturn(this, (Accesstoken.__proto__ || Object.getPrototypeOf(Accesstoken)).call(this, opt));
    }

    _createClass(Accesstoken, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/accesstoken/add', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/accesstoken/delete', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/accesstoken/list', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/accesstoken/update', data, 'POST');
        }
    }]);

    return Accesstoken;
}(ApiCallAbstarct);

var Account = function (_ApiCallAbstarct2) {
    _inherits(Account, _ApiCallAbstarct2);

    function Account(opt) {
        _classCallCheck(this, Account);

        return _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, opt));
    }

    _createClass(Account, [{
        key: 'AddDedicatedSupport',
        value: function AddDedicatedSupport(data) {
            return this._makeCall('/account/adddedicatedsupport', data, 'POST');
        }
    }, {
        key: 'AddSubAccount',
        value: function AddSubAccount(data) {
            return this._makeCall('/account/addsubaccount', data, 'POST');
        }
    }, {
        key: 'AddSubAccountCredits',
        value: function AddSubAccountCredits(data) {
            return this._makeCall('/account/addsubaccountcredits', data, 'POST');
        }
    }, {
        key: 'AddWebhook',
        value: function AddWebhook(data) {
            return this._makeCall('/account/addwebhook', data, 'POST');
        }
    }, {
        key: 'ChangeEmail',
        value: function ChangeEmail(data) {
            return this._makeCall('/account/changeemail', data, 'POST');
        }
    }, {
        key: 'ChangePassword',
        value: function ChangePassword(data) {
            return this._makeCall('/account/changepassword', data, 'POST');
        }
    }, {
        key: 'ChangeSubAccountPassword',
        value: function ChangeSubAccountPassword(data) {
            return this._makeCall('/account/changesubaccountpassword', data, 'POST');
        }
    }, {
        key: 'DeleteSubAccount',
        value: function DeleteSubAccount(data) {
            return this._makeCall('/account/deletesubaccount', data, 'POST');
        }
    }, {
        key: 'DeleteWebhook',
        value: function DeleteWebhook(data) {
            return this._makeCall('/account/deletewebhook', data, 'POST');
        }
    }, {
        key: 'GetSubAccountApiKey',
        value: function GetSubAccountApiKey(data) {
            return this._makeCall('/account/getsubaccountapikey', data, 'POST');
        }
    }, {
        key: 'GetSubAccountList',
        value: function GetSubAccountList(data) {
            return this._makeCall('/account/getsubaccountlist', data, 'POST');
        }
    }, {
        key: 'Load',
        value: function Load(data) {
            return this._makeCall('/account/load', data, 'POST');
        }
    }, {
        key: 'LoadAdvancedOptions',
        value: function LoadAdvancedOptions(data) {
            return this._makeCall('/account/loadadvancedoptions', data, 'POST');
        }
    }, {
        key: 'LoadEmailCreditsHistory',
        value: function LoadEmailCreditsHistory(data) {
            return this._makeCall('/account/loademailcreditshistory', data, 'POST');
        }
    }, {
        key: 'LoadInboundOptions',
        value: function LoadInboundOptions(data) {
            return this._makeCall('/account/loadinboundoptions', data, 'POST');
        }
    }, {
        key: 'LoadPaymentHistory',
        value: function LoadPaymentHistory(data) {
            return this._makeCall('/account/loadpaymenthistory', data, 'POST');
        }
    }, {
        key: 'LoadPayoutHistory',
        value: function LoadPayoutHistory(data) {
            return this._makeCall('/account/loadpayouthistory', data, 'POST');
        }
    }, {
        key: 'LoadReferralDetails',
        value: function LoadReferralDetails(data) {
            return this._makeCall('/account/loadreferraldetails', data, 'POST');
        }
    }, {
        key: 'LoadReputationHistory',
        value: function LoadReputationHistory(data) {
            return this._makeCall('/account/loadreputationhistory', data, 'POST');
        }
    }, {
        key: 'LoadReputationImpact',
        value: function LoadReputationImpact(data) {
            return this._makeCall('/account/loadreputationimpact', data, 'POST');
        }
    }, {
        key: 'LoadSpamCheck',
        value: function LoadSpamCheck(data) {
            return this._makeCall('/account/loadspamcheck', data, 'POST');
        }
    }, {
        key: 'LoadSubAccountsEmailCreditsHistory',
        value: function LoadSubAccountsEmailCreditsHistory(data) {
            return this._makeCall('/account/loadsubaccountsemailcreditshistory', data, 'POST');
        }
    }, {
        key: 'LoadSubAccountSettings',
        value: function LoadSubAccountSettings(data) {
            return this._makeCall('/account/loadsubaccountsettings', data, 'POST');
        }
    }, {
        key: 'LoadUsage',
        value: function LoadUsage(data) {
            return this._makeCall('/account/loadusage', data, 'POST');
        }
    }, {
        key: 'LoadWebhook',
        value: function LoadWebhook(data) {
            return this._makeCall('/account/loadwebhook', data, 'POST');
        }
    }, {
        key: 'LoadWebNotificationOptions',
        value: function LoadWebNotificationOptions(data) {
            return this._makeCall('/account/loadwebnotificationoptions', data, 'POST');
        }
    }, {
        key: 'Overview',
        value: function Overview(data) {
            return this._makeCall('/account/overview', data, 'POST');
        }
    }, {
        key: 'ProfileOverview',
        value: function ProfileOverview(data) {
            return this._makeCall('/account/profileoverview', data, 'POST');
        }
    }, {
        key: 'RemoveSubAccountCredits',
        value: function RemoveSubAccountCredits(data) {
            return this._makeCall('/account/removesubaccountcredits', data, 'POST');
        }
    }, {
        key: 'RequestNewApiKey',
        value: function RequestNewApiKey(data) {
            return this._makeCall('/account/requestnewapikey', data, 'POST');
        }
    }, {
        key: 'RequestPrivateIP',
        value: function RequestPrivateIP(data) {
            return this._makeCall('/account/requestprivateip', data, 'POST');
        }
    }, {
        key: 'UpdateAdvancedOptions',
        value: function UpdateAdvancedOptions(data) {
            return this._makeCall('/account/updateadvancedoptions', data, 'POST');
        }
    }, {
        key: 'UpdateCustomBranding',
        value: function UpdateCustomBranding(data) {
            return this._makeCall('/account/updatecustombranding', data, 'POST');
        }
    }, {
        key: 'UpdateInboundNotifications',
        value: function UpdateInboundNotifications(data) {
            return this._makeCall('/account/updateinboundnotifications', data, 'POST');
        }
    }, {
        key: 'UpdateProfile',
        value: function UpdateProfile(data) {
            return this._makeCall('/account/updateprofile', data, 'POST');
        }
    }, {
        key: 'UpdateSubAccountSettings',
        value: function UpdateSubAccountSettings(data) {
            return this._makeCall('/account/updatesubaccountsettings', data, 'POST');
        }
    }, {
        key: 'UpdateWebhook',
        value: function UpdateWebhook(data) {
            return this._makeCall('/account/updatewebhook', data, 'POST');
        }
    }]);

    return Account;
}(ApiCallAbstarct);

var Campaign = function (_ApiCallAbstarct3) {
    _inherits(Campaign, _ApiCallAbstarct3);

    function Campaign(opt) {
        _classCallCheck(this, Campaign);

        return _possibleConstructorReturn(this, (Campaign.__proto__ || Object.getPrototypeOf(Campaign)).call(this, opt));
    }

    _createClass(Campaign, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/campaign/add', data, 'POST');
        }
    }, {
        key: 'Copy',
        value: function Copy(data) {
            return this._makeCall('/campaign/copy', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/campaign/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/campaign/export', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/campaign/list', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/campaign/update', data, 'POST');
        }
    }]);

    return Campaign;
}(ApiCallAbstarct);

var Channel = function (_ApiCallAbstarct4) {
    _inherits(Channel, _ApiCallAbstarct4);

    function Channel(opt) {
        _classCallCheck(this, Channel);

        return _possibleConstructorReturn(this, (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, opt));
    }

    _createClass(Channel, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/channel/add', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/channel/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/channel/export', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/channel/list', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/channel/update', data, 'POST');
        }
    }]);

    return Channel;
}(ApiCallAbstarct);

var Contact = function (_ApiCallAbstarct5) {
    _inherits(Contact, _ApiCallAbstarct5);

    function Contact(opt) {
        _classCallCheck(this, Contact);

        return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, opt));
    }

    _createClass(Contact, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/contact/add', data, 'POST');
        }
    }, {
        key: 'AddBlocked',
        value: function AddBlocked(data) {
            return this._makeCall('/contact/addblocked', data, 'POST');
        }
    }, {
        key: 'ChangeProperty',
        value: function ChangeProperty(data) {
            return this._makeCall('/contact/changeproperty', data, 'POST');
        }
    }, {
        key: 'ChangeStatus',
        value: function ChangeStatus(data) {
            return this._makeCall('/contact/changestatus', data, 'POST');
        }
    }, {
        key: 'Count',
        value: function Count(data) {
            return this._makeCall('/contact/count', data, 'POST');
        }
    }, {
        key: 'CountByStatus',
        value: function CountByStatus(data) {
            return this._makeCall('/contact/countbystatus', data, 'POST');
        }
    }, {
        key: 'CountByUnsubscribeReason',
        value: function CountByUnsubscribeReason(data) {
            return this._makeCall('/contact/countbyunsubscribereason', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/contact/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/contact/export', data, 'POST');
        }
    }, {
        key: 'ExportUnsubscribeReasonCount',
        value: function ExportUnsubscribeReasonCount(data) {
            return this._makeCall('/contact/exportunsubscribereasoncount', data, 'POST');
        }
    }, {
        key: 'FindContact',
        value: function FindContact(data) {
            return this._makeCall('/contact/findcontact', data, 'POST');
        }
    }, {
        key: 'GetContactsByList',
        value: function GetContactsByList(data) {
            return this._makeCall('/contact/getcontactsbylist', data, 'POST');
        }
    }, {
        key: 'GetContactsBySegment',
        value: function GetContactsBySegment(data) {
            return this._makeCall('/contact/getcontactsbysegment', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/contact/list', data, 'POST');
        }
    }, {
        key: 'LoadBlocked',
        value: function LoadBlocked(data) {
            return this._makeCall('/contact/loadblocked', data, 'POST');
        }
    }, {
        key: 'LoadContact',
        value: function LoadContact(data) {
            return this._makeCall('/contact/loadcontact', data, 'POST');
        }
    }, {
        key: 'LoadHistory',
        value: function LoadHistory(data) {
            return this._makeCall('/contact/loadhistory', data, 'POST');
        }
    }, {
        key: 'QuickAdd',
        value: function QuickAdd(data) {
            return this._makeCall('/contact/quickadd', data, 'POST');
        }
    }, {
        key: 'Subscribe',
        value: function Subscribe(data) {
            return this._makeCall('/contact/subscribe', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/contact/update', data, 'POST');
        }
    }, {
        key: 'Upload',
        value: function Upload(data) {
            return this._makeCall('/contact/upload', data, 'POST');
        }
    }]);

    return Contact;
}(ApiCallAbstarct);

var Domain = function (_ApiCallAbstarct6) {
    _inherits(Domain, _ApiCallAbstarct6);

    function Domain(opt) {
        _classCallCheck(this, Domain);

        return _possibleConstructorReturn(this, (Domain.__proto__ || Object.getPrototypeOf(Domain)).call(this, opt));
    }

    _createClass(Domain, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/domain/add', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/domain/delete', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/domain/list', data, 'POST');
        }
    }, {
        key: 'SetDefault',
        value: function SetDefault(data) {
            return this._makeCall('/domain/setdefault', data, 'POST');
        }
    }, {
        key: 'SetVerp',
        value: function SetVerp(data) {
            return this._makeCall('/domain/setverp', data, 'POST');
        }
    }, {
        key: 'VerifyDkim',
        value: function VerifyDkim(data) {
            return this._makeCall('/domain/verifydkim', data, 'POST');
        }
    }, {
        key: 'VerifyMX',
        value: function VerifyMX(data) {
            return this._makeCall('/domain/verifymx', data, 'POST');
        }
    }, {
        key: 'VerifySpf',
        value: function VerifySpf(data) {
            return this._makeCall('/domain/verifyspf', data, 'POST');
        }
    }, {
        key: 'VerifyTracking',
        value: function VerifyTracking(data) {
            return this._makeCall('/domain/verifytracking', data, 'POST');
        }
    }]);

    return Domain;
}(ApiCallAbstarct);

var Email = function (_ApiCallAbstarct7) {
    _inherits(Email, _ApiCallAbstarct7);

    function Email(opt) {
        _classCallCheck(this, Email);

        return _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, opt));
    }

    _createClass(Email, [{
        key: 'GetStatus',
        value: function GetStatus(data) {
            return this._makeCall('/email/getstatus', data, 'POST');
        }
    }, {
        key: 'ListAttachments',
        value: function ListAttachments(data) {
            return this._makeCall('/email/listattachments', data, 'POST');
        }
    }, {
        key: 'Send',
        value: function Send(data) {
            return this._makeCall('/email/send', data, 'POST');
        }
    }, {
        key: 'Status',
        value: function Status(data) {
            return this._makeCall('/email/status', data, 'POST');
        }
    }, {
        key: 'VerificationResult',
        value: function VerificationResult(data) {
            return this._makeCall('/email/verificationresult', data, 'POST');
        }
    }, {
        key: 'Verify',
        value: function Verify(data) {
            return this._makeCall('/email/verify', data, 'POST');
        }
    }, {
        key: 'VerifyList',
        value: function VerifyList(data) {
            return this._makeCall('/email/verifylist', data, 'POST');
        }
    }, {
        key: 'View',
        value: function View(data) {
            return this._makeCall('/email/view', data, 'POST');
        }
    }]);

    return Email;
}(ApiCallAbstarct);

var Export = function (_ApiCallAbstarct8) {
    _inherits(Export, _ApiCallAbstarct8);

    function Export(opt) {
        _classCallCheck(this, Export);

        return _possibleConstructorReturn(this, (Export.__proto__ || Object.getPrototypeOf(Export)).call(this, opt));
    }

    _createClass(Export, [{
        key: 'CheckStatus',
        value: function CheckStatus(data) {
            return this._makeCall('/export/checkstatus', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/export/delete', data, 'POST');
        }
    }, {
        key: 'DownloadBulk',
        value: function DownloadBulk(data) {
            return this._makeCall('/export/downloadbulk', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/export/list', data, 'POST');
        }
    }]);

    return Export;
}(ApiCallAbstarct);

var File = function (_ApiCallAbstarct9) {
    _inherits(File, _ApiCallAbstarct9);

    function File(opt) {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, opt));
    }

    _createClass(File, [{
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/file/delete', data, 'POST');
        }
    }, {
        key: 'Download',
        value: function Download(data) {
            return this._makeCall('/file/download', data, 'POST');
        }
    }, {
        key: 'ListAll',
        value: function ListAll(data) {
            return this._makeCall('/file/listall', data, 'POST');
        }
    }, {
        key: 'Load',
        value: function Load(data) {
            return this._makeCall('/file/load', data, 'POST');
        }
    }, {
        key: 'Upload',
        value: function Upload(data) {
            return this._makeCall('/file/upload', data, 'POST');
        }
    }]);

    return File;
}(ApiCallAbstarct);

var List = function (_ApiCallAbstarct10) {
    _inherits(List, _ApiCallAbstarct10);

    function List(opt) {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, opt));
    }

    _createClass(List, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/list/add', data, 'POST');
        }
    }, {
        key: 'AddContacts',
        value: function AddContacts(data) {
            return this._makeCall('/list/addcontacts', data, 'POST');
        }
    }, {
        key: 'Copy',
        value: function Copy(data) {
            return this._makeCall('/list/copy', data, 'POST');
        }
    }, {
        key: 'CreateFromCampaign',
        value: function CreateFromCampaign(data) {
            return this._makeCall('/list/createfromcampaign', data, 'POST');
        }
    }, {
        key: 'CreateNthSelectionLists',
        value: function CreateNthSelectionLists(data) {
            return this._makeCall('/list/createnthselectionlists', data, 'POST');
        }
    }, {
        key: 'CreateRandomList',
        value: function CreateRandomList(data) {
            return this._makeCall('/list/createrandomlist', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/list/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/list/export', data, 'POST');
        }
    }, {
        key: 'list',
        value: function list(data) {
            return this._makeCall('/list/list', data, 'POST');
        }
    }, {
        key: 'Load',
        value: function Load(data) {
            return this._makeCall('/list/load', data, 'POST');
        }
    }, {
        key: 'MoveContacts',
        value: function MoveContacts(data) {
            return this._makeCall('/list/movecontacts', data, 'POST');
        }
    }, {
        key: 'RemoveContacts',
        value: function RemoveContacts(data) {
            return this._makeCall('/list/removecontacts', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/list/update', data, 'POST');
        }
    }]);

    return List;
}(ApiCallAbstarct);

var Log = function (_ApiCallAbstarct11) {
    _inherits(Log, _ApiCallAbstarct11);

    function Log(opt) {
        _classCallCheck(this, Log);

        return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, opt));
    }

    _createClass(Log, [{
        key: 'CancelInProgress',
        value: function CancelInProgress(data) {
            return this._makeCall('/log/cancelinprogress', data, 'POST');
        }
    }, {
        key: 'Events',
        value: function Events(data) {
            return this._makeCall('/log/events', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/log/export', data, 'POST');
        }
    }, {
        key: 'ExportEvents',
        value: function ExportEvents(data) {
            return this._makeCall('/log/exportevents', data, 'POST');
        }
    }, {
        key: 'ExportLinkTracking',
        value: function ExportLinkTracking(data) {
            return this._makeCall('/log/exportlinktracking', data, 'POST');
        }
    }, {
        key: 'LinkTracking',
        value: function LinkTracking(data) {
            return this._makeCall('/log/linktracking', data, 'POST');
        }
    }, {
        key: 'Load',
        value: function Load(data) {
            return this._makeCall('/log/load', data, 'POST');
        }
    }, {
        key: 'LoadNotifications',
        value: function LoadNotifications(data) {
            return this._makeCall('/log/loadnotifications', data, 'POST');
        }
    }, {
        key: 'Summary',
        value: function Summary(data) {
            return this._makeCall('/log/summary', data, 'POST');
        }
    }]);

    return Log;
}(ApiCallAbstarct);

var Segment = function (_ApiCallAbstarct12) {
    _inherits(Segment, _ApiCallAbstarct12);

    function Segment(opt) {
        _classCallCheck(this, Segment);

        return _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this, opt));
    }

    _createClass(Segment, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/segment/add', data, 'POST');
        }
    }, {
        key: 'Copy',
        value: function Copy(data) {
            return this._makeCall('/segment/copy', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/segment/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/segment/export', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/segment/list', data, 'POST');
        }
    }, {
        key: 'LoadByName',
        value: function LoadByName(data) {
            return this._makeCall('/segment/loadbyname', data, 'POST');
        }
    }, {
        key: 'LoadTrackedHistory',
        value: function LoadTrackedHistory(data) {
            return this._makeCall('/segment/loadtrackedhistory', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/segment/update', data, 'POST');
        }
    }]);

    return Segment;
}(ApiCallAbstarct);

var Sms = function (_ApiCallAbstarct13) {
    _inherits(Sms, _ApiCallAbstarct13);

    function Sms(opt) {
        _classCallCheck(this, Sms);

        return _possibleConstructorReturn(this, (Sms.__proto__ || Object.getPrototypeOf(Sms)).call(this, opt));
    }

    _createClass(Sms, [{
        key: 'Send',
        value: function Send(data) {
            return this._makeCall('/sms/send', data, 'POST');
        }
    }]);

    return Sms;
}(ApiCallAbstarct);

var Template = function (_ApiCallAbstarct14) {
    _inherits(Template, _ApiCallAbstarct14);

    function Template(opt) {
        _classCallCheck(this, Template);

        return _possibleConstructorReturn(this, (Template.__proto__ || Object.getPrototypeOf(Template)).call(this, opt));
    }

    _createClass(Template, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/template/add', data, 'POST');
        }
    }, {
        key: 'AddTag',
        value: function AddTag(data) {
            return this._makeCall('/template/addtag', data, 'POST');
        }
    }, {
        key: 'Copy',
        value: function Copy(data) {
            return this._makeCall('/template/copy', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/template/delete', data, 'POST');
        }
    }, {
        key: 'DeleteBulk',
        value: function DeleteBulk(data) {
            return this._makeCall('/template/deletebulk', data, 'POST');
        }
    }, {
        key: 'DeleteTag',
        value: function DeleteTag(data) {
            return this._makeCall('/template/deletetag', data, 'POST');
        }
    }, {
        key: 'GetList',
        value: function GetList(data) {
            return this._makeCall('/template/getlist', data, 'POST');
        }
    }, {
        key: 'GetTagList',
        value: function GetTagList(data) {
            return this._makeCall('/template/gettaglist', data, 'POST');
        }
    }, {
        key: 'IsUsedByCampaign',
        value: function IsUsedByCampaign(data) {
            return this._makeCall('/template/isusedbycampaign', data, 'POST');
        }
    }, {
        key: 'LoadTemplate',
        value: function LoadTemplate(data) {
            return this._makeCall('/template/loadtemplate', data, 'POST');
        }
    }, {
        key: 'ReadRssFeed',
        value: function ReadRssFeed(data) {
            return this._makeCall('/template/readrssfeed', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/template/update', data, 'POST');
        }
    }, {
        key: 'UpdateDefaultOptions',
        value: function UpdateDefaultOptions(data) {
            return this._makeCall('/template/updatedefaultoptions', data, 'POST');
        }
    }]);

    return Template;
}(ApiCallAbstarct);

var Validemail = function (_ApiCallAbstarct15) {
    _inherits(Validemail, _ApiCallAbstarct15);

    function Validemail(opt) {
        _classCallCheck(this, Validemail);

        return _possibleConstructorReturn(this, (Validemail.__proto__ || Object.getPrototypeOf(Validemail)).call(this, opt));
    }

    _createClass(Validemail, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/validemail/add', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/validemail/list', data, 'POST');
        }
    }, {
        key: 'Remove',
        value: function Remove(data) {
            return this._makeCall('/validemail/remove', data, 'POST');
        }
    }, {
        key: 'ResendEmailVerification',
        value: function ResendEmailVerification(data) {
            return this._makeCall('/validemail/resendemailverification', data, 'POST');
        }
    }]);

    return Validemail;
}(ApiCallAbstarct);
//# sourceMappingURL=ElasticEmailClient.js.map
