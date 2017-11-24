import React, {Component} from 'react';
import Book from './Book.js';

class BooksList extends Component {
    render() {
        return (
            <ol className="books-grid">
                {
                    this.props && this.props.books ? 
                    this.props.books.map((book, index)=>{
                        return(
                            <li key={index}>
                                <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                            </li>     
                        );
                    }) : ""
                }
            </ol>
        );
    }
}

export default BooksList;