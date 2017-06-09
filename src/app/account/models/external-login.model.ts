export class ExternalLogin {
    loginProvider: string;
    providerKey: string;   

    constructor(loginProvider?: string, providerKey?: string, hasProvider?: boolean) {
        this.loginProvider = loginProvider || '';
        this.providerKey = providerKey || '';       
    }
}