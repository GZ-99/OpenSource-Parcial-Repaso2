import { Component, ChangeDetectionStrategy } from '@angular/core';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {ServiceStore} from '../../../application/service-store';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicle-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleList {
  readonly store = inject(ServiceStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'make', 'model', 'mileageKm', 'dailyRate', 'vehicleType', 'status', 'actions'];

  editVehicle(id: number) {
    this.router.navigate(['/services', 'vehicles', 'edit', id]).then();
  }

  deleteVehicle(id: number) {
    this.store.deleteVehicle(id);
  }
}
