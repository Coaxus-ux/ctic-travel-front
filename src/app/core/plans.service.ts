import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private readonly baseUrl = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() {
  }

  getAllPlans() {
    return axios({
      method: 'post',
      url: this.baseUrl + '/tourist-plans/get-all-admin',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        admin: {
          adminId: localStorage.getItem('adminId')
        }
      }
    })
  }

  createPlan(data: any) {
    data.admin = {
      adminId: localStorage.getItem('adminId')
    }
    data.isAvailable = false;
    return axios({
      method: 'post',
      url: this.baseUrl + '/tourist-plans/create',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: data
    })
  }

  getPlanById(id: string | null) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/tourist-plans/get-by-id',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        touristPlanId: id
      }
    })

  }

  getUnionPlanByIdDesti(id: string | null) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/tourist-destination-tourist-plans/get-by-tourist-plan',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        touristPlan: {
          touristPlanId: id
        }
      }
    })
  }

  getUnionPlanByIdAccom(id: string | null) {
    return axios({
      method: 'post',
      url: this.baseUrl + '/accommodationsTouristPlans/getAccommodationsTouristPlansByTouristPlan',
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        touristPlan: {
          touristPlanId: id
        }
      }
    })
  }

  changeAvailability(id: string, availability: boolean | null) {
    let url = '';
    if (availability) {
      url = '/tourist-plans/desactivate';
    } else {
      url = '/tourist-plans/activate';
    }
    return axios({
      method: 'post',
      url: this.baseUrl + url,
      headers: {Authorization: "Bearer " + localStorage.getItem('jwt'), "Content-Type": "application/json"},
      data: {
        touristPlanId: id
      }
    })
  }
}
