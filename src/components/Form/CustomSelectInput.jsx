import React, { useState } from "react";
import {
  // CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";

export default function CustomSelectInput({ data, name, multiple }) {
  const [option, setOption] = useState(() => (multiple === true ? [data[0], data[1]] : data[0]));
  const [isOpen, setIsOpen] = useState(false);

  const optionClass = "select-option text-sm py-3 pl-10 pr-4 select-none hover:bg-accent";
  const activeOptionClass = "select-option text-sm py-3 pl-10 pr-4 select-none font-semibold bg-primary text-white";
  console.log(option);
  return (
    <div className='select-container'>
      <div className='select-content relative' name={name}>
        <button
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
          className='select-button relative cursor-default w-full min-h-[40px] rounded-md py-2 pl-3 pr-10 bg-slate-100 text-left border border-slate-300 shadow-md'>
          <span className='select-value block truncate'>
            {multiple === true ? option.map((o) => o.name).join(", ") : option.name}
          </span>
          <span className='select-icon pointer-events-none flex items-center justify-center absolute right-0 inset-y-0 bg-accent rounded-tr-md rounded-br border border-accent-dark'>
            <ChevronUpDownIcon className='w-5 h-5' />
          </span>
        </button>
        {isOpen && (
          <div className='select-options absolute max-h-60 overflow-auto mt-2 py-2 text-base shadow-2xl w-full rounded-md border border-slate-50 focus: outline focus:outline-offset-0 focus: outline-1 focus: outline-accent-dark'>
            {data.map((d, index) => (
              <div
                onClick={() => {
                  if (multiple === true) {
                    if (option.includes(d)) {
                      console.log("include", d);
                      console.log(option.filter((e) => e.name !== d.name));
                      setOption(option.filter((e) => e.name !== d.name));
                    } else {
                      setOption([...option, d]);
                    }
                  } else {
                    setOption(d);
                  }
                }}
                className={
                  multiple === true
                    ? option.includes(d)
                      ? activeOptionClass
                      : optionClass
                    : d.name === option.name
                    ? activeOptionClass
                    : optionClass
                }
                key={index}>
                {d.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
