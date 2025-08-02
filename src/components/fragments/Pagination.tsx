"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];
    const pageSet = new Set<number>();

    // Always show first 1-2 pages
    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pageSet.add(i);
    }

    // Pages around current
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageSet.add(i);
      }
    }

    // Always show last 3 pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 0) {
        pageSet.add(i);
      }
    }

    const sortedPages = Array.from(pageSet).sort((a, b) => a - b);

    let lastPage = 0;
    for (const page of sortedPages) {
      if (lastPage + 1 < page) {
        // Add ellipsis
        pages.push(
          <span key={`ellipsis-${lastPage}`} className="px-2">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-[2px] text-xs rounded-sm cursor-pointer font-semibold ${
            page === currentPage ? "text-black border-1 border-gray-300" : "text-black"
          }`}
        >
          {page}
        </button>
      );

      lastPage = page;
    }

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center text-gray-600 mt-7 flex-wrap font-semibold">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-[2px] text-xs rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex flex-nowrap items-center gap-2"
      >
        <ChevronLeft size={12}/>
        Prev 
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-[2px] text-xs rounded flex flex-nowrap items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Next
        <ChevronRight size={12}/>
      </button>
    </div>
  );
};

export default Pagination;
