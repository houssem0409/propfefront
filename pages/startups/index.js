import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import Checkbox from "../../components/Checkbox";
import { countries } from "../../countries";
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from "react-select";
import axios from "axios";

import Search from "../../components/search";
import { stringify } from "query-string";
export default function index() {
  const [myFilters, setMyFilters] = useState({
    limit: "10",
    filters: { category: [], country: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setfilteredResults] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState();

  let opt = [];

  let setOpts = (countries, opt) => {
    countries?.map((c, e) => {
      opt.push({ value: c, label: c });
    });
    setOptions(opt);
  };
  const getFilteredProducts = (skip, limit, filters = {}) => {
    // console.log(name, email , password)

    const data = {
      limit,
      skip,
      filters,
    };
    return fetch(`http://localhost:8000/api/startups/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (value) => {
    setSelectedValues(value);
    const country = [];
    value.map((v, e) => {
      country.push(v.value);
    });
    const newFilters = { ...myFilters };
    newFilters.filters["country"] = country;
    loadFilteredResults(myFilters.filters);
  };
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };
  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setfilteredResults(data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  async function loadCategories() {
    try {
      const { data } = await axios.get("http://localhost:8000/api/categories");
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }
  const loadMore = () => {
    const newLimit = String(limit + 10);

    myFilters.limit = newLimit;
    loadFilteredResults(myFilters);

    setLimit(parseInt(newLimit));
  };
  useEffect(() => {
    loadCategories();
    setOpts(countries, opt);
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-3" style={{ backgroundColor: "#545454 " }}>
          <h4>Filters </h4>
          <p style={{ color: "turquoise" }}>
            Select categories and countries to find what you want !
          </p>
          <div className="col-12">
            <h4>filter by Countries</h4>

            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              closeMenuOnSelect={false}
              value={selectedValues}
              onChange={handleChange}
            />
            <h4>filter by Categories </h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
          </div>
        </div>
        <div className="col-9">
          <Search props={filteredResults} />
          <div
            style={{
              display: "flex",

              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <button
              style={{
                display: "flex",
                width: "30%",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "Highlight",
                borderRadius: 10,
              }}
              onClick={() => {
                loadMore();
              }}
            >
              Load More{" "}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
