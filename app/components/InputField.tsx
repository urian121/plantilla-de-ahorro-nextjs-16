import { InputFieldProps } from "../types/interfaces";

export default function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  min = 0, 
  step = 1 
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-amber-800">
        {label}
      </label>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => {
          const inputValue = +e.target.value;
          onChange(inputValue || 0);
        }}
        placeholder={placeholder}
        min={min}
        step={step}
        className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-lg font-medium"
      />
    </div>
  );
}