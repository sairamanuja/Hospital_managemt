import React from 'react';

export const Button = ({ text, onClick }) => {
  return (
    <div
      className="p-3 bg-[#5F6FFF] text-white rounded-md cursor-pointer text-center w-fit"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

