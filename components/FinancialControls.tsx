
import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

interface FinancialControlsProps {
  carbonPrice: number;
  setCarbonPrice: (price: number) => void;
}

export const FinancialControls: React.FC<FinancialControlsProps> = ({
  carbonPrice,
  setCarbonPrice,
}) => {
  return (
    <div className="mt-8 pt-8 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-emerald-600" />
        Configuración de Precio de Carbono (ICP)
      </h2>
      
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-emerald-900">
            Precio Interno del Carbono (USD/tCO2e)
          </label>
          <span className="text-2xl font-bold text-emerald-700">${carbonPrice}</span>
        </div>
        
        <input
          type="range"
          min="10"
          max="250"
          step="5"
          value={carbonPrice}
          onChange={(e) => setCarbonPrice(Number(e.target.value))}
          className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        
        <div className="flex justify-between mt-2 text-xs text-emerald-600 font-medium">
          <span>$10</span>
          <span>$130</span>
          <span>$250</span>
        </div>
        
        <div className="mt-6 flex gap-3 p-3 bg-white/50 rounded-lg border border-emerald-200/50">
          <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs text-emerald-800 leading-relaxed">
            El <strong>Precio Interno del Carbono</strong> permite a la organización anticipar riesgos regulatorios y de mercado, traduciendo las emisiones ambientales en impacto financiero directo.
          </p>
        </div>
      </div>
    </div>
  );
};
