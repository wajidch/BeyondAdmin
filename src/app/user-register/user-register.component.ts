import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../shared/main-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  getUserRes: any;

  constructor(private service: MainServiceService) { }

  ngOnInit() {
    this.getUserFunc();
  }

  getUserFunc(): void {
    this.service.getUsers().subscribe((res:any) => {
      this.getUserRes = res.response;
     
      if (this.getUserRes.statusCode == 200) {

      }
    });
  }

}
