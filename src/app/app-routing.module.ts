import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import {  HomeComponent } from '../app/components/site-dashboard/home/home.component';
import { ProductdetailComponent } from './components/site-dashboard/productdetail/productdetail.component';
import { SearchComponent } from './components/site-dashboard/search/search.component';
import { ProductComponent } from './components/site-dashboard/search/product/product.component';
import { SidebarFilterComponent } from './components/site-dashboard/search/sidebar-filter/sidebar-filter.component';
import { LoginComponent } from './components/site-dashboard/login/login.component';
import { RegisterComponent } from './components/site-dashboard/register/register.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', loadChildren:'app/components/site-dashboard/productdetail/productdetail.module#ProductdetailModule' },
  { path: 'category/:id', loadChildren:'app/components/site-dashboard/search/search.module#SearchModule' },
  { path: 'search/:id/:searchText', loadChildren:'app/components/site-dashboard/search/search.module#SearchModule'},
  { path: 'login', loadChildren:'app/components/site-dashboard/login/login.module#LoginModule'},
  { path: 'signup', loadChildren:'app/components/site-dashboard/register/register.module#RegisterModule' },
  // { path: 'filter/:id', component: SidebarFilterComponent },
  {path : 'seller', loadChildren:'app/components/site-dashboard/seller/seller.module#SellerModule'},
  
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
