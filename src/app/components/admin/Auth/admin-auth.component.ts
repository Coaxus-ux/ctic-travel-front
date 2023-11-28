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

@Component({
  selector: 'admin-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './admin-auth.component.html'
})
export class AdminAuthComponent {
  private authAdminService = inject(AuthAdminService);

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();


  login() {
    this.authAdminService.login(this.emailFormControl.value!, this.passwordFormControl.value!).subscribe(
      (response) => {
        if (response) {
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        console.log('Login failed');
      }
    );
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
