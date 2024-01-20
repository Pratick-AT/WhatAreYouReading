import React, { useEffect, useState } from "react";
import BookSearch, { Book } from "./components/BookSearch";
import BookList from "./components/BookList";

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("readingList");

    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const addBook = (newBook: Book) => {
    const updatedBooks: Book[] = [...books, { ...newBook, status: "backlog" }];

    setBooks(updatedBooks);

    localStorage.setItem("readingList", JSON.stringify(updatedBooks));
  };

  const moveBook = (bookToMove: Book, newStatus: Book["status"]) => {
    const updatedBooks: Book[] = books.map((book) =>
      book.key === bookToMove.key ? { ...book, status: newStatus } : book
    );

    setBooks(updatedBooks);
    localStorage.setItem("readingList", JSON.stringify(updatedBooks));
  };
  return (
    <div className="container mx-auto">
      <BookSearch onAddBook={addBook} />
      <BookList books={books} onMoveBook={moveBook} />
    </div>
  );
};

export default App;
