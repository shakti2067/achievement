import { ChangeEvent } from "react";

import search from "../../assets/images/icons/search.svg";

type DebouncedTextBoxProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Fix the type definition
  delay?: number;
  placeholder: string;
  onSearch: () => void;
};

function DebouncedInput({
  value,
  onChange,
  placeholder,
  onSearch,
}: DebouncedTextBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-56 py-2 pl-3 pr-10 text-gray-900 bg-white p-1 border border-quillgrey rounded-md outline-none text-xs shadow placeholder-gray-500 "
      />
      <button
        className="absolute top-[7px] h-4 w-4 right-3 py-0 z-10"
        onClick={onSearch}
      >
        <img className="w-5 h-5" src={search} alt="search-icon" />
      </button>
    </div>
  );
}

export default DebouncedInput;
// above code we are using for search input.
