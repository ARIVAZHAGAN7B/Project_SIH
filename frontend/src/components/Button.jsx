import React from 'react';

const Button = ({ props, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-indigo-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-indigo-700 transition-colors"
    >
      <span className="truncate">{props}</span>
    </button>
  );
};

export default Button;
