import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private readonly baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  public jwt = localStorage.getItem('jwt');

  getAllDestinations() {
    return axios({
      method: 'get',
      url: this.baseUrl + '/touristDestinations/getAllTouristDestinations',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"}
    })
  }

  addDestination(country: string, state: string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/touristDestinations/createTouristDestinations',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},
      data: {
        touristDestinationCountry: country,
        touristDestinationState: state
      }
    })
  }

  getDestinationById(id: string | null) {
    if (id == null) {
      return null;
    }
    return axios({
      method: 'post',
      url: this.baseUrl + '/touristDestinations/getTouristDestinationsById',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},

      data: {
        touristDestinationId: id
      }
    })
  }

  addPlaces(data: any) {
    console.log("data")
    console.log(data)
    return axios({
      method: 'post',
      url: this.baseUrl + '/attractive-places/create',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},
      data: data
    })
  }

  getPlacesByDestinationId(id: string | null) {
    if (id == null) {
      return null;
    }
    return axios({
      method: 'post',
      url: this.baseUrl + '/attractive-places/get-by-tourist-destination',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},
      data: {
        touristDestination: {
          touristDestinationId: id
        }
      }
    })
  }
  getDestinationByCountry(country: string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/touristDestinations/getTouristDestinations',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},
      data: {
        touristDestinationCountry: country,
      }
    })
  }

  addDestinationToPlan(data: any) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/tourist-destination-tourist-plans/add',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json"},
      data: data
    })
  }

}
