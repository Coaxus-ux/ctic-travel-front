import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import Swal from "sweetalert2";
import {AuthAdminService} from "../../../core/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private router = inject(Router);
  private authAdminService = inject(AuthAdminService);

  public person = {
    adminName: '',
    adminLastName: '',
    adminEmail: '',
    adminPassword: '',
    adminPhone: '',
  }


  register() {
    let {adminName, adminLastName, adminEmail, adminPassword, adminPhone} = this.person;
    if (adminName === '' || adminLastName === '' || adminEmail === '' || adminPassword === '' || adminPhone === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      })
      return;
    }
    this.authAdminService.register(this.person).then((response: any) => {
      if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        })
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Registro exitoso',
      })
      this.router.navigate(['/admin/auth']);
    }).catch((error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar',
      })
    });

  }

  redirec() {
    this.router.navigate(['/admin/auth']);
  }
}
