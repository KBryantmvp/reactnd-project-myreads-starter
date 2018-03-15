import React, { Component } from 'react';

class Books extends Component {

  makeTitle (str) {
    let myStr = str.split(' ').join('');
    return myStr.charAt(0).toLowerCase() + myStr.slice(1);
  }

  render() {
    const books = this.props.books;
    
    return (
      <ol className="books-grid">
        {books.filter(book => (
          // TODO: how to make this decision to display only books in each shelf
          book.shelf === this.makeTitle(this.props.shelfTitle)
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
    )
  }
}

export default Books