# E-Commerce Product Multi-Filter Sidebar
## Implementation Plan (Source of Truth)

---

# Objective

Build a full-stack e-commerce product browsing application where users can filter products using multiple criteria simultaneously.

The application consists of:

- React Frontend
- Express Backend
- Static JSON Product Dataset

The frontend is responsible ONLY for presentation and user interaction.

The backend is responsible for ALL business logic including filtering, sorting and validations.

This follows the assessment requirement that all computations happen server-side.

---

# Functional Requirements

## Filters

The application must support all filters simultaneously.

### 1. Category Filter

- Multiple categories can be selected.
- Implement using checkboxes.

Example categories:

- Electronics
- Apparel
- Footwear

If no category is selected, category filtering should be skipped.

---

### 2. Price Range

User selects:

- Minimum Price
- Maximum Price

Product must satisfy:

```
minPrice <= product.price <= maxPrice
```

If no price filter is applied, price filtering is skipped.

---

### 3. Minimum Rating

User selects:

- 1 Star
- 2 Stars
- 3 Stars
- 4 Stars
- 5 Stars

Product must satisfy:

```
product.rating >= selectedRating
```

If rating is not selected, rating filtering is skipped.

---

# Sorting

Sorting is independent from filtering.

Supported values:

- Price: Low to High
- Price: High to Low
- Top Rated First

Sorting MUST happen AFTER filtering.

Pipeline:

```
Original Dataset
        ↓
    Filtering
        ↓
     Sorting
        ↓
Return Response
```

Never sort before filtering.

---

# Instant Updates

There should NOT be a Submit button.

Whenever:

- Category changes
- Price changes
- Rating changes
- Sort changes

Frontend immediately calls backend API.

Backend returns updated products.

Grid re-renders automatically.

---

# Empty State

If no products match:

- Hide the product grid.
- Display:

```
No items match your criteria.
```

- Display a **Reset Filters** button.

Reset clears:

- Categories
- Price
- Rating
- Sort

Then reload the complete inventory.

---

# Default Behaviour

When the application loads:

- Display all products.

When all filters are cleared:

- Display all products.

No filter should accidentally remove products.

---

# Architecture

```
client/
server/
```

---

# Frontend Responsibilities

Frontend ONLY handles:

- UI
- Filter state
- API requests
- Rendering products
- Loading state
- Error state
- Empty state

Frontend must NEVER perform:

- Filtering
- Sorting
- Business logic
- Computations

---

# Backend Responsibilities

Backend performs:

- Loading products
- Filtering
- Sorting
- Validation
- Returning responses

Backend is the single source of truth.

---

# Folder Structure

```
server/
│
├── app.js
├── routes/
│   └── products.js
├── controllers/
│   └── productController.js
├── services/
│   └── filterService.js
└── data/
    └── products.json

client/
│
└── src/
    ├── components/
    │   ├── FilterSidebar/
    │   ├── CategoryFilter/
    │   ├── PriceSlider/
    │   ├── RatingFilter/
    │   ├── SortDropdown/
    │   ├── ProductCard/
    │   └── ProductGrid/
    │
    ├── pages/
    │   └── Home/
    │
    ├── services/
    │   └── api.js
    │
    └── App.jsx
```

---

# Product Model

Each product contains:

- id
- name
- category
- price
- rating
- image

Example:

```json
{
  "id": 1,
  "name": "Running Shoes",
  "category": "Footwear",
  "price": 2999,
  "rating": 4.5,
  "image": "..."
}
```

---

# API Design

```
GET /api/products
```

Supported query parameters:

| Parameter | Example |
|------------|----------|
| categories | Electronics,Apparel |
| minPrice | 500 |
| maxPrice | 5000 |
| rating | 4 |
| sort | priceAsc |

Example:

```
/api/products?categories=Electronics,Apparel&minPrice=500&maxPrice=5000&rating=4&sort=priceAsc
```

---

# Backend Processing Pipeline

```
Load Products
      ↓
Read Query Parameters
      ↓
Normalize Values
      ↓
Apply Category Filter
      ↓
Apply Price Filter
      ↓
Apply Rating Filter
      ↓
Apply Sorting
      ↓
Return Response
```

---

# Filtering Rules

### Category

If no categories are selected:

```
Return true
```

Else:

```
product.category must exist inside selectedCategories
```

---

### Price

If min/max are missing:

```
Return true
```

Else:

```
minPrice <= product.price <= maxPrice
```

---

### Rating

If rating is missing:

```
Return true
```

Else:

```
product.rating >= selectedRating
```

---

### Final Condition

```
Category
AND
Price
AND
Rating
```

Every active filter must pass.

---

# Sorting Rules

Supported sort keys:

| Key | Behaviour |
|------|-----------|
| priceAsc | Price Low → High |
| priceDesc | Price High → Low |
| ratingDesc | Highest Rating First |

Sorting is skipped if no sort option is selected.

---

# React State

```
selectedCategories
priceRange
selectedRating
sortBy
products
loading
error
```

---

# React Flow

```
User changes filter
        ↓
State updates
        ↓
useEffect triggers
        ↓
API Request
        ↓
Backend Filtering
        ↓
Backend Sorting
        ↓
Response
        ↓
Products state updates
        ↓
Grid re-renders
```

---

# Components

- FilterSidebar
- CategoryFilter
- PriceSlider
- RatingFilter
- SortDropdown
- ProductGrid
- ProductCard

---

# Styling

Desktop:

- Sticky sidebar
- Grid on right

Mobile:

- Sidebar stacks above products

Product Card:

- Image
- Name
- Price
- Rating

---

# Error Handling

Loading:

- Show spinner

Backend failure:

- Show error message

No products:

- Show empty state

Application should never crash due to invalid filters.

---

# Git Commit Plan

1. Initial React + Express setup
2. Added product dataset
3. Created application layout
4. Added filter sidebar UI
5. Connected frontend to backend
6. Implemented backend filtering
7. Implemented backend sorting
8. Added empty state
9. Responsive improvements
10. Final cleanup

---

# Code Quality Rules

- Keep business logic inside services.
- Controllers should remain thin.
- Avoid duplicated code.
- Use descriptive variable names.
- Keep components reusable.
- Avoid hardcoded values.
- Keep filtering and sorting independent.
- Follow single responsibility principle.

---

# Viva Notes

### Why backend filtering?

Business logic belongs on the server and matches assessment requirements.

### Why filter before sorting?

Filtering reduces the dataset before sorting, making the operation more efficient.

### How are filters combined?

Logical AND.

### What happens when filters are empty?

Filtering is skipped and the full inventory is returned.

### Why use a service layer?

Keeps controllers simple, business logic reusable and easier to test.

---

# Important Constraints

- No filtering inside React.
- No sorting inside React.
- Frontend only renders API responses.
- Backend is the single source of truth.
- Filtering always happens before sorting.
- All filters work simultaneously.
- No Submit button.
- Updates happen instantly.