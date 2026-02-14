
import React from 'react';
import { Plus, Trash2, Fuel, Truck } from 'lucide-react';
import { Vehicle, VehicleType, FuelType } from '../types';

interface VehicleFormProps {
  vehicles: Vehicle[];
  onAddVehicle: () => void;
  onRemoveVehicle: (id: string) => void;
  onUpdateVehicle: (id: string, updates: Partial<Vehicle>) => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({
  vehicles,
  onAddVehicle,
  onRemoveVehicle,
  onUpdateVehicle,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          Configuración de Flota
        </h2>
        <button
          onClick={onAddVehicle}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Añadir Vehículo
        </button>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-200 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 mr-4">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Tipo de Vehículo
                </label>
                <select
                  value={v.type}
                  onChange={(e) => onUpdateVehicle(v.id, { type: e.target.value as VehicleType })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {Object.values(VehicleType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => onRemoveVehicle(v.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Combustible
                </label>
                <div className="relative">
                  <Fuel className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <select
                    value={v.fuelType}
                    onChange={(e) => onUpdateVehicle(v.id, { fuelType: e.target.value as FuelType })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {Object.values(FuelType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Consumo (L/mes)
                </label>
                <input
                  type="number"
                  value={v.consumption}
                  onChange={(e) => onUpdateVehicle(v.id, { consumption: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
