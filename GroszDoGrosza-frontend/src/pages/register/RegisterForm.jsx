import { useState } from "react";
import EyeIcon from '../../assets/images/icons/eye.svg';
import EyeOffIcon from '../../assets/images/icons/eye-off.svg';

export function RegisterForm({ onSubmit }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");


  function validate() {
    let valid = true;

    if (!username.trim()) {
      setUsernameError("Pole jest wymagane");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Pole jest wymagane");
      valid = false
    }

    if (!password.trim()) {
      setPasswordError("Pole jest wymagane");
      valid = false;
    }

    return valid;
  }

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function validatePassword(password) {
    let valid = true;

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Hasło musi zawierać co najmniej jedną wielką literę")
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Hasło musi zawierać co najmniej jedną małą literę")
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Hasło musi zawierać co najmiej jedną cyfrę")
      valid = false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError("Hasło musi zawierać co najmniej jeden znak specjalny")
      valid = false;
    } else if (password.length < 16) {
      setPasswordError("Hasło musi mieć minimum 16 znaków")
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }


  function handleFormSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (!validateEmail(email)) return;

    onSubmit(username, email, password, setError);
  }

  function handleBlurUsername() {
    if (!username.trim()) {
      setUsernameError("Pole jest wymagane");
    } else setUsernameError("");
  }

  function handleBlurEmail() {
    if (!email.trim()) {
      setEmailError("Pole jest wymagane");
    } else if (!validateEmail(email)) {
      setEmailError("Nieprawidłowy format e-mail");
    } else setEmailError("")
  }

  function handleBlurPassword() {
    if (!password.trim()) {
      setPasswordError("Pole jest wymagane");
      return;
    } else if (!validatePassword(password)) {
      return;
    } else {
      setPasswordError("");
    }
 
  }

  return (
    <form className="register-form" onSubmit={handleFormSubmit}>

      {error && <div className="error-box">{error}</div>}

      <label className="input-label">Nazwa użytkownika</label>
      <input
        placeholder="Nazwa użytkownika"
        value={username}
        onChange={(e) => {

          if (error) {
            setError(false);
          }

          setUsername(e.target.value);
          setUsernameError("");
        }}
        onBlur={handleBlurUsername}
        className={usernameError ? "input error" : "input"}
      />
      {usernameError && <p className="input-error">{usernameError}</p>}

      <label className="input-label">E-mail</label>
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          const value = e.target.value;
          setEmail(value);

          if (error) {
            setError(false);
          }

          if (!validateEmail(value)) {
            setEmailError("Nieprawidłowy format e-mail");
          } else {
            setEmailError("");
          }
        }
        }
        onBlur={handleBlurEmail}
        className={emailError ? "input error" : "input"}
      />
      {emailError && <p className="input-error">{emailError}</p>}

      <label className="input-label">Hasło</label>

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Hasło"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);

            if (error) {
              setError(false);
            }

            if (!validatePassword(value)) {
              ""
            } else {
              setPasswordError(false)
            }
            
          }}
          onBlur={handleBlurPassword}
          className={passwordError ? "input error" : "input"}
        />

        <span
          className="toogle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <img src={EyeOffIcon} /> : <img src={EyeIcon} />}
        </span>
      </div>
      {passwordError && <p className="input-error">{passwordError}</p>}

      <button className="register-btn">Zarejestruj się</button>
    </form>
  );
}