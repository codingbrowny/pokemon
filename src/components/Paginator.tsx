"use client"
import { usePokemon } from '@/hooks/pokemon-context'
import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'

const Paginator = () => {
const [isOpen, setIsOpen] = useState(false);
const {totalPages, pageSize, pageOffset, paginate} = usePokemon()

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

  return (
    <div className="w-full flex items-center justify-between container">
      <div className="w-fit flex gap-3">
        <button
          disabled={pageOffset === 1 || !totalPages}
          onClick={() => paginate(pageOffset - 1, pageSize)}
          className="hover:bg-primary hover:text-white bg-gray-300 text-gray-800 rounded-lg px-3 py-1.5 disabled:bg-gray-200 disabled:text-gray-500"
        >
          <LiaAngleLeftSolid />
        </button>
        {Array.from({ length: totalPages }, (item: number, i) => (
          <button
            onClick={() => paginate(i + 1, pageSize)}
            key={i}
            className={`rounded-lg px-3 py-1 ${
              i + 1 === pageOffset
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={pageOffset === totalPages || !totalPages}
          onClick={() => paginate(pageOffset + 1, pageSize)}
          className="hover:bg-primary hover:text-white bg-gray-300 text-gray-800 rounded-lg px-3 py-1.5 disabled:bg-gray-200 disabled:text-gray-500"
        >
          <LiaAngleRightSolid />
        </button>
      </div>

      {/* Page Size dropdown */}
      <div className="relative inline-block text-left w-20">
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex items-center gap-4 px-1 py-1 border border-transparent text-base font-medium rounded-md bg-gray-300"
          >
            <span className="bg-white shadow-md rounded px-3 ">{pageSize}</span>
            <span className="">
              <FaAngleDown />
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute p-1.5 right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {Array.from([8, 20, 50], (item) => (
              <button
                onClick={()=> paginate(pageOffset, item)}
                key={item}
                className="block rounded hover:bg-gray-200 w-full text-center p.1.5 py-1"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Paginator