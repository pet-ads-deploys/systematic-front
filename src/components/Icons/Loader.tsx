// Icons
import loader from "../../assets/icons/loader.svg";

// Styles
import Style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Style.loader}>
      <img src={loader} alt="Loading" />
      <p>Searching for existent studies</p>
    </div>
  );
};

export default Loader;
