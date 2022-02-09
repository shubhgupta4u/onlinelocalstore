import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../models/config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private config: Configuration){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem(this.config.userStorageKey));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer '+currentUser.token
                }
            });
        }
 
        return next.handle(request);
    }
}