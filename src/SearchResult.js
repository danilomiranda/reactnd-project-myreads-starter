import React from 'react'
import Book from './Book'

const SearchResult = ({ title, shelfs, books, onChangeShelf }) => (
    <ol className="books-grid">
        {!books || books.length === 0 ? (
          <h2>Nenhum livro carregado</h2>
          ):(
          books.map((book) =>
          <li key={book.id}>
            <Book onChangeShelf={onChangeShelf} book={book} shelfs={shelfs} shelf={title}/>
          </li>
        ))}
      </ol>
)

export default SearchResult