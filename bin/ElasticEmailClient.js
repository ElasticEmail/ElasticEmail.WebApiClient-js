(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EEAPI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.client = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var EEAPI = function EEAPI(options) {
    _classCallCheck(this, EEAPI);

    if (!options.apiUri || !options.apiVersion || !options.apiKey) {
        console.error('Missing mandatory options!');
        return;
    }

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
};

var client = exports.client = EEAPI;

var ApiCallAbstarct = function ApiCallAbstarct(options) {
    _classCallCheck(this, ApiCallAbstarct);

    this._makeCall = function (method, data, methodType) {
        if (!(0, _lodash2.default)(['POST', 'GET'], methodType.toUpperCase())) {
            console.error('makeCall: unsupported method type: ' + methodType);
            return;
        }

        if (!(0, _lodash4.default)(data)) {
            data = {};
        }

        data.apikey = options.apiKey;

        var params = {
            url: options.apiUri + options.apiVersion + method,
            type: 'json',
            method: methodType,
            data: data
        };

        return (0, _reqwest2.default)(params).then(function (resp) {
            if (!resp.success) {
                throw resp.error;
            }
            return resp;
        });
    };
};

var Account = function (_ApiCallAbstarct) {
    _inherits(Account, _ApiCallAbstarct);

    function Account(opt) {
        _classCallCheck(this, Account);

        return _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, opt));
    }

    _createClass(Account, [{
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
        key: 'DeleteSubAccount',
        value: function DeleteSubAccount(data) {
            return this._makeCall('/account/deletesubaccount', data, 'POST');
        }
    }, {
        key: 'GetAccountAbilityToSendEmail',
        value: function GetAccountAbilityToSendEmail(data) {
            return this._makeCall('/account/getaccountabilitytosendemail', data, 'POST');
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
        key: 'LoadLitmusCreditsHistory',
        value: function LoadLitmusCreditsHistory(data) {
            return this._makeCall('/account/loadlitmuscreditshistory', data, 'POST');
        }
    }, {
        key: 'LoadNotificationQueue',
        value: function LoadNotificationQueue(data) {
            return this._makeCall('/account/loadnotificationqueue', data, 'POST');
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
        key: 'LoadSubAccountsLitmusCreditsHistory',
        value: function LoadSubAccountsLitmusCreditsHistory(data) {
            return this._makeCall('/account/loadsubaccountslitmuscreditshistory', data, 'POST');
        }
    }, {
        key: 'LoadUsage',
        value: function LoadUsage(data) {
            return this._makeCall('/account/loadusage', data, 'POST');
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
        key: 'RequestPremiumSupport',
        value: function RequestPremiumSupport(data) {
            return this._makeCall('/account/requestpremiumsupport', data, 'POST');
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
        key: 'UpdateHttpNotification',
        value: function UpdateHttpNotification(data) {
            return this._makeCall('/account/updatehttpnotification', data, 'POST');
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
    }]);

    return Account;
}(ApiCallAbstarct);

var Campaign = function (_ApiCallAbstarct2) {
    _inherits(Campaign, _ApiCallAbstarct2);

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

var Channel = function (_ApiCallAbstarct3) {
    _inherits(Channel, _ApiCallAbstarct3);

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
        key: 'ExportCsv',
        value: function ExportCsv(data) {
            return this._makeCall('/channel/exportcsv', data, 'POST');
        }
    }, {
        key: 'ExportJson',
        value: function ExportJson(data) {
            return this._makeCall('/channel/exportjson', data, 'POST');
        }
    }, {
        key: 'ExportXml',
        value: function ExportXml(data) {
            return this._makeCall('/channel/exportxml', data, 'POST');
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

var Contact = function (_ApiCallAbstarct4) {
    _inherits(Contact, _ApiCallAbstarct4);

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

var Domain = function (_ApiCallAbstarct5) {
    _inherits(Domain, _ApiCallAbstarct5);

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

var Email = function (_ApiCallAbstarct6) {
    _inherits(Email, _ApiCallAbstarct6);

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
        key: 'View',
        value: function View(data) {
            return this._makeCall('/email/view', data, 'POST');
        }
    }]);

    return Email;
}(ApiCallAbstarct);

var Export = function (_ApiCallAbstarct7) {
    _inherits(Export, _ApiCallAbstarct7);

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
        key: 'CountByType',
        value: function CountByType(data) {
            return this._makeCall('/export/countbytype', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/export/delete', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/export/list', data, 'POST');
        }
    }]);

    return Export;
}(ApiCallAbstarct);

var File = function (_ApiCallAbstarct8) {
    _inherits(File, _ApiCallAbstarct8);

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
        key: 'List',
        value: function List(data) {
            return this._makeCall('/file/list', data, 'POST');
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

var List = function (_ApiCallAbstarct9) {
    _inherits(List, _ApiCallAbstarct9);

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

var Log = function (_ApiCallAbstarct10) {
    _inherits(Log, _ApiCallAbstarct10);

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
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/log/export', data, 'POST');
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
        key: 'RetryNow',
        value: function RetryNow(data) {
            return this._makeCall('/log/retrynow', data, 'POST');
        }
    }, {
        key: 'Summary',
        value: function Summary(data) {
            return this._makeCall('/log/summary', data, 'POST');
        }
    }]);

    return Log;
}(ApiCallAbstarct);

var Segment = function (_ApiCallAbstarct11) {
    _inherits(Segment, _ApiCallAbstarct11);

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
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/segment/update', data, 'POST');
        }
    }]);

    return Segment;
}(ApiCallAbstarct);

var Sms = function (_ApiCallAbstarct12) {
    _inherits(Sms, _ApiCallAbstarct12);

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

var Survey = function (_ApiCallAbstarct13) {
    _inherits(Survey, _ApiCallAbstarct13);

    function Survey(opt) {
        _classCallCheck(this, Survey);

        return _possibleConstructorReturn(this, (Survey.__proto__ || Object.getPrototypeOf(Survey)).call(this, opt));
    }

    _createClass(Survey, [{
        key: 'Add',
        value: function Add(data) {
            return this._makeCall('/survey/add', data, 'POST');
        }
    }, {
        key: 'Delete',
        value: function Delete(data) {
            return this._makeCall('/survey/delete', data, 'POST');
        }
    }, {
        key: 'Export',
        value: function Export(data) {
            return this._makeCall('/survey/export', data, 'POST');
        }
    }, {
        key: 'List',
        value: function List(data) {
            return this._makeCall('/survey/list', data, 'POST');
        }
    }, {
        key: 'LoadResponseList',
        value: function LoadResponseList(data) {
            return this._makeCall('/survey/loadresponselist', data, 'POST');
        }
    }, {
        key: 'LoadResults',
        value: function LoadResults(data) {
            return this._makeCall('/survey/loadresults', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/survey/update', data, 'POST');
        }
    }]);

    return Survey;
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
        key: 'CheckUsage',
        value: function CheckUsage(data) {
            return this._makeCall('/template/checkusage', data, 'POST');
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
        key: 'GetEmbeddedHtml',
        value: function GetEmbeddedHtml(data) {
            return this._makeCall('/template/getembeddedhtml', data, 'POST');
        }
    }, {
        key: 'GetList',
        value: function GetList(data) {
            return this._makeCall('/template/getlist', data, 'POST');
        }
    }, {
        key: 'LoadTemplate',
        value: function LoadTemplate(data) {
            return this._makeCall('/template/loadtemplate', data, 'POST');
        }
    }, {
        key: 'RemoveScreenshot',
        value: function RemoveScreenshot(data) {
            return this._makeCall('/template/removescreenshot', data, 'POST');
        }
    }, {
        key: 'SaveScreenshot',
        value: function SaveScreenshot(data) {
            return this._makeCall('/template/savescreenshot', data, 'POST');
        }
    }, {
        key: 'Update',
        value: function Update(data) {
            return this._makeCall('/template/update', data, 'POST');
        }
    }]);

    return Template;
}(ApiCallAbstarct);

},{"lodash.includes":3,"lodash.isobject":4,"reqwest":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = includes;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],5:[function(require,module,exports){
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2015
  * https://github.com/ded/reqwest
  */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
}('reqwest', this, function () {

  var context = this

  if ('window' in context) {
    var doc = document
      , byTag = 'getElementsByTagName'
      , head = doc[byTag]('head')[0]
  } else {
    var XHR2
    try {
      XHR2 = require('xhr2')
    } catch (ex) {
      throw new Error('Peer dependency `xhr2` required! Please npm install xhr2')
    }
  }


  var httpsRe = /^http/
    , protocolRe = /(^\w+):\/\//
    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , uniqid = 0
    , callbackPrefix = 'reqwest_' + (+new Date())
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , xDomainRequest = 'XDomainRequest'
    , noop = function () {}

    , isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          }

    , defaultHeaders = {
          'contentType': 'application/x-www-form-urlencoded'
        , 'requestedWith': xmlHttpRequest
        , 'accept': {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , 'xml':  'application/xml, text/xml'
            , 'html': 'text/html'
            , 'text': 'text/plain'
            , 'json': 'application/json, text/javascript'
            , 'js':   'application/javascript, text/javascript'
          }
      }

    , xhr = function(o) {
        // is it x-domain
        if (o['crossOrigin'] === true) {
          var xhr = context[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (context[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (context[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else if (XHR2) {
          return new XHR2()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      }
    , globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      }

  function succeed(r) {
    var protocol = protocolRe.exec(r.url)
    protocol = (protocol && protocol[1]) || context.location.protocol
    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response
  }

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (succeed(r)) success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o['headers'] || {}
      , h

    headers['Accept'] = headers['Accept']
      || defaultHeaders['accept'][o['type']]
      || defaultHeaders['accept']['*']

    var isAFormData = typeof FormData !== 'undefined' && (o['data'] instanceof FormData);
    // breaks cross-origin requests with legacy browsers
    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o['withCredentials']
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    context[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

  function getRequest(fn, err) {
    var o = this.o
      , method = (o['method'] || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o['url']
      // convert non-string objects to query-string form unless o['processData'] is false
      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
        ? reqwest.toQueryString(o['data'])
        : (o['data'] || null)
      , http
      , sendWait = false

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

    // get the xhr from the factory if passed
    // if the factory returns null, fall-back to ours
    http = (o.xhr && o.xhr(o)) || xhr(o)

    http.open(method, url, o['async'] === false ? false : true)
    setHeaders(http, o)
    setCredentials(http, o)
    if (context[xDomainRequest] && http instanceof context[xDomainRequest]) {
        http.onload = fn
        http.onerror = err
        // NOTE: see
        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
        http.onprogress = function() {}
        sendWait = true
    } else {
      http.onreadystatechange = handleReadyState(this, fn, err)
    }
    o['before'] && o['before'](http)
    if (sendWait) {
      setTimeout(function () {
        http.send(data)
      }, 200)
    } else {
      http.send(data)
    }
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn

    init.apply(this, arguments)
  }

  function setType(header) {
    // json, javascript, text/plain, text/html, xml
    if (header === null) return undefined; //In case of no content-type.
    if (header.match('json')) return 'json'
    if (header.match('javascript')) return 'js'
    if (header.match('text')) return 'html'
    if (header.match('xml')) return 'xml'
  }

  function init(o, fn) {

    this.url = typeof o == 'string' ? o : o['url']
    this.timeout = null

    // whether request has been fulfilled for purpose
    // of tracking the Promises
    this._fulfilled = false
    // success handlers
    this._successHandler = function(){}
    this._fulfillmentHandlers = []
    // error handlers
    this._errorHandlers = []
    // complete (both success and fail) handlers
    this._completeHandlers = []
    this._erred = false
    this._responseArgs = {}

    var self = this

    fn = fn || function () {}

    if (o['timeout']) {
      this.timeout = setTimeout(function () {
        timedOut()
      }, o['timeout'])
    }

    if (o['success']) {
      this._successHandler = function () {
        o['success'].apply(o, arguments)
      }
    }

    if (o['error']) {
      this._errorHandlers.push(function () {
        o['error'].apply(o, arguments)
      })
    }

    if (o['complete']) {
      this._completeHandlers.push(function () {
        o['complete'].apply(o, arguments)
      })
    }

    function complete (resp) {
      o['timeout'] && clearTimeout(self.timeout)
      self.timeout = null
      while (self._completeHandlers.length > 0) {
        self._completeHandlers.shift()(resp)
      }
    }

    function success (resp) {
      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
      resp = (type !== 'jsonp') ? self.request : resp
      // use global data filter on response text
      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
        , r = filteredResponse
      try {
        resp.responseText = r
      } catch (e) {
        // can't assign this in IE<=8, just ignore
      }
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = context.JSON ? context.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break
        case 'js':
          resp = eval(r)
          break
        case 'html':
          resp = r
          break
        case 'xml':
          resp = resp.responseXML
              && resp.responseXML.parseError // IE trololo
              && resp.responseXML.parseError.errorCode
              && resp.responseXML.parseError.reason
            ? null
            : resp.responseXML
          break
        }
      }

      self._responseArgs.resp = resp
      self._fulfilled = true
      fn(resp)
      self._successHandler(resp)
      while (self._fulfillmentHandlers.length > 0) {
        resp = self._fulfillmentHandlers.shift()(resp)
      }

      complete(resp)
    }

    function timedOut() {
      self._timedOut = true
      self.request.abort()
    }

    function error(resp, msg, t) {
      resp = self.request
      self._responseArgs.resp = resp
      self._responseArgs.msg = msg
      self._responseArgs.t = t
      self._erred = true
      while (self._errorHandlers.length > 0) {
        self._errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }

    this.request = getRequest.call(this, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this._aborted = true
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }

    /**
     * Small deviation from the Promises A CommonJs specification
     * http://wiki.commonjs.org/wiki/Promises/A
     */

    /**
     * `then` will execute upon successful requests
     */
  , then: function (success, fail) {
      success = success || function () {}
      fail = fail || function () {}
      if (this._fulfilled) {
        this._responseArgs.resp = success(this._responseArgs.resp)
      } else if (this._erred) {
        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._fulfillmentHandlers.push(success)
        this._errorHandlers.push(fail)
      }
      return this
    }

    /**
     * `always` will execute whether the request succeeds or fails
     */
  , always: function (fn) {
      if (this._fulfilled || this._erred) {
        fn(this._responseArgs.resp)
      } else {
        this._completeHandlers.push(fn)
      }
      return this
    }

    /**
     * `fail` will execute when the request fails
     */
  , fail: function (fn) {
      if (this._erred) {
        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._errorHandlers.push(fn)
      }
      return this
    }
  , 'catch': function (fn) {
      return this.fail(fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function (o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o['disabled'])
            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
        }
      , ch, ra, val, i

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        ch = /checkbox/i.test(el.type)
        ra = /radio/i.test(el.type)
        val = el.value
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break
    case 'textarea':
      cb(n, normalize(el.value))
      break
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i
      , serializeSubtags = function (e, tags) {
          var i, j, fa
          for (i = 0; i < tags.length; i++) {
            fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function (name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o, trad) {
    var prefix, i
      , traditional = trad || false
      , s = []
      , enc = encodeURIComponent
      , add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
          s[s.length] = enc(key) + '=' + enc(value)
        }
    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in o) {
        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
      }
    }

    // spaces should be + according to spec
    return s.join('&').replace(/%20/g, '+')
  }

  function buildParams(prefix, obj, traditional, add) {
    var name, i, v
      , rbracket = /\[\]$/

    if (isArray(obj)) {
      // Serialize array item.
      for (i = 0; obj && i < obj.length; i++) {
        v = obj[i]
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v)
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
        }
      }
    } else if (obj && obj.toString() === '[object Object]') {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
      }

    } else {
      // Serialize scalar item.
      add(prefix, obj)
    }
  }

  reqwest.getcallbackPrefix = function () {
    return callbackPrefix
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o['type'] && (o['method'] = o['type']) && delete o['type']
      o['dataType'] && (o['type'] = o['dataType'])
      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
    }
    return new Reqwest(o, fn)
  }

  reqwest.ajaxSetup = function (options) {
    options = options || {}
    for (var k in options) {
      globalSetupOptions[k] = options[k]
    }
  }

  return reqwest
});

},{"xhr2":2}]},{},[1])(1)
});
