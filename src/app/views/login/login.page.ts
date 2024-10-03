import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController} from '@ionic/angular';
import { AuthService } from '../../common/services/auth.service';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonCard, IonInput, IonSpinner, IonButtons, IonButton, IonIcon, IonImg , IonCardHeader, IonCardContent, IonCardTitle} from '@ionic/angular/standalone';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonList,
    IonItem,
    IonCard,
    IonInput,
    IonSpinner,
    IonButtons,
    IonButton,
    IonIcon,
    IonImg,
    IonCardHeader,
    IonCardContent,
    IonCardTitle
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
loginForm: FormGroup;
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  loginSuccess: boolean = false;

  constructor(
      private firestoreService: FirestoreService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    // private auth: Auth
  ) {
    this.loginForm = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  async login() {
    if (this.loginForm.valid) {
      const { dni, password } = this.loginForm.value;

      try {
        const user = await this.firestoreService.loginUser(dni, password);
        if (user) {
          const userId = localStorage.getItem('userId');
          console.log('Inicio de sesión exitoso:', userId);
          this.loginSuccess = true;
          await this.mostrarAlerta('Éxito', 'Inicio de sesión exitoso.');

          setTimeout(() => {
            this.router.navigateByUrl('/aplicaciones');
          }, 1000);
        } else {
          this.loginError = true;
          this.mostrarAlertaError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.mostrarAlertaError('Ocurrió un error al iniciar sesión.');
      }
    } else {
      this.mostrarAlertaError('Por favor, completa todos los campos correctamente.');
    }
  }





  // Función para mostrar una alerta de error
  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para mostrar una alerta de éxito
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
