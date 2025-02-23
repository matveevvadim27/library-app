export const filterBooks = (books, searchQuery) => {
  if (!searchQuery.trim()) return [];

  return books.filter((book) =>
    [book.title, book.author, book.genre, book.publisher]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};
