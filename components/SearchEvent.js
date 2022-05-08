import axios from 'axios'
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import CardEvent from './Event/CardEvent'

const SearchEvent = () => {
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
        `http://localhost:8000/api/events/search?${query}`
      )
      setData({ ...data, results: result, searched: true })
      setRes(result)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  async function getEvents() {
    try {
      const data = await axios.get('http://localhost:8000/api/events')
      setStartups(data)
      console.log(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEvents()
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
      getEvents()
    }
  }
  const searchSubmit = (e) => {
    //
    e.preventDefault()
    searchData()
  }

  const searchMessage = () => {
    if (searched && results?.length > 0) {
      return `Found ${results?.length} Events`
    }
    if (searched && results?.length < 1) {
      return `No Events Found `
    }
  }

  const searchedEvents = (res = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, res)}</h2>
        <div className='row'></div>
        <div className='row'>
          {res?.data?.map((event, i) => (
            <div className='col-3'>
              <CardEvent key={i} props={event} />
              <img
                src={`http://localhost:8000/api/event/photo/${event?._id}`}
                className='mb-3'
                style={{
                  maxHeight: '30%',
                  maxWidth: '100%',
                }}
              />
              <p>Description :{event?.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const AllEvents = (res) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, res)}</h2>
        <div className='row'></div>
        <div className='row'>
          {res?.data?.map((event, i) => (
            <div className='col-3'>
              <CardEvent key={i} props={event} />
              <img
                src={`http://localhost:8000/api/event/photo/${event?._id}`}
                className='mb-3'
                style={{
                  maxHeight: '30%',
                  maxWidth: '100%',
                }}
              />
              <p>Description :{event?.description}</p>
            </div>
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
        <div className='container-fluid mb-3'>{searchedEvents(results)}</div>
      ) : (
        <div className='container-fluid mb-3'>{AllEvents(startups)}</div>
      )}
    </div>
  )
}
export default SearchEvent
