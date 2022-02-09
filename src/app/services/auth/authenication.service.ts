import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
import { Configuration } from "../../models/config";
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthenticationService {
    private authenticationServiceUrl: string;
    constructor(private http: HttpClient, private configuration: Configuration,
                private cryptoService:CryptoService) { 
        this.configuration = new Configuration();
        this.authenticationServiceUrl = this.configuration.baseUrl + "authenticate";
    }
 
    login(username: string, password: string,rememberMe:boolean) {
        let cypherText:string = this.cryptoService.encrypt(password);
        let cypherUsername:string = this.cryptoService.encrypt(username);
        return this.http.post(this.authenticationServiceUrl, { username: cypherUsername, password: cypherText })
            .map((response:Response) => {
                let user:any=response;
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.configuration.userStorageKey, JSON.stringify(user));
                }
                if(rememberMe){                    
                    let data:any={username: username, password: cypherText, rememberMe: rememberMe};
                    localStorage.setItem(this.configuration.rememberMeKey, JSON.stringify(data));
                }
                else{                    
                    localStorage.removeItem(this.configuration.rememberMeKey);
                }
                return user;
            });
    }

    getUserCredential(): Observable<any>{
        return Observable.create(observer => {
            let credential:any=localStorage.getItem(this.configuration.rememberMeKey);
            credential=JSON.parse(credential);
            if(credential){
                credential.password = this.cryptoService.decrypt(credential.password);
            }            
            observer.next(credential);
            observer.complete();            
        });   
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.configuration.userStorageKey);
    }
}
