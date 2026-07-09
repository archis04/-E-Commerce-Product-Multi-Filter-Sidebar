import { getAllProducts } from "../services/filterService.js";

export const getProducts = (req, res) => {
  try {
    const products = getAllProducts();

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
