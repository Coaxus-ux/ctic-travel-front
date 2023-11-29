import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );

  getCountries() {
    const jwt =  localStorage.getItem('jwt');
    return axios({
      method: 'get',
      url: this.baseUrl + '/api/v1/location/countries-cities',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json" }
    })
  }
  getStates(country: string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/api/v1/location/contry-states',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json" },
      data:{
        country: country
      }
    })
  }
  getCities(state: string, country:string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/api/v1/location/states-cities',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json" },
      data:{
        state: state,
        country: country
      }
    })
  }
}
