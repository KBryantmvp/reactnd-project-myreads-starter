import React, { Component } from 'react';
// import Books from './Books.js'

class ListBooks extends Component {

  // TODO: method to format the title from shelves
  //
  // getTitle = (string) => {
  //   string.replace(/^[a-z]|[A-Z]/g, function(v, i) {
  //     return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
  //   });
  // }

  render() {
    const books = this.props.books;
    const shelves = [
      'currentlyReading',
      'wantToRead',
      'read'
    ];

    return (
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, i) => (
            <div key={i} className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => (
                    book.shelf === shelf
                  )).map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
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
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          {book.authors.map((author, index) => (
                            <p style={{margin: "auto"}} key={index}>{author}</p>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ListBooks