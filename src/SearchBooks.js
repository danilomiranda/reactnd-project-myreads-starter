import React from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import BookList from './BookList'
import If from './utils/if'
import './SearchBooks.css'

const  SearchBooks = (props) => {
    const {searchQuery, search, shelfs, onChangeShelf, loadShelfs, loading, bookResult} = props
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
            <If test={bookResult.length > 0} >
                <BookList onChangeShelf={onChangeShelf} books={bookResult} shelfs={shelfs} shelf={null} />
            </If>
            <If test={bookResult.length === 0} >
            <div className="bookshelf-title-wrapper">
                <div className="bookshelf-title"><a href="#"><span>Nenhum resultado encontrado</span></a></div>
            </div>
              </If>
            </div>
        </div>
    )
}

export default SearchBooks