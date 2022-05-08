import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CardStartup from './CardStartup'
import queryString from 'query-string'
import Startup from './Startup'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  })
  const { categories, category, search, results, searched } = data
  const [res, setRes] = useState([])
  const [startups, setStartups] = useState([])
  async function list(params) {
    // console.log(name, email , password)
    const query = queryString.stringify(params)
    console.log(query)
    try {
      const result = await axios.post(
        `http://localhost:8000/api/startups/search?${query}`
      )
      setData({ ...data, results: result, searched: true })
      setRes(result)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  async function getStartups() {
    try {
      const data = await axios.get('http://localhost:8000/api/startups')
      setStartups(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }
  async function loadCategories() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/categories')
      setData({ ...data, categories: data })
    } catch (error) {
      console.log(data?.error)
    }
  }
  useEffect(() => {
    loadCategories()
    getStartups()
  }, [])
  const handleChange = (name) => (event) => {
    //
    setData({ ...data, [name]: event.target.value, searched: false })
  }
  const searchData = () => {
    //console.log(search , category);
    if (search) {
      list({ search: search || undefined, category: category })
      console.log(results)
      console.log(res)
    } else {
      getStartups()
    }
  }
  const searchSubmit = (e) => {
    //
    e.preventDefault()
    searchData()
  }

  const searchMessage = () => {
    if (searched && results?.length > 0) {
      return `Found ${results?.length} startups`
    }
    if (searched && results?.length < 1) {
      return `No startups Found `
    }
  }

  const searchedProducts = (res = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, res)}</h2>
        <div className='row'></div>
        <div className='row'>
          {res?.data?.map((sp, i) => (
            <Startup key={i} props={sp} />
          ))}
        </div>
      </div>
    )
  }

  const AllStartups = (res) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, res)}</h2>
        <div className='row'></div>
        <div className='row'>
          {res?.data?.map((st, i) => (
            <Startup key={i} props={st} />
          ))}
        </div>
      </div>
    )
  }
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn mr-2' onChange={handleChange('category')}>
              <option value='All'> All </option>
              {categories?.data?.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type='search'
            className='form-control'
            onChange={handleChange('search')}
            placeholder='Search By Name'
          />
        </div>
        <div className='btn input-group-append' style={{ border: 'none' }}>
          <button className='input-group-text'>Search</button>
        </div>
      </span>
    </form>
  )
  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      {searched ? (
        <div className='container-fluid mb-3'>{searchedProducts(results)}</div>
      ) : (
        <div className='container-fluid mb-3'>{AllStartups(startups)}</div>
      )}
    </div>
  )
}
export default Search
