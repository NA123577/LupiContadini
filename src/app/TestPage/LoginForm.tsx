"use client";
import { useState } from "react";
import { signIn } from "../BusinessLogic/LoginService";
import { User } from "@supabase/supabase-js";
import { handleCleanDatabase } from "../BusinessLogic/AdminService"; // Import the clean database function

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null); // Track logged-in user
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password); // Call signIn function
      setUser(user); // Set the user if logged in
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError("Login failed: " + error.message);
      } else {
        setError("Login failed: Unknown error occurred");
      }
    }
  };

  const handleCleanDatabaseClick = async () => {
    try {
      setIsDeleting(true); // Start deletion process

      // Call the clean database service
      const result = await handleCleanDatabase();
      alert(result); // Alert on success
    } catch (error) {
      if (error instanceof Error) {
        alert("Error cleaning database: " + error.message);
      } else {
        alert("Error cleaning database: Unknown error occurred");
      }
    } finally {
      setIsDeleting(false); // End deletion process
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
      {user && <p>Welcome, {user.email}!</p>}

      {user && (
        <button onClick={handleCleanDatabaseClick} disabled={isDeleting}>
          {isDeleting ? "Cleaning..." : "Clean Database"}
        </button>
      )}
    </div>
  );
}
