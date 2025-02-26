import React from 'react';

export const Speciality = ({ text, onClick, isSelected }) => {
  return (
    <div className="pb-2">
      <div
        className={`w-fit p-3 border rounded-lg cursor-pointer ${
          isSelected
            ? 'bg-[#5F6FFF] text-white' // Apply selected styles
            : 'hover:bg-[#5F6FFF] hover:text-white' // Apply hover styles
        }`}
        onClick={onClick} // Attach click handler
        role="button" // Add role for accessibility
        aria-label={`Select ${text} speciality`} 
      >
        {text}
      </div>
    </div>
  );
};