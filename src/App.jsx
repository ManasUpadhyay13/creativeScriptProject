import { useEffect, useState } from 'react'
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


  useEffect(() => {
    if (!bookName) {
      setBooks([])
      setLoading(false)
      return
    }

    setLoading(true)

    if(checkCache(bookName)) {
      const cacheValue = getCacheValue(bookName)
      cacheValue !== null ?  setBooks(cacheValue) : ""
      setLoading(false)
      return
    } 

    const delayDebounceFn = setTimeout(() => {
      fetchBooks(bookName)
    }, 1000)
    setPage(1)

    return () => clearTimeout(delayDebounceFn)
  }, [bookName])

  useEffect(() => {
    setLoading(true)
    fetchBooks(bookName)
    setLoading(true)
  }, [page])

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&startIndex=${page - 1}`)
      setBooks(response.data.items || [])
      setCacheKey(bookName)
      setCacheKeyValue(bookName , response.data.items)
    } catch (error) {
      console.error('Error fetching books:', error)
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
