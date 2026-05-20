import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceStore} from '../../../application/service-store';
import {Vehicle} from '../../../domain/model/vehicle.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-vehicle-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ServiceStore);

  form = this.fb.group({
    make: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    model: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    mileageKm: new FormControl<number | null>(null),
    dailyRate: new FormControl<number | null>(null),
    vehicleType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });
  isEdit = false;
  vehicleId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.vehicleId;
      if (this.isEdit) {
        const vehicle = this.store.getVehicleById(this.vehicleId)();
        if (vehicle) {
          this.form.patchValue({ make: vehicle.make });
          this.form.patchValue({ model: vehicle.model });
          this.form.patchValue({ mileageKm: vehicle.mileageKm });
          this.form.patchValue({ dailyRate: vehicle.dailyRate });
          this.form.patchValue({ vehicleType: vehicle.vehicleType });
          this.form.patchValue({ status: vehicle.status });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const vehicle: Vehicle = new Vehicle({
      id: this.vehicleId ?? 0,
      make: this.form.value.make!,
      model: this.form.value.model!,
      mileageKm: this.form.value.mileageKm!,
      dailyRate: this.form.value.dailyRate!,
      vehicleType: this.form.value.vehicleType!,
      status: this.form.value.status!
    });

    if (this.isEdit) {
      this.store.updateVehicle(vehicle);
    } else {
      this.store.addVehicle(vehicle);
    }

    this.router.navigate(['services/vehicles']).then();
  }
}
