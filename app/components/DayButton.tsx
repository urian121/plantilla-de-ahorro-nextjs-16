import { DayButtonProps } from "../types/interfaces";

export default function DayButton({ 
  value, 
  isCompleted, 
  isAnimating, 
  onClick, 
  formatCurrency 
}: DayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group aspect-square rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer active:scale-95 min-h-[80px]
        ${isCompleted 
          ? 'bg-linear-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
          : 'bg-white hover:bg-amber-50 hover:border-amber-300 text-amber-800 shadow-sm hover:shadow-md'
        }
        ${isAnimating ? 'animate-pulse scale-110' : ''}
      `}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
        <div className={`text-lg ${isCompleted ? 'text-white' : 'text-amber-600'} font-medium mb-1`}>
          $
        </div>
        <div className={`text-3xl sm:text-base font-bold ${isCompleted ? 'text-white' : 'text-amber-700'} text-center leading-tight`}>
          {formatCurrency(value).replace('$', '')}
        </div>
      </div>
      
      {isCompleted && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-green-500 text-xs font-bold">✓</span>
        </div>
      )}
      
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
}