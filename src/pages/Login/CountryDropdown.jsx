import React, { useState } from "react";

const CountryDropdown = ({ countries, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-[230px]">
            {/* Selected */}
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between p-3 rounded-lg bg-[#020617] border border-gray-700 cursor-pointer"
            >
                {value ? (
                    <div className="flex items-center gap-2">
                        <img src={value.flag} className="w-5 h-4 rounded-sm" />
                        <span>{value.code}</span>
                    </div>
                ) : (
                    <span className="text-gray-400 text-sm">Code</span>
                )}
                <span className="text-gray-400 text-xs">▼</span>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="
    absolute left-0 right-0 mt-2 bg-[#0a0f1c] 
    border border-gray-700 rounded-xl 
    max-h-60 overflow-y-auto overflow-x-hidden 
    z-50 shadow-xl dropdown-scrollbar
  "
                >
                    {/* Search */}
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search…"
                            className="w-full p-2 rounded bg-[#020617] border border-gray-700 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Country items */}
                    {filtered.map((c, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                onChange(c);
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-800 text-sm"
                        >
                            <img src={c.flag} className="w-5 h-4 rounded-sm" />
                            <span>{c.code}</span>
                            <span className="text-gray-300">{c.name}</span>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="p-3 text-center text-gray-400 text-sm">
                            No results found
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default CountryDropdown;
