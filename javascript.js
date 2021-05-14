const display = document.querySelector(".libreria")
const nuevoLibro = document.querySelector(".nuevoLibro")
const tituloLibro = document.querySelector(".tituloLibro")
const autor = document.querySelector(".autor")
const paginas = document.querySelector(".paginas")
const read = document.querySelector(".read")

function Book(title, author, pages, read) {
    this.title = title 
    this.author = author
    this.pages = pages
    this.read = read
    Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}}

function addBookToLibrary(){
    let newTitle = prompt("Titulo?");
    let newAuthor = prompt("Autor?");
    let pages = prompt("Numero de paginas");
    let read = prompt("Leido?");
    let newBook = new Book(newTitle,newAuthor,pages,read);
    newBook.prototype = Object.create(Book.prototype);
    myLibrary.push(newBook);
    displayBooks();
}
//https://stackoverflow.com/questions/39155810/displaying-an-object-within-an-array-through-dom
function displayBooks() {
    while (tituloLibro.firstChild) {
        tituloLibro.removeChild(tituloLibro.firstChild);
    }
    while (autor.firstChild) {
        autor.removeChild(autor.firstChild);
    }
    while (paginas.firstChild) {
        paginas.removeChild(paginas.firstChild);
    }
    while (read.firstChild) {
        read.removeChild(read.firstChild);
    }
    
    for (let i=0; i<myLibrary.length; i++) {
        const novoTitulo= document.createElement('div');
        novoTitulo.classList.add("libro");
        novoTitulo.textContent += myLibrary[i].title;
        tituloLibro.appendChild(novoTitulo);

        const novoAutor= document.createElement('div');
        novoAutor.classList.add("libro");
        novoAutor.textContent += myLibrary[i].author;
        autor.appendChild(novoAutor);

        const novoPaginas= document.createElement('div');
        novoPaginas.classList.add("libro");
        novoPaginas.textContent += myLibrary[i].pages;
        paginas.appendChild(novoPaginas);

        const novoLeido= document.createElement('div');
        novoLeido.classList.add("libro");
        novoLeido.textContent += myLibrary[i].read;
        read.appendChild(novoLeido);
    }
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet")
let myLibrary = [theHobbit];
displayBooks();
nuevoLibro.addEventListener('click', () => {
    addBookToLibrary()
})
    