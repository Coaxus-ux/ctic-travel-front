import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  private router = inject(Router);

  logout(route: string) {
    if(route === 'logout') {
      localStorage.removeItem('token');
      return;
    }
    this.router.navigate([route]);
  }
}
