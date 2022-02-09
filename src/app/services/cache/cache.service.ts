import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptor,HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

abstract class HttpCache{
  abstract get(req: HttpRequest<any>): HttpResponse<any>|null;
  abstract put(req: HttpRequest<any>, res:HttpResponse<any>):void;
}
@Injectable()
export class HttpCacheService implements HttpCache {
  private cache ={};

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any>|null
  {
    return this.cache[req.urlWithParams];
    // return <HttpResponse<any>>JSON.parse(localStorage.getItem(req.urlWithParams));
  }

  put(req: HttpRequest<any>, res:HttpResponse<any>):void{
    this.cache[req.urlWithParams] = res;
    // localStorage.removeItem(req.urlWithParams);
    // localStorage.setItem(req.urlWithParams,JSON.stringify(res));
  }
}
