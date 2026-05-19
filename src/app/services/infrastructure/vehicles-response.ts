import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface VehiclesResponse extends BaseResponse {
  vehicles: VehicleResource[];
}

export interface VehicleResource extends BaseResource {
  id: number;
  make: string;
  model: string;
  mileageKm: number;
  dailyRate: number;
  vehicleType: string;
  status: string;
}
