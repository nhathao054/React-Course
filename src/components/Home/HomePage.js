import homePageVideo from "../../assets/video-homepage.mp4";

const HomePage = () => {
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
          <button>Get started—it's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
