import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalComponent from './ModalComponent';
import RadioGroup from './RadioGroup';

class Book extends Component {
    constructor() {
        super();
        //based on https://codepen.io/graubnla/pen/EgdgZm
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    
        this.state = {
          popupVisible: false,
          showModal: false,
          isOpen: false,
          options:[
              {value:"currentlyReading", label:"Currently Reading"},
              {value:"wantToRead", label:"Want to Read"},
              {value:"read", label:"Read"},
              {value:"none", label:"None"},
          ],
        };
    }

    static propTypes = {
        book: PropTypes.object.isRequired,
    }

    handleClick() {
        if (!this.state.isOpen) {
          document.addEventListener('click', this.handleOutsideClick, false);
        } else {
          document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
           isOpen: !prevState.isOpen,
        }));
    }
      
    handleOutsideClick(e) {
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
    }

    render(){
        var book = this.props.book;

        var bookCoverStyle = { 
            width: "128px", 
            height: "193px", 
            backgroundRepeat: "no-repeat",
            cursor:'pointer'
        };

        var radioGroupStyle = {
            top: "212px",
            left: "18px",
            zIndex: 1000,
            width: "116px",
            position: "absolute",
            background: "#4a498d",
            borderRadius: "10px",
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={bookCoverStyle} 
                        onClick={this.showDetails.bind(this)}>
                        <img alt="book" src={book.imageLinks.smallThumbnail} width="128" height="193"/>
                    </div>
                    <div className="book-shelf-changer" onClick={this.handleClick} ref={node => { this.node = node; }}>
                    </div>
                    <div style={radioGroupStyle}>
                        <RadioGroup isOpen={this.state.isOpen}
                            options={this.state.options} 
                            onChange={this.props.onChangeShelf.bind(this, book)} 
                            value={book.shelf}
                            className="white-label"
                        />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    book.authors ? 
                    book.authors.map((author, index)=>{
                        return <div key={index} className="book-authors">{author}</div>;
                    }) 
                    : ""
                }
                <ModalComponent open={this.state.showModal} onClose={this._handleClose.bind(this)} title={book.title}>
                    <div>
                        <div>
                            {this.props.book.description}
                        </div>
                        <br/>
                        <div>
                            <a href={this.props.book.previewLink} target="_blank">More...</a>
                        </div>
                    </div>
                </ModalComponent>
            </div>
        );
    }
    _handleClose(e) {
        this.setState({showModal:false});
    }
    showDetails(){
        this.setState({showModal:true});
    }
}

export default Book;