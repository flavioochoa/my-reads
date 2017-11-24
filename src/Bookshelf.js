import React, {Component} from 'react';
import BooksList from './BooksList';

class Bookshelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <BooksList books={this.props.books} onChangeShelf={this.props.onChangeShelf}/>
                </div>
            </div>
        );
    }
}

export default Bookshelf;