import React from "react";

const Pagination = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  const page = currentPage.page;
  return <div>Pagination</div>;
};

export default Pagination;
