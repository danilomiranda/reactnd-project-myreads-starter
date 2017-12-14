import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ListBooks.css'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'

class ListBooks extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array
  }
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  shelfs = [
    { title: 'Currently Reading', collectionName: 'currentlyReading'},
    { title: 'Want to Read', collectionName: 'wantToRead'},
    { title: 'Read', collectionName: 'read'}
  ]
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => {
        return book.shelf === 'currentlyReading'
        }),
        wantToRead: books.filter((book) => {
        return book.shelf === 'wantToRead'
        }),
        read: books.filter((book) => {
        return book.shelf === 'read'
        }),
        all: books
      })
    })
  }
  changeShelf = (book, newShelf) => {
    const oldShelf = book.shelf
    book.shelf = newShelf
    this.setState((state) => ({
      [newShelf]: state[newShelf].concat(book),
      [oldShelf]: state[oldShelf].filter((b) => {
      return b.id !== book.id
      })
    }))
    BooksAPI.update(book, newShelf)
  }
  render() {
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelfs.map(shelf => (
                <Shelf key={shelf.title}
                  onChangeShelf={this.changeShelf}
                  title={shelf.title}
                  shelfs={this.shelfs}
                  books={this.state[shelf.collectionName]}
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
}

export default ListBooks
