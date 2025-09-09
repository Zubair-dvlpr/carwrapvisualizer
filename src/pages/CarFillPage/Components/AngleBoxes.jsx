// Components/AngleBoxes.jsx
import React from 'react';

export const AngleBoxes = ({ angles = [], selectedAngles = [], onToggle = () => {}, max = 4 }) => {
  const isSelected = (value) => selectedAngles.includes(value);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {angles.map(({ label, value }) => {
        const active = isSelected(value);
        const disabled = !active && selectedAngles.length >= max;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onToggle(value)}
            disabled={disabled}
            className={[
              'rounded-xl border px-3  py-3 text-sm transition',
              active
                ? 'bg-[#ED217B] border-[#ED217B] text-white'
                : 'bg-[#ffffff0d] border-[#444] text-white hover:bg-[#ffffff1a]',
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            ].join(' ')}
            title={disabled ? `You can select up to ${max} angles` : label}
          >
            <div>
              <span>{label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
