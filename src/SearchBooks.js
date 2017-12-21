import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import Shelf from './Shelf'
import './SearchBooks.css'

const  SearchBooks = (props) => {
    const {searchQuery, search, books, shelfs, shelf, onChangeShelf} = props
    let bookResults = [];
    if (books.length > 0) {
        bookResults = books.map((book, index) => {
            return (
                <li key={index}>
                    <Book book={book} onChangeShelf={onChangeShelf} shelfs={shelfs} shelf={books.title} />
                </li>
            );
        });
    }
    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className='close-search'>Close</Link>
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
            {shelfs.map(shelf => (
                <Shelf key={shelf.title}
                  onChangeShelf={onChangeShelf}
                  title={shelf.title}
                  shelfs={shelfs}
                  books={books[shelf.collectionName]}
                />
              ))}
            </div>
        </div>
    )
}

export default SearchBooks