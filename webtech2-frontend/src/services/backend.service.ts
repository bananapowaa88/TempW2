import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { Item } from '../models/Item';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:3000/';

    getUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users`);
    }


    register(email: string, password: string) {
        let body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(`${this.baseUrl}auth/register`, body.toString(), options)
    }

    login(email: string, password: string) {
        let body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };


        return this.http.post(`${this.baseUrl}auth/login`, body.toString(), options);
    }

    addItem(data: Item): Observable<any> {
        return this.http.post(`${this.baseUrl}warehouse/create`, data);
    }

    changeItem(data: Item): Observable<any> {
        return this.http.post(`${this.baseUrl}warehouse/change/${data._id}`, data);
    }

    deleteItem(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}warehouse/delete/${id}`);
    }
}