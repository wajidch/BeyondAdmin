import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { MainServiceService } from '../shared/main-service.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  AddTeamModel={
    name:'',
    designation:'',
    phone:'',
    email:'',
    description:'',
    profile_picture:''
  }
  create: boolean;
  getTeamRes: any;
  constructor(private http: HttpClient,private service:MainServiceService) { }

  ngOnInit() {
    this.getTeamFunc();
  }
  getTeamFunc(){
    this.service.getTeam().subscribe((res:any) => {
      console.log("res",res)
      this.getTeamRes = res.response;
     
      if (this.getTeamRes.statusCode == 200) {

      }
    });
  }
  uploadTeamPic(event: any){
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      const file = event.target.files[0];
      console.log(file);
      console.log('filesize', file.size / 1000000);
      const filesize = file.size / 1000000;
      const type = file.type;
      if (filesize <= 5 && (type === 'image/jpeg' || type === 'image/png')) {
       
        console.log('true');
        const formData = new FormData();
        formData.append('file', file, file.name);
       this.AddTeamModel.profile_picture=file.name;
        const reader = new FileReader();
        reader.onload = (value: any) => {
        
        }
        reader.readAsDataURL(event.target.files[0]);
        this.http.post(environment.baseUrl + 'upload', formData,
          { headers: headers }).subscribe(
            (res: any) => {
            
                console.log("res", res)
                //this.spinner.hide()
                // document.getElementById('close').click();
                //this.citiesList();
                console.log(res)
              
            }
          );



      } 
    }

  }
  AddTeam(){
    console.log("jf",this.AddTeamModel);
    this.service.addTeam(this.AddTeamModel).subscribe((res:any)=>{

      this.getTeamFunc();
      this.create=true;
    })
  }
}
