import { HttpError } from './http-error.model';

export class UnauthorizedError extends HttpError {
    constructor() {
        super();
        this.status = 401;
    }
}