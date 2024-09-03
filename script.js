const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');

showNotes();

function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }

    if(addText.value == ''){
        alert('Add your note');
        return;
    }
    
    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showNotes(){
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i=0; i<notes.length; i++){
        notesHTML += `<div class="note">
                    <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
                    <span class="title"><strong style="font-size: 20px;">${notes[i].title === "" ? 'Note' : notes[i].title}</strong></span>
                    <div class="text">${notes[i].text}</div>
                </div>
        `
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
addNoteButton.addEventListener('click', addNotes);




document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteButton = document.getElementById('add-note');

    let noteIdCounter = 1;

    function createNoteElement(id, content) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.dataset.id = id;

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editNote(id));

        const noteContent = document.createElement('p');
        noteContent.innerText = content;

        noteElement.appendChild(editButton);
        noteElement.appendChild(noteContent);

        return noteElement;
    }

    function addNote() {
        const id = noteIdCounter++;
        const content = prompt('Enter note content:', 'New note');
        if (content) {
            const noteElement = createNoteElement(id, content);
            notesContainer.appendChild(noteElement);
        }
    }

    function editNote(id) {
        const noteElement = notesContainer.querySelector(`.note[data-id="${id}"]`);
        const noteContent = noteElement.querySelector('p');

        const newContent = prompt('Edit note content:', noteContent.innerText);
        if (newContent) {
            noteContent.innerText = newContent;
        }
    }

    addNoteButton.addEventListener('click', addNote);
});
