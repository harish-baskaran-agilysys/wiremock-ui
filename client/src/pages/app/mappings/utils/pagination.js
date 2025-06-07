import React from "react";
import Button from "wiremock/components/native/button";

const Pagination = ({ currentPage, totalPages, goToNextPage, goToPreviousPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-2 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-sky-600'}`}
        icon="fas fa-angle-left"
        />
      <p className="pt-[5px]">
        Page {currentPage} of {totalPages}
      </p>
      <Button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-2 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-sky-600'}`}
        icon="fas fa-angle-right"
      />
    </div>
  );
};

export default Pagination;
