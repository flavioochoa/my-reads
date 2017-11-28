import React from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import BookshelfContainer from './BookshelfContainer.js';
import SearchBookContainer from './SearchBookContainer.js';

const BooksApp = () => {
    return (
        <div className="app">
            <Route exact path='/' component={BookshelfContainer} />
            <Route exact path='/search' component={SearchBookContainer}/>
        </div>
    );
}

export default BooksApp
