import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  addUser(username: string, password: string, firstname: string, lastname: string) {
    var user = {
      'username': username,
      'password': password,
      'firstname': firstname,
      'lastname': lastname
    };

    return this.http.post("http://localhost:8200/Angular_Test_2019/api/public/user",user).subscribe(
      response => {
        console.log("Sucess");
        console.log(response);
      },
      error => {
        console.log("failed");
      }
    );

  }

  getUsers(){
    return this.http.get("http://localhost:8200/Angular_Test_2019/api/public/users");
  }
  
  deleteUser(id:string){
    return this.http.delete("http://localhost:8200/Angular_Test_2019/api/public/user/"+id)
  }
}
