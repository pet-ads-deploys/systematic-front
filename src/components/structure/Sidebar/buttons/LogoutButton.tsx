// External library
import { ImExit } from "react-icons/im";

// Hooks
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useNavigation } from "@features/shared/hooks/useNavigation";

// Guards

// Styles
import style from "./LogouButton.module.css";

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const { toGo } = useNavigation();

  const handleLogout = async () => {
    await logout();
    toGo("/");
  };

  return (
    <div
      className={style.linkBox}
      style={{
        display: "flex",
        width: "120px",
        alignItems: "center",
      }}
    >
      <ImExit size={20} style={{ marginRight: "1rem", color: "#272927" }} />
      <button className={style.link} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
