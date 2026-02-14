
export enum FuelType {
  DIESEL = 'Diesel',
  GASOLINE = 'Gasoline (Nafta)',
  BIODIESEL = 'Biodiesel',
}

export enum VehicleType {
  CAEX_TRUCK = 'Camión CAEX (Minería)',
  EXCAVATOR = 'Excavadora Hidráulica',
  BULLDOZER = 'Bulldozer / Tractor de Oruga',
  DRILLER = 'Perforadora de Gran Diámetro',
  LOADER = 'Cargador Frontal',
  PICKUP_4X4 = 'Camioneta 4x4 de Apoyo',
  DIESEL_GENERATOR = 'Generador Diésel Estacionario',
  MINING_TRUCK = 'Camión Articulado',
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  fuelType: FuelType;
  consumption: number; // Liters per month
}

export interface EmissionData {
  name: string;
  value: number;
}
