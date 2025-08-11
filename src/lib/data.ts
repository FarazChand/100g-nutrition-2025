import { FullItemDetails } from "./types";

const apiKeyName = process.env.API_KEY_NAME!;
const apiKeyValue = process.env.API_KEY_VALUE!;
const apiBaseUrl = process.env.API_BASE_URL!;

export const fetchItemDetails = async (
  itemId: string
): Promise<FullItemDetails> => {
  const response = await fetch(
    `${apiBaseUrl}/food/${itemId}?${apiKeyName}=${apiKeyValue}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};
