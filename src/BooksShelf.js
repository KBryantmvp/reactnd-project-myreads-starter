import React, { Component } from 'react';
import Book from './Book.js'

// TODO: refactor as a FUNCTIONAL COMPONENT
class BooksShelf extends Component {

  /**
   * Formats shelfTitle to look for matches with 'shelf' property from each book
   * and then display it in the corresponding shelf
   */
  makeTitle = (str) => {
    let myStr = str.split(' ').join('');
    return myStr.charAt(0).toLowerCase() + myStr.slice(1);
  }

  render() {
    const { shelfTitle, books } = this.props;

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter(book => (
                  book.shelf === this.makeTitle(shelfTitle)
                  )).map(book => (
                    <Book key={book.id} book={book}/>
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