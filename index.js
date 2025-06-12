const express = require("express");
const app = express();
app.use(express.json());

let books = []; // In-memory book storage
let idCounter = 1;

// CREATE - Add a new book
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// READ - Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// READ - Get a single book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// UPDATE - Update a book
app.put("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

// DELETE - Remove a book
app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deletedBook[0] });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Book API running at http://localhost:${PORT}`);
});
