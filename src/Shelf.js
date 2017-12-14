import React from 'react'
import ReactLoading from 'react-loading'
import Book from './Book'
import './Shelf.css'

const Shelf = ({ title, shelfs, books, onChangeShelf }) => (
  <div className="bookshelf">
    <div className="bookshelf-title-wrapper">
      <div className="bookshelf-title"><a href="#"><span>{title}</span></a></div>
    </div>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {!books || books.length === 0 ? (
          <ReactLoading type='bars' color='#444'/>
          ):(
          books.map((book) =>
          <li key={book.id}>
            <Book onChangeShelf={onChangeShelf} book={book} shelfs={shelfs} shelf={title}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
)

export default Shelf
