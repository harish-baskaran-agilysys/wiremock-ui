// utils/categoryManager.js

const CATEGORY_KEY = "wiremock_categories";

// Get all categories from localStorage
export const getCategories = () => {
  try {
    return JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [];
  } catch (e) {
    return [];
  }
};

// Save updated category list
export const saveCategories = (categories) => {
  const unique = [...new Set(categories)].sort();
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(unique));
};

// Add a new category if not exists
export const addCategory = (category) => {
  if (!category) return;
  const categories = getCategories();
  if (!categories.includes(category)) {
    saveCategories([...categories, category]);
  }
};

export const deleteCategory = (category) => {
  if (!category) return;
  const existing = getCategories();
  const updated = existing.filter((c) => c.toLowerCase() !== category.toLowerCase());
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
};

export const extractAndStoreCategoriesFromStubs = (stubs) => {
  const extracted = stubs
    .map((stub) => stub.metadata?.category)
    .filter((cat) => Array.isArray(cat) && cat.length > 0) // ensure it's a non-empty array
    .flat(); // flatten the arrays

  if (extracted.length > 0) {
    saveCategories([...getCategories(), ...extracted]);
  }
};