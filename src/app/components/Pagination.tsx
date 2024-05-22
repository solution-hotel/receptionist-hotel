"use client";
import React from "react";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControl {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: FC<PaginationControl> = ({ hasPrevPage, hasNextPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex gap-2">
      <div>
        <button
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
          }}
        >
          Prev
        </button>
      </div>
      <div>
        {page} / {Math.ceil(10 / Number(page))}
      </div>
      <div>
        <button
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
