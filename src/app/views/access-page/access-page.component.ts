import { Component } from '@angular/core';

@Component({
  selector: 'access',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.css']
})
export class AccessComponent
{
  isLogin: boolean = true;

  loginData = {
    username: '',
    password: ''
  };

  registerData = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  public toggleLogin(isLogin: boolean)
  {
    this.isLogin = isLogin;
  }

  public login()
  {
  }

  public register()
  {
  }
}
