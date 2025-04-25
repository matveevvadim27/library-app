import api from "api/axios";
import BOOKS_ROUTES from "constants/booksRoutes";
import { apiErrors } from "utils/apiErrors";
import { IGetBooks, IBookBase, IBook } from "constants/booksRoutes";
import { toast } from "react-toastify";

export const useBooks = () => {
  const getBooks = async () => {
    try {
      const response = await api.get<{ data: IBook[] }>(BOOKS_ROUTES.GET_BOOKS);
      const booksList = response.data.data;
      return booksList;
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const postBook = async (data: IBookBase) => {
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
      toast.success("Книга успешно удалена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const putReserveBook = async (slug: string, id: number) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_RESERVE_BOOK(slug, id), {});
      toast.success("Книга успешно зарезервирована!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const putFreeBook = async (slug: string) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_FREE_BOOK(slug), {});
      toast.success("Книга успешно освобождена!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };
  const putTakeBook = async (slug: string, id: number) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_TAKE_BOOK(slug, id), {});
      toast.success("Книга успешно выдана!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };
  const putReturnBook = async (slug: string) => {
    try {
      await api.put(BOOKS_ROUTES.PUT_RETURN_BOOK(slug), {});
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
    putReserveBook,
    putFreeBook,
    putTakeBook,
    putReturnBook,
  };
};
