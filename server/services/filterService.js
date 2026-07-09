import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, "../data/products.json");

const parseCategories = (categories) => {
  if (!categories) {
    return [];
  }

  if (Array.isArray(categories)) {
    return categories
      .flatMap((value) => String(value).split(","))
      .map((category) => category.trim())
      .filter(Boolean);
  }

  return String(categories)
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);
};

const parseNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const getAllProducts = () => {
  const data = readFileSync(productsPath, "utf-8");
  return JSON.parse(data);
};

export const getFilteredProducts = (query = {}) => {
  const products = getAllProducts();
  const selectedCategories = parseCategories(query.categories);
  const minPrice = parseNumber(query.minPrice);
  const maxPrice = parseNumber(query.maxPrice);
  const rating = parseNumber(query.rating);
  const sortBy = String(query.sort || "").trim();

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const priceMatch =
      minPrice == null ||
      maxPrice == null ||
      (product.price >= minPrice && product.price <= maxPrice);

    const ratingMatch = rating == null || product.rating >= rating;

    return categoryMatch && priceMatch && ratingMatch;
  });

  const sortedProducts = [...filteredProducts];

  if (sortBy === "priceAsc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "ratingDesc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  return sortedProducts;
};
