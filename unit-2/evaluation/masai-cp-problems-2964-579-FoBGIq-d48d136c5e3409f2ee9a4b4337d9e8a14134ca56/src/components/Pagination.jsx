// Pagination.js
import React from "react";
import { ButtonGroup, Button, Select, Text } from "@chakra-ui/react";

const Pagination = ({ page, setPage, limit, setLimit, totalPages }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset page to 1 when limit changes
  };

  return (
    <ButtonGroup mt="4">
      <Button
        data-cy="pagination-first-button"
        onClick={() => handlePageChange(1)}
        isDisabled={page === 1}
      >
        First
      </Button>
      <Button
        data-cy="pagination-previous-button"
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 1}
      >
        Previous
      </Button>
      <Select
        data-cy="pagination-limit-select"
        value={limit}
        onChange={handleLimitChange}
      >
        <option data-cy="pagination-limit-3" value={3}>
          3
        </option>
        <option data-cy="pagination-limit-6" value={6}>
          6
        </option>
        <option data-cy="pagination-limit-9" value={9}>
          9
        </option>
      </Select>
      <Button
        data-cy="pagination-next-button"
        onClick={() => handlePageChange(page + 1)}
        isDisabled={page === totalPages}
      >
        Next
      </Button>
      <Button
        data-cy="pagination-last-button"
        onClick={() => handlePageChange(totalPages)}
        isDisabled={page === totalPages}
      >
        Last
      </Button>
      <Text>{page}</Text>
    </ButtonGroup>
  );
};

export default Pagination;
