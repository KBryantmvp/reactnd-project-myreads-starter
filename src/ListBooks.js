import React, { Component } from 'react';
import Books from './Books.js'

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
            <div className="bookshelf-books">
              <Books shelfTitle={this.props.shelfTitle} books={this.props.books}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks