import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ListBooks.css'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.shape({
      currentlyReading: PropTypes.array.isRequired,
      wantToRead: PropTypes.array.isRequired,
      read: PropTypes.array.isRequired
    })
  }
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: {
          currentlyReading: books.filter((book) => {
          return book.shelf === 'currentlyReading'
          }),
          wantToRead: books.filter((book) => {
          return book.shelf === 'wantToRead'
          }),
          read: books.filter((book) => {
          return book.shelf === 'read'
          })
        }
      })
      console.log(this.state.books.currentlyReading)
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
            <div className="bookshelf">
              <div className="bookshelf-title-wrapper">
                <div className="bookshelf-title"><a href="#"><span>Currently Reading</span></a></div>
              </div>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.currentlyReading.map((book) => 
                    <li key={book.id}>
                      <Book book={book}/>    
                    </li>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <div className="bookshelf-title-wrapper">
                <div className="bookshelf-title"><a href="#"><span>Want to Read</span></a></div>
              </div>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.wantToRead.map((book) => 
                    <li key={book.id}>
                      <Book book={book}/>    
                    </li>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
            <div className="bookshelf-title-wrapper">
                <div className="bookshelf-title"><a href="#"><span>Read</span></a></div>
              </div>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.read.map((book) => 
                    <li key={book.id}>
                      <Book book={book}/>    
                    </li>
                  )}
                </ol>
              </div>
            </div>
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