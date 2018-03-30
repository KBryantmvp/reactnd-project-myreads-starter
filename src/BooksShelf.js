import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'

function BooksShelf (props) {
  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onBookChange={props.onBookChange}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

BooksShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default BooksShelf