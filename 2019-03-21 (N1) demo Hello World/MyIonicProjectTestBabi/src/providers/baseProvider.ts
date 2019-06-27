import { Response } from '@angular/http';
import { Observable } from 'rxjs';

const extractMensError = (error: Response | any): string => {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
}

export abstract class BaseProvider {

    protected handlePromiseError(err: Response | any): Promise<any> {
        return Promise.reject(extractMensError(err));
    }

    protected handleObservableError(err: Response | any): Observable<any> {
        return Observable.throw(extractMensError(err));
    }
}