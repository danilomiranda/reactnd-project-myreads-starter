import React, { Component } from 'react'
import './Book.css'

class Book extends Component {
    state = {
        value: ''
    }
    render() {
        const { book, onChangeShelf } = this.props
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
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                {book.authors.map((author, i) => {
                    if (book.authors.length === i + 1) {
                        return author
                    } else {
                        return `${author}, `
                    }
                })}
                </div>
            </div>
        )
    }
}

export default Book