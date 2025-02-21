document.addEventListener("DOMContentLoaded", loadNotes);

function addNote(){
    let noteInput = document.getElementById("noteInput");
    let notesContainer = document.getElementById("notesContainer");

    if (noteInput.value.trim() === ""){
        noteInput.placeholder = "Please enter a note!";
        noteInput.classList.add("error");
        return;
    }
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <p contenteditable = "true">${noteInput.value}</p>
    <button onclick = "deleteNote(this)">Delete</button>
    `;
    notesContainer.appendChild(note);
    saveNotes();
    noteInput.value = "";
    note.placeholder = "Write a note..."
}
function deleteNote(button){
    button.parentElement.remove();
    saveNotes();
}
function saveNotes(){
    let notes = [];
    document.querySelectorAll(".note p") .  forEach(note=>{
        notes.push(note.innerText);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotes(){
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesContainer = document.getElementById("notesContainer");

    savedNotes.forEach(noteText =>{
        let note = document.createElement("div");
        note.innerHTML = `
        <p contenteditable = "true">${noteText}</p>
        <button onclick = "deleteNote(this)">Delete</button>
        `;
        notesContainer.appendChild(note);
    });
}