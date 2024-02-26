interface IEmail {
    subject: string;
    to: string;
    from: string;
    fromName: string;
    bodyHtml: string;
}

interface IConfiguration {
    apiKey: string;
    apiUri: string;
    apiVersion: string;
}

export enum TrackingTypeEnum {
    Http = 0,
    ExternalHttps = 1,
    InternalCertHttps = 2,
    LetsEncryptCert = 3,
}

export interface IAPIKeyRequest {
    apiKey?: string;
}

export interface IAddDomain extends IAPIKeyRequest {
    domain: string;
    trackingType?: TrackingTypeEnum;
}

export interface IVerifyDkim extends IAPIKeyRequest {
    domain: string;
}

export interface IVerifySpf extends IAPIKeyRequest {
    domain: string;
}

export interface IVerifyDMARC extends IAPIKeyRequest {
    domain: string;
}

export interface IVerifyTracking extends IAPIKeyRequest {
    domain: string;
    trackingType?: TrackingTypeEnum;
}

export class client {
    Email: {
        Send(email: IEmail): Promise<string>;
    };

    Domain: {
        Add(params: IAddDomain): Promise<boolean>;
        VerifyDkim(params: IVerifyDkim): Promise<boolean>;
        VerifySpf(params: IVerifySpf): Promise<boolean>;
        VerifyMX(params: IVerifyMX): Promise<boolean>;
        VerifyDMARC(params: IVerifyDMARC): Promise<boolean>;
        VerifyTracking(params: IVerifyTracking): Promise<boolean>;
    };

    constructor(configuration: IConfiguration);
}
