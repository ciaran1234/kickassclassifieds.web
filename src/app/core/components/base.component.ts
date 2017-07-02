import { Router } from '@angular/router';
import { UnauthorizedError } from '../../errors/models/http/unauthorized-error.model';

export class BaseComponent {

    constructor(protected router: Router) { }

    handleError(error: any) {
        if (error instanceof UnauthorizedError) {
            this.handleUnauthorizedError();
        }
    }

    handleUnauthorizedError() {
        this.router.navigate(['/account/signin']);
    }
}