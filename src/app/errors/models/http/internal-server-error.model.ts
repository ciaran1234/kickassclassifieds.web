import { HttpError } from './http-error.model';

export class InternalServerError extends HttpError {
    constructor() {
        super();
        this.status = 500;
    }
}