import {Component, inject, OnInit} from '@angular/core';
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
export class NavBarComponent implements OnInit{
  private router = inject(Router);

  logout(route: string) {
    if(route === 'logout') {
      console.log('logout');
      localStorage.removeItem('jwt');
      localStorage.removeItem('adminId');
      this.router.navigate(['/admin/auth']);
      return;
    }
    this.router.navigate([route]);
  }

  ngOnInit(): void {
  }
}
