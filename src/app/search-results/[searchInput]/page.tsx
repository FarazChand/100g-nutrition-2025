// import { SearchResultsItem } from "@/lib/types"; // update the import if needed
import ResultsList from "./ResultsList";
import SearchBar from "../../../components/SearchBar";

export type SearchResultsItem = {
  fdcId: string;
  description: string;
  dataType: string;
};

type SearchResultsResponse = {
  foods: SearchResultsItem[];
};

type PageProps = {
  params: Promise<{ searchInput: string }>;
};

// SERVER-SIDE: Fetch data using searchInput
export default async function SearchResultsPage({ params }: PageProps) {
  const { searchInput } = await params;

  console.log(`********Search Input: ${searchInput}************`);

  const apiKeyName = process.env.API_KEY_NAME!;
  const apiKeyValue = process.env.API_KEY_VALUE!;
  const baseUrl = process.env.API_BASE_URL!;

  const res = await fetch(
    `${baseUrl}/search?${apiKeyName}=${apiKeyValue}&query=${searchInput}&dataType=SR%20Legacy&dataType=Foundation`,
    {
      cache: "no-store", // optional: prevents caching stale results
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data: SearchResultsResponse = await res.json();

  return (
    <main className="mx-auto mt-24 w-10/12 max-w-3xl py-10">
      <SearchBar />
      <ResultsList searchResults={data.foods} />
    </main>
  );
}
