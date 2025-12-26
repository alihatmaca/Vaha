import React from 'react';

interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  colorClass: string;
}

export const Button: React.FC<ButtonProps> = ({ label, icon, onClick, isActive, colorClass }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden w-full p-6 rounded-3xl transition-all duration-300 transform
        ${isActive ? 'scale-[1.02] shadow-xl ring-2 ring-offset-2 ring-stone-200' : 'hover:scale-[1.02] hover:shadow-lg shadow-md'}
        ${colorClass}
        group
        flex flex-col items-center justify-center gap-3 text-stone-700
      `}
    >
      <div className={`
        text-4xl transition-transform duration-300 
        ${isActive ? 'scale-110' : 'group-hover:scale-110'}
      `}>
        {icon}
      </div>
      <span className="font-medium text-lg tracking-wide">{label}</span>
      
      {/* Decorative background blob */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white opacity-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
    </button>
  );
};