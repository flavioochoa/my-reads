import React from 'react';
import BooksList from './BooksList';

const Bookshelf = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <BooksList books={props.books} onChangeShelf={props.onChangeShelf}/>
            </div>
        </div>
    );
}

export default Bookshelf;