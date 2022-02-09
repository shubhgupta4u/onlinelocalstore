import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { IBanner } from "../../models/banner";
import { Configuration } from "../../models/config";

const CACHE_SIZE = 1;

@Injectable()
export class BannerService {
  private getBannersServiceUrl: string;
  private cache$: Observable<Array<IBanner>>;

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this.configuration = new Configuration();
    this.getBannersServiceUrl = this.configuration.baseUrl + "getBanners";
  }
  private get Banners() {
    if (!this.cache$) {
        this.cache$ = this.requestBanners().pipe(
          shareReplay(CACHE_SIZE)
        );
    }
    return this.cache$;
  }
  private requestBanners(){
    return this._http.get<IBanner[]>(this.getBannersServiceUrl).pipe(
      map(response => response)
    );
  }
  getBanners(): Observable<IBanner[]> {
    console.log("BannerService --> getBanners()");
    return this.Banners;
  }
}
