import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { global } from './global';

@Injectable()
export class ClientService {
    public url: string;
    //public identity;
    //public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }
    
    prueba() {
        return 'Bievenidos a Inforum'; 
    }

    addClient(token, client):Observable<any> {
        const params = JSON.stringify(client);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        
        return this._http.post(this.url + 'client', params, {headers: headers});
    }

    geClientsByUser(userId):Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url + 'user-clients/'+userId, {headers: headers});                               
    }
/*
    getClient(id):Observable<any> {
        return this._http.get(this.url + 'client/' + id);
    }
*/

    update(token, id, client):Observable<any> {
        const params = JSON.stringify(client);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        
         return this._http.put(this.url + 'client/'+id, params, {headers: headers});
    }

    delete(token, id):Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);

         return this._http.delete(this.url + 'client/'+id, {headers: headers});                                 
    }

    getClients(page = 1):Observable<any> {
         
        return this._http.get(this.url + 'clients/' + page);      
    }

    getClient(id): Observable<any> {
         
        return this._http.get(this.url + 'client/' + id);
        
    }

    search(searchString):Observable<any> {
        return this._http.get(this.url + 'search/' + searchString);
    }

}