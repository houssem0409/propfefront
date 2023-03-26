import React from 'react'
import Layout from '../../components/Layout'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState, useEffect } from 'react'
import Checkbox from '../../components/Checkbox'
import { countries } from '../../countries'
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from 'react-select'
import axios from 'axios'
import SearchUser from '../../components/SearchUser'
export default function index() {
  const [value, setValue] = useState('Info')

  const [filteredResults, setfilteredResults] = useState(0)
  const [options, setOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState()

  const roles = ['user', 'member', 'director']

  let opt = []

  let setOpts = (countries, opt) => {
    countries?.map((c, e) => {
      opt.push({ value: c, label: c })
    })
    setOptions(opt)
  }
  useEffect(() => {
    setOpts(countries, opt)
  }, [])

  return (
    <Layout>
      <div className='row'>
        <div className='col-3' style={{ backgroundColor: '#545454' }}>
          <h4>Filters </h4>
          <p style={{ color: 'turquoise' }}>
            Select categories and countries to find what you want !
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
            />
          </div>
        </div>
        <div className='col-9'>
          <SearchUser />
        </div>
      </div>
    </Layout>
  )
}
