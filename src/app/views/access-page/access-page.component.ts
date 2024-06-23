import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { UserRegister, Userlogin } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const provider = new GoogleAuthProvider();

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
  public isLoading = false;

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

  private isEmailValid(email: string): boolean
  {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  public toggleLogin(isLogin: boolean)
  {
    this.isLogin = isLogin;
  }

  public login(usr: Userlogin): void
  {
    this.isLoading = true;
    usr.email = usr.email.toLowerCase();

    this.authService.login(usr).subscribe(
      (respuesta: any) => {
        this.activateCookie("email", respuesta.clave);
        this.activateCookie("token", respuesta.token);
        this.check(respuesta.email);
        this.modalMsg = '¡Inicio de sesión exitoso!';
        this.showSuccessModal();
      },
      (error: any) => {
        this.isLoading = false;
        this.modalMsg = 'La contraseña o el email/nombre de usuario introducidos no son válidos.';
        this.showErrorModal();
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public loginGoogle(usr: Userlogin): void
  {
    this.authService.loginGoogleUser(usr).subscribe(
      (respuesta: any) => {
        if (respuesta.email != -1)
        {
          this.isLoading = false;
          this.activateCookie("email", respuesta.email);
          this.activateCookie("token", respuesta.token);
          this.check(respuesta.email);
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.modalMsg = 'Ha sucedido un error con el inicio con cuenta externa, inténtelo en unos minutos.';
        this.showErrorModal();
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public register(usr: UserRegister): void
  {
    this.isLoading = true;

    if (!this.isEmailValid(usr.email))
    {
      this.isLoading = false;
      this.modalMsg = 'Correo electrónico no válido.'
      this.showErrorModal();
    }
    else
    {
      usr.email = usr.email.toLowerCase();
      usr.username = usr.username.toLowerCase();

      this.authService.register(usr).subscribe(
        (respuesta: any) => {
          if (respuesta.email === -1)
          {
            this.isLoading = false;
            this.modalMsg = 'El email introducido ya existe.';
            this.showErrorModal();
          }
          else if (respuesta.email === -2)
          {
            this.isLoading = false;
            this.modalMsg = 'El código ya ha sido enviado al correo. Aceptelo para continuar.';
            this.showErrorModal();
          }
          else if (respuesta.email === -3)
            {
              this.isLoading = false;
              this.modalMsg = 'El username introducido ya existe.';
              this.showErrorModal();
            }
          else
          {
            this.isLoading = false;
            this.modalMsg = '¡Registro exitoso! Revise su correo.';
            this.showSuccessModal();
          }
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error al realizar la petición:', error);
        }
      );
    }
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
    }, 5000);
  }

  public showSuccessModal(): void
  {
    this.showSuccessModalFlag = true;
    setTimeout(() => {
      this.showSuccessModalFlag = false;
      this.goTo();
    }, 1000);
  }

  public check(email: string): void
  {
    this.authService.checkUser(email).subscribe(
      (respuesta: any) => {
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  public activateCookie(email: string, token: string): void
  {
    this.cookieService.setCookie(email, token);
  }

  public enterGoogle(): void
  {
    this.isLoading = true;
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {

        const user = result.user;

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (user.email != null && token != null && user.photoURL != null && user.displayName != null)
        {
          const loginUser: Userlogin = {
            name: user.displayName,
            surname: user.displayName,
            email: user.email,
            password: token,
            photo: user.photoURL,
          }
          this.loginGoogle(loginUser);
        }

        this.goTo();
      })
      .catch((error) => {
        this.isLoading = false;
        this.modalMsg = '¡Error! Ha sucedido un error con su inicio en Google. Inténtelo más tarde.';
        this.showErrorModal();
      });

  }

  public enterGitHub(): void
  {
    this.isLoading = true;
    const auth = getAuth();
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user: any = result.user;

        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (user.email != null && token != null && user.photoURL != null && user.reloadUserInfo !=null )
        {
          const loginUser: Userlogin = {
            name: user.reloadUserInfo.screenName,
            surname: user.reloadUserInfo.screenName,
            email: user.email,
            password: token,
            photo: user.photoURL,
          }
          this.loginGoogle(loginUser);
        }

        this.goTo();
      })
      .catch((error) => {
        this.isLoading = false;
        this.modalMsg = '¡Error! Ha sucedido un error con su inicio en GitHub. Inténtelo más tarde.';
        this.showErrorModal();
      });

  }


}
