import { Injectable } from '@angular/core';
import {computed, Signal, signal} from '@angular/core';
import {Vehicle} from '../domain/model/vehicle.entity';
import {Rental} from '../domain/model/rental.entity';
import {Incident} from '../domain/model/incident.entity';
import {ServiceApi} from '../infrastructure/service-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceStore {
  private readonly incidentsSignal = signal<Incident[]>([]);
  private readonly rentalsSignal = signal<Rental[]>([]);
  private readonly vehiclesSignal = signal<Vehicle[]>([]);

  readonly incidents = this.incidentsSignal.asReadonly();
  readonly rentals = this.rentalsSignal.asReadonly();
  readonly vehicles = this.vehiclesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly incidentCount = computed(() => this.incidents().length);
  readonly rentalCount = computed(() => this.rentals().length);
  readonly vehicleCount = computed(() => this.vehicles().length);

  constructor(private serviceApi: ServiceApi) {
    this.loadIncidents();
    this.loadRentals();
    this.loadVehicles();
  }

  /**
   * Retrieves a vehicle by its ID as a signal.
   * @param id - The ID of the vehicle.
   * @returns A Signal containing the Vehicle object or undefined if not found.
   */
  getVehicleById(id: number | null | undefined): Signal<Vehicle | undefined> {
    return computed(() => id ? this.vehicles().find(c => c.id === id) : undefined);
  }

  /**
   * Retrieves a rental by its ID as a signal.
   * @param id - The ID of the rental.
   * @returns A Signal containing the Rental object or undefined if not found.
   */
  getRentalById(id: number | null | undefined): Signal<Rental | undefined> {
    return computed(() => id ? this.rentals().find(c => c.id === id) : undefined);
  }

  /**
   * Adds a new rental.
   * @param course - The rental to add.
   */
  addRental(rental: Rental): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.createRental(rental).pipe(retry(2)).subscribe({
      next: createdRental => {
        this.rentalsSignal.update(rentals => [...rentals, createdRental]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create rental'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Adds a new incident.
   * @param incident - The incident to add.
   */
  addIncident(incident: Incident): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.createIncident(incident).pipe(retry(2)).subscribe({
      next: createdIncident => {
        this.incidentsSignal.update(incidents => [...incidents, createdIncident]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create incident'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing rental.
   * @param updatedRental - The rental to update.
   */
  updateRental(updatedRental: Rental): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.updateRental(updatedRental).pipe(retry(2)).subscribe({
      next: rental => {
        this.rentalsSignal.update(rentals =>
          rentals.map(c => c.id === rental.id ? rental : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update rental'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing incident.
   * @param updatedIncident - The incident to update.
   */
  updateIncident(updatedIncident: Incident): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.updateIncident(updatedIncident).pipe(retry(2)).subscribe({
      next: incident => {
        this.incidentsSignal.update(incidents =>
          incidents.map(c => c.id === incident.id ? incident : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update incident'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a rental by ID.
   * @param id - The ID of the rental to delete.
   */
  deleteRental(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.deleteRental(id).pipe(retry(2)).subscribe({
      next: () => {
        this.rentalsSignal.update(rentals => rentals.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete rental'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes an incident by ID.
   * @param id - The ID of the incident to delete.
   */
  deleteIncident(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.deleteIncident(id).pipe(retry(2)).subscribe({
      next: () => {
        this.incidentsSignal.update(incidents => incidents.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete incident'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Adds a new vehicle.
   * @param vehicle - The vehicle to add.
   */
  addVehicle(vehicle: Vehicle): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.createVehicle(vehicle).pipe(retry(2)).subscribe({
      next: createdVehicle => {
        this.vehiclesSignal.update(vehicles => [...vehicles, createdVehicle]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing vehicle.
   * @param updatedVehicle - The vehicle to update.
   */
  updateVehicle(updatedVehicle: Vehicle): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.updateVehicle(updatedVehicle).pipe(retry(2)).subscribe({
      next: vehicle => {
        this.vehiclesSignal.update(vehicles =>
          vehicles.map(c => c.id === vehicle.id ? vehicle : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a vehicle by ID.
   * @param id - The ID of the vehicle to delete.
   */
  deleteVehicle(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.deleteVehicle(id).pipe(retry(2)).subscribe({
      next: () => {
        this.vehiclesSignal.update(vehicles => vehicles.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all rentals from the API.
   */
  private loadRentals(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.getRentals().pipe(takeUntilDestroyed()).subscribe({
      next: rentals => {
        console.log(rentals);
        this.rentalsSignal.set(rentals);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load rentals'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all incidents from the API.
   */
  private loadIncidents(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.getIncidents().pipe(takeUntilDestroyed()).subscribe({
      next: incidents => {
        console.log(incidents);
        this.incidentsSignal.set(incidents);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load incidents'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all categories from the API.
   */
  private loadVehicles(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.serviceApi.getVehicles().pipe(takeUntilDestroyed()).subscribe({
      next: vehicles => {
        this.vehiclesSignal.set(vehicles);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load vehicles'));
        this.loadingSignal.set(false);
      }
    });
  }

  private assignVehiclesToRentals(): void {
    this.rentalsSignal.update(rentals => rentals.map(rental => this.assignVehicleToRental(rental)));
  }

  private assignVehiclesToIncidents(): void {
    this.incidentsSignal.update(incidents => incidents.map(incident => this.assignVehicleToIncident(incident)));
  }

  private assignVehicleToRental(rental: Rental): Rental {
    const vehicleId = rental.vehicleId ?? 0;
    const vehicle = vehicleId ? this.vehicles().find(cat => cat.id === vehicleId) ?? null : null;
    return {...rental, vehicle} as Rental;
  }

  private assignVehicleToIncident(incident: Incident): Incident {
    const vehicleId = incident.vehicleId ?? 0;
    const vehicle = vehicleId ? this.vehicles().find(cat => cat.id === vehicleId) ?? null : null;
    return {...incident, vehicle} as Incident;
  }

  /**
   * Formats error messages for user-friendly display.
   * @param error - The error object.
   * @param fallback - The fallback error message.
   * @returns A formatted error message.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
