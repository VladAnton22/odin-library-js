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

Book.prototype.toggleReadStatus = function() {
    if (this.read === false) {
        this.read = true;
    } else if (this.read === true) {
        this.read = false;
    }
    displayBooks(myLibrary);
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks(lib) {
    const container = document.getElementById('library');
    container.innerHTML = '';
    
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

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            removeBook(book.id);
        }

        let readBtn = document.createElement('button');
        readBtn.textContent = book.read ? "Not read" : "Read"
        readBtn.onclick = () => {
            book.toggleReadStatus();
        }
        
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(removeBtn);
        bookCard.appendChild(readBtn)

        container.appendChild(bookCard);
    }
}

function createBookForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'));
    const read = formData.get('read') === 'on';

    addBookToLibrary(title, author, pages, read);
    displayBooks(myLibrary);

    form.reset();
    modal.close();
}

function removeBook(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            displayBooks(myLibrary);
            break;
        }
    }
}

const modal = document.getElementById('bookModal');
const openBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');

openBtn.onclick = () => modal.showModal();
cancelBtn.onclick = () => modal.close();

const form = document.getElementById('bookForm');

form.addEventListener('submit', createBookForm, false);
