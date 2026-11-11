
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const notesRoutes = require("./routes/notes");

dotenv.config();
console.log("MongoDB URI loaded:", !!process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/notes", notesRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Notes App Backend is Running!");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });
