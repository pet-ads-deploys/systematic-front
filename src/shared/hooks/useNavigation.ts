import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();
  const toGo = (path: string) => {
    navigate(path);
  };

  return {
    toGo,
  };
}