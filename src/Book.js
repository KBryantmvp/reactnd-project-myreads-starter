import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Book extends Component {
  state = {
    selectVal: ''
  }

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState({
        selectVal: this.props.book.shelf
      })
    } else {
      this.setState({ selectVal: 'none' })
    }
  }

  render() {
    const book = this.props.book;

    return (
      <li >
        <div className="book">
          <div className="book-top">
          {/* 
            If book does not have an image, display "No image available"
          */}
            {book.imageLinks ? (
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                }}/>
              ) : (
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    textAlign: 'center',
                    padding: '65px 0'
                  }}>No image available
                </div>
              )}
            <div className="book-shelf-changer">
              <select
                value={this.state.selectVal}
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
          {(book.authors) &&
            <div className="book-authors">
              {book.authors.map((author, index) => (
                <p style={{margin: "auto"}} key={index}>{author}</p>
              ))}
            </div>
          }
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookChange: PropTypes.func.isRequired
}

export default Book