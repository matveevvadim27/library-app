import styles from "./Auth.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  return (
    <section className={`${styles.auth} container`}>
      <AnimatePresence mode="wait">
        {isSignUp ? (
          <LoginForm key="login" toggle={() => setIsSignUp(false)} />
        ) : (
          <RegisterForm key="register" toggle={() => setIsSignUp(true)} />
        )}
      </AnimatePresence>
    </section>
  );
}
