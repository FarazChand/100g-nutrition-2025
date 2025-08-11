"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  resetPage?: () => void;
};

export default function SearchBar({ resetPage }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) return;
    if (resetPage) resetPage();
    router.push(`/search-results/${searchInput}`);
  };

  return (
    <form
      onSubmit={onSubmitSearch}
      className="mx-auto flex max-w-[90vw] flex-col items-center justify-center gap-2 sm:mb-2 sm:max-w-[400px] sm:flex-row sm:justify-center"
    >
      <input
        id="search-bar"
        value={searchInput}
        type="text"
        onChange={searchInputChangeHandler}
        className="w-full rounded border-2 border-black px-3 py-2 text-black sm:mr-2 sm:w-10/12 sm:flex-grow"
      />
      <button className="mb-2 w-full max-w-full rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 sm:mb-0 sm:w-max">
        Search
      </button>
    </form>
  );
}
