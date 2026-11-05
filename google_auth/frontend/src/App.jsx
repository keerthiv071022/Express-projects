
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const response = await fetch(`${API}/api/user`, {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Backend connection failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  function login() {
    window.location.href = `${API}/auth/google`;
  }

  async function logout() {
    try {
      const response = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (response.ok) {
        setUser(null);
        window.history.replaceState({}, "", "/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user && window.location.pathname === "/dashboard") {
    return (
      <div className="container">
        <h1>Welcome!</h1>

        {user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="profile"
          />
        )}

        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  if (window.location.pathname === "/dashboard" && !user) {
    return (
      <div className="container">
        <h2>Please sign in first</h2>
        <button onClick={login}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Google Authentication</h1>
      <p>Sign in securely using your Google account.</p>

      <button onClick={login}>
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
