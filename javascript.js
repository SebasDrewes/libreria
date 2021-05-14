const display = document.querySelector(".libreria")
const nuevoLibro = document.querySelector(".nuevoLibro")
const tituloLibro = document.querySelector(".tituloLibro")
const autor = document.querySelector(".autor")
const paginas = document.querySelector(".paginas")
const read = document.querySelector(".read")
const libreria = document.querySelector(".libreria")

function Book(title, author, pages, read) {
    this.title = title 
    this.author = `de ${author}`
    this.pages = `${pages} paginas`
    this.read = read;
    this.remove = function() {
        for (let i=0; i<myLibrary.length; i++) {
            if (myLibrary[i] === this) {
                myLibrary.splice(i, 1)
            }
        }
        displayBooks()
    this.readStatus = function () {
        
    }
    
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
    //borra todos los libros anteriores para hacer todos nuevamente
    while (libreria.firstChild) {
        libreria.removeChild(libreria.firstChild);
    }
    for (let i=0; i<myLibrary.length; i++) {
        const libroAgregado= document.createElement('div');
        libroAgregado.classList.add("libroAgregado");
        const tituloAgregado= document.createElement('div');
        tituloAgregado.classList.add("tituloAgregado");
        tituloAgregado.textContent = myLibrary[i].title;
        const autorAgregado= document.createElement('div');
        autorAgregado.classList.add("autorAgregado");
        autorAgregado.textContent = myLibrary[i].author;
        const paginasAgregado= document.createElement('div');
        paginasAgregado.classList.add("paginasAgregado");
        paginasAgregado.textContent = myLibrary[i].pages;
        const readAgregado= document.createElement('div');
        readAgregado.classList.add("readAgregado");
        readAgregado.textContent = myLibrary[i].read;
        readAgregado.addEventListener('click', () => {
            if (myLibrary[i].read === "Leido") {
                myLibrary[i].read = "No Leido"
            }else {
                myLibrary[i].read = "Leido"
            }
            readAgregado.textContent = myLibrary[i].read;
        })
        const removeAgregado= document.createElement('button');
        removeAgregado.classList.add("removeAgregado");
        removeAgregado.addEventListener('click', () => {
            myLibrary[i].remove();
        })
        libreria.appendChild(libroAgregado);
        libroAgregado.appendChild(tituloAgregado);
        libroAgregado.appendChild(autorAgregado);
        libroAgregado.appendChild(paginasAgregado);
        libroAgregado.appendChild(readAgregado);
        libroAgregado.appendChild(removeAgregado);
        
    }
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "Leido")
const harryPotter = new Book("Harry Potter", "J.K Rollin", 255, "Leido")
let myLibrary = [theHobbit, harryPotter];
displayBooks();
nuevoLibro.addEventListener('click', () => {
    addBookToLibrary()
})
    