import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interface/user-data';

@Injectable({
  providedIn: 'root'
})
export class JsonCurdService {
  baseUrl: string = "http://localhost:3000/UserList"

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<UserData[]>(this.baseUrl)
  }

  postData(data: UserData){
    return this.http.post(this.baseUrl, data)
  }

  getDataById(id: number){
     return this.http.get<UserData>(`${this.baseUrl}/${id}`);
  }

  putDataById(id: number, userData: UserData  ){
    return  this.http.put(`${this.baseUrl}/${id}`, userData )
  }

  deleteData(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
