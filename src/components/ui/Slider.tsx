import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
}) => {
  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-muted uppercase tracking-wider group-hover:text-foreground transition-colors">{label}</label>
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
      />
    </div>
  );
};
