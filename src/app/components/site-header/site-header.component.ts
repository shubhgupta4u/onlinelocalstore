import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';

import { ICategory } from '../../models/category'
import { DataChangeNotifierService } from '../../services/datachangenotifier/data-change-notifier.service';
import { AuthenticationService } from '../../services/auth/authenication.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageCacheService } from '../../services/cache/localstoragecache.service';

declare var toggleSearchBoxDisplay: any;
declare var openSideNavigationBar: any;

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit,OnDestroy {
  showSearchBox:boolean=false;
  searchIconClass:string="";
  categories: ICategory[];
  routeName:string="";
  isUserAuthenticated:boolean = false;
  userLoginStateSubscription:Subscription;

  constructor(private cacheService: LocalStorageCacheService,
              private location:Location,
              private router: Router,
              private dateChangeNotifier:DataChangeNotifierService,
              private authService: AuthenticationService) {    
  }

  ngOnInit() {
    $(window).resize(function(){
      $('#site-body').css('margin-top',$('#site-header').outerHeight());
    })
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }           
  });
    this.getAllCategories();
    if(!this.userLoginStateSubscription){
      this.userLoginStateSubscription = this.dateChangeNotifier.userLoginStateChanged.subscribe(signState => this.isUserAuthenticated = signState);
    }    
  }
  ngOnDestroy(): void {
    if(this.userLoginStateSubscription){
      this.userLoginStateSubscription.unsubscribe();
    }
  }
  logout(event):void{
    event.preventDefault();
    this.dateChangeNotifier.modifyUserLoginState(false);
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getAllCategories(): void {
    this.cacheService.getCategories().subscribe(categories => (this.categories = categories.filter(c=>c.parentId ==-1)));
  }

  openSideNavBar(event){
    event.preventDefault();
    new openSideNavigationBar();    
  }
  handleLayoutOnCategoryView(isSearchBoxOpen: boolean):void{
    if(isSearchBoxOpen){
    $('#site-body').css('margin-top',$('#site-header').outerHeight() + $('#container-searchbox').outerHeight() + 10);
    }
    else{
      $('#site-body').css('margin-top',$('#site-header').outerHeight()- $('#container-searchbox').outerHeight() - 10);
    }
  }
  openSearchBox(event){
    event.preventDefault();
    this.showSearchBox = !this.showSearchBox;
    let path = this.location.path();
    this.routeName = path.split('/')[1];
    this.handleLayoutOnCategoryView(this.showSearchBox);
    
    if(this.showSearchBox)
    {
      this.searchIconClass ="searchActive";
    }
    else
    {
      this.searchIconClass ="";
    }
  }
}
