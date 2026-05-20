import { Component, ChangeDetectionStrategy } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceStore} from '../../../application/service-store';
import {Incident} from '../../../domain/model/incident.entity';
import {Rental} from '../../../domain/model/rental.entity';
import {Vehicle} from '../../../domain/model/vehicle.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-incident-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './incident-form.html',
  styleUrl: './incident-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ServiceStore);

  form = this.fb.group({
    vehicleId: new FormControl<number | null>(null),
    rentalId: new FormControl<number | null>(null),
    incidentType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    registeredAt: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    estimatedRepairCost: new FormControl<number | null>(null),
    priority: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  vehicles = this.store.vehicles;
  rentals = this.store.rentals;
  isEdit = false;
  incidentId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.incidentId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.incidentId;
      if (this.isEdit) {
        const incident = this.store.incidents().find(c => c.id === this.incidentId);
        if (incident) {
          this.form.patchValue({
            vehicleId: incident.vehicleId,
            rentalId: incident.rentalId,
            incidentType: incident.incidentType,
            registeredAt: incident.registeredAt,
            estimatedRepairCost: incident.estimatedRepairCost,
            priority: incident.priority
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const vehicle: Vehicle | null = this.store.getVehicleById(this.form.value.vehicleId)() ?? null;
    const rental: Rental | null = this.store.getRentalById(this.form.value.rentalId)() ?? null;
    const incident: Incident = new Incident({
      id: this.incidentId ?? 0,
      vehicleId: this.form.value.vehicleId ?? 0,
      rentalId: this.form.value.rentalId ?? 0,
      incidentType: this.form.value.incidentType!,
      registeredAt: this.form.value.registeredAt!,
      estimatedRepairCost: this.form.value.estimatedRepairCost!,
      priority: this.form.value.priority!,
      vehicle: vehicle ?? null,
      rental: rental ?? null
    });

    if (this.isEdit) {
      this.store.updateIncident(incident);
    } else {
      this.store.addIncident(incident);
    }

    this.router.navigate(['/services', 'incidents']).then();
  }
}
