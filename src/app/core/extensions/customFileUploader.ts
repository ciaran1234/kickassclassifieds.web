import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { HttpClient } from './httpClient';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

export class CustomFileUploader extends FileUploader {

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
                xhr.send(form);
            }
        }).toPromise();
    }
}