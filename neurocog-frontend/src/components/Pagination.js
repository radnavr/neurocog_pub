import React from 'react'
import Button from './Button';

const Pagination = ({ currentPage, onClick, resultsPerPage, totalResults }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <nav>
        <ul className="pagination flex-row no-list-style margin-0-15px">
            {pageNumbers.map(page => (
                <li key={page}>
                    <Button 
                        btnType="button"
                        btnDesignation={
                            currentPage === page ? 
                            "btn secondary indented w-2-5-rem" : 
                            "btn primary indented w-2-5-rem"
                        }
                        onClick={() => onClick(page)}
                        btnName={page}
                    />
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination