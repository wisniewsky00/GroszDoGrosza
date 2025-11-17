import { useState } from "react";

export function LoginForm( { onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleFormSubmit}>
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

      <button>Zaloguj się</button>
    </form>
  );
}