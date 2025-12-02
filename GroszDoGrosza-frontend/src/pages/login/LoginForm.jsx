import { useState } from "react";
import EyeIcon from '../../assets/images/icons/eye.svg';
import EyeOffIcon from '../../assets/images/icons/eye-off.svg';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  function validate() {
    let valid = true;


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

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (!validateEmail(email)) return;

    onSubmit(email, password, setError);
  }

  function handleBlurEmail() {
    if (!email.trim()) {
      setEmailError("Pole jest wymagane");
    } else if (!validateEmail(email)) {
      setEmailError("Nieprawidłowy format e-mail");
    } else setEmailError("")
  }

  function handleBlurPassword() {
    if (!password.trim()) setPasswordError("Pole jest wymagane");
    else setPasswordError("");
  }

  return (

    <form className="login-form" onSubmit={handleFormSubmit}>

      {error && <div className="error-box">{error}</div>}

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
            if (error) {
              setError(false);
            }

            setPassword(e.target.value);
            setPasswordError(false)
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

      <button className="login-btn">Zaloguj się</button>
    </form>
  );
}