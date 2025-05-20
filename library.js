const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(lib) {
    for (const book of lib) {
        let bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        let title = document.createElement('h3');
        title.textContent = book.title;

        let author = document.createElement('p');
        author.textContent = book.author;

        let pages = document.createElement('p');
        pages.textContent = book.pages;

        let readStatus = document.createElement('p');
        readStatus.textContent = book.read ? "Read" : "Not read yet";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatus);

        document.getElementById('library').appendChild(bookCard);
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

displayBooks(myLibrary);
