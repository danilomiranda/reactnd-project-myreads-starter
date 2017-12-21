import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './ListBooks.css'

import Shelf from './Shelf'

const ListBooks = ({shelfs, changeShelf, books}) => {
  
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map(shelf => (
                <Shelf key={shelf.title}
                  onChangeShelf={changeShelf}
                  title={shelf.title}
                  shelfs={shelfs}
                  books={books[shelf.collectionName]}
                />
              ))}
          </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
}

export default ListBooks
