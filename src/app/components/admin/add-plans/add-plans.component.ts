import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePlanComponent} from "./create-plan/create-plan.component";

@Component({
  selector: 'app-add-plans',
  standalone: true,
  imports: [CommonModule, CreatePlanComponent],
  templateUrl: './add-plans.component.html'
})
export class AddPlansComponent {

}
