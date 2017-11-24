import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import BookshelfContainer from './BookshelfContainer.js';
import SearchBookContainer from './SearchBookContainer.js';

class BooksApp extends React.Component {
  
  render() {
    return (
        <div className="app">
            <Route exact path='/' render={({ history }) => (
                    <BookshelfContainer/>
                )}
            />
            <Route exact path='/search' render={() => (
                    <SearchBookContainer/>
                )}
            />
        </div>
    )
  }
}

export default BooksApp
