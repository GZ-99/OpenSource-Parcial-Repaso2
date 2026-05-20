import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface IncidentsResponse extends BaseResponse {
  incidents: IncidentResource[];
}

/**
 * Represents a single incident resource returned from the API.
 *
 * @remarks
 * This interface extends {@link BaseResource} and includes the core properties of an incident.
 *
 * @property id - Unique identifier for the incident.
 * @property incidentType - Type of the incident.
 * @property registeredAt - Record of the incident.
 * @property estimatedRepairCost - Cost of the incident.
 * @property priority - Priority of the incident.
 */
export interface IncidentResource extends BaseResource {
  id: number;
  vehicleId: number;
  rentalId: number;
  incidentType: string;
  registeredAt: string;
  estimatedRepairCost: number;
  priority: string;
}
