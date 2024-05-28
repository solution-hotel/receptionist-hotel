"use client";
import React from "react";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// interface PaginationControl {
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
// }

import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";

const PaginationD = () => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps<HTMLButtonElement>) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 flex items-center justify-center"
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 flex items-center justify-center"
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        ref={ref}
        key={key}
        className={`${
          isActive
            ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
            : ""
        } px-3 py-1`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };
  return (
    <div className="flex justify-center items-center h-full">
      <Pagination
        disableCursorAnimation
        showControls
        total={10}
        initialPage={1}
        className="gap-2"
        radius="full"
        renderItem={renderItem}
        variant="light"
      />
    </div>
  );
};

export default PaginationD;
