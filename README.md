# E-Commerce Product Multi-Filter Sidebar

A full-stack e-commerce product browsing application built with **React** and **Express**.

## Features

- Product listing with responsive grid
- Sticky filter sidebar
- Category filter (multi-select)
- Price range filter
- Minimum rating filter
- Instant filtering (no submit button)
- Server-side filtering
- Server-side sorting
- Sort by:
  - Price: Low to High
  - Price: High to Low
  - Top Rated First
- Empty state with Reset Filters
- Responsive layout

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- CORS

## Project Structure

```
client/
server/
```

## API

```
GET /api/products
```

Supported query parameters:

- categories
- minPrice
- maxPrice
- rating
- sort

Example:

```
/api/products?categories=Electronics&minPrice=1000&maxPrice=5000&rating=4&sort=priceAsc
```

## Running the Project

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```
