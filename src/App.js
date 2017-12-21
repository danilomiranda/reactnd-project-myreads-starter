import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import Book from './Book'

class BooksApp extends React.Component {
  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array
  }
  state = {
    shelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    bookResult: [],
    bookById: [],
    searchQuery: "",
  }
  shelfs = [
    { title: 'Currently Reading', collectionName: 'currentlyReading'},
    { title: 'Want to Read', collectionName: 'wantToRead'},
    { title: 'Read', collectionName: 'read'},
    { title: 'None', collectionName: 'none'}
  ]
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        shelfs: {
          currentlyReading: books.filter((book) => {
            return book.shelf === 'currentlyReading'
            }),
            wantToRead: books.filter((book) => {
            return book.shelf === 'wantToRead'
            }),
            read: books.filter((book) => {
            return book.shelf === 'read'
            }),
            none: books.filter((book) => {
            return !book.shelf
            }),
        },
        all: books
      })
    })
  }
  
  search = query => {
    this.setState({ searchQuery: query })
    BooksAPI.search(query, 5).then(books => {
      this.setState({
        shelfs: {
          currentlyReading: books.filter((book) => {
            return book.shelf === 'currentlyReading'
            }),
            wantToRead: books.filter((book) => {
            return book.shelf === 'wantToRead'
            }),
            read: books.filter((book) => {
            return book.shelf === 'read'
            }),
            none: books.filter((book) => {
              return !book.shelf
            })
        },
        all: books
      })
    })
  }

  onChangeShelf = (book, shelf) => {
      const currentSearchQuery = this.state.searchQuery;
      BooksAPI.update(book, shelf).then(result => {
          BooksAPI.getAll().then(books => {
            this.setState({
              shelfs: {
                currentlyReading: books.filter((book) => {
                  return book.shelf === 'currentlyReading'
                  }),
                  wantToRead: books.filter((book) => {
                  return book.shelf === 'wantToRead'
                  }),
                  read: books.filter((book) => {
                  return book.shelf === 'read'
                  }),
              },
              all: books
            })
          });
          if (currentSearchQuery !== "") {
              BooksAPI.search(currentSearchQuery, 5).then(books => {
                  this.setState({ bookResult: books });
              });
          }
      });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks shelfs={this.shelfs} changeShelf={this.onChangeShelf} books={this.state.shelfs}/>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            searchQuery={this.state.searchQuery}
            search={this.search}
            books={this.state.shelfs}
            shelfs={this.shelfs}
            onChangeShelf={this.onChangeShelf}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
