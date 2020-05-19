import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.submitted = true;
    this.loginFailed = false;
    this.appService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      if(res.success){
        localStorage.setItem('username', this.loginForm.value.username);
        this.appService.setUsername(this.loginForm.value.username);
        this.router.navigate(['/members']);
      }
      else{
        this.loginFailed = true;
      }
    })
  }

}
