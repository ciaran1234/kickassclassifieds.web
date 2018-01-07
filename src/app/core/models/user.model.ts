import { ExternalLogin } from './external-login.model';
import { Settings } from 'app/core/models/settings.model';

export class User {
    _id: string;
    firstName: String;
    lastName: String;
    email: String;
    phoneNumber: String;
    profileImageUrl: String;
    externalLogins: ExternalLogin[];
    settings: Settings;
}