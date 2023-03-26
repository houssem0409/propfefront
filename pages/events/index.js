import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import SearchEvent from '../../components/SearchEvent'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Checkbox from '../../components/Checkbox'
import { countries } from '../../countries'
import { useState } from 'react'
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from 'react-select'
import axios from 'axios'

export default function index() {
  const [options, setOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState()
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setfilteredResults] = useState(0)
  const [myFilters, setMyFilters] = useState({
    limit: '10',
    filters: { category: [], country: [] },
  })

  let opt = []

  let setOpts = (countries, opt) => {
    countries?.map((c, e) => {
      opt.push({ value: c, label: c })
    })
    setOptions(opt)
  }
  const getFilteredProducts = (skip, limit, filters = {}) => {
    // console.log(name, email , password)

    const data = {
      limit,
      skip,
      filters,
    }
    return fetch(`http://localhost:8000/api/events/by/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleChange = (value) => {
    setSelectedValues(value)
    const country = []
    value.map((v, e) => {
      country.push(v.value)
    })
    const newFilters = { ...myFilters }
    newFilters.filters['country'] = country
    loadFilteredResults(myFilters.filters)
  }

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setfilteredResults(data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  useEffect(() => {
    setOpts(countries, opt)
  }, [])
  return (
    <Layout>
      <div className='row'>
        <div className='col-3' style={{ backgroundColor: '#545454 ' }}>
          <h4>Filters </h4>
          <p style={{ color: 'turquoise' }}>
            Select countries to find what you want !
          </p>
          <div className='col-12'>
            <h4>filter by Countries</h4>

            <Select
              isMulti
              name='colors'
              options={options}
              className='basic-multi-select'
              classNamePrefix='select'
              closeMenuOnSelect={false}
              value={selectedValues}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='col-9'>
          <SearchEvent props={filteredResults} />
        </div>
      </div>
    </Layout>
  )
}
