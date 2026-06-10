import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const fetchUsers = async (attempt = 1) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      setUsers(data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.log(`Attempt ${attempt} failed`);

      if (attempt < 3) {
        setRetryCount(attempt);

        setTimeout(() => {
          fetchUsers(attempt + 1);
        }, 1000); // wait 1 second before retry
      } else {
        setError(
          "Unable to load users. Please try again later."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="status">
        <h2>Loading...</h2>
        {retryCount > 0 && (
          <p>Retry Attempt: {retryCount}/3</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="status error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User Directory</h1>

      <div className="grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}