import { Combobox } from '@headlessui/react'
import { useState, useEffect } from 'react'

export const BrandDropdown = ({ brands, selectedBrand, setSelectedBrand }) => {
  const [query, setQuery] = useState('')
  const [filteredBrands, setFilteredBrands] = useState(brands)

  useEffect(() => {
    setFilteredBrands(
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, brands])

  return (
    <Combobox as="div" value={selectedBrand} onChange={setSelectedBrand} className="relative w-full max-w-xs">
      <div className="relative">
        <Combobox.Input
          className="w-full bg-[#2B2C2C] text-white rounded-md px-4 py-2 border border-gray-600 focus:outline-none"
          displayValue={(brand) => 
            brand ? (brand.name === 'vector' ? 'Avery Dennison' : brand.name) : ''
          }
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search wrap brand..."
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Combobox.Button>
      </div>

      <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#2B2C2C] border border-gray-600 text-white shadow-lg focus:outline-none">
        {filteredBrands.length === 0 && query !== '' ? (
          <div className="px-4 py-2 text-gray-400">No brands found</div>
        ) : (
          <>
            <Combobox.Option
              value={null}
              className={({ active }) => 
                `cursor-pointer px-4 py-2 ${active ? 'bg-gray-700' : ''}`
              }
            >
              -- None --
            </Combobox.Option>
            {filteredBrands.map((brand) => (
              <Combobox.Option
                key={brand.id || brand.name}
                value={brand}
                className={({ active }) => 
                  `flex items-center gap-2 px-4 py-2 cursor-pointer ${active ? 'bg-gray-700' : ''}`
                }
              >
                {({ selected }) => (
                  <>
                    <img src={brand.logo} alt={brand.name} className="h-10 w-10 object-contain" />
                    <span className={selected ? 'font-medium' : ''}>
                      {brand.name === 'vector' ? 'Avery Dennison' : brand.name}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </>
        )}
      </Combobox.Options>
    </Combobox>
  )
}