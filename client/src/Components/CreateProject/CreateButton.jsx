import plusIcon from "../../assets/plusIcon.svg";
import style from "./createButton.module.css";

const CreateButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={plusIcon} alt="+" />
      Create New Project
    </button>
  );
};

export default CreateButton;
