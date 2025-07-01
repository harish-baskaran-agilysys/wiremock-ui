import React, { useState, useMemo, useEffect } from "react";
import Button from "wiremock/components/native/button";
import Logo from "wiremock/components/native/logo";
import CategoryFilterSelector from "./CategoryFilterSelector"; // adjust path

const SEARCH_KEYS = [
  { label: "URL Path", value: "request.urlPath" },
  { label: "Name", value: "name" },
  { label: "Author Email", value: "metadata.author_email" },
  { label: "Last Updated Email", value: "metadata.lastUpdatedBy_email" },
  { label: "Author Name", value: "metadata.author" },
  { label: "ID", value: "id" },
];

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const FilteredMappings = ({ mappings, setFilteredMappings }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryLogic, setCategoryLogic] = useState("AND");
  const [notLogic, setNotLogic] = useState(false); // New: NOT toggle

  const [filters, setFilters] = useState([
    { id: Date.now(), key: "request.urlPath", text: "" },
  ]);

  const updateFilter = (id, field, value) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      { id: Date.now(), key: "request.urlPath", text: "" },
    ]);
  };

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const [filterLogic, setFilterLogic] = useState("AND"); // or "OR"

  const filtered = useMemo(() => {
    return mappings.filter((mapping) => {
      const textMatch =
        filterLogic === "AND"
          ? filters.every(({ key, text }) => {
              if (!text) return true;
              const value = getNestedValue(mapping, key);
              return (
                typeof value === "string" &&
                value.toLowerCase().includes(text.toLowerCase())
              );
            })
          : filters.some(({ key, text }) => {
              if (!text) return false;
              const value = getNestedValue(mapping, key);
              return (
                typeof value === "string" &&
                value.toLowerCase().includes(text.toLowerCase())
              );
            });

      const stubCategories = mapping.metadata?.category || [];

      const categoryMatch =
        selectedCategories.length === 0
          ? true
          : categoryLogic === "AND"
          ? selectedCategories.every((cat) => stubCategories.includes(cat))
          : selectedCategories.some((cat) => stubCategories.includes(cat));

      const finalMatch = textMatch && categoryMatch;

      return notLogic ? !finalMatch : finalMatch;
    });
  }, [
    filters,
    mappings,
    selectedCategories,
    categoryLogic,
    notLogic,
    filterLogic,
  ]);

  useEffect(() => {
    setFilteredMappings(filtered);
  }, [filtered]);

  return (
    <div className="mb-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Button
            label={categoryLogic === "AND" ? "AND Categories" : "OR Categories"}
            onClick={() =>
              setCategoryLogic((prev) => (prev === "AND" ? "OR" : "AND"))
            }
          />
          <div className="flex gap-2">
            <Button
              label={notLogic ? "NOT: ON" : "NOT: OFF"} // NOT toggle button
              onClick={() => setNotLogic((prev) => !prev)}
              className={notLogic ? "bg-red-400 text-white" : ""}
            />
            <Button
              label={filterLogic === "AND" ? "AND Filters" : "OR Filters"}
              onClick={() =>
                setFilterLogic((prev) => (prev === "AND" ? "OR" : "AND"))
              }
            />
          </div>
        </div>
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
