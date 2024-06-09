import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
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

  constructor
  (
    private authService: AuthService
  )
  {
  }

  public ngOnInit(): void
  {
    this.authService.getUser().subscribe(
      (data: UserProfile) => {
        this.profileData = data;
      },
      (error) => {
        this.showErrorModal('Error al cargar el perfil');
      }
    );
  }

  public onProfileSubmit(): void
  {
    if (this.validateProfileData())
    {
      this.update();
    }
    else
    {
      this.showErrorModal('Error al actualizar el perfil');
    }
  }

  private update(): void
  {
    this.authService.updateUser(this.profileData).subscribe(
      () => {
        this.showSuccessModal('Perfil actualizado con éxito');
        this.isEditing = false;
      },
      (error) => {
        this.showErrorModal('Error al actualizar el perfil');
      }
    );
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
