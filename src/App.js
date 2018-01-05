import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

const getAll = () => BooksAPI.getAll()

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
    allBooks:[],
    bookResult: [],
    bookById: [],
    searchQuery: "",
    loading: true
  }
  shelfs = [
    { title: 'Currently Reading', collectionName: 'currentlyReading'},
    { title: 'Want to Read', collectionName: 'wantToRead'},
    { title: 'Read', collectionName: 'read'}
  ]

  componentDidMount() {
    getAll().then((books) => {
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
            })
        },
        allBooks: books,
        loading: false
      })
    })
  }

  loadShelfs = () => {
    getAll().then((books) => {
      if(!books) {
        books = []
      }
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
            })
        },
        allBooks: books,
        bookResult: [],
        loading: false
      })
    }).catch((err) => {

    })
  }
  
  search = query => {
    this.setState({ searchQuery: query })
    if(!query) {
      this.setState({bookResult: []})
    } else {
      BooksAPI.search(query.trim(), 5).then(books => {
        if(!books) {
          books = []
        }
        if(!books.error) {
          books.forEach((book) => {
            book.shelf = this.state.allBooks.filter(
              (bookOnCurrentReading) => {
                return book.title === bookOnCurrentReading.title
              }).map((book) => {
                return book.shelf
              })[0]
          })
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
                })
            },
            bookResult: books,
            loading: false
          })
        } else {
          this.setState({bookResult: []})
        }
      }).catch((err) => {
        console.log(`ERROR -> ${err}`)
      })
    }
  }

  onChangeShelf = (book, shelf) => {
      const currentSearchQuery = this.state.searchQuery
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
              loading: false
            })
          })
          if (currentSearchQuery !== "") {
              BooksAPI.search(currentSearchQuery, 5).then(books => {
                  this.setState({ bookResult: books })
              })
          }
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks shelfs={this.shelfs}
            changeShelf={this.onChangeShelf}
            books={this.state.shelfs}
            loading={this.state.loading}
            />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            searchQuery={this.state.searchQuery}
            search={this.search}
            bookResult={this.state.bookResult}
            shelfs={this.shelfs}
            onChangeShelf={this.onChangeShelf}
            loadShelfs={this.loadShelfs}
            loading={this.state.loading}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
