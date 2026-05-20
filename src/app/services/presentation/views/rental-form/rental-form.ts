import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceStore} from '../../../application/service-store';
import {Rental} from '../../../domain/model/rental.entity';
import {Vehicle} from '../../../domain/model/vehicle.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-rental-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './rental-form.html',
  styleUrl: './rental-form.css',
})
export class RentalForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ServiceStore);

  form = this.fb.group({
    vehicleId: new FormControl<number | null>(null),
    clientId: new FormControl<number | null>(null),
    startDate: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    endDate: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    durationDays: new FormControl<number | null>(null),
    totalCost: new FormControl<number | null>(null),
    status: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });
  vehicles = this.store.vehicles;
  isEdit = false;
  rentalId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.rentalId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.rentalId;
      if (this.isEdit) {
        const rental = this.store.rentals().find(c => c.id === this.rentalId);
        if (rental) {
          this.form.patchValue({
            vehicleId: rental.vehicleId,
            clientId: rental.clientId,
            startDate: rental.startDate,
            endDate: rental.endDate,
            durationDays: rental.durationDays,
            totalCost: rental.totalCost,
            status: rental.status
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const vehicle: Vehicle | null = this.store.getVehicleById(this.form.value.vehicleId)() ?? null;
    const rental: Rental = new Rental({
      id: this.rentalId ?? 0,
      vehicleId: this.form.value.vehicleId ?? 0,
      clientId: this.form.value.clientId ?? 0,
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate!,
      durationDays: this.form.value.durationDays!,
      totalCost: this.form.value.totalCost!,
      status: this.form.value.status!,
      vehicle: vehicle ?? null
    });

    if (this.isEdit) {
      this.store.updateRental(rental);
    } else {
      this.store.addRental(rental);
    }

    this.router.navigate(['services/rentals']).then();
  }
}
