export const AngleBoxes = ({ angles, selectedAngle, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
      {angles.map(a => {
        const isActive = selectedAngle === a.value;
        return (
          <button
            key={a.value}
            type="button"
            onClick={() => onSelect(a.value)}
            className={[
              "px-2 py-4 rounded-xl border transition text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              isActive
                ? "bg-[#ED217B] border-[#ED217B] text-white"
                : "bg-[#ffffff0d] border-[#8A8A8A] text-white hover:bg-[#1f2430]"
            ].join(" ")}
            aria-pressed={isActive}
          >
            {a.label}
          </button>
        );
      })}
    </div>
  );
};
