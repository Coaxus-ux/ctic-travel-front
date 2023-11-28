import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {LocationsService} from "../../../core/locations.service";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DestinationsService} from "../../../core/destinations.service";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tourist-destinations',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatButtonModule, MatSelectModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tourist-destinations.component.html'
})
export class TouristDestinationsComponent implements OnInit {
  private LocationsService = inject(LocationsService);
  private DestinationsService = inject(DestinationsService);
  public countries: any[] = [];
  public states: any[] = [];
  public destinations: any[] = [];
  public countrySelect: string = '';
  public selectedState: any;
  disableSelect = new FormControl(true);

  ngOnInit(): void {
    this.getCountries();
    this.getDestinations();
  }

  OnSelectCountry(event: any) {
    this.countrySelect = event;
    this.states = [];
    this.getStates();
  }

  getCountries() {
    // @ts-ignore
    this.LocationsService.getCountries().then((response) => {
      if (!response.data.error) {
        this.countries = response.data.data;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getDestinations() {
    // @ts-ignore
    this.DestinationsService.getAllDestinations().then((response) => {
      if (response.data.successful) {
        this.destinations = []
        const data = response.data.data;
        Object.keys(data).forEach((key) => {
          this.destinations.push({
            id: key,
            touristDestinationCountry: data[key].touristDestinationCountry,
            touristDestinationState: data[key].touristDestinationState,
          });
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getStates() {
    // @ts-ignore
    this.LocationsService.getStates(this.countrySelect).then((response) => {
      if (!response.data.error) {

        this.states = response.data.data.states;
        this.disableSelect.setValue(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  selectState(event: any) {
    this.selectedState = event;
  }

  addDestination() {
    if (this.selectedState == '' || this.selectedState == null) {
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    this.DestinationsService.addDestination(this.countrySelect, this.selectedState).then((response) => {
      if (response.data.successful) {
        this.getDestinations();
        this.countrySelect = '';
        this.selectedState = '';
        Swal.fire({
          title: 'Success!',
          text: 'Destino turistico agregado',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Error al agregar el destino turistico',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });
  }
}
