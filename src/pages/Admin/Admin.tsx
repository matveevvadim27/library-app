import AddUsers from "../../components/AddUsers/AddUsers";
import EditUsers from "../../components/EditUsers/EditUsers";
import UsersList from "../../components/UsersList/UsersList";
import { useState } from "react";
import { User } from "../../schemas/AuthSchema";
import styles from "./admin.module.scss";

export default function Admin() {
  const [editUser, setEditUser] = useState<User | null>(null);

  return (
    <main className={styles.admin}>
      <section className={`${styles.admin__section} container`}>
        <h1 className={styles.admin__title}>
          Добро пожаловать в управление библиотекой.
        </h1>
        <div className={styles.admin__forms}>
          <AddUsers />
          {editUser && (
            <EditUsers editUser={editUser} setEditUser={setEditUser} />
          )}
        </div>
        <UsersList setEditUser={setEditUser} />
      </section>
    </main>
  );
}
