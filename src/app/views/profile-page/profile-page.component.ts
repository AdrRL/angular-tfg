import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy
{
  public profileData: UserProfile = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    record: [],
    photo: ''
  };

  public isEditing = false;
  public showErrorModalFlag = false;
  public showSuccessModalFlag = false;
  public modalMsg = '';
  public isLoading = false;

  private subscriptions: Subscription[] = [];

  constructor
  (
    private authService: AuthService,
    private cookieService: CookieService
  )
  {
  }

  public ngOnDestroy()
  {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public ngOnInit(): void
  {
    // const userData = this.cookieService.getCookie('user-data');
    // if (userData)
    //   {
    //   this.profileData = JSON.parse(userData);
    // }
    // else
    // {
    //   this.loadUserProfile();
    // }
    this.loadUserProfile();
  }


  private loadUserProfile(): void
  {
    this.isLoading = true;
    const subscription = this.authService.getUser().subscribe(
      (data: UserProfile) => {
        this.profileData = data;
        // this.cookieService.setCookie('user-data', JSON.stringify(data));
        this.isLoading = false;
      },
      (error) => {
        this.showErrorModal('Error al cargar el perfil');
        this.isLoading = false;
      }
    );

    this.subscriptions.push(subscription);
  }


  public onProfileSubmit(): void
  {
    if (this.validateProfileData())
    {
      this.update();
    }
    else
    {
      this.showErrorModal('Algún campo no se encuentra cumplimentado.');
    }
  }

  private update(): void
  {
    const subscription = this.authService.updateUser(this.profileData).subscribe(
      () => {
        this.showSuccessModal('Perfil actualizado con éxito.');
        this.loadUserProfile();
        this.isEditing = false;
      },
      (error) => {
        this.showErrorModal('Error al actualizar el perfil.');
      }
    );

    this.subscriptions.push(subscription);
  }

  public validateProfileData(): boolean
  {
    if (this.profileData.username && this.profileData.firstName && this.profileData.lastName)
    {
      this.profileData.username = this.profileData.username.toLowerCase();
      return true;
    }
    return false;
  }

  public showErrorModal(message: string): void
  {
    this.modalMsg = message;
    this.showErrorModalFlag = true;
    setTimeout(() => this.showErrorModalFlag = false, 3000);
  }

  public showSuccessModal(message: string): void
  {
    this.modalMsg = message;
    this.showSuccessModalFlag = true;
    setTimeout(() => this.showSuccessModalFlag = false, 3000);
  }

  public onUploadImage(): void
  {
    const fileInput = document.getElementById('fileInput');
    fileInput!.click();
  }

  public onFileChange(event: any): void
  {
    const file = event.target.files[0];
    if (file)
    {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileData.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
