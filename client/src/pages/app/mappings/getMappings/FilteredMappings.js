import React, { useState, useMemo, useEffect } from "react";
import Button from "wiremock/components/native/button";
import Logo from "wiremock/components/native/logo";
import CategoryFilterSelector from "./CategoryFilterSelector"; // adjust path

const SEARCH_KEYS = [
  { label: "Name", value: "name" },
  { label: "ID", value: "id" },
  { label: "URL Path", value: "request.urlPath" },
  { label: "Author", value: "metadata.author" },
  { label: "Author Email", value: "metadata.author_email" },
  { label: "Last Updated By Email", value: "metadata.lastUpdatedBy_email" },
];

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const FilteredMappings = ({ mappings, setFilteredMappings }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryLogic, setCategoryLogic] = useState("AND"); // or "OR"

  // Array of filter objects, each with key and text
  const [filters, setFilters] = useState([
    { id: Date.now(), key: "name", text: "" },
  ]);

  // Update one filter's key or text
  const updateFilter = (id, field, value) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  // Add a new empty filter row
  const addFilter = () => {
    setFilters((prev) => [...prev, { id: Date.now(), key: "name", text: "" }]);
  };

  // Remove a filter row by id
  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const filtered = useMemo(() => {
    return mappings.filter((mapping) => {
      // TEXT filters (Name, ID, etc.)
      const textMatch = filters.every(({ key, text }) => {
        if (!text) return true;
        const value = getNestedValue(mapping, key);
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(text.toLowerCase())
        );
      });

      // CATEGORY filter logic
      if (selectedCategories.length === 0) return textMatch;

      const stubCategories = mapping.metadata?.category || [];
      const categoryMatch =
        categoryLogic === "AND"
          ? selectedCategories.every((cat) => stubCategories.includes(cat))
          : selectedCategories.some((cat) => stubCategories.includes(cat));

      return textMatch && categoryMatch;
    });
  }, [filters, mappings, selectedCategories, categoryLogic]);

  // Notify parent of filtered list
  useEffect(() => {
    setFilteredMappings(filtered);
  }, [filtered]);

  return (
    <div className="mb-2 flex flex-col gap-2">
      {/* 🔍 Category-based multi-select filter */}
      <div className="flex gap-2">
        <Button
          label={categoryLogic === "AND" ? "AND" : "OR"}
          onClick={() =>
            setCategoryLogic((prev) => (prev === "AND" ? "OR" : "AND"))
          }
        />
        <CategoryFilterSelector onChange={setSelectedCategories} />
      </div>
      {filters.map(({ id, key, text }) => (
        <div key={id} className="flex gap-2 items-center">
          <select
            value={key}
            onChange={(e) => updateFilter(id, "key", e.target.value)}
            className="border rounded px-2 py-1"
          >
            {SEARCH_KEYS.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder={`Search by ${
              SEARCH_KEYS.find((k) => k.value === key)?.label || "value"
            }`}
            value={text}
            onChange={(e) => updateFilter(id, "text", e.target.value)}
            className="flex-grow border px-2 py-1 rounded"
          />

          {filters.length > 1 && (
            <Logo
              onClick={() => removeFilter(id)}
              icon="fas fa-trash"
              className="cursor-pointer text-red-400 mt-1"
            />
          )}
        </div>
      ))}

      <Button
        onClick={addFilter}
        className="mt-1 w-full"
        label="+ Add Filter"
      />
    </div>
  );
};

export default FilteredMappings;
