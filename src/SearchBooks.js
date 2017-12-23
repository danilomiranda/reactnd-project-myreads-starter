import React from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import Shelf from './Shelf'
import If from './utils/if'
import './SearchBooks.css'

const  SearchBooks = (props) => {
    const {searchQuery, search, books, shelfs, onChangeShelf, loadShelfs, loading} = props
    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className='close-search' onClick={(event) => loadShelfs()}>Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                    type="text"
                    placeholder="Search by title or author"
                    value={searchQuery}
                    onChange={event => {
                        search(event.target.value)
                    }}
                />

                </div>
            </div>
            <div className="search-books-results">
            <If test={loading} >
                <div className='loading'>
                  <ReactLoading type='bars' color='#444'/>
                </div>
            </If>
            {shelfs.map(shelf => (
                 <If test={!books[shelf.collectionName] || books[shelf.collectionName].length > 0} >
                    <Shelf key={shelf.title}
                    onChangeShelf={onChangeShelf}
                    title={shelf.title}
                    shelfs={shelfs}
                    books={books[shelf.collectionName]}
                    />
                </If>
              ))}
            </div>
        </div>
    )
}

export default SearchBooks