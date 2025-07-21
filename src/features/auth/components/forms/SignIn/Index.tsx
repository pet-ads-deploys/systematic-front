// External library
import { Link } from "react-router-dom";

// Hooks
import useHandleLogin from "../../../../../hooks/auth/useHandleLogin";

// Styles
import "../styles.css";

export default function FormLogin({
  redirectForgotPassword,
}: {
  redirectForgotPassword: () => void;
}) {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    passwordError,
    handleSubmit,
    error,
    setError,
    isSubmitting,
  } = useHandleLogin();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div className="contentForm">
        <div className="inputGroup">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className={error || usernameError ? "inputError" : ""}
          />
          {usernameError && <p className="error">{usernameError}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className={error || passwordError ? "inputError" : ""}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Is submitting..." : "Log in"}
          </button>
          <Link to="#" onClick={redirectForgotPassword}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
  );
}
