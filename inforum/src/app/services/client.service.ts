import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class ClientService {
    public url: string;
    //public identity;
    //public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }
    addClient(token, client): Observable<any>{
        const params = JSON.stringify(client);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);

        return this._http.post(this.url + 'client', params, {headers: headers});
    }

}