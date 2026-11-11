
const API_URL = "/api/notes";

let editingNoteId = null;

const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const categoryInput = document.getElementById("noteCategory");
const saveBtn = document.getElementById("saveBtn");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// LOAD ALL NOTES
async function loadNotes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load notes");
        }

        const notes = await response.json();

        displayNotes(notes);

    } catch (error) {
        notesContainer.innerHTML =
            '<p class="empty-message">Unable to load notes. Please try again.</p>';

        console.error(error);
    }
}

// DISPLAY NOTES

function displayNotes(notes) {

    // Show pinned notes first
    notes.sort((a, b) =>
        Number(b.isPinned) - Number(a.isPinned) ||
        new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    noteCount.textContent =
        `${notes.length} ${notes.length === 1 ? "Note" : "Notes"}`;

    if (notes.length === 0) {
        notesContainer.innerHTML =
            '<p class="empty-message">No notes yet. Create your first note!</p>';
        return;
    }

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        const card = document.createElement("article");
        card.className = "note-card";

        if (note.isPinned) {
            card.classList.add("pinned-note");
        }

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const categoryLabel = document.createElement("span");
        categoryLabel.className = "note-category";
        categoryLabel.textContent = note.category || "Personal";

        const paragraph = document.createElement("p");

        const fullContent = note.content || "";
        const limit = 150;
        const isLong = fullContent.length > limit;

        paragraph.textContent = isLong
            ? fullContent.substring(0, limit) + "..."
            : fullContent;

        let expanded = false;

        const moreButton = document.createElement("button");
        moreButton.className = "show-more-btn";
        moreButton.textContent = "Show more";
        moreButton.style.display = isLong ? "inline-block" : "none";

        moreButton.addEventListener("click", () => {
            expanded = !expanded;

            paragraph.textContent = expanded
                ? fullContent
                : fullContent.substring(0, limit) + "...";

            moreButton.textContent = expanded
                ? "Show less"
                : "Show more";
        });

        const date = document.createElement("div");
        date.className = "note-date";
        date.textContent =
            "Updated " + new Date(note.updatedAt).toLocaleString();

        const actions = document.createElement("div");
        actions.className = "note-actions";

        // PIN / UNPIN BUTTON
        const pinButton = document.createElement("button");
        pinButton.textContent = note.isPinned ? "📌 Unpin" : "📌 Pin";
        pinButton.className = "pin-btn";
        pinButton.addEventListener("click", () => togglePin(note._id));

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editNote(note));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteNote(note._id));

        actions.append(pinButton, editButton, deleteButton);

        card.append(
            heading,
            categoryLabel,
            paragraph,
            moreButton,
            date,
            actions
        );

        notesContainer.appendChild(card);
    });
}


// PIN / UNPIN NOTE
async function togglePin(id) {

    try {
        const response = await fetch(`${API_URL}/${id}/pin`, {
            method: "PATCH"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to pin note");
        }

        await loadNotes();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// CREATE OR UPDATE NOTE
async function saveNote() {

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const category = categoryInput.value;

    if (!title || !content) {
        alert("Please enter both title and content.");
        return;
    }

    const isEditing = Boolean(editingNoteId);

    const url = isEditing
        ? `${API_URL}/${editingNoteId}`
        : API_URL;

    try {
        const response = await fetch(url, {
            method: isEditing ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content, category })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save note");
        }

        alert(isEditing
            ? "Note updated successfully!"
            : "Note created successfully!");

        resetForm();
        loadNotes();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// EDIT NOTE
function editNote(note) {

    editingNoteId = note._id;

    titleInput.value = note.title;
    contentInput.value = note.content;
    categoryInput.value = note.category || "Personal";

    saveBtn.textContent = "Update Note";

    document.querySelector(".note-form").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    titleInput.focus();
}

// DELETE NOTE
async function deleteNote(id) {

    if (!confirm("Are you sure you want to delete this note?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to delete note");
        }

        if (editingNoteId === id) {
            resetForm();
        }

        alert("Note deleted successfully!");

        loadNotes();

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// RESET FORM
function resetForm() {

    editingNoteId = null;

    titleInput.value = "";
    contentInput.value = "";
    categoryInput.value = "Personal";

    saveBtn.textContent = "+ Save Note";
}

// SEARCH AND CATEGORY FILTER
async function filterNotes() {

    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    try {
        const response = await fetch(API_URL);
        const notes = await response.json();

        const filteredNotes = notes.filter(note => {

            const matchesSearch =
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            (note.category || "Personal").toLowerCase().includes(searchTerm);

            const matchesCategory =
                selectedCategory === "All" ||
                (note.category || "Personal") === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        displayNotes(filteredNotes);

    } catch (error) {
        console.error("Filter error:", error);
    }
}

searchInput.addEventListener("input", filterNotes);
categoryFilter.addEventListener("change", filterNotes);

// INITIAL LOAD
loadNotes();
