import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from "@angular/material/icon";
import {PlansService} from "../../../core/plans.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, NavBarComponent, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private plansService = inject(PlansService);
  private router = inject(Router);
  public plans: any[] = [];

  newPlan() {
    this.router.navigate(['/admin/add-plans']);
  }
  editPlan(planId: any) {
    console.log(planId);
    this.router.navigate(['/admin/edit-plans', planId]);
  }

  ngOnInit(): void {
    this.getAllPlans();
  }


  getAllPlans() {
    // @ts-ignore
    this.plansService.getAllPlans().then((response) => {
      if (response.data.successful) {
        const data = response.data.data;
        this.plans = [];
        Object.keys(data).forEach((key) => {
          this.plans.push({
            touristPlanId: data[key].touristPlanId,
            touristPlanPrice: data[key].touristPlanPrice,
            touristPlanName: data[key].touristPlanName,
            touristPlanDescription: data[key].touristPlanDescription,
            touristPlanCountry: data[key].touristPlanCountry,
            transportMethod: data[key].transportMethod,
            touristPlanStart: data[key].touristPlanStart,
            touristPlanEnd: data[key].touristPlanEnd,
          });
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
