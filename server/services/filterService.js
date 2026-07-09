import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, "../data/products.json");

export const getAllProducts = () => {
  const data = readFileSync(productsPath, "utf-8");
  return JSON.parse(data);
};
