import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environments';
import {catchError, map, Observable, throwError} from "rxjs";
import {LoginResponseI} from "../interfaces/AuthI"
@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private readonly baseUrl = environment.baseUrl;

  private http = inject( HttpClient );

  login(email: string, password: string): Observable<Boolean> {
    const url = `${this.baseUrl}/admins/login`;
    const body = {"adminEmail": email, "adminPassword": password};
    return this.http.post<LoginResponseI>(url, body).pipe(
      map((response: LoginResponseI) => {
        if (response.successful) {
          localStorage.setItem('adminId', response.data.adminId);
          localStorage.setItem('jwt', response.jwt);
          return true;
        }
        return false;
      }),
      catchError( err => throwError( () => err.error.message ))
    );
  }
}
