import { useState } from 'react'


const TableHeader = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
      const order =
          field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

      setSortingField(field);
      setSortingOrder(order);
      onSorting(field, order);
    };

    return (
      <tr>
        <th className="sort"><span>сортировать по:</span></th>
        {
            headers.map(({name, field, sortable}) => (
                    <th
                        key={name}
                        onClick={() =>
                          sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}
                    </th>
            ))
        }
      </tr>
    )
}

export default TableHeader