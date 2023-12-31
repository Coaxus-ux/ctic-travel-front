import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private readonly baseUrl = environment.baseUrl;


  private http = inject(HttpClient);

  constructor() {
  }

  getAccommodations() {
    return axios({
      method: 'get',
      url: this.baseUrl + '/accommodation/getAccommodations',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"}
    })
  }

  getAccommodationTypes() {
    return axios({
      method: 'get',
      url: this.baseUrl + '/accommodationTypes/getAccommodationTypes',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"}
    })
  }

  addAccommodation(data: any) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/accommodation/createAccommodation',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: data
    })
  }

  createAccommodationType(name: string, rooms: number) {
    const data = {
      accommodationTypeName: name,
      accommodationTypeRooms: rooms
    }
    return axios({
      method: 'post',
      url: this.baseUrl + '/accommodationTypes/addAccommodationType',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: data
    })
  }
  getAccommodationByLocation( country: string, state: string, city: string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/accommodation/getAccommodationsByLocation',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        accommodationCountry: country,
        accommodationState: state,
        accommodationCity: city
      }
    })
  }
  addAccommodationPlan(data: any) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/accommodationsTouristPlans/addAccommodationsTouristPlans',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: data
    })
  }


}
