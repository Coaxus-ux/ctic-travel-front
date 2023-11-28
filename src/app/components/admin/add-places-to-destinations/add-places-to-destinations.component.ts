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
import {count} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-places-to-destinations',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, MatFormFieldModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule],
  templateUrl: './add-places-to-destinations.component.html'
})
export class AddPlacesToDestinationsComponent implements OnInit {
  private DestinationsService = inject(DestinationsService);
  private LocationsService = inject(LocationsService);
  private route = inject(ActivatedRoute);
  public placeName: string = '';
  public placeDescription: string = '';
  public placeCity: string = '';
  public relatedPlaces: any = [];
  public destination: any = {
    id: '',
    touristDestinationCountry: '',
    touristDestinationState: '',
  };
  public cities: any = [];

  getParams() {
    return this.route.snapshot.paramMap.get('id');
  }

  onSelectedCity(event: any) {
    this.placeCity = event;
  }

  ngOnInit(): void {
    this.getDestinationById();
    this.getPlaces();
  }

  getDestinationById() {
    // @ts-ignore
    this.DestinationsService.getDestinationById(this.getParams()).then((response: any) => {
      const data = response.data.data;
      Object.keys(data).forEach((key) => {
        this.destination.id = data[key].touristDestinationId;
        this.destination.touristDestinationCountry = data[key].touristDestinationCountry;
        this.destination.touristDestinationState = data[key].touristDestinationState;
      });
      this.getCities(this.destination.touristDestinationState, this.destination.touristDestinationCountry);

    }).catch((error: any) => {
      console.log(error);
    });
  }

  getCities(state: string, country: string) {
    // @ts-ignore
    this.LocationsService.getCities(state, country).then((response: any) => {
      if (!response.data.error) {
        if (response.data.data.length === 0) {
          this.cities = [state]
          return;
        }
        this.cities = response.data.data;
      }
    }).catch((error: any) => {
      console.log(error);
    });
  }

  createPlace() {
    if (this.placeName === '' || this.placeDescription === '' || this.placeCity === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Llena todos los campos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      return;
    }
    const data = {
      atractivePlaceName: this.placeName,
      atractivePlaceDescription: this.placeDescription,
      atractivePlaceCountry: this.destination.touristDestinationCountry,
      atractivePlaceState: this.destination.touristDestinationState,
      atractivePlaceCity: this.placeCity,
      touristDestination: {
        touristDestinationId: this.destination.id
      }

    }
    this.DestinationsService.addPlaces(data).then((response: any) => {
      if (response.data.successful) {
        Swal.fire({
          title: 'Success!',
          text: 'Lugar agregado',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.placeName = '';
        this.placeDescription = '';
        this.placeCity = '';
        this.getPlaces();
      }
    }).catch((error: any) => {
      Swal.fire({
        title: 'Error!',
        text: 'Algo salio mal',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

    });
  }

  getPlaces() {
    // @ts-ignore
    this.DestinationsService.getPlacesByDestinationId(this.getParams()).then((response: any) => {

      if (!response.data.error) {
        const data = response.data.data;
        this.relatedPlaces = [];
        Object.keys(data).forEach((key) => {
          this.relatedPlaces.push({
            id: data[key].atractivePlaceId,
            atractivePlaceName: data[key].atractivePlaceName,
            atractivePlaceDescription: data[key].atractivePlaceDescription,
            atractivePlaceCountry: data[key].atractivePlaceCountry,
            atractivePlaceState: data[key].atractivePlaceState,
            atractivePlaceCity: data[key].atractivePlaceCity,
          })
        });

      }
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
