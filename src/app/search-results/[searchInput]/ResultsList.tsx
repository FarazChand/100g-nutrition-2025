"use client"; // This uses client-side interactivity

import { useRouter } from "next/navigation";

import { usePageResults } from "@/lib/customHooks";
import { RESULTS_PER_PAGE } from "@/lib/constants";

// This is typed using the exact keynames found in data.food.[fooditemindex]
// Is only using the keynames needed for the search results UI
export type SearchResultsItem = {
  fdcId: string;
  description: string;
  dataType: string; // is this used?
};

type SearchResultsProps = {
  searchResults: SearchResultsItem[];
};

export default function SearchResults({ searchResults }: SearchResultsProps) {
  const router = useRouter();

  const numberOfPages = searchResults.length / RESULTS_PER_PAGE;

  const { currentPage, handlePrevPage, handleNextPage, resetPage } =
    usePageResults();

  const startIndex = currentPage * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentPageResults = searchResults.slice(startIndex, endIndex);

  const selectItemHandler = (item: string) => {
    // Never executed, probably route switch before execution for some reason
    console.log(item);

    router.push(`/item-details/${item}`);
  };

  return (
    <div>
      <ul className="mx-auto w-full">
        {currentPageResults.map((item) => (
          <li
            key={item.fdcId}
            onClick={() => selectItemHandler(item.fdcId)}
            className="border-grey-600 animate-navLinkFade cursor-pointer border-b-2 px-3 py-4 hover:bg-green-50 hover:font-bold hover:text-blue-500 hover:shadow-md"
          >
            {item.description + item.fdcId}
          </li>
        ))}
      </ul>

      <div className="flex gap-4">
        <h3 className="cursor-pointer" onClick={() => handlePrevPage()}>
          prev
        </h3>
        <h3
          className="cursor-pointer"
          onClick={() => handleNextPage(numberOfPages)}
        >
          next
        </h3>
      </div>

      <h3>{`Page: ${currentPage + 1}`} </h3>
    </div>
  );
}
