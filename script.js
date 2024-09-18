const myLibrary = [];
const mainContainer = document.querySelector(".main-container");
const sideContainer = document.querySelector(".side-container");
const form = document.querySelector('form');
const submitButton = document.querySelector('#submitButton');


class Book{
  // the constructor...
  constructor(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }
  //Function to toggle read status
  haveRead = () => {
    this.read ? this.read = false : this.read = true;
  }
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

function displayLibrary(books){
  //Check if library already exists and remove if it does
  if(document.querySelector('.library')){
    let oldLibrary = document.querySelector('.library');
    mainContainer.removeChild(oldLibrary);
  }
  //Create library container
  const library = document.createElement('div');
  library.classList.add("library");
  mainContainer.appendChild(library);
  //Loop through library array and display on site
  for(let book of books){
    //Create book element and add it to display
    const listing = document.createElement('div');
    listing.classList.add('book');
    listing.textContent += book.title + ', ';
    listing.textContent += book.author + ', ';
    listing.textContent += book.pages + ' pages, ';
    listing.textContent += book.read;
    // listing.textContent += book.read;
    library.appendChild(listing);
    //Create read button then add to display
    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    //Toggles text on button if book has been read
    if(book.read){
      readButton.textContent = 'Not Read ' + book.title;
    }
    else {
      readButton.textContent = 'Have Read ' + book.title;
    }
    listing.appendChild(readButton);
    //Button toggles read status of object
    readButton.addEventListener("click", () => {
      book.haveRead();
      displayLibrary(myLibrary);
      });
    //Create delete button and add to display
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Remove Book';
    listing.appendChild(deleteButton);
     deleteButton.addEventListener("click", () => {
      console.log(book.title + ' delete');
      library.removeChild(listing);
      });
  }
}

//Button to unhide form to submit new book
const newBookButton = document.createElement('button');
newBookButton.innerText = 'New Book';
newBookButton.classList.add('new-book-button');
sideContainer.appendChild(newBookButton);
newBookButton.addEventListener('click', () => {
  form.style.display = 'block';
  newBookButton.style.display = 'none';
}
)

//Prevent default form submission
submitButton.addEventListener("click", function(event){
  event.preventDefault();
  //Save form input values to variables
  const newTitle = document.querySelector('#title');
  const newAuthor = document.querySelector('#author'); 
  const newPages = document.querySelector('#pages'); 
  //Create new book object from form inputs
  const newBook = new Book(newTitle.value, newAuthor.value, newPages.value);
  //Add new book to library array and reload display
  addBookToLibrary(newBook);
  displayLibrary(myLibrary);
  form.style.display = 'none';
  newBookButton.style.display = 'block';
  //Clear input form fields
  newTitle.value = '';
  newAuthor.value = '';
  newPages.value = '';
})

//Create sample books and add to library
const example = new Book('Example', 'Fake Man', 200);
const secondexample = new Book('Example 2', 'The Fake Man', 300);
const thirddexample = new Book('Example Test', 'The Fake Man', 300);
addBookToLibrary(example);
// displayLibrary(myLibrary);
addBookToLibrary(secondexample);
// displayLibrary(myLibrary);
addBookToLibrary(thirddexample);
displayLibrary(myLibrary);
