import { useState, useEffect } from "react";

/**
 * UserList Component - Async data fetching component for testing async behavior
 */
function UserList({ fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to refresh users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-list loading" data-testid="loading">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list error">
        <p data-testid="error-message">{error}</p>
        <button onClick={handleRefresh} data-testid="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Users</h2>

      <div className="controls">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users..."
          data-testid="search-input"
        />
        <button onClick={handleRefresh} data-testid="refresh-button">
          Refresh
        </button>
      </div>

      {sortedUsers.length === 0 ? (
        <p data-testid="no-results">No users found.</p>
      ) : (
        <table data-testid="users-table">
          <thead style={{ color: "black" }}>
            <tr>
              <th
                onClick={() => handleSort("name")}
                data-testid="sort-name"
                className={sortField === "name" ? sortDirection : ""}
              >
                Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("email")}
                data-testid="sort-email"
                className={sortField === "email" ? sortDirection : ""}
              >
                Email{" "}
                {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("age")}
                data-testid="sort-age"
                className={sortField === "age" ? sortDirection : ""}
              >
                Age{" "}
                {sortField === "age" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            {sortedUsers.map((user) => (
              <tr key={user.id} data-testid={`user-row-${user.id}`}>
                <td data-testid={`user-name-${user.id}`}>{user.name}</td>
                <td data-testid={`user-email-${user.id}`}>{user.email}</td>
                <td data-testid={`user-age-${user.id}`}>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="summary" data-testid="user-count">
        Showing {sortedUsers.length} of {users.length} users
      </div>
    </div>
  );
}

export default UserList;
