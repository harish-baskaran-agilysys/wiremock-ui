import { useRecoilState } from "recoil";
import DropdownMulti from "wiremock/components/native/dropdown_multi";
import {
  addCategory,
  getCategories,
} from "../../../../../components/utils/categoryManager";
import { useEffect, useMemo, useState } from "react";
import { stub } from "wiremock/recoil/atoms";
import Header from "wiremock/components/native/header";

const CategorySelector = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Keep selectedCategories in sync with reqStub
  useEffect(() => {
    setSelectedCategories(reqStub?.metadata?.category || []);
  }, [reqStub]);

  // Memoize dropdown options
  const options = useMemo(() => {
    const categories = getCategories();
    return categories.map((cat) => ({
      label: cat,
      value: cat,
      selected: selectedCategories.includes(cat),
    }));
  }, [selectedCategories]);

  // Handle selection change from DropdownMulti
  const handleCategoryChange = (newOptions) => {
    const selected = newOptions
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);
    setSelectedCategories(selected);

    setReqStub((prev) => {
      const current = prev.metadata?.category || [];
      if (JSON.stringify(current) === JSON.stringify(selected)) return prev;

      return {
        ...prev,
        metadata: {
          ...prev.metadata,
          category: selected,
        },
      };
    });

    selected.forEach((cat) => addCategory(cat));
  };

  return (
    <div className="flex gap-2 w-full">
      <Header className="mb-3" label="Categories" />
      <DropdownMulti
        options={options}
        setOptions={handleCategoryChange}
        width="w-full"
      />
    </div>
  );
};

export default CategorySelector;
