import React from 'react'
import './Book.css'

const Book = ({ book, onChangeShelf, shelfs, shelf }) => {
      shelfs = shelfs.filter(item => item.title !== shelf)
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}/>
                <div className="book-shelf-changer">
                    <select id='select-shelf' onChange={(event) => onChangeShelf(book, event.target.value)}>
                    <option value="none" >Move to...</option>
                    {shelfs.map(option => (
                        <option selected={option.title === shelf} key={option.collectionName} value={option.collectionName}>{option.title}</option>
                    ))}
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                {book.authors ? (book.authors.map((author, i) => {
                    if (book.authors.length === i + 1) {
                        return author
                    } else {
                        return `${author}, `
                    }
                })) : null }
                </div>
            </div>
        )
}

export default Book
