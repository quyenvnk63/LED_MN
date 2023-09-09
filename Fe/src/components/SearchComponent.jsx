    import React, { useState } from 'react';
    import './SearchComponent.css';
    const SearchComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(searchTerm);
    };


    return (
        
        <div class="box">
        <div class="container-1">
            <span class="icon"><i class="fa fa-search"></i></span>
            <input type="text" value={searchTerm}  onChange={handleChange} placeholder="Search..." />
        </div>
      </div>


    );
    };

    export default SearchComponent;
