import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  public emailPatt  = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(environment.baseUrl + 'User/login',
      {
        email: email,
        password: password
    }, {headers});
  }
  

  getOrders() {
    return this.http.get(environment.baseUrl + 'admin/orderList');
  }
  getPendingOrders() {
    return this.http.get(environment.baseUrl + 'admin/orderListpending');
  }

  updateOrder(status, id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put(environment.baseUrl + 'admin/updateOrderStatus', {
      order_id: id,
      status: status
    }, {headers});
  }

  filterOrders(from, to,status) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(environment.baseUrl + `admin/orderDetailfromto?startDate=${from}&endDate=${to} &status=${status}`,
      {headers});
  }
  getUsers(){
    return this.http.get(environment.baseUrl + 'User/RegisterUserList');
  }
  getJob(){
    return this.http.get(environment.baseUrl + 'job/jobList');
  }
  getTeam(){
    return this.http.get(environment.baseUrl + 'job/teamList');
  }
  addJob(data){
    return this.http.post(environment.baseUrl + 'job/addJob',data);

  }
  addTeam(data){
    return this.http.post(environment.baseUrl + 'admin/addTeam',data);

  }
}
