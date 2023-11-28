import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './accommodation.component.html'
})
export class AccommodationComponent {

}
