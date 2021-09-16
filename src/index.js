import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, getDocs, setDoc, collection, deleteDoc, updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBKPK73JM6y3ztJWND4JOnYlp1GA7Ibgw',
  authDomain: 'libreria-c768f.firebaseapp.com',
  projectId: 'libreria-c768f',
  storageBucket: 'libreria-c768f.appspot.com',
  messagingSenderId: '18438604171',
  appId: '1:18438604171:web:f5095ea38af1595b2bdb8e',
};

initializeApp(firebaseConfig);
const db = getFirestore();

// definicion array de libros
let myLibrary = [];
// continuar

// https://firebase.google.com/docs/web/module-bundling?authuser=0

// definicion de elementos DOM
const nuevoLibro = document.querySelector('.nuevoLibro');
const libreria = document.querySelector('.libreria');
const newBok = document.querySelector('.newBook');
const newAutor = document.querySelector('.newAuthor');
const newPages = document.querySelector('.newPages');
const newRead = document.querySelector('.newRead');
const faltaTitulo = document.querySelector('.faltaTitulo');
const faltaAuthor = document.querySelector('.faltaAuthor');
const faltaPaginas = document.querySelector('.faltaPaginas');
const cancel = document.querySelector('.cancel');
const agregarLibro = document.querySelector('.agregarLibro');

// funcionalidad guardar libreria en localStorage
async function saveBook(book, title) {
  await setDoc(doc(db, 'myLibrary', title), book);
}
// funcionalidad cargar libreria de localStorage
async function loadLibrary() {
  const storedLibrary = await getDocs(collection(db, 'myLibrary'));
  if (storedLibrary === null) {
    myLibrary = [];
  } else {
    myLibrary = storedLibrary.docs.map((libro) => libro.data());
    console.log(myLibrary);
  }
}

// funcionalidad para filtrar libreria de nulls
function removeNull(array) {
  return array.filter((x) => x !== null);
}
// funcionalidad display libreria
async function displayBooks() {
  // borra todos los libros anteriores para hacer todos nuevamente
  await loadLibrary();
  while (libreria.firstChild) {
    libreria.removeChild(libreria.firstChild);
  }
  // creacion de elementos por cada libro
  for (let i = 0; i < myLibrary.length; i += 1) {
    const libroAgregado = document.createElement('div');
    libroAgregado.classList.add('libroAgregado');
    const tituloAgregado = document.createElement('div');
    tituloAgregado.classList.add('tituloAgregado');
    tituloAgregado.textContent = myLibrary[i].title;
    const autorAgregado = document.createElement('div');
    autorAgregado.classList.add('autorAgregado');
    autorAgregado.textContent = myLibrary[i].author;
    const paginasAgregado = document.createElement('div');
    paginasAgregado.classList.add('paginasAgregado');
    paginasAgregado.textContent = myLibrary[i].pages;
    const readAgregado = document.createElement('div');
    // funcionalidad cambiar valor leido/no leido
    readAgregado.classList.add('readAgregado');
    readAgregado.textContent = myLibrary[i].read;
    if (myLibrary[i].read === 'Leido') {
      readAgregado.style.cssText = 'background: rgba(2, 1, 41, 0);';
    } else {
      readAgregado.style.cssText = 'background: rgba(0, 0, 0, 0.4);';
    }
    // eslint-disable-next-line no-loop-func
    readAgregado.addEventListener('click', async () => {
      if (myLibrary[i].read === 'Leido') {
        await updateDoc(doc(db, 'myLibrary', myLibrary[i].title), {
          read: 'No Leido',
        });
        readAgregado.style.cssText = 'background: rgba(0, 0, 0, 0.4);';
        readAgregado.textContent = 'No Leido';
      } else {
        await updateDoc(doc(db, 'myLibrary', myLibrary[i].title), {
          read: 'Leido',
        });
        readAgregado.style.cssText = 'background: rgba(2, 1, 41, 0);';
        readAgregado.textContent = 'Leido';
      }
    });
    // funcionalidad elimitar libro de libreria
    const removeAgregado = document.createElement('div');
    removeAgregado.classList.add('removeAgregado');
    removeAgregado.textContent = 'X';
    // eslint-disable-next-line no-loop-func
    removeAgregado.addEventListener('click', async () => {
      await deleteDoc(doc(db, 'myLibrary', myLibrary[i].title));
      displayBooks();
    });
    // construccion display
    libreria.appendChild(libroAgregado);
    libroAgregado.appendChild(tituloAgregado);
    libroAgregado.appendChild(autorAgregado);
    libroAgregado.appendChild(paginasAgregado);
    libroAgregado.appendChild(readAgregado);
    libroAgregado.appendChild(removeAgregado);
  }
}
// mostrar libros actuales
window.onload = displayBooks();

// object constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = `de ${author}`;
    this.pages = `${pages} paginas`;
    this.read = read;
  }
}
// funcionalidad agregar libro a libreria
function addBookToLibrary() {
  const newTitle = newBok.value;
  const newAuthor = newAutor.value;
  const pages = newPages.value;
  const read = newRead.textContent;
  if (newTitle === '') {
    faltaTitulo.style.cssText = 'visibility: visible';
    newBok.style.cssText = 'border-color: rgb(255, 0, 0)';
    setTimeout(() => {
      faltaTitulo.style.cssText = 'visibility: hidden';
      newBok.style.cssText = 'border-color: rgb(0, 0, 0)';
    }, 3000);
  }
  if (newAuthor === '') {
    faltaAuthor.style.cssText = 'visibility: visible';
    newAutor.style.cssText = 'border-color: rgb(255, 0, 0)';
    setTimeout(() => {
      faltaAuthor.style.cssText = 'visibility: hidden';
      newAutor.style.cssText = 'border-color: rgb(0, 0, 0)';
    }, 3000);
  }
  if (pages === '') {
    faltaPaginas.style.cssText = 'visibility: visible';
    newPages.style.cssText = 'border-color: rgb(255, 0, 0)';
    setTimeout(() => {
      faltaPaginas.style.cssText = 'visibility: hidden';
      newPages.style.cssText = 'border-color: rgb(0, 0, 0)';
    }, 3000);
  } else if (newTitle !== '' && newAuthor !== '' && pages !== '') {
    const newBook = new Book(newTitle, newAuthor, pages, read);
    saveBook(JSON.parse(JSON.stringify(newBook)), newTitle);
    displayBooks();
    cancel.click();
  }
}

// funcionalidad de pop up para agregar nuevo libro
nuevoLibro.addEventListener('click', () => {
  addBookToLibrary();
});

newRead.addEventListener('click', () => {
  if (newRead.textContent === 'Leido') {
    newRead.textContent = 'No Leido';
  } else {
    newRead.textContent = 'Leido';
  }
});
cancel.addEventListener('click', () => {
  document.getElementById('myNav').style.height = '0%';
  document.getElementById('myNav').style.width = '0%';
});
agregarLibro.addEventListener('click', () => {
  document.getElementById('myNav').style.height = '100%';
  document.getElementById('myNav').style.width = '100%';
  newBok.value = '';
  newAutor.value = '';
  newPages.value = '';
  newRead.checked = false;
  newRead.textContent = 'No Leido';
});
