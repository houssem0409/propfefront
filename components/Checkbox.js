import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c)
    const newCheckedCategoryId = [...checked]
    // if currently checked was not alredy in checked stae > push
    // else pull/ Take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }
  return (
    <div>
      {categories?.data?.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <div className='form-check form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckDefault'
              onChange={handleToggle(c?._id)}
              value={checked.indexOf(c?._id === -1)}
            />
            <label
              className='form-check-label'
              htmlFor='flexSwitchCheckDefault'
              style={{ color: 'turquoise', height: '35px' }}
            >
              {c?.name}
            </label>
          </div>
        </li>
      ))}
    </div>
  )
}
export default Checkbox
