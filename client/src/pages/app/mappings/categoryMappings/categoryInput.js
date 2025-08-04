import { useState, useEffect, useMemo } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../../../../components/utils/categoryManager";
import Input from "wiremock/components/native/input";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";

const CategoryInput = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryList, setCategoryList] = useState([]);

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

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categoryList;
    return categoryList.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categoryList]);

  return (
    <div className="flex flex-col gap-4 p-4 w-[50%]">
      <Header label="Category Manager" className="text-lg font-bold" />

      <Input
        placeholder="Search categories"
        value={searchTerm}
        setValue={setSearchTerm}
      />

      <div className="flex gap-2 items-center">
        <Input
          placeholder="Enter new category"
          value={inputValue}
          setValue={setInputValue}
          className="w-[500px]"
        />
        <Button onClick={handleSave} label="Save" />
      </div>

      <div className="flex flex-col gap-2 mt-2 w-[560px]">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <div
              key={`${cat}-${idx}`}
              className="flex items-center justify-between border p-2 rounded"
            >
              <span>{cat}</span>
              <Button
                onClick={() => handleDelete(cat)}
                type="error"
                label="Delete"
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryInput;
