import React from "react";
import { Button } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages === 0) return null;

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          variant={index + 1 === currentPage ? "primary" : "secondary"}
          onClick={() => onPageChange(index + 1)}
          className="m-1"
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
