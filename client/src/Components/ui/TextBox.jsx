import React from 'react';

export const TextBox = ({ label, type, value, placeholder, onChange, ariaLabel, disabled }) => (
   
   
   
   
   <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-label={ariaLabel}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
  );

export default TextBox;