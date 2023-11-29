import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {
  private router = inject(Router);

  users(){
    this.router.navigate(['/users']);
  }
  admins(){
    this.router.navigate(['/admin/auth']);
  }

}
