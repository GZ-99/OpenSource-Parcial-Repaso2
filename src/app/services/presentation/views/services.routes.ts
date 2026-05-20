import {Routes} from '@angular/router';

const incidentList = () => import('./incident-list/incident-list').then(m => m.IncidentList);
const incidentForm = () => import('./incident-form/incident-form').then(m => m.IncidentForm);
const rentalList = () => import('./rental-list/rental-list').then(m => m.RentalList);
const rentalForm = () => import('./rental-form/rental-form').then(m => m.RentalForm);
const vehicleList = () => import('./vehicle-list/vehicle-list').then(m => m.VehicleList);
const vehicleForm = () => import('./vehicle-form/vehicle-form').then(m => m.VehicleForm);

export const servicesRoutes: Routes = [
  { path: 'incident',              loadComponent: incidentList },
  { path: 'incident/new',          loadComponent: incidentForm },
  { path: 'incident/edit/:id',     loadComponent: incidentForm },
  { path: 'rental',              loadComponent: rentalList },
  { path: 'rental/new',          loadComponent: rentalForm },
  { path: 'rental/edit/:id',     loadComponent: rentalForm },
  { path: 'vehicle',           loadComponent: vehicleList },
  { path: 'vehicle/new',       loadComponent: vehicleForm },
  { path: 'vehicle/edit/:id',  loadComponent: vehicleForm }
];
