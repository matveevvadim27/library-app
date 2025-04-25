import { useState } from "react";
import { TToggle } from "../../../../types/toggleFormType";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormData,
} from "../../../../schemas/registerSchema";
import { useForm } from "react-hook-form";
import styles from "./RegisterForm.module.scss";

const RegisterForm: React.FC<TToggle> = ({ toggle }) => {
  const [show, setShow] = useState<string>("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {};

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="form"
    >
      <form
        action="submit"
        className={styles.register}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles.register__greeting}>Добро пожаловать!</h1>

        <label
          htmlFor="name"
          className={`${styles.register__label} visually-hidden`}
        >
          Логин:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          className={styles.register__input}
          {...register("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label
          htmlFor="email"
          className={`${styles.register__label} visually-hidden`}
        >
          Email:
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          className={styles.register__input}
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label
          htmlFor="password"
          className={`${styles.register__label} visually-hidden`}
        >
          Пароль:
        </label>
        <input
          id="password"
          type={show}
          placeholder="Password"
          className={styles.register__input}
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <label
          htmlFor="repeat-password"
          className={`${styles.register__label} visually-hidden`}
        >
          Повторите Пароль:
        </label>
        <input
          id="confirmPassword"
          type={show}
          placeholder="Confirm Password"
          className={styles.register__input}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
        <div className={styles.register__show}>
          <label htmlFor="show" className={`${styles.register__label}`}>
            Показать пароль:
          </label>
          <input
            id="show"
            type="checkbox"
            name="show"
            onChange={() =>
              setShow((prev) => (prev === "password" ? "text" : "password"))
            }
          />
        </div>
        <button className={styles.register__btn} type="submit">
          Зарегистрироваться
        </button>
        <p className={styles.register__toregister} onClick={toggle}>
          Уже есть аккаунт? Войти
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
