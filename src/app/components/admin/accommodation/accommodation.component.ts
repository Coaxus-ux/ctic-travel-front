import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import {AccommodationsService} from "../../../core/accommodations.service";
import {LocationsService} from "../../../core/locations.service";
import {MatCardModule} from "@angular/material/card";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule],
  templateUrl: './accommodation.component.html'
})
export class AccommodationComponent implements OnInit {
  private AccommodationsService = inject(AccommodationsService);
  private LocationsService = inject(LocationsService);
  disableSelectState = new FormControl(true);
  disableSelectCity = new FormControl(true);
  public countries: any[] = [];
  countrySelect: any;
  public states: any[] = []
  public cities: any[] = []
  public selectedState: string = '';
  public selectedCity: string = '';
  public accommodationTypes: any[] = [];
  public accommodationList: any[] = [];
  public selectedAccommodationType: any;
  public accommodationName: string = '';
  public accommodationAddress: string = '';
  public accommodationPriceInput: number = 0;
  public accommodationCheckInSchedule: string = '';
  public accommodationCheckOutSchedule: string = '';
  public accommodationTypeNameC: string = '';
  public accommodationTypeRoomsC: number = 0;

  ngOnInit(): void {
    this.getCountries();
    this.getAccommodations();
    this.getAccommodationTypes();
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

  OnSelectCountry(event: any) {
    console.log(this.accommodationTypes)
    this.countrySelect = event;
    this.states = [];
    this.getStates();
  }

  getStates() {
    // @ts-ignore
    this.LocationsService.getStates(this.countrySelect).then((response) => {
      if (!response.data.error) {
        this.states = response.data.data.states;
        this.disableSelectState.setValue(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  selectState(event: any) {
    this.selectedState = event;
    this.cities = [];
    this.getCities();
    this.disableSelectCity.setValue(false);
  }

  selectCity(event: any) {
    this.selectedCity = event;
  }

  getCities() {
// @ts-ignore
    this.LocationsService.getCities(this.selectedState, this.countrySelect).then((response) => {
      if (!response.data.error) {
        if (response.data.data.length === 0) {
          this.cities = [this.selectedState]
          return;
        }
        this.cities = response.data.data

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getAccommodations() {
    // @ts-ignore
    this.AccommodationsService.getAccommodations().then((response) => {
      if (!response.data.error) {
        const data = response.data.data;
        this.accommodationList = []
        Object.keys(data).forEach((key) => {
          this.accommodationList.push({
            id: key,
            accommodationAddress: data[key].accommodationAddress,
            accommodationCountry: data[key].accommodationCountry,
            accommodationCity: data[key].accommodationCity,
            accommodationPrice: data[key].accommodationPrice,
            accommodationCheckInSchedule: data[key].accommodationCheckInSchedule,
            accommodationCheckOutSchedule: data[key].accommodationCheckOutSchedule,
            accommodationType: data[key].accommodationType,
            accommodationName: data[key].accommodationName,
            accommodationState: data[key].accommodationState,
            accommodationTypeRomms: data[key].accommodationTypeRomms,
          });
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  getAccommodationTypes() {
    // @ts-ignore
    this.AccommodationsService.getAccommodationTypes().then((response) => {
      if (response) {
        const data = response.data.data;
        this.accommodationTypes = []
        Object.keys(data).forEach((key) => {
          this.accommodationTypes.push({
            id: key,
            accommodationTypeName: data[key].accommodationTypeName,
            accommodationTypeRooms: data[key].accommodationTypeRooms,
          });
        });

      }
    }).catch((error) => {
      console.log(error);
    });
  }

  onSelectedAccommodationType(event: any) {
    this.selectedAccommodationType = event;
  }

  addAccommodations() {
    if (this.accommodationPriceInput < 0 || this.accommodationName === '' || this.accommodationAddress === '' || this.accommodationCheckInSchedule === '' || this.accommodationCheckOutSchedule === '' || this.selectedAccommodationType === '' || this.selectedCity === '' || this.selectedState === '' || this.countrySelect === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      })
      return;
    }
    const accommodation = {
      accommodationName: this.accommodationName,
      accommodationAddress: this.accommodationAddress,
      accommodationPrice: this.accommodationPriceInput,
      accommodationCheckInSchedule: this.accommodationCheckInSchedule + ':00',
      accommodationCheckOutSchedule: this.accommodationCheckOutSchedule + ':00',
      accommodationType: {
        accommodationTypeId: this.selectedAccommodationType
      },
      accommodationCountry: this.countrySelect,
      accommodationState: this.selectedState,
      accommodationCity: this.selectedCity,
    }
    // @ts-ignore
    this.AccommodationsService.addAccommodation(accommodation).then((response) => {
      if (response.data.successful) {
        Swal.fire({
          icon: 'success',
          title: 'Alojamiento agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.accommodationName = '';
        this.accommodationAddress = '';
        this.accommodationPriceInput = 0;
        this.accommodationCheckInSchedule = '';
        this.accommodationCheckOutSchedule = '';
        this.selectedAccommodationType = '';
        this.selectedCity = '';
        this.selectedState = '';
        this.countrySelect = '';
        this.getAccommodations();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  addAccommodationType() {
    if (this.accommodationTypeNameC === '' || this.accommodationTypeRoomsC < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      })
      return;
    }
    // @ts-ignore
    this.AccommodationsService.createAccommodationType(this.accommodationTypeNameC, this.accommodationTypeRoomsC).then((response) => {
      if (response.data.successful) {
        Swal.fire({
          icon: 'success',
          title: 'Tipo de alojamiento agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.accommodationTypeNameC = '';
        this.accommodationTypeRoomsC = 0;
        this.getAccommodationTypes();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
