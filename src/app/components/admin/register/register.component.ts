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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private router = inject(Router);

  public person = {
    nameUser: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  }


  register() {
    let {nameUser, lastName, email, password, phone} = this.person;
    if (nameUser === '' || lastName === '' || email === '' || password === '' || phone === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      })
      return;
    }
  }

  redirec() {
    this.router.navigate(['/admin/auth']);
  }
}
