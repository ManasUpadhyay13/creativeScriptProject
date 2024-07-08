import React from 'react'
import './bookDisplay.css'

const SingleBook = ({ data, loading }) => {
    console.log(data)
    return (
        <div className={loading ? "singleBook singleBookLoading" : "singleBook"}>

            {
                (loading) && (
                    <></>
                )
            }

            {
                (!loading) && (
                    <>
                        <img src={data.volumeInfo.imageLinks?.thumbnail} alt={data.volumeInfo.title} />
                        <h3>
                            <span>Book Name: </span>
                            {data.volumeInfo.title}
                        </h3>
                        <p>
                            <span>Author: </span>
                            {data.volumeInfo.authors?.join(', ')}</p>
                    </>
                )
            }

        </div>
    )
}

export default SingleBook
