import { Routes } from '@angular/router';
import {AdminAuthComponent} from './components/admin/Auth/admin-auth.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {TouristDestinationsComponent} from './components/admin/tourist-destinations/tourist-destinations.component';
import {TransportComponent} from './components/admin/transport/transport.component';
import {NavBarComponent} from "./components/admin/nav-bar/nav-bar.component";
import {AccommodationComponent} from "./components/admin/accommodation/accommodation.component";
import {AddPlacesToDestinationsComponent} from "./components/admin/add-places-to-destinations/add-places-to-destinations.component";
import {AddPlansComponent} from "./components/admin/add-plans/add-plans.component";
import {EditPlansComponent} from "./components/admin/edit-plans/edit-plans.component";
export const routes: Routes = [
  {
    path: 'admin/auth',
    title: 'Admin Auth',
    component: AdminAuthComponent
  },
  {
    path: 'admin/dashboard',
    title: 'Admin Dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin/tourist-destinations',
    title: 'Tourist Destinations',
    component: TouristDestinationsComponent
  },
  {
    path: 'admin/transport',
    title: 'Transport',
    component: TransportComponent
  },
  {
    path: 'admin/nav-bar',
    title: 'Nav Bar',
    component: NavBarComponent
  },
  {
    path: 'admin/accommodation',
    title: 'Accommodation',
    component: AccommodationComponent
  },
  {
    path: 'admin/add-places-to-destinations/:id',
    title: 'Add Places To Destinations',
    component: AddPlacesToDestinationsComponent
  },
  {
    path: 'admin/add-plans',
    title: 'Add Plans',
    component: AddPlansComponent
  },
  {
    path: 'admin/edit-plans/:planId',
    title: 'Edit Plans',
    component: EditPlansComponent
  }
];

