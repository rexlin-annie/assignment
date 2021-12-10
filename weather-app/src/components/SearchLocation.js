import React from 'react';
import '../assets/SearchLocation.css';
// functional component used as there is no state logic
function SearchLocation(props) {
    return (
        <div className='search-container'>
            <form onSubmit={(e) => props.handleFormSubmit(e)}>
                <button className='search-btn' type='submit'>{'Search'}</button>
                <input className='search-input' placeholder = {'Type a city and hit enter...'} onChange={(e) => props.handleChange(e)}></input>
            </form>
        </div>
    )
}
export default SearchLocation;