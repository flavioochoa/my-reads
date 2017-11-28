import React,{ Component }from 'react';
import { Link } from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksApi from './BooksAPI.js';
import MessageNotification from './MessageNotification';
import helper from './helper';
import { Debounce } from 'react-throttle';

class SearchBookContainer extends Component{
    state = {
        books:[],
        hasEmptyQuery: false,
        actualBooks:[],
        isVisible:false,
        content: null
    } 

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="200" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={this.handleSearchChange.bind(this)}/>
                        </Debounce>
                    </div>
                    
                </div>
                <div className="search-books-results">
                    {
                        this.state.hasEmptyQuery ? 
                        "No results found" :
                        <BooksList books={this.state.books} onChangeShelf={this.onChangeShelf.bind(this)}/>
                    }
                </div>
                <MessageNotification content={this.state.content} isVisible={this.state.isVisible}/>
            </div>
        );
    }

    componentDidMount() {
        BooksApi.getAll().then((actualBooks) => {
            this.setState({actualBooks});
        });     
    }

    handleSearchChange(e) {
        if(e.target.value.length >= 3) {
            BooksApi.search(e.target.value, 10).then(books => {
                if(books.error) {
                    this.setState({hasEmptyQuery:true})
                } else {
                    books.forEach((book) => {
                        var res = this.state.actualBooks.find(x => x.id === book.id);
                        book.shelf =  res ? res.shelf : 'none';
                    }); 

                    this.setState({books, hasEmptyQuery:false});
                }
            });
        } else {
            this.setState({hasEmptyQuery:false})
        }
    }

    onChangeShelf(book, e) {
        var value = e.target.value;
        BooksApi.update(book, value).then(booksids => {
            Object.keys(booksids).forEach((key) => {
                booksids[key].forEach(id => {
                    var res = this.state.books.find(x => x.id === id);
                    if(res) {
                        res.shelf = key;
                    }
                }, this);
            }, this);
            this.setState({books:this.state.books, isVisible:true, content: `${book.title} changed to ${helper.getShelf(value)}` })
        });
    }
}

export default SearchBookContainer;