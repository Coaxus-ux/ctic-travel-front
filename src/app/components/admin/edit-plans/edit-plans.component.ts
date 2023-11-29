import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DestinationsService} from "../../../core/destinations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {LocationsService} from "../../../core/locations.service";
import {PlansService} from "../../../core/plans.service";
import {AccommodationsService} from "../../../core/accommodations.service";

@Component({
  selector: 'app-edit-plans',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatButtonModule, MatFormFieldModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule],
  templateUrl: './edit-plans.component.html'
})
export class EditPlansComponent implements OnInit {
  private DestinationsService = inject(DestinationsService);
  private LocationsService = inject(LocationsService);
  private PlansService = inject(PlansService);
  private AccommodationsService = inject(AccommodationsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public plan: any = []
  public destinations: any = []
  public destinationSelectId: string = '';
  disableSelectAccommodation = new FormControl(true);
  disableSelectCity = new FormControl(true);
  public cities: any[] = [];
  private selectedState: string = '';
  public accommodations: any[] = [];
  public accommodationSelectId: string = '';
  public relatedPlaces: any = [];
  public isAvailable: boolean = false;
  getParams() {
    return this.route.snapshot.paramMap.get('planId');
  }

  getDestinationByCountry(country: string) {
    return this.DestinationsService.getDestinationByCountry(country).then((response: any) => {
      const data = response.data.data;
      Object.keys(data).forEach((key) => {
        this.destinations.push({
          id: data[key].touristDestinationId,
          touristDestinationCountry: data[key].touristDestinationCountry,
          touristDestinationState: data[key].touristDestinationState,
        });
      });
    });
  }

  getPlandById() {
    // @ts-ignore
    this.PlansService.getPlanById(this.getParams()).then((response: any) => {
      const data = response.data.data;
      Object.keys(data).forEach((key) => {
        this.plan.id = key;
        this.plan.touristPlanCountry = data[key].touristPlanCountry;
        this.plan.touristPlanName = data[key].touristPlanName;
        this.plan.touristPlanDescription = data[key].touristPlanDescription;
        this.plan.isAvailable = data[key].isAvailable;
      });
      this.getDestinationByCountry(this.plan.touristPlanCountry)
      this.isAvailable = this.plan.isAvailable;
      console.log(this.isAvailable)
      this.getRecord();
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getPlandById();
  }

  OnChangeSDestination(id: any) {
    this.destinationSelectId = id;
    this.selectedState = this.destinations.filter((destination: any) => destination.id === this.destinationSelectId)[0].touristDestinationState
    this.getCities();
  }

  OnChangeSAccomodations(value: any) {
    this.accommodationSelectId = value;
  }

  getAccommodations() {
    const country = this.plan.touristPlanCountry;
    const state = this.selectedState
    const city = this.plan.touristPlanCity
    // @ts-ignore
    this.AccommodationsService.getAccommodationByLocation(country, state, city).then((response) => {
      if (!response.data.error) {
        const data = response.data.data;
        this.accommodations = []
        Object.keys(data).forEach((key) => {
          this.accommodations.push({
            id: key,
            accommodationName: data[key].accommodationName,
            accommodationCountry: data[key].accommodationCountry,
            accommodationState: data[key].accommodationState,
            accommodationCity: data[key].accommodationCity,
            accommodationType: data[key].accommodationType,
            accommodationTypeRomms: data[key].accommodationTypeRomms,
            accommodationPrice: data[key].accommodationPrice,
          });
        });
        this.disableSelectAccommodation.setValue(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  selectCity(city: string) {
    this.plan.touristPlanCity = city;
    this.getAccommodations();
  }

  getCities() {
// @ts-ignore
    this.LocationsService.getCities(this.selectedState, this.plan.touristPlanCountry).then((response) => {
      if (!response.data.error) {
        if (response.data.data.length === 0) {
          this.cities = [this.selectedState]
          return;
        }
        this.cities = response.data.data
        this.disableSelectCity.setValue(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  addRecord() {
    this.destinationsPlan();
    this.accommodationsPlan();
    this.getRecord();
  }

  destinationsPlan() {
    const data = {
      touristDestination: {
        touristDestinationId: this.destinationSelectId
      },

      touristPlan: {
        touristPlanId: this.plan.id

      }
    }
    this.DestinationsService.addDestinationToPlan(data).then((response) => {
      console.log(response)
    }).catch((error) => {
    });
  }

  accommodationsPlan() {
    const data = {
      accommodation: {
        accommodationId: this.accommodationSelectId
      },
      touristPlan: {
        touristPlanId: this.plan.id
      }
    }
    this.AccommodationsService.addAccommodationPlan(data).then((response) => {
      console.log(response)
    }).catch((error) => {});
  }

  getRecord() {
    this.PlansService.getUnionPlanByIdAccom(this.plan.id).then((response) => {
      const data = response.data.data;
      this.relatedPlaces= [];
      Object.keys(data).forEach((key) => {
        this.relatedPlaces.push({
          id: key,
          accommodationState: data[key].accommodationState,
          accommodationCity: data[key].accommodationCity,
          accommodationName: data[key].accommodationName,
        });
      });


      console.log(this.relatedPlaces)
    }).catch((error) => {
      console.log(error);
    });
  }

  changeAvailable() {

    this.PlansService.changeAvailability(this.plan.id, this.plan.isAvailable).then((response) => {
      console.log(response)
      this.getPlandById();
    }).catch((error) => {
      console.log(error);
    });

  }

  back() {
    this.router.navigate(['/admin/dashboard']);
  }
}
