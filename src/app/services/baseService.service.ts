import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

    protected anonymousHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractResponse(response: any) {
        return response || {};
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { erros: [] } }

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === 'Unknown Error') {
                customError.push('Unknown Error');
                response.error.erros = customError;
            }
        }

        // if (response.status === 500) {
        //     customError.push('Error processing request');

        //     customResponse.error.erros = customError;
        //     return throwError(customResponse);
        // }

        return throwError(response);
    }
}