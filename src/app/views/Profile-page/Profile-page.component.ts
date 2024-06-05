import { Component } from '@angular/core';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  profileData = {
    email: 'Adrirodlop25@gmail.com',
    username: 'Sojo25',
    firstName: 'Adrian',
    lastName: 'Rodriguez Lopez',
    image: ''
  };

  isEditing = false;
  showErrorModalFlag = false;
  showSuccessModalFlag = false;
  modalMsg = '';

  onProfileSubmit() {
    if (this.validateProfileData()) {
      // Actualizar datos
      this.showSuccessModal('Perfil actualizado con éxito');
      this.isEditing = false;
    } else {
      this.showErrorModal('Error al actualizar el perfil');
    }
  }

  validateProfileData() {
    return this.profileData.email && this.profileData.username &&
           this.profileData.firstName && this.profileData.lastName;
  }

  showErrorModal(message: string) {
    this.modalMsg = message;
    this.showErrorModalFlag = true;
    setTimeout(() => this.showErrorModalFlag = false, 3000);
  }

  showSuccessModal(message: string) {
    this.modalMsg = message;
    this.showSuccessModalFlag = true;
    setTimeout(() => this.showSuccessModalFlag = false, 3000);
  }

  onUploadImage() {
    const fileInput = document.getElementById('fileInput');
    fileInput!.click();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileData.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
