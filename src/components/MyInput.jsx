import { useState } from 'react'

const MyInput = ({onSearch, placeholder}) => {
    
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };

    return (
        <input 
            className="myInput" 
            placeholder={placeholder}
            value={search}
            onChange={e => onInputChange( e.target.value )}
        >

        </input>
    )
}

export default MyInput