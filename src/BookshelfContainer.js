import React, {Component} from 'react';

import Bookshelf from './Bookshelf.js';
import * as BooksApi from './BooksAPI.js';
import { Link } from 'react-router-dom';
import MessageNotification from './MessageNotification';
import helper from './helper';

class BookshelfContainer extends Component{
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        currentlyReading:[],
        wantToRead:[],
        read:[],
        isVisible:false,
        content: null
    }

    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf books={this.state.currentlyReading} title="Currently Reading" onChangeShelf={this.onChangeShelf.bind(this)}/>
                        <Bookshelf books={this.state.wantToRead} title="Want to Read" onChangeShelf={this.onChangeShelf.bind(this)}/>
                        <Bookshelf books={this.state.read} title="Read" onChangeShelf={this.onChangeShelf.bind(this)}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>

                <MessageNotification content={this.state.content} isVisible={this.state.isVisible}/>
            </div>
        );
    }

    onChangeShelf(book, e) {
        var value = e.target.value;
        BooksApi.update(book, e.target.value).then(booksids => {
            book.shelf = value;
            var container = this._getContainer();
            var array = [].concat(this.state.currentlyReading, this.state.wantToRead, this.state.read);
    
            Object.keys(booksids).forEach(key=>{
                booksids[key].forEach( id => {
                    this._findAndSet(array, id, container[key]);
                });
            });
            this.setState({currentlyReading : container.currentlyReading, wantToRead : container.wantToRead, read:container.read, isVisible:true, content: `${book.title} changed to ${helper.getShelf(value)}` });
            /*setTimeout(() => {
                this.setState({ isVisible: false });
            }, 2000)*/
        });
    }
      
    componentDidMount() {
        BooksApi.getAll().then((books) => {
            var container = this._getContainer();

            books.forEach(book => {
                container[book.shelf].push(book);
            });
            
            this.setState({currentlyReading : container.currentlyReading, wantToRead : container.wantToRead, read:container.read });
        });     
    }
    
    _findAndSet(array, id, resultArray) {
        var res = array.find(x => x.id === id);
        if (res) {
            resultArray.push(res);
            var index = array.indexOf(res);
            array.splice(index, 1);
        }
    }
    
    _getContainer() {
        return {
            currentlyReading : [],
            wantToRead : [],
            read : [],
        };
    }
};

export default BookshelfContainer;