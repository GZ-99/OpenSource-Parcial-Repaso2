import {Routes} from '@angular/router';

const incidentList = () => import('./incident-list/incident-list').then(m => m.IncidentList);
const incidentForm = () => import('./incident-form/incident-form').then(m => m.IncidentForm);
const rentalList = () => import('./rental-list/rental-list').then(m => m.RentalList);
const rentalForm = () => import('./rental-form/rental-form').then(m => m.RentalForm);
const vehicleList = () => import('./vehicle-list/vehicle-list').then(m => m.VehicleList);
const vehicleForm = () => import('./vehicle-form/vehicle-form').then(m => m.VehicleForm);

export const servicesRoutes: Routes = [
  { path: 'incidents',              loadComponent: incidentList },
  { path: 'incidents/new',          loadComponent: incidentForm },
  { path: 'incidents/edit/:id',     loadComponent: incidentForm },
  { path: 'rentals',              loadComponent: rentalList },
  { path: 'rentals/new',          loadComponent: rentalForm },
  { path: 'rentals/edit/:id',     loadComponent: rentalForm },
  { path: 'vehicles',           loadComponent: vehicleList },
  { path: 'vehicles/new',       loadComponent: vehicleForm },
  { path: 'vehicles/edit/:id',  loadComponent: vehicleForm }
];
