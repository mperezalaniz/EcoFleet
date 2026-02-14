
import React, { useState, useMemo } from 'react';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { 
  Leaf, 
  TrendingUp, 
  FileText, 
  Download, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { VehicleForm } from './components/VehicleForm';
import { FinancialControls } from './components/FinancialControls';
import { KpiCard } from './components/KpiCard';
import { Vehicle, VehicleType, FuelType } from './types';
import { EMISSION_FACTORS, INITIAL_VEHICLES, TARGET_REDUCTION_PERCENTAGE } from './constants';

const COLORS = ['#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777', '#4b5563'];

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [carbonPrice, setCarbonPrice] = useState<number>(50);
  const [showNotification, setShowNotification] = useState(false);

  // Core Calculations
  const stats = useMemo(() => {
    let totalEmissionsKg = 0;
    const emissionsByType: Record<string, number> = {};

    vehicles.forEach((v) => {
      const emissionFactor = EMISSION_FACTORS[v.fuelType];
      const co2e = v.consumption * emissionFactor;
      totalEmissionsKg += co2e;
      
      emissionsByType[v.type] = (emissionsByType[v.type] || 0) + co2e;
    });

    const totalEmissionsTons = totalEmissionsKg / 1000;
    const financialRisk = totalEmissionsTons * carbonPrice;
    
    // Formatting data for Pie Chart
    const pieData = Object.entries(emissionsByType).map(([name, value]) => ({
      name,
      value: Number((value / 1000).toFixed(2)),
    }));

    return {
      totalEmissionsTons,
      financialRisk,
      pieData,
      targetEmissions: totalEmissionsTons * (1 - TARGET_REDUCTION_PERCENTAGE)
    };
  }, [vehicles, carbonPrice]);

  const sensitivityData = [
    { name: 'Actual ($' + carbonPrice + ')', risk: stats.financialRisk },
    { name: 'Futuro ($100)', risk: stats.totalEmissionsTons * 100 },
    { name: 'Futuro ($150)', risk: stats.totalEmissionsTons * 150 },
  ];

  const handleAddVehicle = () => {
    const newVehicle: Vehicle = {
      id: Math.random().toString(36).substr(2, 9),
      type: VehicleType.MINING_TRUCK,
      fuelType: FuelType.DIESEL,
      consumption: 1000,
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleUpdateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const handleExport = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">EcoFleet Mining Calculator</h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Sostenibilidad & Auditoría ESG</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleExport}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Exportar Reporte
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Inputs */}
        <section className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <VehicleForm 
            vehicles={vehicles}
            onAddVehicle={handleAddVehicle}
            onRemoveVehicle={handleRemoveVehicle}
            onUpdateVehicle={handleUpdateVehicle}
          />
          <FinancialControls 
            carbonPrice={carbonPrice}
            setCarbonPrice={setCarbonPrice}
          />
        </section>

        {/* Right Panel: Dashboards */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KpiCard 
              title="Emisión Total Mensual"
              value={`${stats.totalEmissionsTons.toLocaleString(undefined, { maximumFractionDigits: 1 })} tCO2e`}
              subtitle="Alcance 1 (Directo)"
              icon={<TrendingUp className="text-blue-600 w-5 h-5" />}
              trend={{ value: "+2.4%", isPositive: false }}
              colorClass="bg-white border-l-4 border-l-blue-600"
            />
            <KpiCard 
              title="Riesgo Financiero Estimado"
              value={`$${stats.financialRisk.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD`}
              subtitle={`Impacto basado en ICP de $${carbonPrice}`}
              icon={<AlertTriangle className={stats.financialRisk > 50000 ? "text-orange-500" : "text-emerald-500"} />}
              colorClass={stats.financialRisk > 50000 ? "bg-orange-50 border-l-4 border-l-orange-500" : "bg-emerald-50 border-l-4 border-l-emerald-500"}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-[400px]">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Desglose por Tipo de Vehículo
              </h3>
              <div className="h-full pb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={stats.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-[400px]">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                Objetivo vs. Actual (tCO2e)
              </h3>
              <div className="h-full pb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Actual', value: stats.totalEmissionsTons, fill: '#3b82f6' },
                      { name: 'Objetivo ESG', value: stats.targetEmissions, fill: '#10b981' },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sensitivity Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-900" />
                Sensibilidad de Costo del Carbono
              </h3>
              <p className="text-xs text-slate-400 mt-1">Estimación de pasivo financiero ante variaciones en el mercado de bonos de carbono.</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={sensitivityData} margin={{ left: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Riesgo USD']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="risk" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={32}>
                    {sensitivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </section>
      </main>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in border border-slate-700">
          <div className="bg-emerald-500 p-1.5 rounded-full">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold">Reporte PDF generado</p>
            <p className="text-xs text-slate-400">Las métricas ESG han sido exportadas con éxito.</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2025 EcoFleet Mining Calculator. Compliance Tool for Sustainability Reporting.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Protocolo GHG</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Factores EPA</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
