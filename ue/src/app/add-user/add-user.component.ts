import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  userAddForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.api.addUser(
      this.userAddForm.get('userName').value,
      this.userAddForm.get('password').value,
      this.userAddForm.get('firstName').value,
      this.userAddForm.get('lastName').value
    );
  }

}
