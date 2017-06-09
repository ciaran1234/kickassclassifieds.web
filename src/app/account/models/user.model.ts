import { ExternalLogin } from './external-login.model';

export class User {
    firstName: String;
    lastName: String;
    email: String;
    profileImageUrl: String;
    externalLogins: ExternalLogin[];
}