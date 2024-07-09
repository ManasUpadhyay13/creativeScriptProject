import { useEffect, useState, useRef } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import BookDisplay from './components/BookDisplay/BookDisplay'
import Input from './components/Input/Input'
import axios from 'axios'
import { setCacheKey, setCacheKeyValue } from './utils/setCache'
import { checkCache, getCacheValue } from './utils/getCache'

function App() {
  const [bookName, setBookName] = useState('')
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const cancelTokenRef = useRef(null) 

  useEffect(() => {
    if (!bookName) {
      setBooks([])
      setLoading(false)
      return
    }

    setLoading(true)

    if (checkCache(bookName)) {
      const cacheValue = getCacheValue(bookName)
      if (cacheValue !== null) {
        setBooks(cacheValue)
      }
      setLoading(false)
      return
    }

    const delayDebounceFn = setTimeout(() => {
      fetchBooks(bookName, 1)
    }, 1000)

    return () => {
      clearTimeout(delayDebounceFn)
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Operation canceled due to new request.')
      }
    }
  }, [bookName])

  useEffect(() => {
    if (bookName) {
      setLoading(true)
      fetchBooks(bookName, page)
    }
  }, [page])

  const fetchBooks = async (query, page) => {
    try {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Operation canceled due to new request.')
      }
      cancelTokenRef.current = axios.CancelToken.source()

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&startIndex=${(page - 1) * 5}`, {
        cancelToken: cancelTokenRef.current.token,
      })
      setBooks(response.data.items || [])
      setCacheKey(query)
      setCacheKeyValue(query, response.data.items)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message)
      } else {
        console.error('Error fetching books:', error)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Banner />
      <Input
        bookName={bookName}
        setBookName={setBookName}
      />
      <BookDisplay
        books={books}
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default App
