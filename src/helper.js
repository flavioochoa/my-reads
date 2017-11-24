const helper = {
    getShelf : key => {
        var obj = {
            currentlyReading : 'Currently Reading',
            wantToRead : 'Want To Read',
            read : 'Read',
            none: 'None'
        };
        return obj[key];
    }
}

export default helper;