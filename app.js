const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const noteList = document.getElementById("noteList");
const clearNotesButton = document.getElementById("clearNotesButton");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes(notesToDisplay = notes) {

    noteList.innerHTML = "";

    notesToDisplay.forEach(function(noteText, index) {

        const note = document.createElement("p");

        const noteTextElement = document.createElement("span");
        noteTextElement.textContent = noteText;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            const newText = prompt(
                "Edit your note:",
                noteText
            );

            if (newText !== null && newText.trim() !== "") {

                notes[index] = newText.trim();

                localStorage.setItem(
                    "notes",
                    JSON.stringify(notes)
                );

                displayNotes();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            notes.splice(index, 1);

            localStorage.setItem(
                "notes",
                JSON.stringify(notes)
            );

            displayNotes();
        });

        note.appendChild(noteTextElement);
        note.appendChild(editButton);
        note.appendChild(deleteButton);

        noteList.appendChild(note);
    });
}

addNoteButton.addEventListener("click", function() {

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        return;
    }

    notes.push(noteText);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    noteInput.value = "";

    displayNotes();
});

noteInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addNoteButton.click();
    }
});

clearNotesButton.addEventListener("click", function() {

    notes = [];

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
});

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filteredNotes = notes.filter(function(noteText) {

        return noteText
            .toLowerCase()
            .includes(searchText);
    });

    displayNotes(filteredNotes);
});

displayNotes();