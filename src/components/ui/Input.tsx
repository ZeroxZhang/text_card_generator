import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  multiline?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, multiline, className, ...props }) => {
  const baseStyles = "w-full px-3 py-2.5 bg-transparent border-b border-gray-200 focus:border-primary focus:outline-none transition-colors placeholder:text-gray-300 text-sm";
  
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-muted uppercase tracking-wider">{label}</label>}
      {multiline ? (
        <textarea
          className={clsx(baseStyles, "min-h-[100px] resize-y bg-gray-50/50 rounded-t-md border-b-2", className)}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={clsx(baseStyles, "border-b-2 bg-gray-50/50 rounded-t-md", className)}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};
