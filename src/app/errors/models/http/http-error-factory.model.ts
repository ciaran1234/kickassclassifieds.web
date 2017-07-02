import { HttpError } from './http-error.model';
import { InternalServerError } from './internal-server-error.model';
import { UnauthorizedError } from './unauthorized-error.model';
import { BadRequestError } from './bad-request-error.model';

export class HttpErrorFactory {
    static get(status: number, messages: any): HttpError {
        let error;
       
        switch (status) {
            case 400:
                error = new BadRequestError(messages);
                break;
            case 401:
                error = new UnauthorizedError();
                break;
            case 500:              
                error = new InternalServerError();
                break;
            default:
                error = new HttpError();
                break;
        }

        return error;
    }
}