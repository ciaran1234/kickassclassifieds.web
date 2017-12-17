import { ExternalLogin } from './external-login.model';

export class User {
    _id: string;
    firstName: String;
    lastName: String;
    email: String;
    phoneNumber: String;
    profileImageUrl: String;
    externalLogins: ExternalLogin[];
}