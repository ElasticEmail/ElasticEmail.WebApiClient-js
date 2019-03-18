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

export class client {
    Email: {
        Send(email: IEmail): Promise<string>;
    };

    constructor(configuration: IConfiguration);
}
