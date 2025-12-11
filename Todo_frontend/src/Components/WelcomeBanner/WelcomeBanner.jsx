import "./WelcomeBanner.scss";

function WelcomeBanner({ viewMode }) {
  return (
    <div className="WelcomeBanner">
      <div className="BannerContent">
        <h1 className="BannerTitle">
          {viewMode === "tasks" ? "✓ My Tasks" : "🎯 My Goals"}
        </h1>
        <p className="BannerSubtitle">
          {viewMode === "tasks"
            ? "Stay organized and productive. Track your daily tasks and never miss a deadline."
            : "Dream big. Set ambitious goals and track your progress towards success."}
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
