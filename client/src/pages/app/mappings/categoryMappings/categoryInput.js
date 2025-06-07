import { useState, useEffect } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "./categoryManager";
import Input from "wiremock/components/native/input";
import Button from "wiremock/components/native/button";

const CategoryInput = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  // Load categories on mount
  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = () => {
    const categories = getCategories();
    setCategoryList(categories);
  };

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const existing = getCategories().map((c) => c.toLowerCase());
    if (existing.includes(trimmed.toLowerCase())) return;

    addCategory(trimmed);
    refreshCategories();
    onAdd?.(trimmed);
    setInputValue("");
  };

  const handleDelete = (cat) => {
    deleteCategory(cat);
    refreshCategories();
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-2 items-center">
        <Input
          type="text"
          placeholder="Enter new category"
          value={inputValue}
          setValue={setInputValue}
        />
        <Button onClick={handleSave} label="Save" />
      </div>

      {/* Category List */}
      <div className="mt-2">
        <h4 className="text-sm font-semibold mb-1">Saved Categories:</h4>
        {categoryList.length > 0 ? (
          <ul className="text-sm list-disc list-inside">
            {categoryList.map((cat, idx) => (
              <li key={`${cat}-${idx}`} className="flex gap-4 items-center">
                <span>{cat}</span>
                <button
                  onClick={() => handleDelete(cat)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryInput;
