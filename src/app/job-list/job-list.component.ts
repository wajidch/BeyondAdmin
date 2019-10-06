import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../shared/main-service.service';
import { HttpHeaders,HttpClientModule, HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  getJobRes: any;
  file: any;
  create:boolean=false;
  AddJobModel={
    title:'',
    designation:'',
    description:'',
    expereince:'',
    salary:'',
    ads_picture:'',
    skill:'',
    technical_description:''
  }

  constructor(private service:MainServiceService,private http: HttpClient) { }

  ngOnInit() {
    this.getjobFunc();
  }
  getjobFunc(): void {
    this.service.getJob().subscribe((res:any) => {
      console.log("res",res)
      this.getJobRes = res.response;
     
      if (this.getJobRes.statusCode == 200) {

      }
    });
  }
  uploadJobAds(event: any){
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
       this.AddJobModel.ads_picture=file.name;
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
  Addjob(){

    console.log("add job",this.AddJobModel)
    this.service.addJob(this.AddJobModel).subscribe((res:any)=>{

      this.getjobFunc();
      this.create=true;
    })
  }
}
