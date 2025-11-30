'use client';

import React, { useState, useEffect } from 'react';

interface FormattedInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  prefix?: string;
}

export const FormattedInput: React.FC<FormattedInputProps> = ({ 
  value, 
  onChange, 
  className = '', 
  prefix = '$' 
}) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    // Only update display value from prop if it's not currently being edited 
    // or if the parsed display value doesn't match the prop value (external update)
    const numericDisplay = parseFloat(displayValue.replace(/,/g, ''));
    if (isNaN(numericDisplay) || numericDisplay !== value) {
        setDisplayValue(value.toLocaleString('en-AU'));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Remove non-digits
    const cleanValue = rawValue.replace(/[^0-9]/g, '');
    
    if (cleanValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }

    const numberValue = parseInt(cleanValue, 10);
    
    // Format for display
    const formatted = numberValue.toLocaleString('en-AU');
    
    setDisplayValue(formatted);
    onChange(numberValue);
  };

  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-2.5 text-gray-400">{prefix}</span>}
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className={`${className} ${prefix ? 'pl-8' : ''}`}
      />
    </div>
  );
};

