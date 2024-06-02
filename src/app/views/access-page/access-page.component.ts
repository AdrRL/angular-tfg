import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister, Userlogin } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'access',
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.css']
})
export class AccessComponent
{
  constructor
  (
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  )
  {
  }

  public isLogin: boolean = true;
  public modalMsg: string = "";
  public showErrorModalFlag: boolean = false;
  public showSuccessModalFlag: boolean = false;
  public confirmPassword: string = "";

  public loginData: Userlogin = {
    email: '',
    password: ''
  };

  public registerData: UserRegister = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    record: []
  };

  public goTo(): void
  {
    this.router.navigate(['/FPAwithOpenAI/general']);
  }

  public toggleLogin(isLogin: boolean)
  {
    this.isLogin = isLogin;
  }

  public login(usr: Userlogin): void
  {
    this.authService.login(usr).subscribe(
      (respuesta: any) => {
        console.log(respuesta)
        if (respuesta.email === -1)
        {
          this.modalMsg = 'La contraseña o el email introducido no es válido';
          this.showErrorModal();
        }
        else
        {
          this.activateCookie("email", respuesta.email);
          this.activateCookie("token", respuesta.token);
          this.check(respuesta.email);
          this.modalMsg = '¡Inicio de sesión exitoso!';
          this.showSuccessModal();
        }
      },
      (error: any) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public register(usr: UserRegister): void
  {
    this.authService.register(usr).subscribe(
      (respuesta: any) => {
        if (respuesta.email === -1)
        {
          this.modalMsg = 'El email introducido ya existe';
          this.showErrorModal();
        }
        else if (respuesta.email === -2)
        {
          this.modalMsg = 'El código ya ha sido enviado al correo. Aceptelo para continuar.';
          this.showErrorModal();
        }
        else
        {
          this.modalMsg = '¡Registro exitoso! Revise su correo';
          this.showSuccessModal();
        }
      },
      (error: any) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public onRegisterSubmit(): void
  {
    if (this.isRegisterFormValid())
    {
      this.register(this.registerData);
    }
    else
    {
      if (!this.registerData.email || !this.registerData.username || !this.registerData.firstName || !this.registerData.lastName || !this.registerData.password)
        this.modalMsg = '¡Error! Por favor, complete todos los campos.';
      else if (this.registerData.password != this.confirmPassword)
        this.modalMsg = '¡Error! Por favor, las contraseñas deben coincidir.';
      this.showErrorModal();
    }
  }

  public onLoginSubmit(): void
  {
    if (this.isLoginFormValid())
    {
      this.login(this.loginData);
    }
    else
    {
      this.modalMsg = '¡Error! Por favor, complete todos los campos.';
      this.showErrorModal();
    }
  }

  public isRegisterFormValid(): boolean
  {
    return (this.registerData.password === this.confirmPassword)
      ? (!!this.registerData.email && !!this.registerData.username && !!this.registerData.firstName && !!this.registerData.lastName && !!this.registerData.password)
      :false;
  }

  public isLoginFormValid(): boolean
  {
    return !!this.loginData.email && !!this.loginData.password;
  }

  public showErrorModal(): void
  {
    this.showErrorModalFlag = true;
    setTimeout(() => {
      this.showErrorModalFlag = false;
    }, 3000);
  }

  public showSuccessModal(): void
  {
    this.showSuccessModalFlag = true;
    setTimeout(() => {
      this.showSuccessModalFlag = false;
      this.goTo();
    }, 3000);
  }

  public check(email: string): void
  {
    this.authService.checkUser(email).subscribe(
      (respuesta: any) => {
        console.log({respuesta})
      },
      (error: any) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public activateCookie(email: string, token: string): void
  {
    this.cookieService.setCookie(email, token);
  }

}
