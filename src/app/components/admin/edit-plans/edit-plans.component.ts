import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DestinationsService} from "../../../core/destinations.service";
import {ActivatedRoute} from "@angular/router";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {LocationsService} from "../../../core/locations.service";

@Component({
  selector: 'app-edit-plans',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, MatFormFieldModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule],
  templateUrl: './edit-plans.component.html'
})
export class EditPlansComponent implements OnInit{
  private DestinationsService = inject(DestinationsService);
  private LocationsService = inject(LocationsService);
  private route = inject(ActivatedRoute);
  getParams() {
    return this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }
}
