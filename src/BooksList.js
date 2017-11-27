import React from 'react';
import Book from './Book.js';

const BooksList = props => {
    return (
        <ol className="books-grid">
            {
                props && props.books ? 
                props.books.map((book, index)=>{
                    return(
                        <li key={index}>
                            <Book book={book} onChangeShelf={props.onChangeShelf}/>
                        </li>     
                    );
                }) : ""
            }
        </ol>
    );
}

export default BooksList;