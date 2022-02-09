import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ICategory } from '../../models/category';
import { IBanner } from '../../models/banner';
import { IStore } from '../../models/store';
import { IProduct } from '../../models/product';
import { CategoryService } from '../category/category.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BannerService } from '../banner/banner.service';
import { StoreService } from '../store/store.service';
import { ProductService } from '../product/product.service';

const CATEGORYKEY = "CATEGORY";
const BANNERKEY = "BANNER";
const STOREKEY = "STORE";
const DEALPRODUCTKEY = "DEALPRODUCTS";

@Injectable()
export class LocalStorageCacheService {
    private categories = new BehaviorSubject<ICategory[]>(new Array<ICategory>());
    private banners = new BehaviorSubject<IBanner[]>(new Array<IBanner>());
    private stores = new BehaviorSubject<IStore[]>(new Array<IStore>());
    private topDealProducts = new BehaviorSubject<IProduct[]>(new Array<IProduct>());
    private keepAfterNavigationChange = false;
 
    getCategories(): Observable<ICategory[]> {
        return this.categories.asObservable();
    }
    private CheckCacheCategoriesDataVersion():Observable<ICategory[]>{
        return Observable.create(observer => {
            let categoryList:ICategory[] = <ICategory[]>JSON.parse(localStorage.getItem(CATEGORYKEY));
            if(categoryList != null && categoryList.length > 0){
                this.categories.next(categoryList);
                observer.next(categoryList);
                observer.complete();
            }
            else{
                this.categoryService.getAllCategories(true).subscribe(
                    data=>{
                        categoryList = data;
                        localStorage.setItem(CATEGORYKEY, JSON.stringify(categoryList));
                        this.categories.next(categoryList);
                        observer.next(categoryList);
                        observer.complete();
                    }
                );
            }
        });
    }

    getBanners(): Observable<IBanner[]> {
        return this.banners.asObservable();
    }
    private CheckCacheBannerDataVersion():Observable<IBanner[]>{
        return Observable.create(observer => {
            let bannerList:IBanner[] = <IBanner[]>JSON.parse(localStorage.getItem(BANNERKEY));
            if(bannerList != null && bannerList.length > 0){
                this.banners.next(bannerList);
                observer.next(bannerList);
                observer.complete();
            }
            else{
                this.bannerService.getBanners().subscribe(
                    data=>{
                        bannerList = data;
                        localStorage.setItem(BANNERKEY, JSON.stringify(bannerList));
                        this.banners.next(bannerList);
                        observer.next(bannerList);
                        observer.complete();
                    }
                );
            }
        });
    }

    getStores(): Observable<IStore[]> {
        return this.stores.asObservable();
    }
    private CheckCacheStoreDataVersion():Observable<IStore[]>{
        return Observable.create(observer => {
            let storeList:IStore[] = <IStore[]>JSON.parse(localStorage.getItem(STOREKEY));
            if(storeList != null && storeList.length > 0){
                this.stores.next(storeList);
                observer.next(storeList);
                observer.complete();
            }
            else{
                this.storeService.getAllStore().subscribe(
                    data=>{
                        storeList = data;
                        localStorage.setItem(STOREKEY, JSON.stringify(storeList));
                        this.stores.next(storeList);
                        observer.next(storeList);
                        observer.complete();
                    }
                );
            }
        });
    }

    getTopDealProducts(): Observable<IProduct[]> {
        return this.topDealProducts.asObservable();
    }
    private CheckCacheDealProductDataVersion(categoriesId:number[]):Observable<IProduct[]>{
        return Observable.create(observer => {
            let productList:IProduct[] = <IProduct[]>JSON.parse(localStorage.getItem(DEALPRODUCTKEY));
            if(productList != null && productList.length > 0){
                this.topDealProducts.next(productList);
                observer.next(productList);
                observer.complete();
            }
            else{
                this.productService.getProductDealByCategory(categoriesId).subscribe(
                    data=>{
                        productList = data;
                        localStorage.setItem(DEALPRODUCTKEY, JSON.stringify(productList));
                        this.topDealProducts.next(productList);
                        observer.next(productList);
                        observer.complete();
                    }
                );
            }
        });
    }

    constructor(private router: Router, 
        private categoryService:CategoryService,
        private bannerService:BannerService,
        private storeService:StoreService,
        private productService:ProductService) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.CheckCacheCategoriesDataVersion().subscribe(
                    categories=>{
                            if(event.url == "/" || event.url == "/home"){
                            let categoriesId:number[]=new Array<number>();
                            categories.forEach(item=>{
                                if(item.parentId == -1){
                                    categoriesId.push(item._id);
                                }
                            })
                            this.CheckCacheDealProductDataVersion(categoriesId).subscribe();
                        }
                    }
                );
                if(event.url == "/" || event.url == "/home"){
                    this.CheckCacheBannerDataVersion().subscribe();
                }
                if(event.url.indexOf("/category/") == 0 || event.url.indexOf("/search/") == 0){
                    this.CheckCacheStoreDataVersion().subscribe();
                }
            }
        });
    }
}