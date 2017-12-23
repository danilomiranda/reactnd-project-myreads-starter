import React from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import If from './utils/if'

import './ListBooks.css'

import Shelf from './Shelf'

const ListBooks = ({shelfs, changeShelf, books, loading}) => {
  
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <If test={loading} >
                <div className='loading'>
                  <ReactLoading type='bars' color='#444'/>
                </div>
            </If>
            {shelfs.map(shelf => (
                <If key={shelf.title}  test={!books[shelf.collectionName] || books[shelf.collectionName].length > 0} >
                  <Shelf 
                    onChangeShelf={changeShelf}
                    title={shelf.title}
                    shelfs={shelfs}
                    books={books[shelf.collectionName]}
                  />
                </If>
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
