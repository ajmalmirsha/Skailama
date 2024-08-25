import style from "./sidebar.module.css";
import Logo from "../../assets/Logo.svg";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { PlusIcon } from "../../Utils/Icons";

const SideBar = ({ children }) => {
  const { projectId } = useParams();
  return (
    <div className={style.container}>
      <aside>
        <div className={style.topContainer}>
          <div className={style.LogoWrapper}>
            <img src={Logo} className={style.Logo} alt="Logo" />
            <h3>Ques.AI</h3>
          </div>

          <div>
            <div className={style.itemsWrapper}>
              <Link to={`/podcast/${projectId}/add-podcast`}>
                <PlusIcon />
                Add your Podcast(s)
              </Link>
              <Link to={`/podcast/${projectId}/create`}>
                Create & Repurpose
              </Link>
              <Link to={`/podcast/${projectId}/widget`}>Podcast Widget</Link>
              <Link to={`/podcast/${projectId}/upgrade`}>Upgrade</Link>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <Link to={`/podcast/${projectId}/help`}>Help</Link>
          <hr />
          <br />
          <div className={style.userContainer}>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "yellowgreen",
              }}
            />
            <div>
              <h4>Username</h4>
              <p>username@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
      <div className={style.outletContainer}>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

function Link({ children, to }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${style.item} ${isActive ? style.active : ""}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default SideBar;
