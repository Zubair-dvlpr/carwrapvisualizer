import React, { useState, useRef, useEffect } from 'react';

export const BrandDropdown = ({ brands, selectedBrand, setSelectedBrand }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-[#2B2C2C] text-white rounded-md px-4 py-2 cursor-pointer border border-gray-600 focus:outline-none"
      >
        {selectedBrand ? (
          <div className="flex items-center gap-2">
            <img src={selectedBrand.logo} alt={selectedBrand.name} className="h-6 w-6 object-contain" />
            <span>{selectedBrand.name === 'vector' ? 'Avery Dennison' : selectedBrand.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">Select Wrap Brand</span>
        )}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#2B2C2C] border border-gray-600 text-white shadow-lg">
          <li
            key="empty"
            onClick={() => {
              setSelectedBrand(null);
              setOpen(false);
            }}
            className="cursor-pointer px-4 py-2 hover:bg-gray-700"
          >
            -- None --
          </li>
          {brands.map((brand, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedBrand(brand);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              <img src={brand.logo} alt={brand.name} className="h-10 w-10 object-contain" />
              <span>{brand.name === 'vector' ? 'Avery Dennison' : brand.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
