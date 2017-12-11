import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ListBooks.css'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './Shelf'

class ListBooks extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
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
    BooksAPI.update(book, newShelf).then((result) => {
      console.log(result)
      
    })
    
  }
  render() {
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf onChangeShelf={this.changeShelf} title='Currently Reading' books={this.state.currentlyReading}/>
            <Shelf onChangeShelf={this.changeShelf} title='Want to Read' books={this.state.wantToRead}/>
            <Shelf onChangeShelf={this.changeShelf} title='Read' books={this.state.read}/>
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