import React from 'react'
import BookList from './BookList'
import './Shelf.css'

const Shelf = ({ title, shelfs, books, onChangeShelf }) => (
  <div className="bookshelf">
    <div className="bookshelf-title-wrapper">
      <div className="bookshelf-title"><a href="#"><span>{title}</span></a></div>
    </div>
    <div className="bookshelf-books">
      <BookList onChangeShelf={onChangeShelf} books={books} shelfs={shelfs} shelf={title} />
    </div>
  </div>
)

export default Shelf
