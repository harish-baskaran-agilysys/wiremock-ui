import { useState } from "react";

const usePagination = (totalItems, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePagination;
