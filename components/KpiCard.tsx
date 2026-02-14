
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorClass = "bg-white",
}) => {
  return (
    <div className={`${colorClass} p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-1 transition-transform hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <span className={`text-xs font-bold ${trend.isPositive ? 'text-emerald-500' : 'text-orange-500'}`}>
            {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-slate-500 font-medium mt-1">{subtitle}</p>}
    </div>
  );
};
