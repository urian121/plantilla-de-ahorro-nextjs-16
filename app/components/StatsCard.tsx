import { StatsCardProps } from "../types/interfaces";

export default function StatsCard({ label, value, color }: StatsCardProps) {
  const colorClasses = {
    amber: 'text-amber-600',
    green: 'text-green-600', 
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  };

  const valueColorClasses = {
    amber: 'text-amber-800',
    green: 'text-green-700',
    blue: 'text-blue-700', 
    purple: 'text-purple-700'
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-amber-200/50">
      <p className={`text-xs font-semibold ${colorClasses[color]} uppercase tracking-wide mb-1`}>
        {label}
      </p>
      <p className={`text-lg font-bold ${valueColorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}