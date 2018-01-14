import { HttpError } from './http-error.model';

export class BadRequestError extends HttpError {
    messages: string[] = [];

    constructor(messages: any) {
        super();
        this.status = 400;
        let errors = messages.errors;

        if (errors) {
          


            for (let property in errors) {
               

                if (errors[property].message) {
                    this.messages.push(errors[property].message);
                }
                else if (typeof errors[property] === 'object') {
                    for (let obj in errors[property]) {
                        if (errors[property][obj].message) {
                            this.messages.push(errors[property][obj].message);
                        }
                    }
                }
                else {
                    this.messages.push(errors[property]);
                }

                console.log(this.messages);
            }
        }
    }
}