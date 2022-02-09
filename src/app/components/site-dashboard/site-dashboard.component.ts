import { Component, OnInit } from '@angular/core';

declare var attachSidebarCollapseClickedHandler: any;

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss']  
})
export class SiteDashboardComponent implements OnInit {
  title = "Online Local Store";
  constructor() {
    console.log(document.readyState);
    document.addEventListener("readystatechange", function (event) { 
      console.log(document.readyState);
      if(document.readyState === "complete")
      {
        new attachSidebarCollapseClickedHandler();
      }    
    } );
   }

  ngOnInit() {
  }

}
