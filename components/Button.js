import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button {...props} className="bg-blue-400 text-white py-1 px-2 font-semibold rounded hover:bg-blue-500">
      {children}
    </button>
  );
}
