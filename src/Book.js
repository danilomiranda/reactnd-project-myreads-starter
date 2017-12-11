import React, { Component } from 'react'
import './Book.css'

class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ 
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` 
                    }}/>
                <div className="book-shelf-changer">
                    <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">
                {this.props.book.authors.map((author, i) => {
                    if (this.props.book.authors.length === i + 1) {
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