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
  selector: 'app-incident-list',
  imports: [MatError, MatTable, MatHeaderCellDef, MatCellDef, MatColumnDef, MatHeaderCell,
    MatCell, MatHeaderRowDef, MatRowDef, MatButton, MatHeaderRow, MatRow, MatProgressSpinner],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentList {
  readonly store = inject(ServiceStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'vehicleId', 'rentalId', 'incidentType', 'registeredAt', 'estimatedRepairCost', 'priority', 'actions'];

  editIncident(id: number) {
    this.router.navigate(['/services', 'incidents', 'edit', id]).then();
  }

  deleteIncident(id: number) {
    this.store.deleteIncident(id);
  }
}
