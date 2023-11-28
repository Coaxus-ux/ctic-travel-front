import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TransportService} from "../../../core/transport.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {AxiosResponse} from "../../../interfaces/axiosResponse";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, NavBarComponent, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './transport.component.html',
})
export class TransportComponent implements OnInit {
  private TransportService = inject(TransportService);
  public transports: any[] = [];
  transport: string = '';

  ngOnInit(): void {
    this.getTransport();
  }

  addTransport() {

    if(this.transport == ''){
      Swal.fire({ title: 'Error!', text: 'El metodo de transporte no puede estar vacio', icon: 'error', confirmButtonText: 'Ok' })
      return;
    }

    // @ts-ignore
    this.TransportService.addTransport(this.transport).then((response: AxiosResponse) => {
      if (response.data.successful) {
        this.getTransport();
        this.transport = '';
        Swal.fire({
          title: 'Success!',
          text: 'Metodo de transporte agregado',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      if (!response.data.successful) {
        alert(response.data.message);
      }
    }).catch((error) => {
      Swal.fire({ title: 'Error!', text: 'Error al agregar el metodo de transporte', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  getTransport() {

    // @ts-ignore
    this.TransportService.getTransport().then((response: AxiosResponse)  => {
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

}
