import React, { useState, useEffect } from "react";
import DropdownMulti from "wiremock/components/native/dropdown_multi";
import { getCategories } from "../categoryMappings/categoryManager";

const CategoryFilterSelector = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const cats = getCategories();
    setOptions(
      cats.map((cat) => ({ label: cat, value: cat, selected: false }))
    );
  }, []);

  const handleChange = (newOptions) => {
    setOptions(newOptions);
    const selected = newOptions
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);
    onChange(selected);
  };

  return (
    <div className="mt-2">
      <DropdownMulti
        options={options}
        setOptions={handleChange}
        width="w-full"
      />
    </div>
  );
};

export default CategoryFilterSelector;
