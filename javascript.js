//definicion de elementos DOM
const nuevoLibro = document.querySelector(".nuevoLibro")
const libreria = document.querySelector(".libreria")
const newBok = document.querySelector(".newBook")
const newAutor = document.querySelector(".newAuthor")
const newPages = document.querySelector(".newPages")
const newRead = document.querySelector(".newRead")
const faltaTitulo = document.querySelector(".faltaTitulo")
const faltaAuthor = document.querySelector(".faltaAuthor")
const faltaPaginas = document.querySelector(".faltaPaginas")

//libros test
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "Leido")
const harryPotter = new Book("Harry Potter", "J.K Rollin", 255, "Leido")
//definicion array de libros
let myLibrary = [theHobbit, harryPotter];
//mostrar libros actuales
window.onload = displayBooks();

//object constructor
function Book(title, author, pages, read) {
    this.title = title 
    this.author = `de ${author}`
    this.pages = `${pages} paginas`
    this.read = read;
}
//funcionalidad agregar libro a libreria
function addBookToLibrary(){
    let newTitle = newBok.value
    let newAuthor = newAutor.value
    let pages = newPages.value
    let read = newRead.textContent
    if (newTitle === "" ) {
        faltaTitulo.style.cssText = "visibility: visible";
        newBok.style.cssText = "border-color: rgb(255, 0, 0)";
        setTimeout(function(){
            faltaTitulo.style.cssText = "visibility: hidden";
            newBok.style.cssText = "border-color: rgb(0, 0, 0)";
        },3000);
    }
    if (newAuthor === "" ) {
        faltaAuthor.style.cssText = "visibility: visible";
        newAutor.style.cssText = "border-color: rgb(255, 0, 0)";
        setTimeout(function(){
            faltaAuthor.style.cssText = "visibility: hidden";
            newAutor.style.cssText = "border-color: rgb(0, 0, 0)";
        },3000);
    }
    if (pages === "" ) {
        faltaPaginas.style.cssText = "visibility: visible";
        newPages.style.cssText = "border-color: rgb(255, 0, 0)";
        setTimeout(function(){
            faltaPaginas.style.cssText = "visibility: hidden";
            newPages.style.cssText = "border-color: rgb(0, 0, 0)";
        },3000);
    }else if (newTitle !== "" && newAuthor !== "" && pages !== "" ){
    let newBook = new Book(newTitle,newAuthor,pages,read);
    myLibrary.push(newBook);
    saveLibrary()
    displayBooks();
    closeNav()
    }
}
//funcionalidad guardar libreria en localStorage
function saveLibrary() {
localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
}
//funcionalidad cargar libreria de localStorage
function loadLibrary() {
    let storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary === null) {
        myLibrary = [];
    }else{
    myLibrary = JSON.parse(storedLibrary);
}
}
//funcionalidad para filtrar libreria de nulls
function removeNull(array) {
    return array.filter(x => x !== null)
    };
//funcionalidad display libreria
function displayBooks() {
    //borra todos los libros anteriores para hacer todos nuevamente
    loadLibrary()
    while (libreria.firstChild) {
        libreria.removeChild(libreria.firstChild);
    }
    //creacion de elementos por cada libro
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
        //funcionalidad cambiar valor leido/no leido
        readAgregado.classList.add("readAgregado");
        readAgregado.textContent = myLibrary[i].read;
        if (myLibrary[i].read === "Leido") {
            readAgregado.style.cssText = "background: linear-gradient(to bottom right, rgba(57, 66, 55, 0.9), rgba(0, 0, 0, 0.8))";
        } else {
            readAgregado.style.cssText = "background: linear-gradient(to bottom right, rgba(70, 53, 53, 0.9), rgba(0, 0, 0, 0.8))";
        }
        readAgregado.addEventListener('click', () => {
            if (myLibrary[i].read === "Leido") {
                myLibrary[i].read = "No Leido"
                readAgregado.style.cssText = "background: linear-gradient(to bottom right, rgba(70, 53, 53, 0.9), rgba(0, 0, 0, 0.8))";
            }else {
                myLibrary[i].read = "Leido"
                readAgregado.style.cssText = "background: linear-gradient(to bottom right, rgba(57, 66, 55, 0.9), rgba(0, 0, 0, 0.8))";
            }
            readAgregado.textContent = myLibrary[i].read;
            saveLibrary()
        })
        //funcionalidad elimitar libro de libreria
        const removeAgregado= document.createElement('div');
        removeAgregado.classList.add("removeAgregado");
        removeAgregado.textContent = "Eliminar Libro";
        removeAgregado.addEventListener('click', () => {
                delete myLibrary[i]
                myLibrary = removeNull(myLibrary)
                saveLibrary()
        displayBooks()
        })
        //construccion display
        libreria.appendChild(libroAgregado);
        libroAgregado.appendChild(tituloAgregado);
        libroAgregado.appendChild(autorAgregado);
        libroAgregado.appendChild(paginasAgregado);
        libroAgregado.appendChild(readAgregado);
        libroAgregado.appendChild(removeAgregado);
    }
}
//funcionalidad de pop up para agregar nuevo libro
function openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.width = "100%";
    newBok.value = "";
    newAutor.value = "";
    newPages.value = "";
    newRead.checked = false;
    newRead.textContent = "No Leido"
    newRead.style.cssText = "background: linear-gradient(to bottom right, rgba(70, 53, 53, 0.9), rgba(0, 0, 0, 0.8))";
}
  
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.width = "0%";
}
nuevoLibro.addEventListener('click', () => {
    addBookToLibrary()
})

newRead.addEventListener('click', () => {
    if (newRead.textContent === "Leido") {
        newRead.textContent = "No Leido"
        newRead.style.cssText = "background: linear-gradient(to bottom right, rgba(70, 53, 53, 0.9), rgba(0, 0, 0, 0.8))";
    }else {
        newRead.textContent = "Leido";
        newRead.style.cssText = "background: linear-gradient(to bottom right, rgba(57, 66, 55, 0.9), rgba(0, 0, 0, 0.8))";
    }
})
