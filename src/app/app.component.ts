import { Component,OnInit  } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

declare var closeSideNavigationBar: any;
declare var stopBodyScrolling:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private router: Router) { }

    ngOnInit() {
      
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            setTimeout(function(){
              $('#site-body').css('margin-top',$('#site-header').outerHeight());
            },500);
            
            this.closeSideNavBar();
            new stopBodyScrolling(false);
            window.scrollTo(0, 0);            
        });
      }

      closeSideNavBar(){
        new closeSideNavigationBar();
      }
}
