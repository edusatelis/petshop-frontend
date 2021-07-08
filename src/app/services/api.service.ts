import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http'
import { IPets } from "../models/pets.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from 'rxjs/operators';
import { BaseService } from "./baseService.service";


@Injectable()
export class ApiService extends BaseService {
    
    headers = new HttpHeaders({
        'Content-type': 'application/json'
    });

    constructor(private http: HttpClient){
        super();
    }
    
    pets(): Observable<IPets[]>{
        return this.http.get(`${environment.API_URL}/auth/pets`)
        .pipe(
            map((response: any) => response.prototype.toJson())
        );
    }

    cadastro(body: any):Observable<any>{
        return this.http.post(`${environment.API_URL}/auth/register`, body, this.anonymousHeader()).pipe(
            map(this.extractData),
            catchError(this.serviceError)
        )
    } 

    
}