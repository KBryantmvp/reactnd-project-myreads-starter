import React, { Component } from 'react';
import Book from './Book.js'

// TODO: refactor as a FUNCTIONAL COMPONENT
class BooksShelf extends Component {

  render() {
    const { shelfTitle, books } = this.props;
    // console.log('Props', this.props);

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map(book => (
                  <Book key={book.id} book={book} shelf={shelfTitle}/>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksShelf