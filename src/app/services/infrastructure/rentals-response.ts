import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface RentalsResponse extends BaseResponse {
  rentals: RentalResource[];
}

/**
 * Represents a single rental resource returned from the API.
 *
 * @remarks
 * This interface extends {@link BaseResource} and includes the core properties of a rental.
 *
 * @property id - Unique identifier for the rental.
 * @property clientId - Unique identifier for the client.
 * @property startDate - Start date of the rental.
 * @property endDate - End date of the rental.
 * @property durationDays - Number of rental days.
 * @property totalCost - Total of the price of the rental.
 * @property status - Status of the rental.
 */
export interface RentalResource extends BaseResource {
  id: number;
  vehicleId: number;
  clientId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalCost: number;
  status: string;
}
