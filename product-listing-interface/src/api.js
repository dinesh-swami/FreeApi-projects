const API_URL =
  "https://api.freeapi.app/api/v1/public/randomproducts";

export const fetchProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.data.data;
};