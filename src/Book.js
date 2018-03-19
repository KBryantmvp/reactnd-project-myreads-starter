import React, { Component } from 'react';

class Book extends Component {

  render() {
    const book = this.props.book;
    // console.log('Props', this.props);
    
    return (
      <li >
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
              <select
                value={book.shelf}
                onChange={(event) => {this.props.onBookChange(book, event.target.value)}}>
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
    )
  }
}

export default Book