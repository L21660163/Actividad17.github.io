const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// Cargar notas del localStorage al inicio
document.addEventListener('DOMContentLoaded', loadNotes);

addNoteBtn.addEventListener('click', addNote);

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        displayNote(note);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        // Guardar nota en localStorage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNote(noteText);
        noteInput.value = ''; // Limpiar el campo de entrada
    }
}

function displayNote(noteText) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
        deleteNote(noteText, noteDiv);
    };

    noteDiv.appendChild(deleteBtn);
    notesList.appendChild(noteDiv);
}

function deleteNote(noteText, noteDiv) {
    // Eliminar nota del localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    notesList.removeChild(noteDiv); // Eliminar de la vista
}
