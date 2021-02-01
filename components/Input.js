import React from "react";
import DatePicker from "react-datepicker";

export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-initial my-1">
      <div className="p-2 px-4 bg-indigo-500 rounded-l-lg">
        <label className="text-white">{label}</label>
      </div>
      <input {...props} className="border border-indigo-500 rounded-r-lg px-2 focus:outline-none" />
    </div>
  );
}

export function InputDatePicker({ label, ...props }) {
  return (
    <div className="flex flex-initial my-1">
      <div className="p-2 px-4 bg-indigo-500 rounded-l-lg">
        <label className="text-white">{label}</label>
      </div>
      <DatePicker {...props} className="h-10 border border-indigo-500 rounded-r-lg px-2 focus:outline-none" />
    </div>
  );
}
