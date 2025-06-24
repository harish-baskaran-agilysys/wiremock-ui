import React from "react";
import Button from "wiremock/components/native/button";

const PaginationControl = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const handlePageInputChange = (e) => {
    const page = Number(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      goToPage(page);
    }
  };

  return (
    <div className="p-2 border-t border-gray-300 bg-white z-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button label="Prev" type="primary_link" onClick={goToPreviousPage} disabled={currentPage === 1}/>
        <input
          type="number"
          value={currentPage}
          min={1}
          max={totalPages}
          onChange={handlePageInputChange}
          className="w-12 text-center border px-1"
        />
        <span>of {totalPages}</span>
        <Button label="Next" type="primary_link" onClick={goToNextPage} disabled={currentPage === totalPages}/>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="itemsPerPage" className="text-sky-600 text-sm">Per Page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border px-1 py-0.5"
        >
          {[10, 25, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControl;
