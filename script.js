const table = document.getElementById('contentTable');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const saveButton = document.getElementById('saveButton');
let myLibrary = [];

function Book(name, author, pageAmmount, readed) {
  this.name = name;
  this.author = author;
  this.pageAmmount = pageAmmount;
  this.readed = (readed == "yes") ? true : false;
}

function addBookToLibrary() {
  let userInput = new Book(...prompt('Enter the books name, author, number of pages and readed or not (yes/no) in order and with space.').split(" "));
  myLibrary.push(userInput);
}

function display() { // adds books to the table
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  };
  let a = table.insertRow(0);
  let aa = a.insertCell(0);
  let ab = a.insertCell(1);
  let ac = a.insertCell(2);
  let ad = a.insertCell(3);
  aa.textContent = 'Name';
  ab.textContent = 'Author';
  ac.textContent = 'Number of Pages';
  ad.textContent = 'Readed';
  for (let i = 1; i <= myLibrary.length; i++) {
    let row = table.insertRow(i);
    row.id = myLibrary[i-1].name.replace(/\s+/g, '');
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.textContent = myLibrary[i-1].name;
    cell2.textContent = myLibrary[i-1].author;
    cell3.textContent = myLibrary[i-1].pageAmmount;
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    cell4.appendChild(checkbox);
    if (myLibrary[i-1].readed == true) checkbox.checked = true;
  };
}

function updateReaded(ele) {
  let id = ele.name.replace(/\s+/g, '');
  if (document.querySelector(`#${id} input`).checked == true) {
    ele.readed = true;
  }
  else if (document.querySelector(`#${id} input`).checked == false) {
    ele.readed = false;
  }
}

function deleteRow(rowid) {
  let rowd = document.getElementById(rowid);
  let index = [...table.childNodes[0].childNodes].indexOf(rowd);
  console.log(index);
  myLibrary.splice(index-1, 1);
  rowd.parentNode.removeChild(rowd);
}

function getBookName() {
  let bookName = prompt('Enter the name of the book.');
  return bookName.replace(/\s+/g, '');
}

function getDuplicates(data) {
  return [...new Set(data)];
}

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary === null) myLibrary = [];
  display();
}

saveButton.addEventListener("click", () => {
  myLibrary.forEach(updateReaded);
  saveLocal();
  display();
})

addButton.addEventListener("click", () => {
  addBookToLibrary();
  display();
});

removeButton.addEventListener("click", () => {
  inputa = getBookName();
  deleteRow(inputa);
});

restoreLocal();