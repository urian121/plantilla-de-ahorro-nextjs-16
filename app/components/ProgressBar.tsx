import { ProgressBarProps } from "../types/interfaces";

export default function ProgressBar({ progress, label = "Progreso del desafío" }: ProgressBarProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-amber-700">{label}</span>
        <span className="text-sm font-bold text-amber-800">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="bg-linear-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}