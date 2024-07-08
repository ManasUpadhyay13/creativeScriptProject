import React, { useState } from 'react'
import './bookDisplay.css'
import SingleBook from './SingleBook'
import Page from './Page'

const BookDisplay = ({ books, loading, page, setPage }) => {
    console.log(books);
    return (
        <>
            <div className='bookDisplay'>
                {
                    (books.length === 0) && (
                        <p>Nothing to display, please enter a book name</p>
                    )
                }


                {
                    ((books.length !== 0)) && (
                        <>
                            {
                                books.map((singleBook, idx) => (
                                    <SingleBook
                                        key={idx}
                                        data={singleBook}
                                        loading={loading}
                                    />
                                ))
                            }

                        </>
                    )
                }
            </div>

            {
                (books.length !== 0) && (
                    <Page
                        page={page}
                        setPage={setPage}
                    />
                )
            }
        </>
    )
}

export default BookDisplay
