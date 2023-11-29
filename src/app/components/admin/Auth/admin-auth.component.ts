import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormBuilder, FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AuthAdminService} from "../../../core/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'admin-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './admin-auth.component.html'
})
export class AdminAuthComponent {
  private authAdminService = inject(AuthAdminService);
private router = inject(Router);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();


  login() {
    this.authAdminService.login(this.emailFormControl.value!, this.passwordFormControl.value!).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales no validas',
          })
        }
      },
      (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales no validas',
          })
      }
    );
  }

  redirec() {
    this.router.navigate(['/admin/register']);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
