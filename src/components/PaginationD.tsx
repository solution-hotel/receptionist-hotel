"use client";
import React from "react";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";

const PaginationD: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    const handleClick = (newPage: number) => {
      setPage(newPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    };

    const handleNextClick = () => {
      onNext();
      handleClick(currentPage + 1);
    };

    const handlePreviousClick = () => {
      onPrevious();
      handleClick(currentPage - 1);
    };

    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 flex items-center justify-center"
          onClick={handleNextClick}
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
          onClick={handlePreviousClick}
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
      // <button
      //   ref={ref}
      //   key={key}
      //   className={`${
      //     isActive
      //       ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
      //       : ""
      //   } px-3 py-1`}
      //   onClick={() => handleClick(value)}
      // >
      //   {value}
      // </button>
      <button
        ref={ref}
        key={key}
        className={`${
          isActive ? "text-white bg-[#418DFF] font-bold" : ""
        } px-3 py-1`}
        onClick={() => handleClick(value)}
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
        total={5}
        page={currentPage}
        boundaries={1}
        className="gap-2"
        radius="full"
        renderItem={renderItem}
        variant="light"
      />
    </div>
  );
};

export default PaginationD;
