import { useState } from "react";

export function RegisterForm({ onSubmit }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (username !== "" && email !== "" && password !== "") {
      onSubmit(username, email, password);
    }

  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  
      />

      <input 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  
      />

      <input 
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  
      />

      <button>Zarejestruj się</button>
    </form>
  );
}