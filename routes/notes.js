
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// 1. CREATE a new note
router.post("/", async (req, res) => {
    try {

        const { title, content, category } = req.body;

        const note = new Note({
          title,
          content,
          category
        });

        await note.save();

        res.status(201).json({
            message: "Note created successfully!",
            note
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. GET all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. GET a single note
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({ message: "Invalid note ID" });
    }
});

// 4. UPDATE a note
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully!",
            note
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. PIN / UNPIN a note
router.patch("/:id/pin", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        note.isPinned = !note.isPinned;

        await note.save();

        res.status(200).json({
            message: note.isPinned
                ? "Note pinned successfully!"
                : "Note unpinned successfully!",
            note
        });

    } catch (error) {
        res.status(400).json({ message: "Invalid note ID" });
    }
});

// 5. DELETE a note
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully!"
        });

    } catch (error) {
        res.status(400).json({ message: "Invalid note ID" });
    }
});

module.exports = router;
