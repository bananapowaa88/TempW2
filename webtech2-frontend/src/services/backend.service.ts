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
    baseUrl = 'http://localhost:4200/api/';

    getUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users`, { withCredentials: true });
    }


    register(email: string, password: string) {
        let body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            withCredentials: true
        };

        return this.http.post(`${this.baseUrl}auth/register`, body.toString(), options)
    }

    login(email: string, password: string) {
        let body = new URLSearchParams();
        body.set('email', email);
        body.set('password', password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            withCredentials: true
        };


        return this.http.post(`${this.baseUrl}auth/login`, body.toString(), options);
    }

    logout() {
        return this.http.get(`${this.baseUrl}auth/logout`, { withCredentials: true });
    }

    public isAuthenticated(): Observable<any> {
        // Check whether the token is expired and return
        // true or false
        return this.http.get(`${this.baseUrl}users`, { withCredentials: true });
    }

    getItems(): Observable<any> {
        return this.http.get(`${this.baseUrl}warehouse/`, { withCredentials: true });
    }

    addItem(data: Item): Observable<any> {
        return this.http.post(`${this.baseUrl}warehouse/add`, data, { withCredentials: true });
    }

    changeItem(data: Item): Observable<any> {
        return this.http.put(`${this.baseUrl}warehouse/change/${data._id}`, data, { withCredentials: true });
    }

    deleteItem(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}warehouse/delete/${id}`, { withCredentials: true, responseType: 'text' });
    }
}