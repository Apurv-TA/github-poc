import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
    providedIn: 'root',
})
export class ConstantService {
    constructor(private http: HttpClient, public router: Router) { }
    config = {};

    //Remember me get/set

    setRemember(is_remember: any) {
        return localStorage.setItem('is_remember', is_remember);
    }

    setUsername(username: any){
        localStorage.setItem('username', username)
    }

    getUsername() {
        return localStorage.getItem('username') ? localStorage.getItem('username') : "";
    }

    getPassword() {
        return localStorage.getItem('password') ? localStorage.getItem('password') : "";
    }
    getRemember() {
        return localStorage.getItem('is_remember') ? localStorage.getItem('is_remember') : false;
    }

    getConfiguration() {
        if(this.config && Object.keys(this.config).length !== 0) {
            return this.config;
        } else {
            this.config  = JSON.parse(localStorage.getItem('configuration') || '{}');
            return this.config;
        }
    }

    removeUsername() {
        return localStorage.removeItem('username');
    }

    removePassword() {
        return localStorage.removeItem('password');
    }

    //Language set/get
    setLanguageRussia(defaultLang: any) {
        return localStorage.setItem('lang', defaultLang);
    }
    setLanguage(language: any) {
        return localStorage.setItem('lang', language);
    }
    getLanguage() {
        return localStorage.getItem('lang') ? localStorage.getItem('lang') : "";
    }

    //Login token set/get
    setLoginresponse(loginRes: any) {
        return localStorage.setItem('loginResponse', loginRes);
    }
    setToken(token: any) {
        return localStorage.setItem('token', token);
    }
    setRefreshToken(refresh_token: any) {
        return localStorage.setItem('refresh_token', refresh_token);
    }


    //Logout remove


}