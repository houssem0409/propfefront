export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')

    return fetch(`http://localhost:8000/api/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('signout', response)
      })
      .catch((err) => console.log(err))
  }
}

export const authenticate = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
  }
}
