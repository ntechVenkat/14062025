import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Table from "./Table";

const BrPostApi = () => {
  const [districts, setDistricts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = districts.map((eachDistrict) => {
    return {
      value: eachDistrict.trim().toLowerCase(),
      label: eachDistrict.trim(),
    };
  });
  const selectAllOption = { value: "*", label: "Select All" };
  // console.log(options);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await axios.post(
      "https://backend.ts-bpass.com/api/v1/citizen_search/search_by_params",
      {},
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data.data.data);
    setApplications(data.data.data.applications);

    setDistricts((prev) => {
      const values = [
        ...prev,
        ...data.data.data.applications.map((each) => each.district_name),
      ];
      const unique = [...new Set(values)];
      return unique;
    });
  };

  const isSelectedAll = () => selectedOptions.length === options.length;

  const isOptionSelected = (option) =>
    selectedOptions.some(({ value }) => value === option.value);

  const handleChange = (selected) => {
    if (!isOptionSelected) {
      setSelectedOptions([]);
      return;
    }
    const lastSlelected = selected[selected.length - 1];
    if (lastSlelected?.value === "*") {
      if (isSelectedAll()) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([...options]);
      }
    } else {
      const filtered = selected.filter((option) => option.value !== "*");
      setSelectedOptions(filtered);
    }
  };

  const selectedOptionsValues = selectedOptions.map((each) => each.value);

  const filteredApplications = applications.filter((eachApplication) =>
    selectedOptionsValues.length === 0
      ? applications
      : selectedOptionsValues.includes(
          eachApplication.district_name.trim().toLowerCase()
        )
  );
  console.log("Selected Districts", selectedOptionsValues);
  console.log("Filtered Applications ", filteredApplications);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Website</h1>
      <label className="m-3 w-50">
        Districts :
        <span>
          <Select
            options={[selectAllOption, ...options]}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
            closeMenuOnSelect={false}
          />
        </span>
      </label>
      <Table applications={filteredApplications} />
    </div>
  );
};
export default BrPostApi;
