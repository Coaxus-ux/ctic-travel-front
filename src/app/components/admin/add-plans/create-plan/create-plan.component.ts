import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import {LocationsService} from "../../../../core/locations.service";
import {TransportService} from "../../../../core/transport.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatButtonModule} from "@angular/material/button";
import Swal from "sweetalert2";
import {AxiosResponse} from "../../../../interfaces/axiosResponse";
import {PlansService} from "../../../../core/plans.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule, MatSelectModule, MatButtonModule],
  templateUrl: './create-plan.component.html'
})
export class CreatePlanComponent implements OnInit {
  private LocationsService = inject(LocationsService);
  private TransportService = inject(TransportService);
  private router = inject(Router);
  private PlansService = inject(PlansService);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public planName: string = '';
  countrySelect: string = '';
  planDescription: string = '';
  planPrice: any;
  public countries: any[] = []
  public transports: any[] = [];
  public selectedTransport: any;
  public PackagesAvailable: any;

  OnSelectCountry(event: any) {
    this.countrySelect = event;
  }

  OnSelectTransport(event: any) {
    this.selectedTransport = event;
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

  getTranspors() {
    // @ts-ignore
    this.TransportService.getTransport().then((response: AxiosResponse) => {
      if (response.data.successful) {
        const data = response.data.data;
        this.transports = [];
        Object.keys(data).forEach((key) => {
          this.transports.push({
            id: key,
            transportMethodType: data[key].transportMethodType
          });
        });
        return;
      }
    });

  }

  ngOnInit(): void {
    this.getCountries();
    this.getTranspors();
  }

  createPlan() {
    if (this.planName === '' || this.planDescription === '' || this.planPrice === 0 || this.countrySelect === '' || this.range.value.start === null || this.range.value.end === null || this.selectedTransport === '' || this.PackagesAvailable === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    const plan = {
      touristPlanName: this.planName,
      touristPlanDescription: this.planDescription,
      touristPlanPrice: this.planPrice,
      touristPlanStart: this.range.value.start?.toISOString(),
      touristPlanEnd: this.range.value.end?.toISOString(),
      touristPlanCountry: this.countrySelect,
      transportMethod: {
        transportMethodId: this.selectedTransport
      },
      touristPlanPackagesAvailable: this.PackagesAvailable
    }
    // @ts-ignore
    this.PlansService.createPlan(plan).then((response: AxiosResponse) => {
      if (response.data.successful) {
        Swal.fire({
          title: 'Success!',
          text: 'Plan creado',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.planName = '';
        this.planDescription = '';
        this.planPrice = 0;
        this.countrySelect = '';
        this.range.value.start = null;
        this.range.value.end = null;
        this.selectedTransport = '';
        this.PackagesAvailable = 0;
      }

    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Error al crear el plan',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });


  }

  backToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}


function convertDate(date: Date) {
  return date.toISOString()
}
