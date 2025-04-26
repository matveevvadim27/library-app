import api from "api/axios";
import BOOKS_ROUTES from "constants/booksRoutes";
import { apiErrors } from "utils/apiErrors";
import { IGetBooks, IBookBase, IBook } from "constants/booksRoutes";
import { toast } from "react-toastify";
import { bookFormData } from "schemas/bookSchema";
import { useBookStore } from "store/useBooksStore";

export const useBooks = () => {
  const { setBooks, setSearchedBooks } = useBookStore();

  const getBooks = async () => {
    try {
      const response = await api.get<{ data: IBook[] }>(BOOKS_ROUTES.GET_BOOKS);
      const booksList = response.data.data;
      setBooks(booksList);
      return booksList;
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const postBook = async (data: bookFormData) => {
    try {
      await api.post(BOOKS_ROUTES.POST_BOOK, data);
      toast.success("Книга успешно добавлена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await api.delete(BOOKS_ROUTES.DELETE_BOOK(id));
      await getBooks();
      toast.success("Книга успешно удалена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const searchBook = async (params: {
    author?: string;
    publisher?: string;
    genre?: string;
  }) => {
    try {
      const { data } = await api.get<{ data: IBook[] }>(
        BOOKS_ROUTES.SEARCH_BOOK,
        {
          params,
        }
      );
      setSearchedBooks(data.data);
      return data.data;
    } catch (error) {
      apiErrors(error);
      setSearchedBooks([]);
      return null;
    }
  };

  const putReserveBook = async (slug: string, id: number) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_RESERVE_BOOK(slug, id), {});
      await getBooks();
      toast.success("Книга успешно зарезервирована!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const putFreeBook = async (slug: string) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_FREE_BOOK(slug), {});
      await getBooks();
      toast.success("Книга успешно освобождена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };
  const putTakeBook = async (slug: string, id: number) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_TAKE_BOOK(slug, id), {});
      await getBooks();
      toast.success("Книга успешно выдана!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };
  const putReturnBook = async (slug: string) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_RETURN_BOOK(slug), {});
      await getBooks();
      toast.success("Книга успешно возвращена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  return {
    getBooks,
    postBook,
    deleteBook,
    searchBook,
    putReserveBook,
    putFreeBook,
    putTakeBook,
    putReturnBook,
  };
};
