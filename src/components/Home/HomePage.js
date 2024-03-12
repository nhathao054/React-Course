import { useSelector } from "react-redux";
import homePageVideo from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store";
const HomePage = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);
  // const isAuthenticate = store?.getState()?.user?.isAuthenticate;
  console.log(isAuthenticate);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={homePageVideo} />
      </video>
      <div className="homepage-title">
        <div className="title-1">Forms that break the norm</div>
        <div className="title-2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div className="title-3">
          {isAuthenticate === false ? (
            <button onClick={() => navigate("/login")}>
              Get started—it's free
            </button>
          ) : (
            <button onClick={() => navigate("/users")}>Do quiz now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
