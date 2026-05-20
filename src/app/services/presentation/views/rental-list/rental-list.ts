import { Component, ChangeDetectionStrategy } from '@angular/core';
import {inject} from '@angular/core';
import {ServiceStore} from '../../../application/service-store';
import {Router} from '@angular/router';
import {MatError} from '@angular/material/form-field';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rental-list',
  imports: [MatError, MatTable, MatHeaderCellDef, MatCellDef, MatColumnDef, MatHeaderCell,
    MatCell, MatHeaderRowDef, MatRowDef, MatButton, MatHeaderRow, MatRow, MatProgressSpinner],
  templateUrl: './rental-list.html',
  styleUrl: './rental-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RentalList {
  readonly store = inject(ServiceStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'vehicleId', 'clientId', 'startDate', 'endDate', 'durationDays', 'totalCost', 'status', 'actions'];

  editRental(id: number) {
    this.router.navigate(['/services', 'rentals', 'edit', id]).then();
  }

  deleteRental(id: number) {
    this.store.deleteRental(id);
  }
}
