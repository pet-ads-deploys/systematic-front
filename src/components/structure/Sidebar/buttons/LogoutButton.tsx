// External library
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

// Hooks
import { useAuth } from "@features/auth/hooks/useAuth";

// Guards
import { isLeft } from "@features/shared/errors/pattern/Either";

// Styles
import style from "./LogouButton.module.css";

const LogoutButton = () => {
  const result = useAuth();
  const navigate = useNavigate();

  if (isLeft(result)) return null;

  const { logout } = result.value;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      className={style.linkBox}
      style={{ display: "flex", width: "120px", alignItems: "center" }}
    >
      <ImExit size={20} style={{ marginRight: "1rem", color: "#c9d9e5" }} />
      <button className={style.link} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
