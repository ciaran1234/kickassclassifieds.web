import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { HttpClient } from './http-client.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

export class CustomFileUploader extends FileUploader {

    constructor(options: FileUploaderOptions) {
        options.authTokenHeader = options.authTokenHeader || 'Authorization';
        options.authToken = options.authToken || localStorage.getItem('accessToken');
        super(options);
    }

    uploadAllAsync(options?: any): Promise<any> {
        options = options || {};

        return Observable.create(observer => {
            if (!this.queue.length) {
                observer.next();
                observer.complete();
            }
            else {
                let xhr = new XMLHttpRequest();
                let form = new FormData();

                for (let item of this.queue) {
                    form.append(options.fieldName || 'files', item._file);
                }

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            observer.next(JSON.parse(xhr.response));
                            observer.complete();
                        } else {
                            observer.error(xhr.response);
                        }
                    }
                };
                                
                xhr.open(options.method || 'POST', options.url || this.queue[0].url, true);
                xhr.setRequestHeader(this.options.authTokenHeader, this.options.authToken);
                xhr.send(form);
            }
        }).toPromise();
    }
}