const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./"));  // serves your HTML files

// GET all tasks
app.get("/todos", (req, res) => {
    db.query("SELECT * FROM todos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// POST add new task
app.post("/todos", (req, res) => {
    const { text } = req.body;
    db.query("INSERT INTO todos (text) VALUES (?)", [text], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, text, disabled: false });
    });
});

// PUT toggle task
app.put("/todos/:id", (req, res) => {
    const { disabled } = req.body;
    db.query("UPDATE todos SET disabled = ? WHERE id = ?",
        [disabled, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

// DELETE all tasks
app.delete("/todos", (req, res) => {
    db.query("DELETE FROM todos", (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000 ✅");
});