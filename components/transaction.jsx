import React from "react";

export default function Transaction({ children }) {
  return (
    <div className='max-w-sm bg-main/20 rounded-lg border border-gray-200 shadow-md p-5 cursor-pointer'>
      {children}
    </div>
  );
}
