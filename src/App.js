import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import $ from 'jquery'
// USING UNSPLASH API
import Photos from './Photos'
// GENERATE API_ACCESS_KEY AND PASTE BELOW
const clientID = `?client_id=tqJeBoY4G0UACbpOHLHwduQM2zKIHLRn8s-ghTHz594`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    $(function () {
      $('.loader').delay(2000).fadeOut('slow')
      $('#overlayer').delay(2000).fadeOut('slow')
      setLoading(false)
    })
  }, [])

  // STATE VARIABLES
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  // URL PARAMETERS
  let url
  const urlPage = `&page=${page}`
  const urlQuery = `&query=${query}`
  const itemsPerPage = `&per_page=21`

  if (query) {
    // if user enters a value access this url
    url = `${searchUrl}${clientID}${urlPage}${itemsPerPage}${urlQuery}`
  } else {
    // load this url by default and the input field should be empty
    url = `${mainUrl}${clientID}${urlPage}${itemsPerPage}`
  }

  // Fetching the data/images
  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      // assigning value to state variable === photos
      setPhotos(() => {
        if (query) {
          return data.results // returns an object with results(array) property
        } else {
          return data // returns an array with 10 objects/images
        }
      })

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query) {
      // if input field has a value then only run the fetchImages function // removing uneccessary renders
      fetchImages()
    }
  }
  return (
    <>
      <div id='overlayer'>
        <span className='loader'>
          <span className='loader-inner'></span>
        </span>
      </div>
      {!loading && (
        <main>
          <section className='search'>
            <form className='search-form'>
              <input
                type='text'
                placeholder='search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='form-input'
              />
              <button
                type='submit'
                className='submit-btn'
                onClick={handleSubmit}
              >
                <FaSearch />
              </button>
            </form>
          </section>
          <section className='photos'>
            <div className='photos-center'>
              {photos &&
                photos.map((image, index) => {
                  return <Photos key={index} {...image} />
                })}
            </div>
            {isLoading && <h2 className='loading'>Loading...</h2>}
          </section>
        </main>
      )}
    </>
  )
}

export default App
