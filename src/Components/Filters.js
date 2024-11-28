import React, { useState, useEffect } from "react";
import { CategoriesData } from "../Data/CategoriesData";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa6";

const YearData = [
  { title: "Sort By Year" },
  { title: "1950 - 1970" },
  { title: "1970 - 1990" },
  { title: "1990 - 2010" },
  { title: "2010 - 2030" },
];

const TimesData = [
  { title: "Sort By Hours" },
  { title: "1 - 2 Hours" },
  { title: "2 - 3 Hours" },
  { title: "3 + Hours" },
  
];

const RatesData = [
  { title: "Sort By Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

function Filters() {
  const [category, setCategory] = useState({ title: "Category" });
  const [year, setYear] = useState(YearData[0]);
  const [time, setTime] = useState(TimesData[0]);
  const [rate, setRate] = useState(RatesData[0]);

  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items: CategoriesData,
    },
    {
      value: year,
      onchange: setYear,
      items: YearData,
    },
    {
      value: time,
      onchange: setTime,
      items: TimesData,
    },
    {
      value: rate,
      onchange: setRate,
      items: RatesData,
    },
  ];

  useEffect(() => {
    console.log("Category:", category);
    console.log("Year:", year);
    console.log("Time:", time);
    console.log("Rate:", rate);
  }, [category, year, time, rate]);

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onchange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <div>
                  {item.items.map((item, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-subMain text-white" : "text-main"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                          >
                            {item.title}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <FaCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                      {}
                    </Listbox.Option>
                  ))}
                </div>
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
