import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environments';
import {catchError, map, Observable, throwError} from "rxjs";
import {TransportI} from "../interfaces/TrasnportI";
import axios from "axios";
import {AxiosResponse} from "../interfaces/axiosResponse";
@Injectable({
  providedIn: 'root'
})
export class TransportService {
   private readonly baseUrl = environment.baseUrl;
  private http = inject( HttpClient );
  constructor() { }

  async getTransport(): Promise<Observable<AxiosResponse>>  {
    const jwt =  localStorage.getItem('jwt');
    return axios({
      method: 'get',
      url: `${this.baseUrl}/api/v1/transport-methods/types`,
      headers: {Authorization: "Bearer " + jwt, "Content-Type": "application/json" }
    })
  }

  async addTransport(transport: string): Promise<Observable<TransportI>> {
    const jwt =  localStorage.getItem('jwt');
    return axios({
      method: 'post',
      url: `${this.baseUrl}/api/v1/transport-methods/create`,
      headers: {Authorization: "Bearer " + jwt, "Content-Type": "application/json" },
      data: {
        transportMethodType: transport
      }
    })
  }
}
