import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { HttpCacheService} from '../services/cache/cache.service'

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService:HttpCacheService){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Cache Intercepter');
        if(request.method.toLocaleLowerCase() =="get" 
            && request.urlWithParams.indexOf('/token') < 0
            && request.urlWithParams.indexOf('/authenticate') < 0){
            const cachedResponse = this.cacheService.get(request);
            if(cachedResponse){
                console.log('Response from cache');                
                return Observable.of(cachedResponse);
            }
        }
        return next.handle(request).do(response =>{
            if(response instanceof HttpResponse
                && request.method.toLocaleLowerCase() =="get"
                && request.urlWithParams.indexOf('/token') < 0
                && request.urlWithParams.indexOf('/authenticate') < 0){
                    // response.headers.append("CachedTime", Date.now().toString());
                    this.cacheService.put(request,response);
                    console.log('Response from server');
            }
        }).catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}