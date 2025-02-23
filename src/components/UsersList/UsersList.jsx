export default function UsersList({ users, setEditUser, deleteUser }) {
  return (
    <div className="admin__users users">
      <h2 className="users__title">Список пользователей:</h2>
      <ul className="users__list">
        {users.map((user) => (
          <li key={user.name} className="users__item">
            <span className="users__data">
              {user.name} ({user.role})
            </span>
            <button className="users__edit" onClick={() => setEditUser(user)}>
              Редактировать
            </button>
            <button
              className="users__delete"
              onClick={() => deleteUser(user.name)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
