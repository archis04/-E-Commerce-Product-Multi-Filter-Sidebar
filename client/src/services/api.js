const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchProducts = async ({ categories, minPrice, maxPrice, rating, sort } = {}) => {
  const url = new URL(`${API_BASE_URL}/api/products`);
  const params = new URLSearchParams();

  if (categories?.length) {
    params.set("categories", categories.join(","));
  }

  if (minPrice != null) {
    params.set("minPrice", String(minPrice));
  }

  if (maxPrice != null) {
    params.set("maxPrice", String(maxPrice));
  }

  if (rating != null) {
    params.set("rating", String(rating));
  }

  if (sort) {
    params.set("sort", sort);
  }

  url.search = params.toString();
  const response = await fetch(url.href);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
};
