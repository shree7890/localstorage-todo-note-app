// element selector
let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addTxt = document.getElementById("note-text");
// Add note to local storage

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (addTitle.value == "" || addTxt.value == "") {
    return alert("Please add Note Title and Details");
  }
  const notesObj = getLocalStorage();
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  const notesObj = getLocalStorage();
  //   console.log(notesObj);
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}
// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);
  let confirmDel = confirm("Delete this note?");
  if (confirmDel == true) {
    const notesObj = getLocalStorage();
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

// Function to Edit the Note
function editNote(index) {
  if (addTitle.value !== "" || addTxt.value !== "") {
    return alert("Please clear the form before editing a note");
  }
  const notesObj = getLocalStorage();
  //   console.log(notesObj);
  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  });
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// get localstorage
function getLocalStorage() {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  return notesObj;
}

showNotes();
