import Logo from "../../assets/Logo.svg";
import Settings from "../../assets/Settings.svg";
import Notification from "../../assets/Notification.svg";
import style from "./home.module.css";
import CreateProject from "../../Components/CreateProject/CreateProject";
import { useEffect, useState } from "react";
import CreateButton from "../../Components/CreateProject/CreateButton";
import Modal from "../../Components/Modal/Modal";
import { createProject, getProjects } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleProjectNameChange = (e) => {
    setProjectName(e?.target?.value);
    if (err) {
      setErr("");
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      if (!projectName.trim()) {
        setErr("Project Name Can't be empty");
      } else {
        const result = await createProject({ title: projectName });
        if (result) {
          handleModalClose();
          setRefetch((prev) => !prev);
          setProjectName("")
        }
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleFetchProjectList = async () => {
    try {
      const result = await getProjects();
      if (result?.data?.data) {
        setProjects(result?.data?.data);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    handleFetchProjectList();
  }, [refetch]);

  return (
    <div className={style.mainContainer}>
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
        {!!projects?.length ? (
          <div className={style.wrapper}>
            <div className={style.header}>
              <h4>Projects</h4>
              <CreateButton onClick={handleModalOpen} />
            </div>
            <div className={style.cardWrapper}>
              {projects.map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className={style.createProjectWrapper}>
            <CreateProject
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
              handleProjectNameChange={handleProjectNameChange}
              modalOpen={modalOpen}
              handleModalOpen={handleModalOpen}
              err={err}
            />
          </div>
        )}
      </div>
      <Modal open={modalOpen}>
        <div className={style.modalWrapper}>
          <h2>Create Project</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="project-name">Enter Project Name:</label>
            <input
              value={projectName}
              onChange={handleProjectNameChange}
              placeholder="Type here"
              type="text"
              id="project-name"
            />
            <p>{err}</p>

            <div className={style.buttonWrapper}>
              <button
                onClick={handleModalClose}
                type="button"
                className={style.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" className={style.createButton}>
                Create
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

function Card({ item }) {
  const navigate = useNavigate();
  return (
    <div className={style.card} onClick={()=> navigate(`/podcast/${item?._id}/add-podcast`)} >
      <div className={style.icon}>SP</div>
      <div className={style.content}>
        <h4 className={style.projectTitle}>{item?.title}</h4>
        <p className={style.epiCount}>4 Episodes</p>
        <br />
        <p className={style.time}>Last edited a week ago</p>
      </div>
    </div>
  );
}

export default Home;
