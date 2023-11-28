import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private readonly baseUrl = environment.baseUrl;

  private http = inject( HttpClient );
 public jwt = localStorage.getItem('jwt');
  getAllDestinations() {
    return axios({
      method: 'get',
      url: this.baseUrl + '/touristDestinations/getAllTouristDestinations',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json" }
    })
  }
  addDestination(country: string, state: string) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/touristDestinations/createTouristDestinations',
      headers: {Authorization: "Bearer " + this.jwt, "Content-Type": "application/json" },
      data:{
        touristDestinationCountry: country,
        touristDestinationState: state
      }
    })

  }

}
