import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users;
  constructor(
    private api: ApiService,
  
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.api.getUsers().subscribe(
      r =>{
        this.users = r;
      },
      e =>{
        console.log("Hell0");
        this.users = {};
      }
    )
  }
  delete(id:any){
    this.api.deleteUser(id).subscribe(
      r => {
        console.log("success");
        this.loadUsers();
      },
      e => {
        console.log("failed");
      }
    )
  }

}
