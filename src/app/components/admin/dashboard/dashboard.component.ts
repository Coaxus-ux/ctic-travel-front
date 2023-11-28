import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, NavBarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  logout() {
    console.log('toggle');
  }
}
