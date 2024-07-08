import React from 'react'
import './input.css'

const Input = ({bookName, setBookName}) => {
  return (
    <div className='inputWrapper'>

    <input 
    className='input'
    type="text" 
    value={bookName}
    placeholder='Search for the book name...'
    onChange={(e) => setBookName(e.target.value)}
    />

    </div>
  )
}

export default Input
