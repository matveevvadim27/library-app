import { toast } from "react-toastify";

export const apiErrors = (error: any, customMessage?: string) => {
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
        toast.warning(customMessage || "Неверый запрос");
        break;
      case 401:
        toast.error(customMessage || "Вы не авторизованы");
        break;
      case 403:
        toast.error(customMessage || "Доступ запрещён");
        break;
      case 404:
        toast.info(customMessage || "Не найдено");
        break;
      case 500:
        toast.error(customMessage || "Ошибка сервера");
        break;
      default:
        toast.error(customMessage || "Произошла ошибка");
        break;
    }
  } else if (error.request) {
    toast.error(customMessage || "Нет ответа от сервера");
  } else {
    toast.error(customMessage || "Произошла ошибка");
  }
};
