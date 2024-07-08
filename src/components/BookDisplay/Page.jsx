import React from 'react'
import './bookDisplay.css'

const Page = ({ page, setPage }) => {
    const handlePage = (number) => {
        setPage(number)
    }
    return (
        <ul className='pagination'>
            <li
                className={page === 1 ? "pageActive" : ""}
                onClick={() => handlePage(1)}
            >
                1
            </li>

            <li
                className={page === 2 ? "pageActive" : ""}
                onClick={() => handlePage(2)}
            >
                2
            </li>

            <li
                className={page === 3 ? "pageActive" : ""}
                onClick={() => handlePage(3)}
            >
                3
            </li>

            <li
                className={page === 4 ? "pageActive" : ""}
                onClick={() => handlePage(4)}
            >
                4
            </li>

            <li
                className={page === 5 ? "pageActive" : ""}
                onClick={() => handlePage(5)}
            >
                5
            </li>
        </ul>
    )
}

export default Page
