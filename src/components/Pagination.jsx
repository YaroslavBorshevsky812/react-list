import React, { useEffect, useState, useMemo } from "react";

const Pagination = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            let className = "page-item"
            if(i === currentPage) className = "page-item active"
            pages.push(
                <li 
                    className={className}
                    key={i}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </li>
            );
        }
        return pages;
    }, [totalPages, currentPage, onPageChange]);


    if( totalPages === 0 ) return null
    
    return (
      <div>
          <ul className="pagination">
              {paginationItems}
          </ul>
      </div>
    )
}

export default Pagination