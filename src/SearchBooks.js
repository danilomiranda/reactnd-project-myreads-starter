import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle';
import ReactLoading from 'react-loading'
import SearchResult from './SearchResult'
import If from './utils/if'
import './SearchBooks.css'

const  SearchBooks = (props) => {
    const {searchQuery, search, shelfs, onChangeShelf, loadShelfs, loading, bookResult} = props
    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className='close-search' onClick={(event) => loadShelfs()}>Close</Link>
                <div className="search-books-input-wrapper">
                <Debounce time="400" handler="onChange">
                    <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={e => {
                        search(e.currentTarget.value)
                    }}
                    />
                </Debounce>
                </div>
            </div>
            <div className="search-books-results">
            <If test={loading} >
                <div className='loading'>
                  <ReactLoading type='bars' color='#444'/>
                </div>
            </If>
            <If test={bookResult.length > 0} >
                <SearchResult onChangeShelf={onChangeShelf} books={bookResult} shelfs={shelfs} shelf={null} />
            </If>
            <If test={bookResult.length === 0} >
            <div className="bookshelf-title-wrapper">
                <div className="bookshelf-title"><a href="#"><span>No book found</span></a></div>
            </div>
              </If>
            </div>
        </div>
    )
}

export default SearchBooks