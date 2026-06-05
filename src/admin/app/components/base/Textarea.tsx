import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function Textarea({
  label,
  error,
  helpText,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={`
          w-full px-3 py-2.5 
          border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          resize-y
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helpText}</p>
      )}
    </div>
  );
}
