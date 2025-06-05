import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const BrPostApi = () => {
  const [districts, setDistricts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

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

  const selectChangeHandler = (e) => {
    const { selectedOptions } = e.target;
    const selected = Array.from(selectedOptions, (option) => option.value);
    setActiveFilters((prev) => {
      const allActives = [...prev, ...selected];
      const uniqueActives = [...new Set(allActives)];
      return uniqueActives;
    });
  };
  console.log("Selected Filters :", activeFilters);

  const filteredApplications = applications.filter((eachApplication) =>
    activeFilters.length === 0
      ? applications
      : activeFilters.includes(eachApplication.district_name)
  );

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Website</h1>
      <label className="m-3">District :</label>
      <select
        className="m-2"
        onChange={selectChangeHandler}
        value={activeFilters}
      >
        <option>Please Choose an Option</option>
        {districts.map((eachDistrict, index) => (
          <option key={index} value={eachDistrict.trim()}>
            {eachDistrict}
          </option>
        ))}
      </select>
      <Table applications={filteredApplications} />
    </div>
  );
};
export default BrPostApi;
