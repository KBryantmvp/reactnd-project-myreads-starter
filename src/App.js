import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf'
import Book from './Book'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: '',
    foundBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    })
  }

  /**
   * Formats shelfTitle to look for matches with 'shelf' property from each book
   * and then display it in the corresponding shelf
   */
  makeTitle = (str) => {
    let myStr = str.split(' ').join('');
    return myStr.charAt(0).toLowerCase() + myStr.slice(1);
  };

  handleBookChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      BooksAPI.getAll().then((books) => {
        this.setState({
          books: books,
        })
      })
    })
  };

  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      BooksAPI.search(query).then((foundBooks) => {
        if (foundBooks.error) {
          this.setState({
            foundBooks: []
          })
        } else {
          // For each book already on a shelf, check if it is one of 
          // the books returned from the search
          this.state.books.forEach(book => {
            let bookOnShelf = foundBooks.find(result => (
              result.id === book.id
            ))
            // If the book is already on a shelf, then assign 
            // the shelf property to the book
            if (bookOnShelf)
              bookOnShelf.shelf = book.shelf
          })
          this.setState({ foundBooks })
        }
      })
    } else {
      this.setState({
        foundBooks: []
      })
    }
  };

  clearText = () => {
    this.setState({
      query: '',
      foundBooks: []
    })
  };


  render() {
    const shelfTitles = [
      'Currently Reading',
      'Want To Read',
      'Read'
    ]

    const foundBooks = this.state.foundBooks

    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
                <button
                  onClick={this.clearText}
                  className="text-remove">
                  Clear text
                </button>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {foundBooks.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    onBookChange={(book, newShelf) => {
                      this.handleBookChange(book, newShelf)
                      //Return to home page after assigning a shelf to a book
                      history.push('/')
                    }}
                  />
                ))}
              </ol>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              {shelfTitles.map((shelfTitle, index) => (
                <BooksShelf
                  key={index}
                  shelfTitle={shelfTitle}
                  books={this.state.books.filter(book => (
                    book.shelf === this.makeTitle(shelfTitle)
                  ))}
                  onBookChange={this.handleBookChange}
                  />
              ))}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp