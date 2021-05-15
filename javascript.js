const display = document.querySelector(".libreria")
const nuevoLibro = document.querySelector(".nuevoLibro")
const tituloLibro = document.querySelector(".tituloLibro")
const autor = document.querySelector(".autor")
const paginas = document.querySelector(".paginas")
const read = document.querySelector(".read")
const libreria = document.querySelector(".libreria")
const displayForm = document.querySelector(".displayForm")
const newBok = document.querySelector(".newBook")
const newAutor = document.querySelector(".newAuthor")
const newPages = document.querySelector(".newPages")
const newRead = document.querySelector(".newRead")
function Book(title, author, pages, read) {
    this.title = title 
    this.author = `de ${author}`
    this.pages = `${pages} paginas`
    this.read = read;
 /*   Book.prototype.changeRead = function() {
        if (this.read === "Leido") {
            this.read = "No Leido"
        }else {
            this.read = "Leido"
        }
    }
    Book.prototype.remove = function() {
        for (let i=0; i<myLibrary.length; i++) {
            if (myLibrary[i] === this) {
                myLibrary.splice(i, 1)
            }
        }
        displayBooks()*/
}

function addBookToLibrary(){
    let newTitle = newBok.value
    let newAuthor = newAutor.value
    let pages = newPages.value
    let read = newRead.checked
    if (read === true) {
        read = "Leido"
    } else {
        read = "No Leido"
    }
    if (newTitle === "" || newAuthor === "" || pages === "") {
        alert ("Faltan agregar datos")
    }else{
    let newBook = new Book(newTitle,newAuthor,pages,read);
    myLibrary.push(newBook);
    saveLibrary()
    displayBooks();
    closeNav()
    }
}
function saveLibrary() {
localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
}
function loadLibrary() {
    let storedLibrary = localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(storedLibrary);
}

function removeNull(array) {
    return array.filter(x => x !== null)
    };

function displayBooks() {
    //borra todos los libros anteriores para hacer todos nuevamente
    loadLibrary()
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
            saveLibrary()
        })
        const removeAgregado= document.createElement('button');
        removeAgregado.classList.add("removeAgregado");
        removeAgregado.addEventListener('click', () => {
                delete myLibrary[i]
                myLibrary = removeNull(myLibrary)
                saveLibrary()
        displayBooks()
        })
        libreria.appendChild(libroAgregado);
        libroAgregado.appendChild(tituloAgregado);
        libroAgregado.appendChild(autorAgregado);
        libroAgregado.appendChild(paginasAgregado);
        libroAgregado.appendChild(readAgregado);
        libroAgregado.appendChild(removeAgregado);
    }
}
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup_form
function form(){
    const queryForm = document.createElement('div');
    queryForm.classList.add("queryForm");
    libreria.appendChild(queryForm)
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "Leido")
const harryPotter = new Book("Harry Potter", "J.K Rollin", 255, "Leido")
let myLibrary = [theHobbit, harryPotter];
displayBooks();
nuevoLibro.addEventListener('click', () => {
    addBookToLibrary()
})
    


function openNav() {
    document.getElementById("myNav").style.height = "100%";
    newBok.value = "";
    newAutor.value = "";
    newPages.value = "";
    newRead.checked = false;
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }