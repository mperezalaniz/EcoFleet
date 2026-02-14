
import { FuelType, VehicleType } from './types';

// Emission factors in kg CO2e per Liter
// Sources: EPA, GHG Protocol (approximate values for simulation)
export const EMISSION_FACTORS: Record<FuelType, number> = {
  [FuelType.DIESEL]: 2.68,
  [FuelType.GASOLINE]: 2.31,
  [FuelType.BIODIESEL]: 0.45, // Significant reduction for simulation
};

export const INITIAL_VEHICLES = [
  { id: '1', type: VehicleType.CAEX_TRUCK, fuelType: FuelType.DIESEL, consumption: 25000 },
  { id: '2', type: VehicleType.EXCAVATOR, fuelType: FuelType.DIESEL, consumption: 12000 },
  { id: '3', type: VehicleType.PICKUP_4X4, fuelType: FuelType.GASOLINE, consumption: 1500 },
];

export const TARGET_REDUCTION_PERCENTAGE = 0.20; // 20% reduction target
