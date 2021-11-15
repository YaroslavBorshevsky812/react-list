import { useState, useEffect, useMemo } from 'react'
import Pagination from '../components/Pagination'
import TableHeader from './TableHeader';
import MyInput from './MyInput'


const Table = () => {
  const [comments, setComments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Comment", field: "body", sortable: true }
  ];

  useEffect(() => {
    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then(response => response.json())
            .then(json => {
                setComments(json);
            });
    };
    getData();
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments

    if (search) {
      computedComments = computedComments.filter(
          comment =>
              comment.name.toLowerCase().includes(search.toLowerCase()) ||
              comment.email.toLowerCase().includes(search.toLowerCase()) || 
              comment.body.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
          (a, b) =>
              reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    setTotalItems(computedComments.length);
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  },  [comments, currentPage, search, sorting])

    return (
    <div className="table-wrapper">
          <MyInput
              onSearch={value => {
                setSearch(value);
                setCurrentPage(1);
              }}
              placeholder="поиск..."
          />

          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />

          <table>
                <caption>Table</caption>
                <thead>
                    <TableHeader
                      headers={headers}
                      onSorting={(field, order) =>
                        setSorting({ field, order })
                      }
                    />
                </thead>

                <tbody>
                  {commentsData.map(comment => (
                        <tr
                          key={comment.id}
                        >
                            <th scope="row" >
                                {comment.id}
                            </th>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.body}</td>
                        </tr>
                      ))}
                </tbody>
          </table>
      </div>
    )
}

export default Table