import API_URL from "./api";

export interface IBookBase {
  id: number;
  name: string;
  author: string;
  slug: string;
  genre: string;
  publisher: string;
  description: string;
}

export interface IBook extends IBookBase {
  user_id: number;
  reserved_at: string;
  take_at: string;
}

export interface IGetBooks {
  data: IBook[];
}

const BOOKS_ROUTES = {
  GET_BOOKS: `${API_URL}/books`,
  POST_BOOK: `${API_URL}/books`,
  DELETE_BOOK: (id: number) => `${API_URL}/books/${id}`,
  SEARCH_BOOK: `${API_URL}/books/search`,
  PUT_RESERVE_BOOK: (slug: string, id: number) =>
    `${API_URL}/books/${slug}/reserve/${id}`,
  PUT_FREE_BOOK: (slug: string) => `${API_URL}/books/free/${slug}`,
  PUT_TAKE_BOOK: (slug: string, id: number) =>
    `${API_URL}/books/${slug}/take/${id}`,
  PUT_RETURN_BOOK: (slug: string) => `${API_URL}/books/return/${slug}`,
};

export default BOOKS_ROUTES;
