import { Component, OnInit } from '@angular/core';

import { AlertNotifierService } from '../../services/alert/alert-notifier.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertNotifierService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
  close(event){
    event.preventDefault();
    this.message=null;
  }
}
