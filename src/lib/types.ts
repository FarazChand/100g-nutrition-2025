export type TestingType = string;

export type SearchResultsItem = {
  fdcId: string;
  description: string;
  dataType: string;
};

export type SearchResultsQueryResponse = {
  searchResults: SearchResultsItem[] | undefined;
  isLoading: boolean;
};

export type SelectedItemDetails = {};

export type FoodNutrients = {
  amount: number;
  nutrient: {
    name: string;
    unitName: string;
  };
}[];

export type FullItemDetails = {
  description: string;
  foodNutrients: FoodNutrients;
};
