import AddUsers from "../../components/AddUsers/AddUsers";
import EditUsers from "../../components/EditUsers/EditUsers";
import UsersList from "../../components/UsersList/UsersList";
import { useState } from "react";
import { User } from "../../schemas/AuthSchema";

export default function Admin() {
  const [editUser, setEditUser] = useState<User | null>(null);

  return (
    <main className="admin">
      <section className="admin__section container">
        <h1 className="admin__title">
          Добро пожаловать в управление библиотекой.
        </h1>
        <div className="admin__forms">
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
