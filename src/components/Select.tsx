import { ElementType, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Record<string, string>;
  placeholder?: string;
  className?: string;
  icon?: ElementType; // opcional
}

export function Select({ icon: Icon, className, options, placeholder, ...rest }: SelectComponentProps) {
  return (
    <div className={twMerge("inputs flex items-center gap-2 bg-midnight-dark", className)}>
      <select {...rest} className="w-full appearance-none h-full bg-transparent focus:outline-none">
        {placeholder && <option value="">{placeholder}</option>}
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {Icon && <Icon className="text-text-gray shrink-0" size={16} />}
    </div>
  );
}
