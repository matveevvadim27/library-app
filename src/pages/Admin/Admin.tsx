import AddUsers from "../../components/AddUsers/AddUsers";
import EditUsers from "../../components/EditUsers/EditUsers";
import UsersList from "../../components/UsersList/UsersList";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Admin() {
  const { users, deleteUser, updateUser } = useAuth();
  const [editUser, setEditUser] = useState(null);

  return (
    <main className="admin">
      <section className="admin__section container">
        <h1 className="admin__title">
          Добро пожаловать в управление библиотекой.
        </h1>
        <div className="admin__forms">
          <AddUsers />
          {editUser && (
            <EditUsers
              editUser={editUser}
              setEditUser={setEditUser}
              updateUser={updateUser}
            />
          )}
        </div>
        <UsersList
          users={users}
          setEditUser={setEditUser}
          deleteUser={deleteUser}
        />
      </section>
    </main>
  );
}
