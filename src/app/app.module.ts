import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteDashboardComponent } from './components/site-dashboard/site-dashboard.component';
import { SiteSidenavbarComponent } from './components/site-sidenavbar/site-sidenavbar.component';
import { SiteBannerComponent } from './components/site-dashboard/home/site-banner/site-banner.component';
import { HomeComponent } from './components/site-dashboard/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductSliderComponent } from './components/site-dashboard/home/product-slider/product-slider.component';
import { SearchBoxComponent } from './components/site-header/search-box/search-box.component';
import { AlertComponent } from './directives/alert/alert.component';
import { AlertNotifierService } from './services/alert/alert-notifier.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './intercepter/auth.intercepter';
import { CacheInterceptor } from './intercepter/cache.intercepter';
import { AuthenticationService } from './services/auth/authenication.service';
import { Configuration } from './models/config';
import { CryptoService } from './services/crypto/crypto.service';
import { DataChangeNotifierService } from './services/datachangenotifier/data-change-notifier.service';
import { PipesModule } from './pipes/pipes.module';
import { CategoryService } from './services/category/category.service';
import { BannerService } from './services/banner/banner.service';
import { HttpCacheService } from './services/cache/cache.service';
import { LocalStorageCacheService } from './services/cache/localstoragecache.service';
import { StoreService } from './services/store/store.service';
import { ProductService } from './services/product/product.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteDashboardComponent,
    SiteSidenavbarComponent,
    SiteBannerComponent,
    HomeComponent,
    ProductSliderComponent,
    SearchBoxComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule,
    PipesModule
  ],
  providers: [
    CategoryService,    
    BannerService,
    DataChangeNotifierService,
    AuthenticationService,
    AlertNotifierService,
    LocalStorageCacheService,
    Configuration,
    CryptoService,
    StoreService,
    ProductService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor,
    //   multi:true
    // },
    HttpCacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
