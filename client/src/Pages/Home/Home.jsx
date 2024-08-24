import Logo from "../../assets/Logo.svg";
import Settings from "../../assets/Settings.svg";
import Notification from "../../assets/Notification.svg";
import style from "./home.module.css";
import CreateProject from "../../Components/CreateProject/CreateProject";

const Home = () => {
  return (
    <div className={style.container}>
      <nav>
        <div className={style.LogoWrapper}>
          <img src={Logo} className={style.Logo} alt="Logo" />
          <h3>Ques.AI</h3>
        </div>

        <div className={style.iconWrapper}>
          <img className={style.icon} src={Settings} alt="Settings" />
          <img className={style.icon} src={Notification} alt="Notification" />
        </div>
      </nav>

      <CreateProject/>
    </div>
  );
};

export default Home;
