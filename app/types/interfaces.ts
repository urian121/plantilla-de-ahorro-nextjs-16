// Interfaces para componentes de ahorro
export interface AhorroGridProps {
  valores: number[];
  meta: number;
  completados: boolean[];
  setCompletados: (completados: boolean[]) => void;
}

export interface StatsCardProps {
  label: string;
  value: string;
  color: 'amber' | 'green' | 'blue' | 'purple';
}

export interface ProgressBarProps {
  progress: number;
  label?: string;
}

export interface DayButtonProps {
  value: number;
  isCompleted: boolean;
  isAnimating: boolean;
  onClick: () => void;
  formatCurrency: (value: number) => string;
}

export interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  step?: number;
}