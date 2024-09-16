import { useState } from "react";
import Button from "wiremock/components/native/button";
import Dropdown from "wiremock/components/native/dropdown_single";
import Input from "wiremock/components/native/input";

const QueryParamMapping = () => {
  const methods = [
    { value: "get", label: "GET", selected: true },
    { value: "post", label: "POST", selected: false },
    { value: "put", label: "PUT", selected: false },
    { value: "patch", label: "PATCH", selected: false },
    { value: "delete", label: "DELETE", selected: false },
  ];

  // State to manage the rows
  const [rows, setRows] = useState([
    { id: 1, selectedMethod: "", options: methods },
  ]);

  // Function to add a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      selectedMethod: "",
      options: methods,
    };
    setRows([...rows, newRow]);
  };

  // Function to delete a row
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div id="queryparam-req-specification" className="flex flex-col gap-2">
      <div id="queryparam-req-buttons" className="flex flex-row gap-3 pb-2">
        <Button icon="fas fa-save" className={"p-0"} />
        <Button label="Add Query Params" type="primary_link" onClick={addRow} />
      </div>
      {rows.map((row) => (
        <div
          key={row.id}
          id="queryparam-req-list"
          className="flex flex-row gap-3 pb-2"
        >
          <Input className={"w-[225px]"} />
          <Dropdown
            options={row.options}
            setOptions={(newOptions) =>
              setRows(
                rows.map((r) =>
                  r.id === row.id ? { ...r, options: newOptions } : r
                )
              )
            }
            setValue={(value) =>
              setRows(
                rows.map((r) =>
                  r.id === row.id ? { ...r, selectedMethod: value } : r
                )
              )
            }
            width={"w-[140px]"}
            height={"h-[37px]"}
            className="mt-[3px]"
          />
          <Input className={"w-[225px]"} />
          <Button
            type="error"
            icon="fas fa-trash"
            onClick={() => deleteRow(row.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default QueryParamMapping;
