import React from "react";
import "./Dashboard.scss";

const Dashboard = ({
  viewMode,
  totalPending = 0,
  totalCompleted = 0,
  total = 0,
  countsByType = { work: 0, home: 0, business: 0 },
  lastItem = null,
}) => {
  return (
    <div className="Dashboard">
      {/* LEFT SIDE */}
      <div className="dash-left">
        <h2 className="dash-title">
          {viewMode === "tasks" ? "Tasks Summary" : "Goals Summary"}
        </h2>

        <p className="dash-sub">
          {viewMode === "tasks"
            ? "Summary of your pending and completed tasks."
            : "Summary of your goals progress."}
        </p>

        {/* STATS BOXES */}
        <div className="dash-stats">
          <div className="stat">
            <span className="stat-number">{totalPending}</span>
            <span className="stat-label">Pending</span>
          </div>

          <div className="stat">
            <span className="stat-number">{totalCompleted}</span>
            <span className="stat-label">Completed</span>
          </div>

          <div className="stat">
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="dash-right">
        {/* COUNTS BY TYPE */}
        <div className="types">
          <h4>By type</h4>

          <div className="type-list">
            <div className="type-item">
              <span className="type-name">Work</span>
              <span className="type-count">{countsByType.work ?? 0}</span>
            </div>

            <div className="type-item">
              <span className="type-name">Home</span>
              <span className="type-count">{countsByType.home ?? 0}</span>
            </div>

            <div className="type-item">
              <span className="type-name">Business</span>
              <span className="type-count">{countsByType.business ?? 0}</span>
            </div>
          </div>
        </div>

        {/* LAST ITEM ADDED */}
        {lastItem && (
          <div className="last-item">
            <h4>Last added</h4>
            <p className="last-title">{lastItem.name}</p>
            <p className="last-type">{lastItem.type}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
