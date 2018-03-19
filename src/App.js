import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf'
// import Books from './Books'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
    books: [],
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
  }

  handleBookChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    const shelfTitles = [
      'Currently Reading',
      'Want To Read',
      'Read'
    ]
    // console.log(this.state.selectValue)
    return (
      <div className="app">
        <Route path="/search" render={() => (
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
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
