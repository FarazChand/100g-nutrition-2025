import { useState, useEffect } from "react";
import { fetchItemDetails } from "./data";
import { FullItemDetails } from "./types";

export function useFilterItemDetails(itemId: string) {
  const [data, setData] = useState<FullItemDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!itemId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchItemDetails(itemId);
        setData(result);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  return {
    itemName: data?.description,
    itemNutrients: data?.foodNutrients,
    isLoading,
  } as const;
}

// ----------------------------------------------

type PageResults = {
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: (numberOfPages: number) => void;
  resetPage: () => void;
};

export function usePageResults(): PageResults {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = (numberOfPages: number) => {
    if (currentPage < numberOfPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const resetPage = () => {
    setCurrentPage(0);
  };

  return { currentPage, handlePrevPage, handleNextPage, resetPage };
}

// ----------------------------------------------
