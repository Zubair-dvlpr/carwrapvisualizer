import React, { useState, useEffect, useRef } from 'react';

export const AngleDropdown = ({ angles, selectedAngle, setSelectedAngle }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedAngle(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between w-48 rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-black text-sm font-medium text-white hover:bg-gray-800"
        >
          {angles.find((a) => a.value === selectedAngle)?.label || 'Select Angle'}
          <svg
            className="-mr-1 ml-2 h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {angles.map((angle) => (
              <button
                key={angle.value}
                onClick={() => handleSelect(angle.value)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {angle.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
