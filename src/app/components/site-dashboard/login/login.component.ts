import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertNotifierService } from "../../../services/alert/alert-notifier.service";
import { AuthenticationService } from "../../../services/auth/authenication.service";
import { DataChangeNotifierService } from "../../../services/datachangenotifier/data-change-notifier.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertNotifierService,
    private dataChangeNotifier:DataChangeNotifierService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/seller";
    this.authenticationService.getUserCredential().subscribe(credential=>{
      if(credential && credential.rememberMe){
        this.model.username=credential.username;
        this.model.password=credential.password;
        this.model.rememberMe=credential.rememberMe;
      }
    });
  }
  login() {
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password, this.model.rememberMe)
      .subscribe(
        data => {
          this.dataChangeNotifier.modifyUserLoginState(true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          let response:any=error.json();
          this.dataChangeNotifier.modifyUserLoginState(false);
          console.log(response);
          this.alertService.error(response.message);
          this.loading = false;
        }
      );
  }
  forgotPassword(event){
    event.preventDefault();
    this.alertService.success("We have send you an one-time password on your registered mailid. Kindly use it to reset your password.")
  }  
}
