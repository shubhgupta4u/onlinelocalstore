import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { IStore, Store } from "../../models/store";
import { Configuration } from "../../models/config";

const CACHE_SIZE = 1;

@Injectable()
export class StoreService {
  private cache$: Observable<Array<IStore>>;
  private getStoreServiceUrl: string;
  private getStoresByIdServiceUrl:string;

  constructor(private httpClient: HttpClient, private configuration: Configuration) {
    this.getStoreServiceUrl = this.configuration.baseUrl + "getActiveStore";
    this.getStoresByIdServiceUrl = this.configuration.baseUrl + "getStoresById";
  }

  private get Stores() {
    if (!this.cache$) {
        this.cache$ = this.requestStores().pipe(
          shareReplay(CACHE_SIZE)
        );
    }
    return this.cache$;
  }
  private requestStores(){
    return this.httpClient.get<IStore[]>(this.getStoreServiceUrl).pipe(
      map(response => response)
    );
  }

  private getDummyStoreData(): Observable<IStore[]> {
    return Observable.create(observer => {
      let stores: IStore[] = new Array<IStore>();
      let alphabet:string[] = "abcdefghijklmnopqrstuvwxyz".split('');
      let index: number=1;
      for(var i=0;i < alphabet.length;i++)
      {
        for(var j = 0;j<30;j++)
        {
          let store = new Store();
          store._id = index;
          store.name = alphabet[i] + " Surabhi Bangles Store " + j + 1; 
          store.description = store.name;
          store.isActive = true;
          index = index +1;
          stores.push(store);
        }
      }
      observer.next(stores);
      observer.complete();
    });
  }

  getAllStore(): Observable<IStore[]> {
    console.log("StoreService --> getAllStoreByCategory()");
    return Observable.create(observer => {
        this.Stores.subscribe(stores=>{           
          observer.next(stores);
          observer.complete();
        });
    });
  }

  getAllStoreById(storesId: number[]): Observable<IStore[]> {
    console.log("StoreService --> getAllStoreById()");
    return this.httpClient
      .post<IStore[]>(this.getStoresByIdServiceUrl, storesId)
      .map((response) => response);
  }
}
