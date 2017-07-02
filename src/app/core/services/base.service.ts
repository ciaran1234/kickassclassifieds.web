import { HttpErrorFactory } from '../../errors/models/http/http-error-factory.model';

export class BaseService {
    protected handleError(error: Response): Promise<any> {      
        return Promise.reject(HttpErrorFactory.get(error.status, error.json() || {}));
    }
}