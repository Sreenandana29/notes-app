
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        isPinned: {
            type: Boolean,
            default: false
        },

        category: {
            type: String,
            enum: ["College", "Personal", "Work", "Ideas"],
            default: "Personal"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Note", noteSchema);
