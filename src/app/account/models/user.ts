import { ExternalLogin } from './externalLogin';

export class User {
    firstName: String;
    lastName: String;
    email: String;
    profileImageUrl: String;
    externalLogins: ExternalLogin[];
}